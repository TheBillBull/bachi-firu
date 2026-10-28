/* ============================================================
   Química II · ampliaciones · Tema 3: Sistema periódico
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h;

  var resumen = [
    "<b>La tabla es un mapa de configuraciones</b>: periodo = mayor n; bloque = subnivel del último electrón; grupo (bloque p) = 10 + electrones de valencia. En los cationes salen primero los electrones de mayor n (Fe²⁺ = [Ar] 3d⁶).",
    "<b>Z* = Z − σ</b> explica las tendencias: en un periodo Z* sube y el átomo se contrae; en un grupo Z* casi no cambia pero n sube y el átomo crece. Slater: 0,35 misma capa, 0,85 capa n−1, 1,00 capas inferiores.",
    "<b>Irregularidades</b>: EI(B) &lt; EI(Be) y EI(Al) &lt; EI(Mg) (electrón p, más alto); EI(O) &lt; EI(N) y EI(S) &lt; EI(P) (repulsión del par apareado). AE: Cl &gt; F; Be, N, Mg y gases nobles ≈ 0. Un salto brusco en las EI sucesivas marca el fin de la capa de valencia.",
    "<b>Iones</b>: catión &lt; átomo &lt; anión. En especies isoelectrónicas (mismos electrones) manda Z: a mayor Z, menor radio. Si no, primero capas (n) y luego Z*.",
    "<b>Justificar</b> = configuración → qué cambia (n, Z*, electrones) → cómo afecta → orden. Con energías: kJ/mol ÷ N<sub>A</sub> = J por átomo; E = h·c/λ."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe la configuración del Fe²⁺ así: [Ar] 4s² 3d⁴ (quita los dos últimos electrones, los del 3d). ¿Qué falla?",
          op: ["Nada: se quitan los últimos que entraron", "Se quitan primero los de mayor n, los 4s: Fe²⁺ = [Ar] 3d⁶", "Debía quitar un 4s y un 3d", "El Fe no puede formar un ion 2+"], ok: 1,
          porque: "Un catión pierde los electrones de la capa más externa (mayor n). El 4s está más lejos que el 3d, así que sale antes: Fe²⁺ = [Ar] 3d⁶ y Fe³⁺ = [Ar] 3d⁵." },
        { q: "«El átomo de Cl es mayor que el de Na porque el Cl tiene más electrones (17 frente a 11).» ¿Qué falla?",
          op: ["Nada", "El Na es mayor: ambos tienen n = 3, pero la carga nuclear efectiva del Cl (≈ 6,1) es mucho mayor que la del Na (≈ 2,2) y contrae su capa", "El Cl es mayor porque está más a la derecha", "Tienen el mismo radio al ser del mismo periodo"], ok: 1,
          porque: "En un periodo los electrones nuevos entran en la misma capa y apantallan poco, pero el núcleo gana un protón por cada paso. Z* sube y el átomo se contrae: Na (166 pm) &gt; Cl (102 pm)." },
        { q: "«La EI₂ del sodio es mucho mayor que la EI₁ porque el sodio ya es positivo.» ¿Qué falla?",
          op: ["Nada", "No basta: el Na⁺ tiene configuración de gas noble (2s² 2p⁶) y el segundo electrón sale de una capa interna, más cercana al núcleo y poco apantallada", "La EI₂ es menor que la EI₁", "Se debe a que el Na es un metal"], ok: 1,
          porque: "Cada ionización sucesiva cuesta algo más, pero un salto de 9 veces (496 → 4562) solo se explica porque el segundo electrón es de la capa n = 2, con Z* ≈ 6,85, frente a 2,2 del 3s." },
        { q: "«La EI del O es mayor que la del N porque el O está más a la derecha.» ¿Qué falla?",
          op: ["Nada", "Es la tendencia general, pero el N (2p³, desapareados) rompe la regla: EI(N) = 1402 &gt; EI(O) = 1314 kJ/mol", "La EI no depende de la configuración", "El O tiene menos electrones"], ok: 1,
          porque: "En el O (2p⁴) hay un orbital con dos electrones: la repulsión entre ellos facilita arrancar uno. El N, con semicapa llena, retiene más sus electrones." },
        { q: "«El flúor tiene la mayor afinidad electrónica porque es el más electronegativo.» ¿Qué falla?",
          op: ["Nada", "La mayor afinidad la tiene el cloro (349 kJ/mol; F 328): en el F, tan pequeño, la repulsión entre electrones reduce la energía liberada", "El flúor tiene afinidad negativa", "La afinidad y la electronegatividad son la misma propiedad"], ok: 1,
          porque: "La afinidad electrónica es una energía; la electronegatividad es una escala relativa dentro de un enlace. Aunque tienen tendencias parecidas, el F es una excepción en la AE." },
        { q: "Se ordenan N³⁻, O²⁻, F⁻, Na⁺ y Mg²⁺ por radio creciente con el argumento «cuanto más a la derecha, más pequeño». ¿Qué falla?",
          op: ["Nada", "Son isoelectrónicos (10 e⁻): decide el número de protones. A mayor Z, menor radio; por eso Mg²⁺ &lt; Na⁺ &lt; F⁻ &lt; O²⁻ &lt; N³⁻", "El Na⁺ es mayor que el F⁻", "No se pueden comparar"], ok: 1,
          porque: "Con el mismo número de electrones la capa es la misma, y solo importa cuánto tira el núcleo: más protones, más contracción. La regla del periodo no sirve cuando hay iones." },
        { q: "«El átomo de potasio es menor que el de sodio porque tiene más protones.» ¿Qué falla?",
          op: ["Nada", "En un grupo, al bajar se añade una capa completa (n = 4 frente a n = 3); Z* es casi la misma (2,2) y el K es mayor (203 frente a 166 pm)", "El K tiene menos electrones", "El radio no cambia en un grupo"], ok: 1,
          porque: "Los protones nuevos son compensados por los electrones internos. Manda el aumento de n: más capas, más tamaño." },
        { q: "Un alumno calcula la longitud de onda para ionizar el Na con EI = 496 kJ/mol así: λ = h·c / (496) = 6,626·10⁻³⁴ · 3·10⁸ / 496. ¿Qué falla?",
          op: ["Nada", "La EI está en kJ por mol: hay que pasarla a J por átomo (496·10³ / 6,022·10²³ = 8,24·10⁻¹⁹ J) antes de usar E = h·c/λ", "Debía usar la constante de Rydberg", "Debía multiplicar por N<sub>A</sub>"], ok: 1,
          porque: "E = h·c/λ da la energía de un fotón (un átomo), así que E debe estar en J por átomo: 496 000 J/mol ÷ N<sub>A</sub>. Así λ = 241 nm (ultravioleta)." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Un elemento tiene la configuración de valencia 3s² 3p⁴. Está en…",
          op: ["periodo 3, grupo 16", "periodo 4, grupo 14", "periodo 3, grupo 14", "periodo 2, grupo 16"], ok: 0, porque: "Periodo = mayor n = 3. Bloque p con 2 + 4 = 6 electrones de valencia: grupo 10 + 6 = 16 (el azufre)." },
        { q: "Configuración del ion Fe³⁺ (Z = 26):",
          op: ["[Ar] 3d⁵", "[Ar] 4s² 3d³", "[Ar] 4s¹ 3d⁴", "[Ar] 3d⁶"], ok: 0, porque: "Se quitan primero los 4s (2 electrones) y luego uno 3d: 3d⁶ → 3d⁵. Cinco electrones desapareados." },
        { q: "La carga nuclear efectiva aumenta de izquierda a derecha en un periodo porque…",
          op: ["aumenta Z y los electrones nuevos de la misma capa apantallan poco", "disminuye Z", "aumenta el número de capas", "los electrones internos desaparecen"], ok: 0, porque: "Cada paso añade un protón (+1) pero el electrón nuevo, de la misma capa, solo apantalla 0,35." },
        { q: "¿Cuál tiene mayor radio?",
          op: ["Na", "Mg", "Al", "Si"], ok: 0, porque: "Mismo periodo: el radio disminuye de izquierda a derecha. El sodio es el mayor (166 pm)." },
        { q: "Ordena de mayor a menor radio: Cl⁻, K⁺, Ca²⁺.",
          op: ["Cl⁻ &gt; K⁺ &gt; Ca²⁺", "Ca²⁺ &gt; K⁺ &gt; Cl⁻", "K⁺ &gt; Cl⁻ &gt; Ca²⁺", "Cl⁻ &gt; Ca²⁺ &gt; K⁺"], ok: 0, porque: "Los tres tienen 18 electrones (isoelectrónicos): a mayor número de protones, menor radio. Z = 17, 19 y 20: Cl⁻ (181 pm) &gt; K⁺ (138) &gt; Ca²⁺ (100)." },
        { q: "¿Qué elemento tiene mayor primera energía de ionización?",
          op: ["Na", "Mg", "Al", "Ne"], ok: 3, porque: "Entre los de la lista, el neón: gas noble con n = 2 y Z* altísima (2081 kJ/mol)." },
        { q: "EI₁ del Al (578) es menor que la del Mg (738) porque…",
          op: ["el electrón que pierde el Al es un 3p, de mayor energía y más apantallado", "el Al tiene menos protones", "el Al es un gas", "el Mg tiene menos electrones"], ok: 0, porque: "Mg: 3s²; Al: 3s² 3p¹. El 3p está más alto y más apantallado que un 3s." },
        { q: "Un elemento tiene EI (kJ/mol): 577, 1816, 2744, 11 600. ¿Cuántos electrones de valencia tiene?",
          op: ["3", "4", "2", "1"], ok: 0, porque: "El salto entre EI₃ y EI₄ (2744 → 11 600) marca el final de la capa de valencia: son 3 electrones (grupo 13)." },
        { q: "¿Qué especie NO es isoelectrónica con el Ne?",
          op: ["Mg²⁺", "F⁻", "Cl⁻", "O²⁻"], ok: 2, porque: "El Ne tiene 10 electrones; el Cl⁻ tiene 18 (isoelectrónico con el Ar)." },
        { q: "La afinidad electrónica es mayor (se libera más energía) en…",
          op: ["Cl", "F", "Ne", "Na"], ok: 0, porque: "Cl (349 kJ/mol) &gt; F (328): excepción por repulsión en la capa n = 2. El Ne no libera energía." },
        { q: "El enlace con mayor carácter iónico entre estos es…",
          op: ["Cs–F", "H–Cl", "C–H", "Cl–Cl"], ok: 0, porque: "Δχ: Cs–F 3,19; H–Cl 0,96; C–H 0,35; Cl–Cl 0. Mayor diferencia, más iónico." },
        { q: "Un fotón puede ionizar un átomo si su energía es…",
          op: ["mayor o igual que la energía de ionización por átomo", "menor que la energía de ionización", "igual que la afinidad electrónica", "da igual la energía"], ok: 0, porque: "E<sub>fotón</sub> = h·c/λ ≥ EI (por átomo). El exceso se convierte en energía cinética del electrón." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: sistema periódico",
      cartas: [
        { a: "¿Cómo se deduce el periodo y el grupo de un elemento?", b: "Periodo = mayor n de la configuración. Bloque p: grupo = 10 + electrones de valencia. Bloque s: grupo = electrones del s. Bloque d: (n−1)d + ns." },
        { a: "Carga nuclear efectiva", b: "Z* = Z − σ: la carga que realmente siente un electrón, descontando el apantallamiento de los demás." },
        { a: "Reglas de Slater (ns, np)", b: "Misma capa: 0,35 (0,30 en n = 1). Capa n−1: 0,85. Capas inferiores: 1,00." },
        { a: "Tendencia del radio atómico", b: "Crece al bajar en un grupo (más capas) y disminuye a la derecha en un periodo (Z* mayor)." },
        { a: "Radio de un catión y de un anión", b: "Catión menor que su átomo; anión mayor que su átomo." },
        { a: "Especies isoelectrónicas", b: "Mismo número de electrones. A mayor Z, menor radio." },
        { a: "Primera energía de ionización", b: "Energía para X(g) → X⁺(g) + e⁻. Aumenta a la derecha y arriba. Siempre positiva." },
        { a: "Anomalías de la EI", b: "B &lt; Be y Al &lt; Mg (el electrón p está más alto); O &lt; N y S &lt; P (repulsión del par apareado)." },
        { a: "EI sucesivas", b: "Siempre crecen; el salto brusco señala el paso a la capa interna y da el número de electrones de valencia." },
        { a: "Afinidad electrónica", b: "Energía liberada al captar un e⁻: X(g) + e⁻ → X⁻(g). Mayor en el Cl que en el F. Be, N, Mg y gases nobles ≈ 0." },
        { a: "Electronegatividad", b: "Escala relativa (Pauling) de atracción del par de enlace. F = 3,98 (máx.), Cs = 0,79. Sube a la derecha y arriba." },
        { a: "Carácter metálico", b: "Crece a la izquierda y abajo (EI y χ bajas). Óxidos de metales: básicos; de no metales: ácidos." },
        { a: "De kJ/mol a energía de un fotón", b: "E (J por átomo) = EI·10³ / N<sub>A</sub>; λ = h·c / E." }
      ]
    },
    emp1: {
      titulo: "Empareja cada hecho con su causa",
      consigna: "Une cada observación con la explicación que la justifica.",
      pares: [
        ["El radio disminuye de Na a Cl", "Z* aumenta con la misma capa (n = 3)"],
        ["El radio aumenta de Li a K", "Se añaden capas (n sube; Z* casi igual)"],
        ["EI(B) &lt; EI(Be)", "El electrón arrancado es un 2p, más alto y apantallado"],
        ["EI(O) &lt; EI(N)", "Repulsión del par apareado del 2p⁴"],
        ["Salto grande entre EI₂ y EI₃ del Mg", "El tercer electrón es de una capa interna completa"],
        ["Na⁺ es menor que Na", "Pierde la capa n = 3 y los que quedan sienten más Z*"],
        ["F⁻ es mayor que F", "Mayor repulsión entre electrones, Z* menor"]
      ]
    },
    orden1: {
      titulo: "Ordena por radio creciente",
      consigna: "De menor a mayor radio: Al³⁺, Mg²⁺, Na⁺, F⁻, O²⁻ (todos isoelectrónicos de 10 e⁻).",
      items: [
        { t: "Al³⁺ (13 protones)", nota: "53,5 pm: el núcleo con más protones contrae más." },
        { t: "Mg²⁺ (12 protones)", nota: "72 pm." },
        { t: "Na⁺ (11 protones)", nota: "102 pm." },
        { t: "F⁻ (9 protones)", nota: "133 pm." },
        { t: "O²⁻ (8 protones)", nota: "140 pm: los mismos electrones con menos protones." }
      ]
    },
    clas1: {
      titulo: "Metal, no metal o semimetal",
      consigna: "Toca cada elemento y después su categoría.",
      categorias: ["Metal", "No metal", "Semimetal"],
      items: [
        { t: "Na", c: 0 }, { t: "Ca", c: 0 }, { t: "Al", c: 0 }, { t: "Fe", c: 0 }, { t: "Cs", c: 0 },
        { t: "O", c: 1 }, { t: "Cl", c: 1 }, { t: "S", c: 1 }, { t: "N", c: 1 }, { t: "C", c: 1 },
        { t: "Si", c: 2 }, { t: "Ge", c: 2 }, { t: "As", c: 2 }, { t: "B", c: 2 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS (★ 15 · ★★ 16 · ★★★ 15)
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }

  // ---------------- ★ ----------------
  nu("a1", 1, "¿En qué grupo de la tabla periódica está el elemento de número atómico 17?", "Grupo =", 17,
    ["Escribe la configuración: la capa externa te da los electrones de valencia."],
    ["1s² 2s² 2p⁶ 3s² 3p⁵: capa de valencia 3s² 3p⁵, 7 electrones.", "Bloque p: grupo = 10 + 7 = 17 (halógenos)."], "Grupo 17 (cloro)");
  ge("a2", 1, "Un elemento tiene la configuración electrónica [Ne] 3s² 3p². Indica su número atómico y su grupo.",
    [{ tipo: "num", etiqueta: "Z =", valor: 14 }, { tipo: "num", etiqueta: "Grupo =", valor: 14 }],
    ["Neón: 10 electrones."],
    ["Z = 10 + 2 + 2 = 14 (silicio).", "Bloque p con 4 electrones de valencia: grupo 10 + 4 = 14."], "Z = 14; grupo 14");
  ge("a3", 1, "Indica el periodo y el grupo del calcio (Z = 20).",
    { tipo: "lista", etiqueta: "Periodo y grupo =", valores: [4, 2] },
    ["Configuración: [Ar] 4s²."],
    ["1s² 2s² 2p⁶ 3s² 3p⁶ 4s²: mayor n = 4 → periodo 4.", "Bloque s con 2 electrones de valencia → grupo 2."], "Periodo 4, grupo 2");
  nu("a4", 1, "¿Cuántos electrones de valencia tiene el aluminio (Z = 13)?", "Electrones de valencia =", 3,
    ["Mira la capa más externa."], ["1s² 2s² 2p⁶ 3s² 3p¹: la capa n = 3 tiene 2 + 1 = 3 electrones."], "3");
  op("a5", 1, "¿Cuál de estos átomos tiene el mayor radio atómico: Na, Mg o Al?", "Mayor radio", ["Na", "Mg", "Al", "los tres iguales (mismo periodo)"], 0,
    ["Mismo periodo: ¿hacia dónde disminuye el radio?"], ["Los tres son del periodo 3: n = 3 en todos.", "De izquierda a derecha aumenta Z* y el radio disminuye: Na (166) &gt; Mg (141) &gt; Al (121 pm)."], "Na");
  op("a6", 1, "¿Cuál tiene la mayor primera energía de ionización: Li, Na o K?", "Mayor EI₁", ["Li", "Na", "K", "las tres son iguales"], 0,
    ["En un grupo, el electrón de valencia está cada vez más lejos."], ["Mismo grupo: al bajar crece n y el electrón se arranca con menos energía.", "EI: Li 520 &gt; Na 496 &gt; K 419 kJ/mol."], "Li");
  op("a7", 1, "¿Cuál de estos elementos es el más electronegativo: C, N, O o F?", "Más electronegativo", ["C", "N", "O", "F"], 3,
    ["Mismo periodo; la electronegatividad aumenta hacia la derecha."], ["Periodo 2 en orden C, N, O, F: χ crece de izquierda a derecha.", "χ: C 2,55 &lt; N 3,04 &lt; O 3,44 &lt; F 3,98."], "F");
  nu("a8", 1, "Para el magnesio, EI₂ = 1451 kJ/mol y EI₃ = 7733 kJ/mol. ¿Cuántas veces mayor es la tercera energía de ionización que la segunda?", "EI₃ / EI₂ =", 5.329,
    ["Divide."], ["EI₃ / EI₂ = 7733 / 1451 = 5,33.", "Un salto de este tamaño señala que el tercer electrón sale de una capa interna: el Mg tiene 2 electrones de valencia."], "≈ 5,33 veces");
  op("a9", 1, "¿Qué es mayor, el radio del átomo de cloro o el del ion cloruro Cl⁻?", "Mayor radio", ["Cl", "Cl⁻", "son iguales"], 1,
    ["Un anión gana electrones sin ganar protones."], ["Cl⁻ tiene 18 electrones y 17 protones: más repulsión, menos Z*.", "r(Cl) = 102 pm &lt; r(Cl⁻) = 181 pm."], "Cl⁻");
  ge("a10", 1, "Escribe la configuración electrónica del ion Mg²⁺ (Z = 12).",
    { tipo: "texto", etiqueta: "Configuración =", valores: ["1s2 2s2 2p6", "[He] 2s2 2p6"], formula: true },
    ["Primero escribe la del átomo y luego quita los electrones de la capa externa."],
    ["Mg: 1s² 2s² 2p⁶ 3s².", "Mg²⁺ pierde los dos 3s: 1s² 2s² 2p⁶ (como el neón)."], "1s² 2s² 2p⁶");
  op("a11", 1, "¿Cuál de estas especies es isoelectrónica con el átomo de neón (Z = 10)?", "Isoelectrónica con Ne", ["K⁺", "Mg²⁺", "Cl⁻", "Ca²⁺"], 1,
    ["Cuenta los electrones de cada especie."], ["Ne: 10 electrones. Mg²⁺: 12 − 2 = 10 ✓.", "K⁺: 18; Cl⁻: 18; Ca²⁺: 18 (isoelectrónicos con el Ar)."], "Mg²⁺");
  op("a12", 1, "¿Qué ion forma el calcio al reaccionar?", "Ion", ["Ca⁺", "Ca²⁺", "Ca²⁻", "Ca³⁺"], 1,
    ["Mira su configuración de valencia."], ["Ca: [Ar] 4s². Pierde los 2 electrones 4s y queda con la configuración del argón.", "Ion: Ca²⁺."], "Ca²⁺");
  nu("a13", 1, "La primera energía de ionización del sodio es 496 kJ/mol. Exprésala en eV por átomo. (N<sub>A</sub> = 6,022·10²³; 1 eV = 1,602·10⁻¹⁹ J)", "EI₁ (eV) =", 5.141,
    ["Pasa de kJ/mol a J por átomo y de J a eV."], ["496·10³ / 6,022·10²³ = 8,236·10⁻¹⁹ J por átomo.", "8,236·10⁻¹⁹ / 1,602·10⁻¹⁹ = 5,14 eV."], "5,14 eV");
  op("a14", 1, "El fósforo (Z = 15) es…", "El fósforo es", ["metal", "no metal", "semimetal", "gas noble"], 1,
    ["Configuración 3s² 3p³: ¿cuántos electrones le faltan para completar el octeto?"], ["Grupo 15, periodo 3: electronegatividad 2,19, EI alta, forma aniones P³⁻.", "Es un no metal."], "No metal");
  op("a15", 1, "De estos elementos del segundo periodo, ¿cuál tiene el mayor radio atómico: Li, Be, C o F?", "Mayor radio", ["Li", "Be", "C", "F"], 0,
    ["Mismo periodo: el radio disminuye hacia la derecha."], ["Li está a la izquierda: menor Z*.", "Radios: Li 128; Be 96; C 76; F 57 pm."], "Li");

  // ---------------- ★★ ----------------
  nu("b1", 2, "Calcula con las reglas de Slater la carga nuclear efectiva sobre un electrón de la capa más externa del cloro (Z = 17).", "Z* =", 6.1,
    ["Configuración 3s² 3p⁵: 6 electrones en su capa (sin contar el estudiado)."],
    ["Misma capa (n = 3): 6 · 0,35 = 2,10.", "Capa n = 2: 8 · 0,85 = 6,80. Capa n = 1: 2 · 1,00 = 2,00.", "σ = 10,90 → Z* = 17 − 10,90 = 6,10."], "Z* = 6,1");
  nu("b2", 2, "Calcula la carga nuclear efectiva sobre un electrón 3p del aluminio (Z = 13).", "Z* =", 3.5,
    ["Config.: 3s² 3p¹."], ["Misma capa: hay 2 electrones más (3s²) → 2 · 0,35 = 0,70.", "Capa n = 2: 8 · 0,85 = 6,80; capa n = 1: 2 · 1,00 = 2,00.", "σ = 9,50 → Z* = 13 − 9,50 = 3,50."], "Z* = 3,5");
  nu("b3", 2, "Calcula la carga nuclear efectiva sobre un electrón de la capa más externa del Mg²⁺ (Z = 12).", "Z* =", 7.85,
    ["Mg²⁺ tiene la configuración 1s² 2s² 2p⁶."], ["Misma capa (n = 2): 7 · 0,35 = 2,45.", "Capa n = 1: 2 · 0,85 = 1,70.", "σ = 4,15 → Z* = 12 − 4,15 = 7,85."], "Z* = 7,85");
  nu("b4", 2, "Calcula la carga nuclear efectiva sobre un electrón 4p del bromo (Z = 35: [Ar] 4s² 3d¹⁰ 4p⁵).", "Z* =", 7.6,
    ["Capa n = 3: 3s² 3p⁶ 3d¹⁰ = 18 electrones."], ["Misma capa (n = 4): 6 · 0,35 = 2,10.", "Capa n = 3: 18 · 0,85 = 15,30.", "Capas n = 2 y n = 1: 10 · 1,00 = 10,00.", "σ = 27,40 → Z* = 35 − 27,40 = 7,60."], "Z* = 7,6");
  nu("b5", 2, "Un elemento del tercer periodo tiene las energías de ionización sucesivas (kJ/mol): 738, 1451, 7733, 10 543. ¿En qué grupo está?", "Grupo =", 2,
    ["Busca el salto brusco."], ["Salto entre EI₂ y EI₃ (×5,3): 2 electrones de valencia.", "Configuración de valencia 3s² → grupo 2 (es el magnesio)."], "Grupo 2");
  nu("b6", 2, "Las energías de ionización sucesivas de un elemento (kJ/mol) son 578; 1817; 2745; 11 577; 14 842. ¿Cuántos electrones de valencia tiene?", "Electrones de valencia =", 3,
    ["El salto grande indica la capa interna."], ["Razones: 3,1; 1,5; 4,2; 1,3.", "El salto está entre EI₃ y EI₄: los tres primeros electrones son de valencia (aluminio)."], "3");
  nu("b7", 2, "Calcula la longitud de onda máxima (en nm) de un fotón capaz de ionizar un átomo de sodio (EI₁ = 496 kJ/mol). h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s; N<sub>A</sub> = 6,022·10²³", "λ (nm) =", 241.3,
    ["Primero la energía por átomo, en J."], ["E = 496·10³ / 6,022·10²³ = 8,236·10⁻¹⁹ J.", "λ = h·c / E = 6,626·10⁻³⁴ · 3,00·10⁸ / 8,236·10⁻¹⁹ = 2,413·10⁻⁷ m = 241 nm."], "λ ≈ 241 nm (UV)");
  ge("b8", 2, "Una radiación de 200 nm, ¿qué energía tiene por mol de fotones (kJ/mol)? ¿Puede ionizar el magnesio (EI₁ = 738 kJ/mol)? (h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s; N<sub>A</sub> = 6,022·10²³)",
    [{ tipo: "num", etiqueta: "E (kJ/mol) =", valor: 598.5 }, { tipo: "opcion", etiqueta: "¿Ioniza el Mg?", opciones: ["Sí", "No"], ok: 1 }],
    ["E = h·c/λ por fotón; multiplica por N<sub>A</sub>."],
    ["E = 6,626·10⁻³⁴ · 3,00·10⁸ / 200·10⁻⁹ = 9,939·10⁻¹⁹ J por fotón.", "Por mol: 9,939·10⁻¹⁹ · 6,022·10²³ = 5,985·10⁵ J = 598,5 kJ/mol.", "598,5 &lt; 738: la energía del fotón no alcanza la EI₁ del Mg: no lo ioniza."], "598,5 kJ/mol; no");
  nu("b9", 2, "¿Cuánta energía (kJ) hace falta para arrancar un electrón a todos los átomos de 1,00 g de sodio gaseoso? (EI₁ = 496 kJ/mol; M = 22,99 g/mol)", "E (kJ) =", 21.57,
    ["Primero los moles de átomos."], ["n = 1,00 / 22,99 = 0,0435 mol.", "E = 0,0435 · 496 = 21,6 kJ."], "≈ 21,6 kJ");
  nu("b10", 2, "¿Cuántos electrones desapareados tiene el ion Fe³⁺ (Z = 26)?", "Desapareados =", 5,
    ["Primero los electrones que salen: los de mayor n."], ["Fe: [Ar] 4s² 3d⁶. Fe³⁺ pierde los 4s² y un 3d: [Ar] 3d⁵.", "Cinco electrones d en cinco orbitales (Hund): los cinco desapareados."], "5");
  ge("b11", 2, "Calcula la diferencia de electronegatividad en los enlaces Na–Cl y H–Cl (χ: Na 0,93; H 2,20; Cl 3,16).",
    [{ tipo: "num", etiqueta: "Δχ (Na–Cl) =", valor: 2.23 }, { tipo: "num", etiqueta: "Δχ (H–Cl) =", valor: 0.96 }],
    ["Resta el menor del mayor."], ["Na–Cl: 3,16 − 0,93 = 2,23 → fuerte carácter iónico.", "H–Cl: 3,16 − 2,20 = 0,96 → covalente polar."], "2,23 y 0,96");
  op("b12", 2, "Ordena por primera energía de ionización creciente: Na, Mg, Al, Si.", "Orden creciente", ["Na &lt; Al &lt; Mg &lt; Si", "Na &lt; Mg &lt; Al &lt; Si", "Si &lt; Al &lt; Mg &lt; Na", "Na &lt; Al &lt; Si &lt; Mg"], 0,
    ["Hay una anomalía entre el Mg y el Al."], ["Datos: Na 496; Mg 738; Al 578; Si 787 kJ/mol.", "La tendencia general es creciente, pero Al &lt; Mg (el electrón es 3p, más alto)."], "Na &lt; Al &lt; Mg &lt; Si");
  op("b13", 2, "Ordena de mayor a menor radio: S²⁻, Cl⁻, K⁺, Ca²⁺.", "Orden", ["S²⁻ &gt; Cl⁻ &gt; K⁺ &gt; Ca²⁺", "Ca²⁺ &gt; K⁺ &gt; Cl⁻ &gt; S²⁻", "K⁺ &gt; Ca²⁺ &gt; S²⁻ &gt; Cl⁻", "Cl⁻ &gt; S²⁻ &gt; Ca²⁺ &gt; K⁺"], 0,
    ["Cuenta los electrones: ¿qué tienen en común?"], ["Los cuatro tienen 18 electrones.", "A mayor Z (16, 17, 19, 20), menor radio: 184 &gt; 181 &gt; 138 &gt; 100 pm."], "S²⁻ &gt; Cl⁻ &gt; K⁺ &gt; Ca²⁺");
  ge("b14", 2, "Un átomo tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹. Indica su periodo y su grupo.",
    { tipo: "lista", etiqueta: "Periodo y grupo =", valores: [4, 1] },
    ["Es un alcalino."], ["Mayor n = 4 → periodo 4.", "Un electrón de valencia en un s → grupo 1 (potasio)."], "Periodo 4, grupo 1");
  nu("b15", 2, "Calcula la energía (kJ) necesaria para convertir 0,50 mol de átomos de sodio gaseoso en iones Na²⁺ (EI₁ = 496 kJ/mol; EI₂ = 4562 kJ/mol).", "E (kJ) =", 2529,
    ["Suma las dos ionizaciones."], ["Por mol: 496 + 4562 = 5058 kJ.", "Con 0,50 mol: 0,50 · 5058 = 2529 kJ."], "2529 kJ");
  ge("b16", 2, "Escribe la configuración electrónica del cobre (Z = 29) teniendo en cuenta su excepción.",
    { tipo: "texto", etiqueta: "Configuración =", valores: ["[Ar] 3d10 4s1", "[Ar] 4s1 3d10", "1s2 2s2 2p6 3s2 3p6 4s1 3d10", "1s2 2s2 2p6 3s2 3p6 3d10 4s1"], formula: true },
    ["El subnivel d lleno es más estable que 3d⁹ 4s²."], ["Lo esperado sería [Ar] 4s² 3d⁹.", "Pasa un electrón del 4s al 3d: [Ar] 4s¹ 3d¹⁰ (subnivel d completo)."], "[Ar] 4s¹ 3d¹⁰");

  // ---------------- ★★★ ----------------
  ge("c1", 3, "Considera Na, Mg y Al. (a) Escribe la configuración del Mg. (b) Ordénalos por radio atómico creciente. (c) Justifica por qué la EI₁ del Al (578 kJ/mol) es menor que la del Mg (738 kJ/mol).",
    { tipo: "rubrica", etiqueta: "Tus respuestas", filas: 6, items: [
      { t: "(a) Mg: 1s² 2s² 2p⁶ 3s²", p: 0.2 },
      { t: "(b) Orden de radios: Al &lt; Mg &lt; Na (el radio baja al aumentar Z* en el periodo)", p: 0.3 },
      { t: "(c) El Al pierde un electrón 3p (Mg: un 3s); el 3p es de mayor energía", p: 0.2 },
      { t: "(c) Está más apantallado por los 3s² y las capas internas, y eso compensa su protón extra", p: 0.15 },
      { t: "(c) Concluye EI(Al) &lt; EI(Mg), excepción a la tendencia", p: 0.15 }] },
    ["(c) Piensa en qué subnivel pierde cada uno el electrón."],
    ["(a) Mg: 1s² 2s² 2p⁶ 3s².", "(b) Mismo periodo: el radio disminuye con Z*: Al (121) &lt; Mg (141) &lt; Na (166 pm).", "(c) Al pierde un 3p (más alto y más apantallado que un 3s): EI(Al) &lt; EI(Mg), pese a que el Al tiene un protón más."], "Mg 1s² 2s² 2p⁶ 3s²; Al &lt; Mg &lt; Na; el 3p es más alto y apantallado");
  ge("c2", 3, "Dados los iones Na⁺, Mg²⁺ y F⁻: (a) ¿qué tienen en común? (b) Ordénalos por radio creciente. (c) Justifica el orden.",
    { tipo: "rubrica", etiqueta: "Tus respuestas", filas: 6, items: [
      { t: "(a) Los tres tienen 10 electrones (1s² 2s² 2p⁶): son isoelectrónicos", p: 0.25 },
      { t: "(b) Orden: r(Mg²⁺) &lt; r(Na⁺) &lt; r(F⁻)", p: 0.25 },
      { t: "(c) Misma configuración y capa: solo cambia el número de protones (12, 11, 9)", p: 0.25 },
      { t: "(c) A mayor carga nuclear (Z*), mayor atracción sobre los mismos electrones y menor radio", p: 0.25 }] },
    ["Mira cuántos electrones tiene cada uno."],
    ["(a) Na: 11 − 1 = 10; Mg: 12 − 2 = 10; F: 9 + 1 = 10 electrones.", "(b) Con igual configuración, a mayor Z menor radio: Mg²⁺ (Z = 12) &lt; Na⁺ (11) &lt; F⁻ (9).", "(c) Los radios son 72, 102 y 133 pm."], "Mg²⁺ &lt; Na⁺ &lt; F⁻");
  ge("c3", 3, "Un elemento del tercer periodo tiene las EI sucesivas (kJ/mol): 578; 1817; 2745; 11 577. (a) ¿En qué grupo está? (b) ¿De qué elemento se trata? (c) Explica el salto entre EI₃ y EI₄.",
    { tipo: "rubrica", etiqueta: "Tus respuestas", filas: 6, items: [
      { t: "(a) Salto entre EI₃ y EI₄: 3 electrones de valencia, grupo 13", p: 0.25 },
      { t: "(b) Es el aluminio (periodo 3, grupo 13; 3s² 3p¹)", p: 0.25 },
      { t: "(c) El cuarto electrón se arranca de la capa n = 2, ya completa", p: 0.25 },
      { t: "(c) Esa capa está más cerca del núcleo y poco apantallada (Z* mucho mayor), por eso la energía se multiplica por unas 4", p: 0.25 }] },
    ["Busca el salto: ¿entre qué ionizaciones está?"],
    ["(a) Salto entre EI₃ y EI₄ → 3 electrones de valencia → grupo 13.", "(b) Periodo 3, grupo 13: aluminio (3s² 3p¹).", "(c) El cuarto electrón es de la capa n = 2 completa: más próximo al núcleo y casi sin apantallamiento."], "Grupo 13; Al; capa interna");
  ge("c4", 3, "Explica por qué la primera energía de ionización del nitrógeno (1402 kJ/mol) es mayor que la del oxígeno (1314 kJ/mol), si el oxígeno está a su derecha.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 5, items: [
      { t: "Configuraciones: N 2s² 2p³; O 2s² 2p⁴", p: 0.25 },
      { t: "En el N los tres electrones p están desapareados, uno en cada orbital (Hund): semicapa llena", p: 0.25 },
      { t: "En el O hay un orbital 2p con dos electrones apareados", p: 0.25 },
      { t: "La repulsión entre esos dos electrones facilita arrancar uno de ellos", p: 0.25 }] },
    ["Dibuja los tres orbitales 2p de cada átomo."],
    ["N: 2p³ → ↑ ↑ ↑ (tres orbitales con un electrón).", "O: 2p⁴ → ↑↓ ↑ ↑ (un orbital con dos electrones).", "La repulsión entre los electrones apareados hace que uno se arranque con menos energía: EI(O) &lt; EI(N)."], "Repulsión del par apareado del O");
  ge("c5", 3, "El cloro tiene mayor afinidad electrónica (349 kJ/mol) que el flúor (328 kJ/mol), aunque el flúor es más electronegativo. Explícalo.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 5, items: [
      { t: "Define la afinidad electrónica como energía liberada al captar un electrón", p: 0.25 },
      { t: "El F es muy pequeño: su capa n = 2 es muy compacta", p: 0.25 },
      { t: "El electrón que llega sufre una fuerte repulsión de los 7 electrones de valencia ya presentes", p: 0.25 },
      { t: "En el Cl (n = 3) hay más espacio y menos repulsión: libera más energía", p: 0.25 }] },
    ["Piensa en el tamaño de la nube de electrones."],
    ["La AE es la energía liberada por X(g) + e⁻ → X⁻(g).", "En el F el electrón va a n = 2, junto a otros 7 electrones: repulsión grande.", "El Cl, con n = 3, soporta mejor el nuevo electrón."], "Repulsión en la capa compacta del F");
  ge("c6", 3, "Con las reglas de Slater: (a) Z* del electrón de valencia del Cl (Z = 17: 3s² 3p⁵); (b) Z* del electrón de valencia del Na (Z = 11); (c) ¿cuántas veces mayor es la del Cl que la del Na? Relaciónalo con el radio.",
    [{ tipo: "num", etiqueta: "(a) Z*(Cl) =", valor: 6.1 }, { tipo: "num", etiqueta: "(b) Z*(Na) =", valor: 2.2 }, { tipo: "num", etiqueta: "(c) Z*(Cl)/Z*(Na) =", valor: 2.773 }],
    ["Aplica los tres pesos: 0,35; 0,85; 1,00."],
    ["(a) σ = 6 · 0,35 + 8 · 0,85 + 2 = 10,9 → Z* = 6,1.", "(b) σ = 8 · 0,85 + 2 = 8,8 → Z* = 2,2.", "(c) 6,1 / 2,2 = 2,77: con el mismo n = 3, el Cl se contrae mucho más (102 pm frente a 166 pm del Na)."], "6,1; 2,2; 2,77");
  ge("c7", 3, "El bromo tiene Z = 35. (a) Indica su grupo. (b) Indica su periodo. (c) Escribe el ion estable que forma. (d) Compara el radio del átomo y del ion.",
    [{ tipo: "num", etiqueta: "(a) Grupo =", valor: 17 }, { tipo: "num", etiqueta: "(b) Periodo =", valor: 4 }, { tipo: "texto", etiqueta: "(c) Ion =", valores: ["Br-", "Br1-"], formula: true },
     { tipo: "opcion", etiqueta: "(d) Radio", opciones: ["Br⁻ mayor que Br", "Br mayor que Br⁻", "iguales"], ok: 0 }],
    ["Configuración: [Ar] 4s² 3d¹⁰ 4p⁵."],
    ["(a) 4s² 4p⁵: 7 electrones de valencia → grupo 17.", "(b) Mayor n = 4 → periodo 4.", "(c) Gana un electrón y completa el octeto: Br⁻ (como el Kr).", "(d) Un anión es mayor que su átomo: r(Br) = 120 &lt; r(Br⁻) = 196 pm."], "17; 4; Br⁻; Br⁻ &gt; Br");
  nu("c8", 3, "Se ilumina vapor de potasio (EI₁ = 419 kJ/mol) con luz de 250 nm. Calcula la energía cinética de los electrones arrancados, en unidades de 10⁻²⁰ J. (h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s; N<sub>A</sub> = 6,022·10²³)", "E<sub>c</sub> (·10⁻²⁰ J) =", 9.934,
    ["Balance: E<sub>fotón</sub> = EI (por átomo) + E<sub>c</sub>."], ["E<sub>fotón</sub> = h·c/λ = 7,951·10⁻¹⁹ J.", "EI por átomo = 419·10³ / 6,022·10²³ = 6,958·10⁻¹⁹ J.", "E<sub>c</sub> = 7,951·10⁻¹⁹ − 6,958·10⁻¹⁹ = 9,93·10⁻²⁰ J."], "9,93·10⁻²⁰ J", 0.01);
  ge("c9", 3, "El cesio (χ = 0,79) y el flúor (χ = 3,98) forman CsF. (a) Calcula Δχ. (b) ¿Qué tipo de enlace es de esperar?",
    [{ tipo: "num", etiqueta: "(a) Δχ =", valor: 3.19 }, { tipo: "opcion", etiqueta: "(b) Enlace", opciones: ["Fuertemente iónico", "Covalente polar", "Covalente apolar", "Metálico"], ok: 0 }],
    ["Resta."], ["Δχ = 3,98 − 0,79 = 3,19.", "Una diferencia tan grande (&gt; 2) indica transferencia casi completa del electrón: Cs⁺ F⁻, enlace iónico."], "3,19; iónico");
  ge("c10", 3, "(a) ¿Cuál es el número atómico de un elemento X cuyo ion X²⁺ es isoelectrónico con el argón? (b) ¿Qué elemento Y de tercer periodo forma el ion Y³⁺ isoelectrónico con el neón?",
    [{ tipo: "num", etiqueta: "(a) Z de X =", valor: 20 }, { tipo: "texto", etiqueta: "(b) Símbolo de Y =", valores: ["Al"], formula: true }],
    ["Cuenta electrones."], ["(a) Ar: 18 e⁻. X²⁺: 18 e⁻ → X tiene 20 e⁻: Z = 20 (calcio).", "(b) Ne: 10 e⁻; Y³⁺: 10 e⁻ → Y tiene 13 e⁻: aluminio."], "Z = 20 (Ca); Al");
  op("c11", 3, "Ordena de mayor a menor radio: Fe, Fe²⁺ y Fe³⁺. Justifica con la configuración.", "Orden", ["Fe &gt; Fe²⁺ &gt; Fe³⁺", "Fe³⁺ &gt; Fe²⁺ &gt; Fe", "Fe²⁺ &gt; Fe &gt; Fe³⁺", "son iguales"], 0,
    ["Cuenta los electrones y las capas."], ["Fe: [Ar] 4s² 3d⁶ (n = 4). Fe²⁺: [Ar] 3d⁶ (sin 4s: capa más externa n = 3). Fe³⁺: [Ar] 3d⁵.", "Pierde la capa n = 4 al formar Fe²⁺, y al pasar a Fe³⁺ hay menos repulsión entre los electrones d con el mismo núcleo.", "Fe &gt; Fe²⁺ &gt; Fe³⁺ (radios iónicos de 78 pm y 64,5 pm para Fe²⁺ alto espín y Fe³⁺ alto espín)."], "Fe &gt; Fe²⁺ &gt; Fe³⁺");
  ge("c12", 3, "¿Verdadero o falso? «La energía de ionización del berilio es menor que la del boro porque el boro tiene más electrones.» Corrige el argumento si es necesario.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 5, items: [
      { t: "Dice que la afirmación es falsa: EI(Be) = 900 &gt; EI(B) = 801 kJ/mol", p: 0.25 },
      { t: "Configuraciones: Be 2s²; B 2s² 2p¹", p: 0.25 },
      { t: "El electrón que pierde el B es un 2p, de mayor energía y más apantallado por los 2s²", p: 0.25 },
      { t: "No es el número de electrones lo que importa, sino el subnivel del electrón arrancado", p: 0.25 }] },
    ["Compara los datos: ¿quién tiene la mayor EI?"], ["Be (900) &gt; B (801 kJ/mol): la afirmación es falsa.", "La causa no es el número de electrones: es el subnivel del electrón arrancado (2p frente a 2s)."], "Falsa");
  nu("c13", 3, "Según Mulliken, la electronegatividad es proporcional a (EI + AE)/2. Calcula ese promedio para el cloro (EI₁ = 1251 kJ/mol; AE = 349 kJ/mol) en kJ/mol.", "(EI + AE)/2 =", 800,
    ["Suma y divide entre 2."], ["(1251 + 349) / 2 = 800 kJ/mol.", "Para el Na (496 + 53)/2 = 274,5: mucho menor, coherente con χ(Cl) &gt; χ(Na)."], "800 kJ/mol");
  op("c14", 3, "Ordena por carácter metálico decreciente (de mayor a menor): Na, Al, Si, Cl.", "Orden", ["Na &gt; Al &gt; Si &gt; Cl", "Cl &gt; Si &gt; Al &gt; Na", "Al &gt; Na &gt; Si &gt; Cl", "Na &gt; Si &gt; Al &gt; Cl"], 0,
    ["Mismo periodo: el carácter metálico disminuye hacia la derecha."], ["Periodo 3 en orden Na, Al, Si, Cl: de izquierda a derecha.", "El carácter metálico (perder electrones) disminuye: EI y χ crecen."], "Na &gt; Al &gt; Si &gt; Cl");
  ge("c15", 3, "(a) Calcula la energía (kJ) necesaria para convertir 1,00 mol de Al(g) en Al³⁺(g), con EI₁ = 578; EI₂ = 1817; EI₃ = 2745 kJ/mol. (b) ¿Por qué no se forma Al⁴⁺ en los compuestos habituales (EI₄ = 11 577 kJ/mol)?",
    [{ tipo: "num", etiqueta: "(a) E (kJ) =", valor: 5140 }, { tipo: "opcion", etiqueta: "(b) Porque…", opciones: ["la 4.ª ionización sale de una capa interna y cuesta una energía enorme", "el Al no tiene más electrones", "la 4.ª EI es menor que la 3.ª", "el Al³⁺ es un gas noble"], ok: 0 }],
    ["Suma las tres primeras."], ["(a) 578 + 1817 + 2745 = 5140 kJ/mol.", "(b) El cuarto electrón es de la capa n = 2 (ya completa): 11 577 kJ/mol, mucho más de lo que puede compensar la energía de red de cualquier compuesto."], "5140 kJ; capa interna");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Tendencias periódicas, con su causa",
      tabla: { cab: ["Propiedad", "En un periodo (→)", "En un grupo (↓)", "Causa"], filas: [
        ["Radio atómico", "disminuye", "aumenta", "Z* sube; n sube"],
        ["Energía de ionización", "aumenta", "disminuye", "Z* y distancia"],
        ["Afinidad electrónica", "aumenta (más liberada)", "disminuye", "Z* y distancia"],
        ["Electronegatividad", "aumenta", "disminuye", "Z* y distancia"],
        ["Carácter metálico", "disminuye", "aumenta", "inverso de EI"]
      ] },
      nota: "Irregularidades: B &lt; Be, Al &lt; Mg (electrón p); O &lt; N, S &lt; P (par apareado); AE: Cl &gt; F; Be, N, Mg, gases nobles ≈ 0." },
    { titulo: "Z* y reglas de Slater",
      items: [
        { label: "Carga nuclear efectiva", formula: "Z* = Z − σ", cuando: "Carga que siente un electrón de valencia.", ojo: "σ no incluye al propio electrón." },
        { label: "σ para un electrón ns, np", formula: "0,35 · (misma capa) + 0,85 · (n−1) + 1,00 · (resto)", cuando: "En n = 1: 0,30.", ejemplo: "Cl: 6·0,35 + 8·0,85 + 2 = 10,9 → Z* = 6,1." },
        { label: "σ para un electrón nd, nf", formula: "0,35 · (mismo grupo) + 1,00 · (grupos a la izquierda)", cuando: "Electrones d y f.", ejemplo: "Fe³⁺ (3d): 4·0,35 + 18 = 19,4 → Z* = 6,6." }
      ],
      nota: "Es un modelo cualitativo: sirve para comparar, no para dar valores exactos." },
    { titulo: "Cómo justificar una ordenación", ancha: true,
      pasos: ["<b>Configuraciones</b> y posición (periodo y grupo).", "<b>¿Qué cambia?</b> Capas (n), carga nuclear (Z o Z*), número de electrones.", "<b>¿Isoelectrónicas?</b> Decide Z: más protones, menos radio.", "<b>Efecto</b> sobre la propiedad: «más Z* → más atracción → …».", "<b>Anomalías</b> si las hay (Be/B, N/O).", "<b>Orden final</b> con &gt; o &lt;."],
      nota: "Palabras que suman: capa, carga nuclear efectiva, apantallamiento, distancia, subnivel, semicapa." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "Fe²⁺ = [Ar] 4s² 3d⁴", bien: "Fe²⁺ = [Ar] 3d⁶", por: "Salen primero los electrones de mayor n (4s)." },
        { mal: "EI(O) &gt; EI(N) «por la tendencia»", bien: "EI(N) &gt; EI(O)", por: "El N tiene semicapa llena; el O, un par apareado." },
        { mal: "El F tiene la mayor afinidad electrónica", bien: "Es el Cl (349 &gt; 328 kJ/mol)", por: "Repulsión en la capa n = 2 del F." },
        { mal: "Radios isoelectrónicos: «más a la derecha, más pequeño»", bien: "Decide el número de protones", por: "Misma configuración: más Z, menos radio." },
        { mal: "λ = h·c / 496 con EI en kJ/mol", bien: "Pasar a J por átomo: 496·10³ / N<sub>A</sub>", por: "E = h·c/λ es para un fotón." },
        { mal: "Un anión es menor que su átomo", bien: "Un anión es mayor", por: "Más electrones, misma carga nuclear." }
      ] }
  ];

  B.registrar("quimica2", "t3", { resumen: resumen, secciones: B.parte.q2t3a.secciones, nuevas: B.parte.q2t3b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
