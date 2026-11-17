/* ============================================================
   Biología II · ampliaciones · Tema 15 (parte B): Inmunología
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t15.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El sistema inmunitario tiene tres líneas: <b>barreras</b>, <b>inmunidad innata</b> (inespecífica y rápida: inflamación, fagocitosis, complemento, interferón, NK) e <b>inmunidad adaptativa</b> (específica y con memoria: linfocitos B y T).",
    "<b>Humoral</b> = linfocitos B → células plasmáticas → <b>anticuerpos</b> (proteínas de 4 cadenas con región variable); <b>celular</b> = linfocitos T citotóxicos que destruyen células infectadas. Los T colaboradores dirigen las dos.",
    "La <b>respuesta secundaria</b> es más rápida (latencia de 1–3 días), más intensa y duradera gracias a las <b>células de memoria</b>; las <b>vacunas</b> (inmunidad activa) la aprovechan y los <b>sueros</b> (pasiva) dan anticuerpos hechos.",
    "Alteraciones: <b>alergia</b> (IgE), <b>autoinmunidad</b> (se ataca lo propio) e <b>inmunodeficiencia</b> (el SIDA: el VIH destruye los T colaboradores). En los trasplantes, el MHC (HLA) causa el rechazo; los grupos <b>ABO y Rh</b> condicionan las transfusiones."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Inmunología",
    autores: [
      { n: "Qué estudia", f: "cómo el organismo se defiende de lo extraño", l: "innata · adaptativa · alteraciones" },
      { n: "Jenner", f: "1796", l: "primera vacuna (viruela)" },
      { n: "Metchnikoff", f: "1882", l: "fagocitosis" },
      { n: "Landsteiner", f: "1901", l: "grupos sanguíneos ABO" },
      { n: "Köhler y Milstein", f: "1975", l: "anticuerpos monoclonales" }
    ],
    obras: ["Antígeno", "Anticuerpo", "Linfocitos B y T", "Memoria", "MHC", "Vacuna", "ABO y Rh"],
    bloques: [
      { t: "Dos ramas de defensa", frases: ["Innata: inmediata, <b>inespecífica</b>, sin memoria.", "Adaptativa: <b>específica</b>, lenta la 1.ª vez, con memoria.", "Colaboran entre sí."],
        tabla: { cab: ["Innata", "Adaptativa"], filas: [["barreras, fagocitos", "linfocitos B y T"], ["complemento, interferón", "anticuerpos"], ["inflamación, NK", "células de memoria"]] } },
      { t: "Células y órganos", frases: ["Todo nace en la <b>médula ósea</b>; los T maduran en el <b>timo</b>.", "Ganglios y bazo: donde se encuentran linfocito y antígeno.", "Th (CD4) dirigen; Tc (CD8) matan."],
        tabla: { cab: ["Célula", "Función"], filas: [["linfocito B", "→ célula plasmática (anticuerpos)"], ["linfocito Tc", "mata células infectadas"], ["macrófago", "fagocita y presenta antígenos"]] } },
      { t: "Anticuerpo", frases: ["<b>4 cadenas</b> (2 H + 2 L) unidas por puentes S–S.", "Región <b>variable</b>: se une al antígeno (2 sitios).", "Región constante (Fc): clase y funciones."],
        tabla: { cab: ["Clase", "Dato"], filas: [["IgG", "atraviesa la placenta"], ["IgM", "la 1.ª; pentámero"], ["IgA", "leche y mucosas"], ["IgE", "alergias"]] } },
      { t: "Respuesta inmune", frases: ["Humoral: B + Th → plasmáticas → anticuerpos.", "Celular: Tc + MHC-I → perforina → apoptosis.", "Selección clonal: el antígeno elige al linfocito."],
        tabla: { cab: ["Primaria", "Secundaria"], filas: [["latencia 5–10 días", "1–3 días"], ["pico bajo", "≈ 10 veces más alto"], ["IgM, luego IgG", "sobre todo IgG"]] } },
      { t: "Tipos de inmunidad", frases: ["Activa: la fabrica el organismo; pasiva: anticuerpos hechos.", "Vacuna = antígeno: preventiva y duradera.", "Suero = anticuerpos: inmediato y temporal."],
        tabla: { cab: ["", "Activa / Pasiva"], filas: [["natural", "infección / placenta y leche"], ["artificial", "vacuna / suero"]] } },
      { t: "Alteraciones, trasplantes y sangre", frases: ["Alergia (IgE), autoinmunidad, inmunodeficiencia (SIDA: VIH ataca CD4).", "Rechazo: los T reconocen MHC (HLA) ajeno.", "ABO: antígenos en el hematíe, anticuerpos en el plasma."],
        tabla: { cab: ["Grupo", "Antígeno · anticuerpo"], filas: [["A", "A · anti-B"], ["B", "B · anti-A"], ["AB", "A y B · ninguno"], ["O", "ninguno · anti-A y anti-B"]] } }
    ],
    resumen: [
      "Primero actúan las <b>barreras</b> y la <b>innata</b>; si no bastan, la <b>adaptativa</b> aprende y recuerda.",
      "<b>B → anticuerpos</b> (humoral); <b>T → células infectadas</b> (celular); la <b>memoria</b> explica las vacunas.",
      "Los errores del sistema son la <b>alergia</b>, la <b>autoinmunidad</b> y la <b>inmunodeficiencia</b>; el <b>MHC</b> explica el rechazo."
    ],
    conecta: [
      { con: "Biología T14:", rel: "microorganismos y virus: los patógenos que combate el sistema inmunitario; VIH como retrovirus." },
      { con: "Biología T4:", rel: "los anticuerpos son proteínas (estructura cuaternaria, complementariedad)." },
      { con: "Biología T6:", rel: "membrana, fagocitosis y lisosomas." },
      { con: "Biología T10:", rel: "alelos múltiples y codominancia en los grupos ABO." },
      { con: "Química II T11:", rel: "polímeros y macromoléculas: proteínas y enlace peptídico." }
    ],
    claves: [
      ["Antígeno", "molécula que el sistema inmunitario reconoce como extraña y que dispara la respuesta"],
      ["Anticuerpo", "inmunoglobulina fabricada por células plasmáticas que se une a un antígeno concreto"],
      ["Epítopo", "zona concreta del antígeno que reconoce un anticuerpo"],
      ["Selección clonal", "el antígeno activa y multiplica solo a los linfocitos que lo reconocen"],
      ["Célula plasmática", "linfocito B diferenciado que secreta anticuerpos"],
      ["Célula de memoria", "linfocito de larga vida que permite la respuesta secundaria"],
      ["MHC (HLA)", "proteínas de superficie que presentan antígenos a los linfocitos T y causan el rechazo"],
      ["Vacuna / suero", "antígeno que genera memoria (activa) / anticuerpos ya formados (pasiva)"],
      ["Opsonización", "marcado de un patógeno por anticuerpos o complemento para que lo fagociten"],
      ["Rh (anti-D)", "antígeno D del hematíe; el anti-D solo se forma tras contacto con sangre Rh+"]
    ],
    cita: { txt: "La memoria inmunológica está en las células, no en los anticuerpos: por eso una vacuna protege años.", autor: "Dato para recordar", obra: "respuesta secundaria: latencia de 1–3 días y ≈ 10 veces más anticuerpos" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    defensas: {
      titulo: "¿Innata o adaptativa?",
      consigna: "Clasifica cada mecanismo.",
      categorias: ["Innata", "Adaptativa"],
      items: [
        { t: "Piel y mucosas", c: 0 }, { t: "Fagocitosis por un neutrófilo", c: 0 }, { t: "Fiebre", c: 0 }, { t: "Interferón", c: 0 },
        { t: "Producción de anticuerpos contra el tétanos", c: 1 }, { t: "Linfocito T citotóxico", c: 1 }, { t: "Células de memoria", c: 1 }, { t: "Complemento", c: 0 }
      ]
    },
    ig: {
      titulo: "Clase de inmunoglobulina y su rasgo",
      consigna: "Une cada clase con su rasgo.",
      pares: [
        ["IgG", "Atraviesa la placenta; domina en la respuesta secundaria"],
        ["IgM", "Pentámero; la primera en aparecer"],
        ["IgA", "Presente en leche, saliva y lágrimas"],
        ["IgE", "Se une a mastocitos; causa de las alergias"],
        ["IgD", "Receptor en la superficie del linfocito B"]
      ]
    },
    celulas: {
      titulo: "Célula y función",
      consigna: "Une cada célula con su función principal.",
      pares: [
        ["Macrófago", "Fagocita y presenta antígenos"],
        ["Célula plasmática", "Secreta anticuerpos"],
        ["Linfocito T citotóxico", "Destruye células infectadas con perforina"],
        ["Linfocito T colaborador", "Activa a B y a Tc con interleucinas"],
        ["Mastocito", "Libera histamina"],
        ["Célula NK", "Mata células sin MHC-I normal, sin memoria"]
      ]
    },
    hitos: {
      titulo: "Científico y descubrimiento",
      consigna: "Une cada nombre con su aportación.",
      pares: [
        ["Jenner (1796)", "Primera vacuna: viruela"],
        ["Metchnikoff (1882)", "Fagocitosis"],
        ["Behring y Kitasato (1890)", "Seroterapia: anticuerpos"],
        ["Landsteiner (1901)", "Grupos sanguíneos ABO"],
        ["Köhler y Milstein (1975)", "Anticuerpos monoclonales"]
      ]
    },
    inmunidad: {
      titulo: "Natural o artificial, activa o pasiva",
      consigna: "Clasifica cada situación.",
      categorias: ["Natural activa", "Natural pasiva", "Artificial activa", "Artificial pasiva"],
      items: [
        { t: "Pasar la varicela", c: 0 }, { t: "Pasar la gripe y quedar inmune", c: 0 },
        { t: "IgG de la madre al feto por la placenta", c: 1 }, { t: "IgA de la leche materna", c: 1 },
        { t: "Vacuna del sarampión", c: 2 }, { t: "Vacuna de ARNm", c: 2 },
        { t: "Suero antiofídico", c: 3 }, { t: "Inmunoglobulina anti-D tras el parto", c: 3 }
      ]
    },
    alteraciones: {
      titulo: "Alergia, autoinmunidad o inmunodeficiencia",
      consigna: "Clasifica cada enfermedad o situación.",
      categorias: ["Alergia", "Autoinmunidad", "Inmunodeficiencia"],
      items: [
        { t: "Rinitis por polen", c: 0 }, { t: "Alergia al cacahuete", c: 0 }, { t: "Asma alérgica", c: 0 },
        { t: "Diabetes tipo 1", c: 1 }, { t: "Esclerosis múltiple", c: 1 }, { t: "Artritis reumatoide", c: 1 }, { t: "Lupus", c: 1 },
        { t: "SIDA", c: 2 }, { t: "Inmunodeficiencia combinada grave («niño burbuja»)", c: 2 }
      ]
    },
    ordeninflamacion: {
      titulo: "La inflamación tras una herida",
      consigna: "Ordena lo que ocurre, desde el principio.",
      items: [
        { t: "Entran microorganismos por la herida" },
        { t: "Los mastocitos liberan histamina" },
        { t: "Los capilares se dilatan y se hacen más permeables" },
        { t: "Los neutrófilos y monocitos llegan al foco (quimiotaxis)" },
        { t: "Los fagocitos engloban y destruyen a los microorganismos" },
        { t: "Se repara el tejido (el pus son neutrófilos muertos)" }
      ]
    },
    ordenhumoral: {
      titulo: "La respuesta humoral",
      consigna: "Ordena las etapas.",
      items: [
        { t: "Un linfocito B reconoce el antígeno con su receptor" },
        { t: "Presenta el antígeno a un linfocito T colaborador (MHC-II)" },
        { t: "El Th libera interleucinas y activa al B" },
        { t: "El B se divide: expansión clonal" },
        { t: "Aparecen células plasmáticas y B de memoria" },
        { t: "Las células plasmáticas secretan anticuerpos" }
      ]
    },
    quiz1: {
      titulo: "Test: inmunología",
      preguntas: [
        { q: "La respuesta inmunitaria secundaria se caracteriza por…", op: ["latencia corta y gran cantidad de anticuerpos", "latencia larga y pocos anticuerpos", "no tener células de memoria", "producirse solo contra antígenos nuevos"], ok: 0, porque: "Las células de memoria responden más rápido y más fuerte." },
        { q: "¿Qué células fabrican los anticuerpos?", op: ["Células plasmáticas (derivadas de linfocitos B)", "Linfocitos T citotóxicos", "Macrófagos", "Hematíes"], ok: 0, porque: "El linfocito B activado se diferencia en célula plasmática." },
        { q: "Un anticuerpo IgG está formado por…", op: ["dos cadenas pesadas y dos ligeras", "una cadena pesada y una ligera", "cuatro cadenas pesadas", "ácidos nucleicos y proteínas"], ok: 0, porque: "2 H + 2 L unidas por puentes disulfuro." },
        { q: "Un suero antiofídico confiere inmunidad…", op: ["pasiva artificial", "activa artificial", "pasiva natural", "activa natural"], ok: 0, porque: "Son anticuerpos ya formados que se administran." },
        { q: "El VIH destruye principalmente a los…", op: ["linfocitos T colaboradores (CD4)", "hematíes", "linfocitos B de memoria", "mastocitos"], ok: 0, porque: "Sin T colaboradores no se coordina la respuesta inmunitaria." },
        { q: "El rechazo de un trasplante se debe a que los linfocitos T reconocen como extrañas las moléculas…", op: ["MHC (HLA) del órgano", "ADN del órgano", "del grupo Rh solo", "de la membrana de los hematíes del receptor"], ok: 0, porque: "Las moléculas HLA son distintas en cada persona." },
        { q: "Una persona de grupo O…", op: ["tiene anticuerpos anti-A y anti-B", "tiene antígenos A y B", "no tiene ningún anticuerpo", "puede recibir sangre del grupo A"], ok: 0, porque: "No tiene antígenos A ni B, así que tiene los dos anticuerpos." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la inmunidad innata es FALSA?", op: ["Genera células de memoria específicas", "Es inespecífica", "Actúa de forma inmediata", "Incluye la fagocitosis"], ok: 0, porque: "La memoria específica es propia de la inmunidad adaptativa." },
        { q: "¿Cuál de estas afirmaciones sobre los anticuerpos es FALSA?", op: ["Los fabrican los linfocitos T citotóxicos", "Son proteínas", "Se unen a un epítopo concreto", "Tienen región variable y constante"], ok: 0, porque: "Los fabrican las células plasmáticas, derivadas de linfocitos B." },
        { q: "¿Cuál de estas afirmaciones sobre la vacuna es FALSA?", op: ["Da anticuerpos ya formados y protección inmediata", "Genera células de memoria", "Es inmunidad activa artificial", "Es preventiva"], ok: 0, porque: "Eso es el suero; la vacuna estimula al organismo a fabricarlos." },
        { q: "¿Cuál de estas afirmaciones sobre el interferón es FALSA?", op: ["Es un anticuerpo específico de cada virus", "Lo liberan células infectadas por virus", "Protege a las células vecinas", "Es una proteína"], ok: 0, porque: "No es un anticuerpo: es una citocina inespecífica de virus." },
        { q: "¿Cuál de estas afirmaciones sobre el SIDA es FALSA?", op: ["Se transmite por besos y picaduras de mosquito", "Lo causa un retrovirus", "El virus infecta linfocitos T colaboradores", "Se transmite de madre a hijo"], ok: 0, porque: "No se transmite por contacto casual ni por mosquitos." },
        { q: "¿Cuál de estas afirmaciones sobre los grupos sanguíneos es FALSA?", op: ["Una persona AB tiene anticuerpos anti-A y anti-B", "El grupo O no tiene antígenos A ni B", "El grupo A tiene anticuerpos anti-B", "Un receptor AB+ puede recibir hematíes de cualquier grupo"], ok: 0, porque: "Una persona AB tiene ambos antígenos, por lo que no tiene ninguno de estos anticuerpos." },
        { q: "¿Cuál de estas afirmaciones sobre la alergia es FALSA?", op: ["Es una infección causada por el alérgeno", "Interviene la IgE", "Los mastocitos liberan histamina", "Requiere un contacto previo de sensibilización"], ok: 0, porque: "Es una respuesta exagerada a una sustancia inocua; no hay infección." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: inmunología",
      cartas: [
        { a: "Antígeno", b: "Molécula reconocida como extraña que dispara la respuesta inmunitaria." },
        { a: "Epítopo", b: "Zona del antígeno que reconoce un anticuerpo o un receptor de linfocito." },
        { a: "Inmunidad innata", b: "Inespecífica, inmediata, sin memoria: barreras, fagocitos, complemento, interferón, NK." },
        { a: "Inmunidad adaptativa", b: "Específica y con memoria: linfocitos B (humoral) y T (celular)." },
        { a: "Inflamación", b: "Histamina → vasodilatación y permeabilidad → llegada de fagocitos. Rubor, calor, tumor, dolor." },
        { a: "Complemento", b: "≈ 30 proteínas del plasma en cascada: opsoniza, atrae fagocitos y lisa células." },
        { a: "Interferón", b: "Lo liberan células infectadas por virus; alerta a las vecinas (estado antivírico)." },
        { a: "Anticuerpo (IgG)", b: "2 cadenas pesadas + 2 ligeras (150 kDa); región variable (2 sitios) y constante (Fc)." },
        { a: "Clases de Ig", b: "IgG (placenta), IgM (pentámero, 1.ª), IgA (leche, mucosas), IgE (alergias), IgD (receptor B)." },
        { a: "Respuesta humoral", b: "B + Th → células plasmáticas → anticuerpos (contra antígenos libres)." },
        { a: "Respuesta celular", b: "Tc reconocen antígeno + MHC-I y destruyen células infectadas con perforina y granzimas." },
        { a: "Selección clonal", b: "El antígeno elige y multiplica a los linfocitos que lo reconocen (Burnet)." },
        { a: "Primaria frente a secundaria", b: "Latencia 5–10 días y pico bajo / 1–3 días y ≈ 10 veces más, con memoria." },
        { a: "Vacuna y suero", b: "Vacuna: antígeno, activa, duradera, preventiva. Suero: anticuerpos, pasiva, inmediata, temporal." },
        { a: "Alergia, autoinmunidad, inmunodeficiencia", b: "Respuesta exagerada (IgE) / contra lo propio / defensas insuficientes (SIDA)." },
        { a: "VIH", b: "Retrovirus que destruye linfocitos T colaboradores (CD4); transcriptasa inversa; no hay vacuna por su alta mutación." },
        { a: "Trasplantes", b: "Auto, iso, alo y xeno. El rechazo lo causa el reconocimiento del MHC (HLA) por los T." },
        { a: "ABO y Rh", b: "Antígenos en el hematíe, anticuerpos en el plasma contra los que faltan. O− dador universal; AB+ receptor universal." }
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
  O("b1", 1, "La fiebre y la inflamación forman parte de…", ["la inmunidad innata", "la inmunidad adaptativa", "la respuesta humoral", "la respuesta secundaria"], 0, ["Son respuestas inespecíficas e inmediatas, sin memoria."], "La inmunidad innata");
  O("b2", 1, "¿Cuál de estas células es un fagocito?", ["Neutrófilo", "Hematíe", "Plaqueta", "Célula plasmática"], 0, ["Los neutrófilos, monocitos y macrófagos fagocitan."], "Neutrófilo");
  O("b3", 1, "Una molécula que el sistema inmunitario reconoce como extraña se llama…", ["antígeno", "anticuerpo", "interferón", "hapteno solo"], 0, ["El antígeno es lo reconocido; el anticuerpo es lo que lo reconoce."], "Antígeno");
  O("b4", 1, "Los linfocitos T maduran en el…", ["timo", "bazo", "hígado", "páncreas"], 0, ["«T» de timo; los B maduran en la médula ósea."], "Timo");
  O("b5", 1, "La respuesta humoral está protagonizada por…", ["linfocitos B y anticuerpos", "linfocitos T citotóxicos", "macrófagos solo", "células NK"], 0, ["Humoral = anticuerpos en los líquidos del cuerpo."], "Linfocitos B y anticuerpos");
  O("b6", 1, "¿Qué clase de anticuerpo atraviesa la placenta?", ["IgG", "IgM", "IgE", "IgD"], 0, ["La IgG es la única que pasa de la madre al feto."], "IgG");
  O("b7", 1, "Tras una vacuna, la protección duradera se debe a…", ["las células de memoria", "los anticuerpos de la vacuna", "los antibióticos", "la fiebre"], 0, ["La vacuna contiene el antígeno, no anticuerpos: genera memoria."], "Células de memoria");
  O("b8", 1, "Un suero antitetánico produce inmunidad…", ["pasiva artificial", "activa artificial", "activa natural", "pasiva natural"], 0, ["Se administran anticuerpos hechos: protección inmediata y temporal."], "Pasiva artificial");
  O("b9", 1, "La sustancia que liberan los mastocitos y causa picor y estornudos en una alergia es la…", ["histamina", "insulina", "perforina", "interleucina solo"], 0, ["Los mastocitos con IgE desgranulan histamina."], "Histamina");
  O("b10", 1, "Un trasplante entre dos individuos de la misma especie se llama…", ["alotrasplante", "autotrasplante", "isotrasplante", "xenotrasplante"], 0, ["Auto: mismo individuo; iso: gemelos; alo: misma especie; xeno: distinta."], "Alotrasplante");
  V("b11", 1, "Los antibióticos sirven para tratar infecciones por virus como la gripe.", false, ["Los antibióticos actúan sobre bacterias, no sobre virus", "Los virus son bacterias muy pequeñas", "Los antibióticos son vacunas", "Los virus no existen"], 0, ["Los virus carecen de metabolismo propio: los antibióticos no les afectan."]);
  V("b12", 1, "La respuesta primaria es más lenta que la secundaria.", true, ["La secundaria cuenta con células de memoria ya preparadas", "La primaria tiene más anticuerpos", "La secundaria necesita un antígeno distinto", "La primaria no usa linfocitos"], 0, ["Latencia de 5–10 días frente a 1–3 días."]);
  T("b13", 1, "Completa: el virus del SIDA es el…", "Siglas", ["VIH", "vih"], ["Virus de la Inmunodeficiencia Humana."], "VIH");
  T("b14", 1, "Completa: la unión de varios hematíes por anticuerpos en grumos se llama…", "Proceso", ["aglutinacion", "aglutinación"], ["Los anticuerpos (anti-A, anti-B) unen los antígenos de distintos hematíes."], "Aglutinación");
  M("b15", 1, "Une cada clase de inmunoglobulina con su característica.",
    [C("IgM", ["Pentámero, la primera en aparecer", "Se encuentra en la leche materna", "Causa las alergias"], 0), C("IgA", ["Se encuentra en la leche materna", "Pentámero, la primera en aparecer", "Causa las alergias"], 0), C("IgE", ["Causa las alergias", "Se encuentra en la leche materna", "Pentámero, la primera en aparecer"], 0)],
    ["IgM: pentámero e inicial; IgA: secreciones; IgE: alergia y parásitos."], "IgM → pentámero; IgA → leche; IgE → alergias");
  X("b16", 1, "Un anticuerpo IgG tiene dos cadenas pesadas de 50 kDa y dos ligeras de 25 kDa. ¿Cuál es su masa total?", "Masa (kDa) =", 150, "kDa", ["2 · 50 = 100 kDa (pesadas).", "2 · 25 = 50 kDa (ligeras).", "100 + 50 = 150 kDa."], "150 kDa");

  // ---- nivel 2
  O("c1", 2, "¿Qué hace el interferón?", ["Alerta a las células vecinas para que bloqueen la multiplicación del virus", "Fabrica anticuerpos contra el virus", "Fagocita virus", "Mata directamente al virus"], 0, ["Lo liberan las células infectadas; no es un anticuerpo ni mata virus por sí mismo."], "Induce un estado antivírico en las células vecinas");
  O("c2", 2, "¿Cuál es la función de la región variable de un anticuerpo?", ["Unirse específicamente al antígeno", "Determinar la clase del anticuerpo", "Unirse a los fagocitos", "Atravesar la placenta"], 0, ["La variable forma el sitio de unión; la constante determina la clase y las funciones (Fc)."], "Unión específica al antígeno");
  O("c3", 2, "Un linfocito T citotóxico destruye a una célula infectada reconociendo el antígeno unido a…", ["MHC de clase I", "MHC de clase II", "un anticuerpo IgG", "el complemento"], 0, ["Tc (CD8) → MHC-I; Th (CD4) → MHC-II."], "MHC de clase I");
  O("c4", 2, "¿Qué ocurre en la opsonización?", ["Los anticuerpos o el complemento marcan al patógeno y facilitan su fagocitosis", "El patógeno se une a los hematíes", "Se liberan histamina y fiebre", "El patógeno se divide"], 0, ["Marcar para que el fagocito reconozca y engulla."], "Marcado para facilitar la fagocitosis");
  O("c5", 2, "Si tras un 2.º contacto con el mismo antígeno los anticuerpos aparecen a los 2 días y alcanzan el triple del valor de la primera vez, ¿qué demuestra?", ["La existencia de células de memoria", "Que el antígeno ha cambiado", "Que hay una inmunodeficiencia", "Que ha actuado un suero"], 0, ["Rapidez y cantidad: respuesta secundaria con memoria."], "Memoria inmunológica");
  O("c6", 2, "¿Por qué un recién nacido está protegido unos meses frente a algunas infecciones?", ["Recibe IgG de la madre por la placenta e IgA con la leche", "Su sistema inmunitario ya es maduro", "Nace con células de memoria propias", "Las vacunas del embarazo lo protegen de por vida"], 0, ["Inmunidad natural pasiva: temporal."], "Inmunidad natural pasiva");
  V("c7", 2, "Los linfocitos B reconocen siempre el antígeno solo cuando está unido al MHC.", false, ["Los B reconocen antígenos libres con su receptor; los T los reconocen unidos al MHC", "Los B son una clase de linfocitos T", "No existen receptores en los B", "Los B son fagocitos"], 0, ["Los B captan el antígeno entero; los T necesitan que se lo presenten con MHC."]);
  V("c8", 2, "Un anticuerpo destruye por sí solo al microorganismo al unirse a él.", false, ["Neutraliza o marca; la destrucción la realizan fagocitos y complemento", "Contiene perforina", "Es una enzima digestiva", "Disuelve la membrana del microorganismo siempre"], 0, ["Los anticuerpos no son enzimas ni células."]);
  O("c9", 2, "La alergia a la penicilina se explica porque esta molécula pequeña actúa como…", ["hapteno que se une a proteínas del organismo", "anticuerpo", "interleucina", "complemento"], 0, ["Un hapteno solo es inmunogénico unido a una proteína."], "Hapteno");
  O("c10", 2, "¿Qué enfermedad es autoinmune?", ["Diabetes tipo 1", "SIDA", "Rinitis alérgica", "Gripe"], 0, ["En la diabetes tipo 1, los T destruyen las células β del páncreas."], "Diabetes tipo 1");
  O("c11", 2, "¿Por qué es tan difícil fabricar una vacuna contra el VIH?", ["Porque muta con mucha rapidez y ataca a los T colaboradores", "Porque no es un virus", "Porque no tiene antígenos", "Porque solo infecta a bacterias"], 0, ["La transcriptasa inversa comete errores que cambian los antígenos."], "Alta tasa de mutación");
  O("c12", 2, "Un hombre de grupo O recibe sangre de un donante A. ¿Qué ocurre?", ["Aglutinación: su anti-A ataca a los hematíes del donante", "Nada, el grupo O es receptor universal", "El donante rechaza al receptor", "Se forma anti-D"], 0, ["O tiene anti-A y anti-B; los hematíes A llevan el antígeno A."], "Aglutinación por anti-A del receptor");
  O("c13", 2, "El suero de un animal inmunizado protege a otro animal porque…", ["contiene anticuerpos", "contiene células de memoria", "contiene el antígeno", "contiene complemento solo"], 0, ["Es el descubrimiento de Behring y Kitasato (1890)."], "Contiene anticuerpos");
  X("c14", 2, "Un linfocito B activado se divide cada 12 horas durante 4 días. Si todos los descendientes siguen dividiéndose, ¿cuántas células hay al final?", "Células =", 256, "", ["4 días = 96 h; 96 / 12 = 8 divisiones.", "Cada división duplica: 2<sup>8</sup> = 256."], "256 células");
  X("c15", 2, "En una serie de diluciones dobles de un suero (1/2, 1/4, 1/8…), aún hay anticuerpos detectables en la dilución 1/256. ¿Cuántas diluciones dobles seguidas se hicieron hasta ese tubo?", "Nº de diluciones =", 8, "", ["Cada tubo divide por 2: 2<sup>n</sup> = 256.", "2<sup>8</sup> = 256, luego n = 8."], "8 diluciones (título 256)");
  X("c16", 2, "Cada molécula de IgM es un pentámero de monómeros con 2 sitios de unión. ¿Cuántos sitios de unión tiene?", "Sitios =", 10, "", ["5 monómeros · 2 sitios = 10 sitios."], "10 sitios");

  // ---- nivel 3
  X("d1", 3, "Un padre AB y una madre O tienen un hijo. ¿Qué probabilidad hay de que el hijo sea del grupo A?", "P(grupo A) =", 0.5, "", ["Padre: I<sup>A</sup>I<sup>B</sup> → gametos ½ I<sup>A</sup>, ½ I<sup>B</sup>. Madre: ii → gametos i.", "Hijos: ½ I<sup>A</sup>i (A) y ½ I<sup>B</sup>i (B).", "P(A) = 1/2. Nunca hay hijos AB ni O."], "1/2 = 0,5");
  X("d2", 3, "Una madre A (I<sup>A</sup>i) y un padre A (I<sup>A</sup>i) tienen un hijo. ¿Qué probabilidad hay de que sea del grupo O?", "P(grupo O) =", 0.25, "", ["Gametos de cada uno: ½ I<sup>A</sup>, ½ i.", "ii aparece con ½ · ½ = ¼."], "1/4 = 0,25");
  X("d3", 3, "Una madre Rh− (dd) y un padre Rh+ heterocigoto (Dd) esperan un hijo. ¿Qué probabilidad hay de que el hijo sea Rh+ y pueda sensibilizar a la madre?", "P(Rh+) =", 0.5, "", ["Madre: gametos d. Padre: ½ D, ½ d.", "Hijos: ½ Dd (Rh+) y ½ dd (Rh−)."], "1/2 = 0,5");
  X("d4", 3, "Una madre A heterocigota Rh+ heterocigota (I<sup>A</sup>i Dd) y un padre B heterocigoto Rh+ heterocigoto (I<sup>B</sup>i Dd) tienen un hijo. ¿Probabilidad de que sea del grupo AB y Rh+?", "P =", 0.1875, "", ["P(AB) = ¼ (I<sup>A</sup>I<sup>B</sup>).", "P(Rh+) = ¾ (DD o Dd).", "Independientes: ¼ · ¾ = 3/16 = 0,1875."], "3/16 = 0,1875", 0.01);
  X("d5", 3, "Para frenar un brote de un patógeno con R<sub>0</sub> = 12, ¿qué porcentaje mínimo de la población debe estar inmunizado (inmunidad de grupo, 1 − 1/R<sub>0</sub>)?", "% =", 91.7, "%", ["1 − 1/12 = 11/12.", "11/12 = 0,9167 → 91,7 %."], "≈ 91,7 %", 0.01);
  X("d6", 3, "Un paciente con VIH tenía 600 linfocitos CD4/µL y ahora tiene 180/µL. ¿Qué porcentaje de CD4 ha perdido?", "Pérdida (%) =", 70, "%", ["Pérdida: 600 − 180 = 420.", "420 / 600 = 0,70 → 70 %.", "180 es menor de 200: criterio de SIDA."], "70 %");
  X("d7", 3, "¿Cuántos de los 8 grupos (A, B, AB, O, cada uno + o −) pueden donar hematíes a un receptor B+?", "Nº de grupos =", 4, "", ["Antígenos del receptor B+: {B, D}.", "Donante compatible: antígenos dentro de {B, D}: B+, B−, O+, O−.", "Son 4."], "4 grupos (B+, B−, O+, O−)");
  O("d8", 3, "En el experimento de un ratón al que se inocula el antígeno A (día 0) y otra vez A y B (día 30), ¿cómo será la respuesta anti-B?", ["Primaria: latencia larga y pico bajo", "Secundaria: latencia corta y pico alto", "Inexistente", "Igual que la anti-A del día 30"], 0, ["B es un antígeno nuevo: no hay memoria contra B."], "Respuesta primaria", "Anti-B");
  M("d9", 3, "Una madre Rh− tiene su primer hijo Rh+ sin ningún tratamiento. Responde.",
    [C("Hijo 1", ["Sin problemas; la madre se sensibiliza en el parto", "Sufre enfermedad hemolítica grave", "Es Rh− seguro", "Rechaza a la madre"], 0), C("Hijo 2 si es Rh+ y no hay profilaxis", ["Puede sufrir enfermedad hemolítica por el anti-D (IgG) materno", "Sin problemas, igual que el primero", "Es siempre Rh−", "Nace con SIDA"], 0), C("Prevención", ["Inmunoglobulina anti-D a la madre tras el parto", "Vacuna contra la hepatitis", "Antihistamínicos", "Trasplante de médula"], 0)],
    ["El contacto con hematíes fetales en el parto sensibiliza a la madre: aparece anti-D (IgG).", "En el 2.º embarazo, el anti-D cruza la placenta y destruye los hematíes del feto Rh+.", "La inmunoglobulina anti-D elimina los hematíes fetales antes de la sensibilización."], "Primer hijo bien; segundo con riesgo; prevención con anti-D");
  O("d10", 3, "Un linfocito T citotóxico reconoce y destruye una célula infectada por un virus. ¿Qué información necesita ver en su superficie?", ["Un fragmento del virus presentado sobre MHC-I", "Un anticuerpo anti-virus libre", "El virus completo fuera de la célula", "Solo la histamina"], 0, ["Las células infectadas muestran trozos de las proteínas víricas sobre MHC-I."], "Antígeno vírico + MHC-I");
  M("d11", 3, "Clasifica cada afirmación sobre una vacuna o un suero.",
    [C("Contiene anticuerpos ya formados", ["Suero", "Vacuna"], 0), C("Genera células de memoria", ["Vacuna", "Suero"], 0), C("La protección dura semanas", ["Suero", "Vacuna"], 0), C("Se usa antes de la exposición", ["Vacuna", "Suero"], 0)],
    ["Vacuna: antígeno → activa, memoria, preventiva y duradera.", "Suero: anticuerpos → pasiva, inmediata y temporal."], "Suero / Vacuna / Suero / Vacuna");
  R("d12", "Compara la inmunidad innata y la adaptativa y explica cómo colaboran. (Pregunta tipo PAU)", [
    { t: "Innata: inespecífica, inmediata, sin memoria (barreras, fagocitos, complemento, interferón, NK)", p: 0.6 },
    { t: "Adaptativa: específica, más lenta la primera vez, con memoria (linfocitos B y T)", p: 0.6 },
    { t: "Colaboración: los macrófagos presentan antígenos a los T", p: 0.4 },
    { t: "Colaboración: los anticuerpos opsonizan y activan el complemento", p: 0.4 }], ["Innata.", "Adaptativa.", "Colaboración."], "Innata inespecífica e inmediata; adaptativa específica y con memoria; colaboran");
  R("d13", "Describe la estructura de un anticuerpo, sus clases y cómo reacciona con un antígeno. (Pregunta tipo PAU)", [
    { t: "4 cadenas: 2 pesadas y 2 ligeras unidas por puentes disulfuro, en forma de Y", p: 0.5 },
    { t: "Región variable (sitio de unión al antígeno) y constante (clase y funciones)", p: 0.5 },
    { t: "Clases: IgG, IgM, IgA, IgE, IgD con una función", p: 0.4 },
    { t: "Reacción Ag-Ac: específica y reversible (complementariedad)", p: 0.3 },
    { t: "Efectos: neutralización, aglutinación, opsonización o complemento", p: 0.3 }], ["Estructura.", "Regiones.", "Clases.", "Reacción."], "Proteína de 4 cadenas con región variable y constante");
  R("d14", "Un niño recibe la vacuna triple vírica y otro un suero tras una mordedura de serpiente. Explica la diferencia. (Pregunta tipo PAU)", [
    { t: "Vacuna: antígeno atenuado → respuesta primaria y células de memoria (activa artificial)", p: 0.5 },
    { t: "Suero: anticuerpos formados por otro organismo (pasiva artificial)", p: 0.5 },
    { t: "Vacuna: preventiva, lenta y duradera; suero: curativo, inmediato y temporal", p: 0.5 },
    { t: "La vacuna da memoria; el suero no", p: 0.3 }], ["Vacuna.", "Suero.", "Tiempos.", "Memoria."], "Vacuna: activa y duradera; suero: pasiva e inmediata");
  R("d15", "Explica cómo el VIH provoca el SIDA y por qué no hay vacuna. (Pregunta tipo PAU)", [
    { t: "Retrovirus; transcriptasa inversa copia el ARN a ADN que se integra", p: 0.5 },
    { t: "Infecta y destruye linfocitos T colaboradores (CD4)", p: 0.5 },
    { t: "Sin T colaboradores fallan respuesta humoral y celular → infecciones oportunistas", p: 0.5 },
    { t: "Sin vacuna por la alta mutación (transcriptasa inversa sin corrección)", p: 0.4 },
    { t: "Transmisión: sangre, sexual, vertical", p: 0.1 }], ["Virus.", "Diana.", "Consecuencia.", "Vacuna."], "Destruye los T colaboradores");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Innata y adaptativa", ancha: true,
      tabla: { cab: ["Rasgo", "Innata", "Adaptativa"], filas: [
        ["reconocimiento", "inespecífico", "específico (epítopo)"],
        ["rapidez", "minutos u horas", "días; rápida la 2.ª vez"],
        ["memoria", "no", "sí"],
        ["protagonistas", "fagocitos, NK, complemento", "linfocitos B y T"]
      ] } },
    { titulo: "Respuesta humoral",
      pasos: ["El linfocito B reconoce al antígeno.", "El T colaborador lo activa (MHC-II).", "El B se divide (clon).", "Células plasmáticas: anticuerpos.", "Células de memoria."],
      nota: "Humoral = B + anticuerpos; celular = Tc." },
    { titulo: "Anticuerpo", ancha: true,
      tabla: { cab: ["Parte", "Función"], filas: [
        ["2 cadenas pesadas + 2 ligeras", "estructura en Y (puentes S–S)"],
        ["región variable", "une el antígeno (2 sitios)"],
        ["región constante (Fc)", "clase; fagocitos y complemento"]
      ] } },
    { titulo: "Primaria frente a secundaria", ancha: true,
      tabla: { cab: ["", "Primaria", "Secundaria"], filas: [
        ["latencia", "5–10 días", "1–3 días"],
        ["cantidad", "baja", "≈ 10 veces más"],
        ["clase", "IgM → IgG", "sobre todo IgG"],
        ["memoria", "se forma", "actúa"]
      ] } },
    { titulo: "Tipos de inmunidad", ancha: true,
      tabla: { cab: ["", "Activa", "Pasiva"], filas: [
        ["natural", "infección", "placenta y leche"],
        ["artificial", "vacuna", "suero"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Los anticuerpos los fabrican los linfocitos T", bien: "Las células plasmáticas (de linfocitos B)", por: "Los T actúan como Tc o Th." },
        { mal: "La vacuna contiene anticuerpos", bien: "Contiene antígeno y genera memoria", por: "Los anticuerpos ya hechos son el suero." },
        { mal: "El SIDA y el VIH son lo mismo", bien: "VIH es el virus; el SIDA es la enfermedad", por: "Se puede ser VIH+ sin tener SIDA." },
        { mal: "Un receptor AB tiene anti-A y anti-B", bien: "No tiene ninguno de los dos", por: "Tiene los antígenos A y B." }
      ] }
  ];

  B.registrar("bio2", "t15", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio15a.secciones,
    nuevas: B.parte.bio15a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
