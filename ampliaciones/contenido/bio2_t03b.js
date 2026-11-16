/* ============================================================
   Biología II · ampliaciones · Tema 3 (parte B): Lípidos
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t3.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Los <b>lípidos</b> son un grupo heterogéneo, <b>insoluble en agua</b> y soluble en disolventes orgánicos; se dividen en <b>saponificables</b> (con ácidos grasos y enlace éster) e <b>insaponificables</b> (esteroides, terpenos).",
    "Un <b>triacilglicérido</b> = glicerina + 3 ácidos grasos (3 enlaces éster, 3 H₂O). Los saturados (cadena recta) dan grasas sólidas; los insaturados cis (cadena doblada), aceites líquidos. Es la mejor reserva: ≈ 9 kcal/g.",
    "El <b>fosfolípido</b> es <b>anfipático</b> (cabeza polar, dos colas apolares) y forma <b>bicapas</b>: la base de las membranas, cuya fluidez regulan los ácidos insaturados y el colesterol.",
    "La <b>saponificación</b> (grasa + NaOH → glicerina + jabón) y la acción del jabón (micelas, emulsión) se explican por la naturaleza anfipática; el <b>colesterol</b> es un esteroide, precursor de hormonas, vitamina D y sales biliares."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Lípidos",
    autores: [
      { n: "Qué estudia", f: "las biomoléculas insolubles en agua", l: "grasas · fosfolípidos · esteroides" },
      { n: "Chevreul", f: "1823", l: "identifica los ácidos grasos y la saponificación" },
      { n: "Gorter y Grendel", f: "1925", l: "los lípidos de la membrana forman una bicapa" },
      { n: "Singer y Nicolson", f: "1972", l: "modelo del mosaico fluido" }
    ],
    obras: ["Ácido graso", "Triacilglicérido", "Fosfolípido", "Colesterol", "Saponificación"],
    bloques: [
      { t: "Qué son", frases: ["Grupo heterogéneo: <b>insolubles en agua</b>, solubles en éter o cloroformo.", "<b>Saponificables</b> tienen ácidos grasos; <b>insaponificables</b> no."],
        tabla: { cab: ["Saponificables", "Insaponificables"], filas: [["grasas, ceras", "colesterol"], ["fosfolípidos", "carotenos, vitaminas A, E, K"]] } },
      { t: "Ácidos grasos", frases: ["Cadena con grupo <b>–COOH</b> y número par de carbonos.", "Los dobles enlaces cis doblan la cadena."],
        tabla: { cab: ["Saturado", "Insaturado"], filas: [["sin C=C", "uno o más C=C"], ["cadena recta", "cadena doblada"], ["sólido (manteca)", "líquido (aceite)"]] } },
      { t: "Triacilglicéridos", frases: ["Glicerina + <b>3 ácidos grasos</b> con enlaces éster (se liberan 3 H₂O).", "Reserva: ≈ 9 kcal/g, el doble que los glúcidos.", "Aíslan y protegen."] },
      { t: "Fosfolípidos y membrana", frases: ["<b>Anfipáticos</b>: cabeza polar y dos colas apolares.", "En agua forman bicapa, micela o liposoma.", "El colesterol regula la fluidez."],
        tabla: { cab: ["Micela", "Bicapa"], filas: [["una cola (jabón)", "dos colas (fosfolípido)"], ["esfera", "membrana"]] } },
      { t: "Esteroides y otros", frases: ["Esteroides: <b>4 anillos</b>. El colesterol da hormonas, vitamina D y sales biliares.", "Ceras: impermeabilizan. Terpenos: pigmentos y vitaminas."] },
      { t: "Saponificación y cálculos", frases: ["Grasa + 3 NaOH → glicerina + 3 jabón.", "El jabón forma micelas y emulsiona la grasa.", "Se cuentan moles: 1 mol de grasa gasta 3 de NaOH."] }
    ],
    resumen: [
      "Todo se explica por la <b>polaridad</b>: lo apolar rechaza el agua, lo <b>anfipático</b> forma micelas y bicapas.",
      "Grasa = <b>reserva y aislante</b>; fosfolípido y colesterol = <b>membrana</b>; esteroides y eicosanoides = <b>señales</b>.",
      "Insaturado cis → cadena doblada → <b>más fluido y menor punto de fusión</b>."
    ],
    conecta: [
      { con: "Biología T1:", rel: "agua, polaridad e hidrofobia; ósmosis y membranas." },
      { con: "Biología T2:", rel: "glúcidos como otra fuente de energía (reserva rápida)." },
      { con: "Biología T6:", rel: "membrana plasmática, transporte y mosaico fluido." },
      { con: "Biología T8:", rel: "oxidación de ácidos grasos en el catabolismo." },
      { con: "Química II T9:", rel: "ésteres y grupos funcionales del carbono." },
      { con: "Química II T1:", rel: "moles y estequiometría de la saponificación." }
    ],
    claves: [
      ["Lípido", "biomolécula insoluble en agua y soluble en disolventes orgánicos"],
      ["Ácido graso", "cadena larga de carbonos con un grupo carboxilo (–COOH)"],
      ["Enlace éster", "unión de un ácido y un alcohol con pérdida de una molécula de agua"],
      ["Triacilglicérido", "glicerina esterificada con tres ácidos grasos; grasa o aceite"],
      ["Anfipático", "con una parte polar (hidrofílica) y otra apolar (hidrofóbica)"],
      ["Fosfolípido", "glicerina, dos ácidos grasos, fosfato y alcohol polar; forma membranas"],
      ["Saponificación", "hidrólisis alcalina de un éster: glicerina y sal de ácido graso (jabón)"],
      ["Micela", "esfera de moléculas anfipáticas con las colas dentro y las cabezas fuera"],
      ["Esteroide", "lípido con cuatro anillos fusionados; ej. colesterol"],
      ["Ácido graso esencial", "el que no sintetizamos y hay que tomar: linoleico (ω-6) y linolénico (ω-3)"]
    ],
    cita: { txt: "1 g de grasa da ≈ 9 kcal; 1 g de glúcidos, ≈ 4 kcal. Por eso la grasa es la reserva.", autor: "Dato para recordar", obra: "las aves migratorias cruzan continentes alimentadas con grasa" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    familias: {
      titulo: "Saponificable o insaponificable",
      consigna: "Clasifica cada lípido según tenga o no ácidos grasos.",
      categorias: ["Saponificable", "Insaponificable"],
      items: [
        { t: "Triacilglicérido", c: 0 }, { t: "Fosfolípido", c: 0 }, { t: "Cera de abeja", c: 0 }, { t: "Esfingomielina", c: 0 },
        { t: "Colesterol", c: 1 }, { t: "Testosterona", c: 1 }, { t: "β-caroteno", c: 1 }, { t: "Vitamina D", c: 1 }
      ]
    },
    ordentg: {
      titulo: "Formación de un triacilglicérido",
      consigna: "Ordena los pasos de la esterificación.",
      items: [
        { t: "La glicerina tiene tres grupos –OH libres" },
        { t: "Un ácido graso aporta su grupo –COOH" },
        { t: "Se forma un enlace éster y sale una molécula de agua" },
        { t: "Se repite con el segundo y el tercer ácido graso" },
        { t: "Resultado: un triacilglicérido y 3 H₂O" }
      ]
    },
    reacciones: {
      titulo: "Reacciones de los lípidos",
      consigna: "Une cada reacción con lo que ocurre.",
      pares: [
        ["Esterificación", "ácido graso + alcohol → éster + agua"],
        ["Saponificación", "grasa + NaOH → glicerina + jabón"],
        ["Hidrólisis enzimática", "una lipasa rompe la grasa en glicerina y ácidos grasos"],
        ["Hidrogenación", "se añade H₂ a los dobles enlaces C=C"],
        ["Enranciamiento", "el oxígeno oxida los dobles enlaces y huele a rancio"]
      ]
    },
    quiz1: {
      titulo: "Test del tema 3",
      preguntas: [
        { q: "La característica común a todos los lípidos es que…", op: ["son insolubles en agua y solubles en disolventes orgánicos", "tienen siempre ácidos grasos", "son polímeros de glicerina", "se disuelven bien en agua"], ok: 0, porque: "No comparten estructura, solo su carácter hidrofóbico." },
        { q: "Un triacilglicérido se forma al unir…", op: ["glicerina y tres ácidos grasos por enlaces éster", "glicerina y tres aminoácidos", "tres glicerinas y un ácido graso", "glicerina, dos ácidos grasos y un fosfato"], ok: 0, porque: "Tres esterificaciones liberan tres moléculas de agua." },
        { q: "Un ácido graso insaturado cis tiene…", op: ["la cadena doblada y un punto de fusión bajo", "la cadena recta y un punto de fusión alto", "grupo fosfato", "cuatro anillos"], ok: 0, porque: "El codo impide el empaquetamiento y baja el punto de fusión." },
        { q: "¿Qué lípido forma la bicapa de las membranas?", op: ["el fosfolípido", "el triacilglicérido", "la cera", "el caroteno"], ok: 0, porque: "Es anfipático: cabeza polar y dos colas apolares." },
        { q: "El jabón limpia porque…", op: ["es anfipático y forma micelas que atrapan la grasa", "disuelve la grasa como lo hace el agua", "es apolar", "rompe los enlaces C–C de la grasa"], ok: 0, porque: "Las colas rodean la grasa y las cabezas miran al agua: emulsión." },
        { q: "El colesterol es…", op: ["un esteroide insaponificable", "un triacilglicérido", "un fosfolípido", "una cera"], ok: 0, porque: "Tiene cuatro anillos fusionados y ningún ácido graso." },
        { q: "¿Por qué la grasa es mejor reserva que el glucógeno?", op: ["da más del doble de energía por gramo y no retiene agua", "se moviliza más rápido", "es soluble en la sangre", "contiene más oxígeno"], ok: 0, porque: "≈ 9 kcal/g y almacenamiento anhidro." },
        { q: "La saponificación de una grasa con NaOH produce…", op: ["glicerina y jabón", "glicerina y agua", "ácido graso y etanol", "colesterol"], ok: 0, porque: "Hidrólisis alcalina del éster: sal de ácido graso (jabón) y glicerina." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre los lípidos es FALSA?", op: ["Todos los lípidos contienen ácidos grasos", "Son insolubles en agua", "El colesterol es un lípido", "Hay lípidos saponificables e insaponificables"], ok: 0, porque: "Los esteroides y terpenos no tienen ácidos grasos: son insaponificables." },
        { q: "¿Cuál de estas afirmaciones sobre los ácidos grasos es FALSA?", op: ["Los insaturados tienen la cadena recta y funden a mayor temperatura", "Los saturados no tienen dobles enlaces", "Tienen un grupo carboxilo", "El linoleico es esencial"], ok: 0, porque: "Los insaturados cis tienen la cadena doblada y funden a menor temperatura." },
        { q: "¿Cuál de estas afirmaciones sobre los triacilglicéridos es FALSA?", op: ["Se forman por enlaces glucosídicos entre glicerina y ácidos grasos", "Se unen tres ácidos grasos a una glicerina", "Son reserva de energía", "Se liberan tres moléculas de agua al formarlos"], ok: 0, porque: "El enlace es éster, no glucosídico (ese es el de los glúcidos)." },
        { q: "¿Cuál de estas afirmaciones sobre los fosfolípidos es FALSA?", op: ["Son completamente apolares", "Tienen una cabeza polar", "Forman bicapas en agua", "Tienen dos ácidos grasos"], ok: 0, porque: "Son anfipáticos: cabeza polar y colas apolares." },
        { q: "¿Cuál de estas afirmaciones sobre el colesterol es FALSA?", op: ["Se saponifica porque contiene ácidos grasos", "Es un esteroide", "Precursor de hormonas sexuales", "Regula la fluidez de la membrana animal"], ok: 0, porque: "El colesterol libre no tiene ácidos grasos: es insaponificable." },
        { q: "¿Cuál de estas afirmaciones sobre la saponificación es FALSA?", op: ["Es una hidrólisis ácida que produce agua y grasa", "Usa NaOH o KOH", "Produce glicerina y jabón", "Con KOH se obtienen jabones blandos"], ok: 0, porque: "Es una hidrólisis alcalina: se rompe el éster y se obtiene jabón." },
        { q: "¿Cuál de estas afirmaciones sobre la membrana es FALSA?", op: ["El flip-flop de los fosfolípidos es rapidísimo y espontáneo", "Los fosfolípidos se mueven lateralmente con rapidez", "Más ácidos insaturados aumentan la fluidez", "El colesterol modula la fluidez"], ok: 0, porque: "El flip-flop es raro y necesita flipasas: la cabeza polar tendría que atravesar la zona apolar." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: lípidos",
      cartas: [
        { a: "Lípido", b: "Biomolécula heterogénea, insoluble en agua y soluble en disolventes orgánicos." },
        { a: "Saponificables / insaponificables", b: "Con ácidos grasos (grasas, ceras, fosfolípidos) / sin ellos (esteroides, terpenos)." },
        { a: "Ácido graso", b: "CH₃–(CH₂)ₙ–COOH; número par de C. Saturado (sin C=C) o insaturado." },
        { a: "Notación C18:1 Δ9", b: "18 carbonos, un doble enlace que empieza en el C9." },
        { a: "Ácidos grasos esenciales", b: "Linoleico (ω-6) y α-linolénico (ω-3): hay que tomarlos en la dieta." },
        { a: "Enlace éster", b: "Ácido + alcohol → éster + H₂O. Une la glicerina y los ácidos grasos." },
        { a: "Triacilglicérido", b: "Glicerina + 3 ácidos grasos. Grasa (sólida) o aceite (líquido). Reserva ≈ 9 kcal/g." },
        { a: "Fosfolípido", b: "Glicerina + 2 ácidos grasos + fosfato + alcohol polar. Anfipático; forma la bicapa." },
        { a: "Anfipático", b: "Con una parte hidrofílica y otra hidrofóbica." },
        { a: "Micela, bicapa y liposoma", b: "Una cola / dos colas / bicapa cerrada con agua dentro." },
        { a: "Cera", b: "Éster de ácido graso y alcohol, ambos de cadena larga. Impermeabiliza." },
        { a: "Colesterol", b: "Esteroide (C₂₇H₄₆O). Membranas animales, hormonas, vitamina D y sales biliares." },
        { a: "LDL y HDL", b: "Lipoproteínas: llevan colesterol a los tejidos / lo devuelven al hígado." },
        { a: "Saponificación", b: "Grasa + 3 NaOH → glicerina + 3 jabón. Hidrólisis alcalina." },
        { a: "Hidrogenación", b: "Añade H₂ a los C=C; puede generar grasas trans." },
        { a: "Eicosanoides", b: "Prostaglandinas, tromboxanos: derivan del ácido araquidónico (C20:4)." }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  var N = [];
  function O(id, nv, enun, ops, ok, pasos, res, et) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "opcion", etiqueta: et || "Tu respuesta", opciones: ops, ok: ok }, pasos: pasos, resultado: res || ops[ok] });
  }
  function M(id, nv, enun, campos, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: campos, pasos: pasos, resultado: res });
  }
  function C(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var VF = ["Verdadero", "Falso"];
  function V(id, nv, enun, ver, justif, ok, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun,
      check: [C("¿Verdadero o falso?", VF, ver ? 0 : 1), C("Justificación", justif, ok)], pasos: pasos, resultado: res || ((ver ? "Verdadero: " : "Falso: ") + justif[ok]) });
  }
  function T(id, nv, enun, et, valores, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "texto", etiqueta: et, valores: valores }, pasos: pasos, resultado: res });
  }
  function X(id, nv, enun, et, valor, unidad, pasos, res, tol) {
    var c = { tipo: "num", etiqueta: et, valor: valor, unidad: unidad };
    if (tol) c.tol = tol;
    N.push({ id: id, nivel: nv, enunciado: enun, check: c, pasos: pasos, resultado: res });
  }
  function R(id, enun, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 8, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("b1", 1, "¿Qué propiedad comparten todos los lípidos?", ["Son insolubles en agua y solubles en disolventes orgánicos", "Todos tienen ácidos grasos", "Todos están formados por glicerina", "Todos son polares"], 0, ["Su estructura es muy variada; lo común es el carácter hidrofóbico."], "Insolubles en agua, solubles en disolventes orgánicos");
  O("b2", 1, "¿Cuál de estos lípidos es saponificable?", ["Un triacilglicérido", "El colesterol", "La testosterona", "El β-caroteno"], 0, ["Saponificable = tiene ácidos grasos unidos por enlace éster.", "Los otros tres son esteroides o terpenos."], "Un triacilglicérido");
  O("b3", 1, "Un ácido graso insaturado se caracteriza por tener…", ["uno o más dobles enlaces C=C", "solo enlaces sencillos", "un grupo fosfato", "cuatro anillos"], 0, ["Insaturado = le «faltan» hidrógenos: hay C=C."], "Uno o más dobles enlaces C=C");
  V("b4", 1, "Un triacilglicérido tiene una glicerina unida a tres ácidos grasos mediante enlaces éster.", true, ["Es una esterificación triple: glicerina (3 –OH) + 3 –COOH", "Se unen por enlaces glucosídicos", "Se unen por enlaces peptídicos", "Los ácidos grasos se unen entre sí, sin glicerina"], 0, ["Cada –OH de la glicerina forma un éster con un –COOH."]);
  O("b5", 1, "¿Cuántas moléculas de agua se liberan al formarse un triacilglicérido?", ["3", "1", "2", "4"], 0, ["Hay un enlace éster por ácido graso: tres.", "Cada esterificación libera 1 H₂O."], "3");
  O("b6", 1, "La función principal de los triacilglicéridos es…", ["reserva de energía", "formar la bicapa de la membrana", "transportar oxígeno", "almacenar información genética"], 0, ["≈ 9 kcal/g, almacenamiento sin agua."], "Reserva de energía");
  V("b7", 1, "Las grasas de origen animal suelen ser sólidas a temperatura ambiente porque contienen sobre todo ácidos grasos saturados.", true, ["Su cadena recta se empaqueta bien y funde a temperatura alta", "Tienen muchos dobles enlaces", "Son moléculas muy polares", "Contienen colesterol en lugar de ácidos grasos"], 0, ["Saturados → cadenas rectas → mucha atracción entre ellas."]);
  T("b8", 1, "El enlace entre la glicerina y un ácido graso se llama enlace…", "Enlace", ["éster", "ester"], ["Se forma entre un –OH y un –COOH liberando agua."], "Éster");
  O("b9", 1, "¿Cuál de estas moléculas es anfipática?", ["El fosfolípido", "El triacilglicérido", "El β-caroteno", "La cera"], 0, ["Anfipática = parte polar y parte apolar.", "El fosfolípido tiene cabeza polar y dos colas apolares."], "El fosfolípido");
  O("b10", 1, "La estructura básica de las membranas celulares es…", ["una bicapa de fosfolípidos", "una capa de triacilglicéridos", "una malla de ceras", "una monocapa de colesterol"], 0, ["Las colas quedan dentro, protegidas del agua."], "Bicapa de fosfolípidos");
  O("b11", 1, "El colesterol es un…", ["esteroide", "triacilglicérido", "fosfolípido", "ácido graso"], 0, ["Tiene cuatro anillos fusionados."], "Esteroide");
  T("b12", 1, "La hidrólisis alcalina de una grasa con NaOH se llama…", "Reacción", ["saponificación", "saponificacion"], ["Produce glicerina y jabón."], "Saponificación");
  M("b13", 1, "Une cada lípido con su función.",
    [C("Triacilglicérido", ["Reserva de energía", "Impermeabiliza hojas y plumas", "Regula la fluidez de la membrana"], 0), C("Cera", ["Impermeabiliza hojas y plumas", "Reserva de energía", "Regula la fluidez de la membrana"], 0), C("Colesterol", ["Regula la fluidez de la membrana", "Reserva de energía", "Impermeabiliza hojas y plumas"], 0)],
    ["Triacilglicérido: energía. Cera: impermeabilización. Colesterol: fluidez y precursor de hormonas."], "Triacilglicérido → energía; cera → impermeabilizar; colesterol → fluidez");
  O("b14", 1, "¿Cuál de estas vitaminas es liposoluble?", ["Vitamina D", "Vitamina C", "Vitamina B₁₂", "Ácido fólico"], 0, ["Las liposolubles son A, D, E y K."], "Vitamina D");
  V("b15", 1, "Los fosfolípidos tienen tres ácidos grasos, igual que los triacilglicéridos.", false, ["Tienen solo dos; el tercer –OH lleva un fosfato y un alcohol", "Tienen cuatro ácidos grasos", "No tienen ácidos grasos", "Tienen tres, pero sin glicerina"], 0, ["En el tercer carbono hay fosfato, no ácido graso: de ahí la cabeza polar."]);
  O("b16", 1, "El aceite de oliva es líquido a temperatura ambiente porque…", ["abunda en ácido oleico, insaturado, de cadena doblada", "tiene solo ácidos saturados", "contiene mucha agua", "es muy polar"], 0, ["El doble enlace cis dobla la cadena y baja el punto de fusión."], "Abunda el ácido oleico (insaturado)");

  // ---- nivel 2
  X("c1", 2, "La trioleína (glicerina con tres ácidos oleicos) es C₅₇H₁₀₄O₆. Calcula su masa molar (C 12,011; H 1,008; O 15,999).", "Mr (g/mol) =", 885.45, "g/mol", ["57 · 12,011 = 684,627.", "104 · 1,008 = 104,832.", "6 · 15,999 = 95,994.", "Suma = 885,453 g/mol."], "885,45 g/mol");
  X("c2", 2, "¿Cuántos gramos de NaOH (M = 40,00 g/mol) hacen falta para saponificar 100 g de trioleína (Mr = 885,45)?", "m(NaOH) (g) =", 13.55, "g", ["n(grasa) = 100 / 885,45 = 0,1129 mol.", "Reacción 1 : 3 → n(NaOH) = 0,3388 mol.", "m = 0,3388 · 40,00 = 13,55 g."], "13,55 g", 0.01);
  X("c3", 2, "En esa saponificación, ¿cuántos gramos de jabón (oleato sódico, M = 304,45 g/mol) se obtienen a partir de 100 g de trioleína?", "m(jabón) (g) =", 103.15, "g", ["n(jabón) = 3 · 0,1129 = 0,3388 mol.", "m = 0,3388 · 304,45 = 103,15 g."], "103,15 g", 0.01);
  X("c4", 2, "¿Cuántos gramos de glicerina (M = 92,09 g/mol) se obtienen en esa misma saponificación (100 g de trioleína)?", "m(glicerina) (g) =", 10.4, "g", ["Se forma 1 mol de glicerina por mol de grasa: 0,1129 mol.", "m = 0,1129 · 92,09 = 10,40 g."], "10,40 g", 0.01);
  X("c5", 2, "Una barrita contiene 25 g de grasa. Si cada gramo de grasa aporta 9 kcal, ¿cuántas kcal aportan esos 25 g?", "Energía (kcal) =", 225, "kcal", ["25 g · 9 kcal/g = 225 kcal."], "225 kcal");
  X("c6", 2, "Un triacilglicérido contiene un ácido palmítico (16 C), uno oleico (18 C) y uno esteárico (18 C). ¿Cuántos átomos de carbono tiene en total?", "Nº de C =", 55, "", ["Glicerina: 3 C.", "Ácidos: 16 + 18 + 18 = 52 C.", "Total: 3 + 52 = 55 C."], "55 átomos de carbono");
  X("c7", 2, "El ácido α-linolénico tiene 18 carbonos y 3 dobles enlaces. Con la regla «H = 2·C − 2·(dobles enlaces)», ¿cuántos átomos de hidrógeno tiene?", "Nº de H =", 30, "", ["Saturado de 18 C: 36 H.", "Cada doble enlace quita 2 H: 36 − 6 = 30.", "Fórmula C₁₈H₃₀O₂."], "30 hidrógenos (C₁₈H₃₀O₂)");
  X("c8", 2, "La trilinoleína tiene tres ácidos linoleicos (2 C=C cada uno). ¿Cuántos moles de H₂ se necesitan para hidrogenar por completo 1 mol de ella?", "n(H₂) (mol) =", 6, "mol", ["Dobles enlaces por molécula: 3 · 2 = 6.", "Cada doble enlace consume 1 H₂: 6 mol."], "6 mol de H₂");
  X("c9", 2, "¿Cuántos gramos de H₂ (2,016 g/mol) consumen 100 g de trioleína (885,45 g/mol; 3 C=C por molécula) al hidrogenarse por completo?", "m(H₂) (g) =", 0.683, "g", ["n(grasa) = 0,1129 mol.", "n(H₂) = 3 · 0,1129 = 0,3388 mol.", "m = 0,3388 · 2,016 = 0,683 g."], "0,683 g", 0.01);
  O("c10", 2, "La notación C20:4 Δ5,8,11,14 (ácido araquidónico) indica…", ["20 carbonos y 4 dobles enlaces", "20 dobles enlaces y 4 carbonos", "4 carbonos y 20 hidrógenos", "20 carbonos y 4 grupos carboxilo"], 0, ["El primer número es el de carbonos; el segundo, el de dobles enlaces."], "20 carbonos y 4 dobles enlaces");
  V("c11", 2, "Los aceites vegetales son líquidos a temperatura ambiente porque sus ácidos grasos son sobre todo insaturados cis.", true, ["Los codos cis impiden que las cadenas se empaqueten", "Tienen muchos enlaces peptídicos", "Contienen más agua que las grasas animales", "Sus ácidos grasos son más largos"], 0, ["Menos atracción entre cadenas → punto de fusión bajo."]);
  O("c12", 2, "¿Por qué el jabón arrastra la grasa de un plato?", ["Sus colas apolares se unen a la grasa y sus cabezas polares al agua, formando micelas", "Disuelve la grasa como si fuera agua", "Rompe los enlaces éster de la grasa", "Convierte la grasa en agua"], 0, ["Es anfipático.", "La grasa queda dentro de micelas dispersas en el agua."], "Forma micelas por su carácter anfipático");
  M("c13", 2, "Une cada término con su descripción.",
    [C("Micela", ["Esfera de moléculas anfipáticas de una cola", "Doble lámina de fosfolípidos", "Vesícula de bicapa con agua dentro"], 0), C("Bicapa", ["Doble lámina de fosfolípidos", "Esfera de moléculas anfipáticas de una cola", "Vesícula de bicapa con agua dentro"], 0), C("Liposoma", ["Vesícula de bicapa con agua dentro", "Esfera de moléculas anfipáticas de una cola", "Doble lámina de fosfolípidos"], 0)],
    ["Micela: una cola, colas dentro.", "Bicapa: dos colas, membrana.", "Liposoma: bicapa cerrada."], "Micela; bicapa; liposoma");
  O("c14", 2, "Las grasas trans aparecen sobre todo cuando…", ["un aceite se hidrogena parcialmente", "se saponifica una grasa", "se calienta el agua", "se digiere la fibra"], 0, ["En la hidrogenación parcial algunos C=C pasan de cis a trans: cadena recta, comportamiento de saturado.", "Elevan el LDL."], "En la hidrogenación parcial de aceites");
  O("c15", 2, "Una gota de aceite sobre papel deja una mancha translúcida que no desaparece al secar. ¿Por qué?", ["El aceite no se evapora y es hidrofóbico, a diferencia del agua", "El aceite se evapora igual que el agua", "El aceite reacciona con la celulosa", "El agua se esconde dentro del aceite"], 0, ["El agua se evapora; el aceite, no.", "Es un ensayo rápido para reconocer lípidos."], "El aceite no se evapora");
  M("c16", 2, "Une cada reacción con su resultado.",
    [C("Hidrólisis enzimática (lipasa)", ["Glicerina y ácidos grasos", "Glicerina y jabón", "Grasa saturada"], 0), C("Saponificación", ["Glicerina y jabón", "Glicerina y ácidos grasos", "Grasa saturada"], 0), C("Hidrogenación", ["Grasa más saturada", "Glicerina y jabón", "Glicerina y ácidos grasos"], 0)],
    ["La lipasa hidroliza con agua; la saponificación usa una base; la hidrogenación añade H₂."], "Lipasa → glicerina + ácidos grasos; saponificación → glicerina + jabón; hidrogenación → más saturada");

  // ---- nivel 3
  X("d1", 3, "Un deportista necesita almacenar 2000 kcal. ¿Cuántos gramos menos de grasa (9 kcal/g) que de glúcidos secos (4 kcal/g) hacen falta?", "Diferencia (g) =", 277.8, "g", ["Glúcidos: 2000 / 4 = 500 g.", "Grasa: 2000 / 9 = 222,2 g.", "Diferencia: 500 − 222,2 = 277,8 g (sin contar el agua que acompaña al glucógeno)."], "≈ 278 g menos", 0.01);
  X("d2", 3, "Experimento al estilo de Gorter y Grendel: los lípidos extraídos de unos hematíes forman en el agua una monocapa de 9,0 cm². La superficie total de esos hematíes es de 4,5 cm². ¿Cuál es el cociente (superficie de la monocapa / superficie de las células) y qué sugiere?", "Cociente =", 2, "", ["9,0 / 4,5 = 2.", "Los lípidos cubren el doble de la superficie celular: una sola capa no basta.", "Sugiere que la membrana es una bicapa."], "2; sugiere una bicapa lipídica");
  X("d3", 3, "Calcula el índice de saponificación de la trioleína (Mr = 885,45): mg de KOH (M = 56,106 g/mol) por gramo de grasa.", "Índice (mg KOH/g) =", 190.1, "mg/g", ["1 mol de grasa gasta 3 mol de KOH.", "3 · 56,106 = 168,32 g de KOH por 885,45 g de grasa.", "168,32 / 885,45 = 0,1901 g/g = 190,1 mg/g."], "190,1 mg KOH/g", 0.01);
  X("d4", 3, "Calcula el índice de yodo de la trioleína (Mr = 885,45): gramos de I₂ (253,81 g/mol) que se adicionan a 100 g de grasa, sabiendo que cada C=C añade 1 I₂.", "Índice de yodo (g/100 g) =", 86, "g", ["3 C=C por molécula → 3 mol de I₂ por mol de grasa.", "3 · 253,81 = 761,43 g de I₂ por 885,45 g de grasa.", "761,43 / 885,45 · 100 = 86,0 g por 100 g."], "86,0 g de I₂ por 100 g", 0.01);
  O("d5", 3, "Gráfica de punto de fusión frente a número de dobles enlaces (ácidos de 18 C): 0 → 70 °C; 1 → 13 °C; 2 → −5 °C; 3 → −11 °C. ¿Cuál es sólido a 0 °C pero líquido a 20 °C?", ["El de 1 doble enlace (oleico)", "El de 0 dobles enlaces (esteárico)", "El de 2 dobles enlaces (linoleico)", "El de 3 dobles enlaces (linolénico)"], 0, ["Debe fundir entre 0 y 20 °C: solo el oleico (13 °C).", "El esteárico (70 °C) es sólido a 20 °C; linoleico (−5) y linolénico (−11) son líquidos a 0 °C."], "El oleico (1 doble enlace, 13 °C)");
  O("d6", 3, "Un pez de aguas polares y otro de aguas tropicales tienen membranas con la misma fluidez a sus temperaturas. ¿Qué diferencia esperas en sus fosfolípidos?", ["El polar tiene más ácidos grasos insaturados", "El polar tiene más ácidos grasos saturados", "El polar no tiene colesterol ni fosfolípidos", "No hay ninguna diferencia"], 0, ["El frío tiende a solidificar la bicapa.", "Los ácidos insaturados (cadenas dobladas) la mantienen fluida a baja temperatura."], "El de aguas polares: más ácidos grasos insaturados");
  O("d7", 3, "Dos aceites tienen índices de yodo de 180 y de 80 g de I₂ por 100 g. ¿Qué se puede afirmar?", ["El de 180 es más insaturado y funde a menor temperatura", "El de 80 es más insaturado", "Los dos tienen igual número de dobles enlaces", "El de 180 es una grasa saturada sólida"], 0, ["El índice de yodo mide los dobles enlaces.", "Más C=C: cadenas más dobladas y punto de fusión más bajo."], "El de 180 es más insaturado y funde antes");
  R("d8", "Describe la estructura de un triacilglicérido y explica por qué la grasa es una buena reserva de energía. (Pregunta tipo PAU)", [
    { t: "Estructura: glicerina + tres ácidos grasos", p: 0.4 },
    { t: "Enlaces éster (esterificación, libera 3 H₂O)", p: 0.4 },
    { t: "Distingue grasas (saturadas, sólidas) y aceites (insaturados, líquidos)", p: 0.3 },
    { t: "Reserva: ≈ 9 kcal/g, más del doble que los glúcidos", p: 0.5 },
    { t: "Se almacena sin agua; además aísla y protege", p: 0.4 }], ["Estructura.", "Enlace éster.", "Grasa y aceite.", "Energía por gramo.", "Sin agua; aislamiento."], "Glicerina + 3 AG por ésteres; 9 kcal/g; anhidro");
  R("d9", "¿Qué es una molécula anfipática? Explica cómo se comportan los fosfolípidos en agua y qué relación tiene con la membrana. (Pregunta tipo PAU)", [
    { t: "Definición: parte hidrofílica y parte hidrofóbica", p: 0.4 },
    { t: "Fosfolípido: cabeza polar y dos colas apolares", p: 0.4 },
    { t: "En agua: cabezas hacia el agua, colas ocultas; forma micelas, bicapas o liposomas", p: 0.5 },
    { t: "Formación espontánea de la bicapa de las membranas", p: 0.4 },
    { t: "Fluidez: ácidos insaturados y colesterol; barrera selectiva", p: 0.3 }], ["Definición.", "Fosfolípido.", "En agua.", "Bicapa.", "Fluidez."], "Anfipático → bicapa espontánea → membrana fluida");
  R("d10", "Explica qué es la saponificación y por qué el jabón elimina la grasa. (Pregunta tipo PAU)", [
    { t: "Definición: hidrólisis alcalina de un éster (grasa + NaOH o KOH)", p: 0.5 },
    { t: "Productos: glicerina y sales de ácido graso (jabón)", p: 0.4 },
    { t: "El jabón es anfipático: cabeza polar y cola apolar", p: 0.4 },
    { t: "Forma micelas que atrapan la grasa (emulsión)", p: 0.5 },
    { t: "Solo se saponifican los lípidos con ácidos grasos", p: 0.2 }], ["Definición.", "Productos.", "Anfipático.", "Micelas.", "Saponificables."], "Grasa + NaOH → glicerina + jabón; micelas");
  R("d11", "Colesterol: estructura, funciones y relación con la salud. (Pregunta tipo PAU)", [
    { t: "Esteroide: cuatro anillos fusionados, insaponificable", p: 0.4 },
    { t: "Forma parte de las membranas animales y regula su fluidez", p: 0.4 },
    { t: "Precursor de hormonas esteroideas, vitamina D y sales biliares", p: 0.5 },
    { t: "Transporte en lipoproteínas: LDL (a los tejidos) y HDL (al hígado)", p: 0.4 },
    { t: "El exceso de LDL favorece la aterosclerosis", p: 0.3 }], ["Estructura.", "Membrana.", "Precursor.", "Lipoproteínas.", "Salud."], "Esteroide; membrana; hormonas; LDL/HDL; aterosclerosis");
  R("d12", "Diferencias entre ácidos grasos saturados e insaturados y consecuencias en la grasa y en la salud. (Pregunta tipo PAU)", [
    { t: "Saturados: sin C=C, cadena recta; insaturados: C=C, cadena doblada (cis)", p: 0.5 },
    { t: "Punto de fusión: saturados altos, insaturados bajos (empaquetamiento)", p: 0.4 },
    { t: "Ejemplos: grasas animales y aceites vegetales", p: 0.3 },
    { t: "Hidrogenación parcial y grasas trans (efecto sobre LDL y HDL)", p: 0.5 },
    { t: "Ácidos grasos esenciales: linoleico y linolénico", p: 0.3 }], ["Estructura.", "Punto de fusión.", "Ejemplos.", "Grasas trans.", "Esenciales."], "Saturados rectos y sólidos; insaturados doblados y líquidos");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Saturado frente a insaturado", ancha: true,
      tabla: { cab: ["", "Saturado", "Insaturado"], filas: [
        ["dobles enlaces", "ninguno", "uno o más (cis)"],
        ["cadena", "recta", "doblada"],
        ["a 20 °C", "sólido (grasa)", "líquido (aceite)"],
        ["ejemplo", "palmítico, esteárico", "oleico, linoleico"]
      ] } },
    { titulo: "Cómo se forma un triacilglicérido",
      pasos: ["Glicerina: tres –OH.", "Tres ácidos grasos: tres –COOH.", "Tres ésteres: sale 3 H₂O.", "Resultado: grasa o aceite."],
      nota: "Reserva ≈ 9 kcal/g." },
    { titulo: "Triacilglicérido frente a fosfolípido", ancha: true,
      tabla: { cab: ["", "Triacilglicérido", "Fosfolípido"], filas: [
        ["ácidos grasos", "3", "2"],
        ["tercer –OH", "otro ácido graso", "fosfato + alcohol"],
        ["polaridad", "apolar", "anfipático"],
        ["función", "reserva y aislante", "membranas"]
      ] } },
    { titulo: "Clasificación de los lípidos", ancha: true,
      tabla: { cab: ["Saponificables", "Insaponificables"], filas: [
        ["triacilglicéridos", "colesterol y esteroides"],
        ["ceras", "terpenos (carotenos, A, E, K)"],
        ["fosfolípidos", "eicosanoides*"]
      ] }, nota: "*Derivan de un ácido graso de 20 C pero no se saponifican." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Todos los lípidos tienen ácidos grasos", bien: "Esteroides y terpenos no los tienen", por: "Son insaponificables." },
        { mal: "Los insaturados funden a más temperatura", bien: "Funden a menos", por: "Cadenas dobladas, peor empaquetadas." },
        { mal: "El fosfolípido es apolar", bien: "Es anfipático", por: "Cabeza polar y dos colas apolares." },
        { mal: "El colesterol se saponifica", bien: "No: no tiene ácidos grasos", por: "Es un esteroide." }
      ] }
  ];

  B.registrar("bio2", "t3", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio3a.secciones,
    nuevas: B.parte.bio3a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
