/* ============================================================
   Biología II · ampliaciones · Tema 14 (parte B): Microbiología
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t14.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Los <b>microorganismos</b> se agrupan por tamaño: <b>acelulares</b> (virus, viroides, priones), <b>procariotas</b> (bacterias, arqueas) y <b>eucariotas</b> (protozoos, algas, hongos).",
    "Un <b>virus</b> es ácido nucleico + cápsida (± envoltura), parásito intracelular obligado: en el ciclo <b>lítico</b> mata la célula y en el <b>lisogénico</b> se integra como profago; los retrovirus copian su ARN en ADN.",
    "La <b>bacteria</b> tiene pared de peptidoglucano, nucleoide y ribosomas 70S; la <b>tinción de Gram</b> distingue pared gruesa (violeta) y fina (rosa); crece en cuatro fases y N = N<sub>0</sub> · 2<sup>n</sup> en la exponencial.",
    "Los microbios <b>reciclan materia</b> (ciclo del nitrógeno), causan <b>enfermedades</b> que se combaten con esterilización, antibióticos y vacunas, y se usan en <b>fermentaciones, medicina y medio ambiente</b>."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Microbiología",
    autores: [
      { n: "Qué estudia", f: "los seres y entidades microscópicas", l: "virus · bacterias · hongos · protozoos" },
      { n: "Leeuwenhoek", f: "1676", l: "primeras bacterias al microscopio" },
      { n: "Koch", f: "1884", l: "postulados: un microbio, una enfermedad" },
      { n: "Fleming", f: "1928", l: "descubre la penicilina" },
      { n: "Hershey y Chase", f: "1952", l: "el ADN del fago entra en la bacteria" }
    ],
    obras: ["Virus", "Bacterias", "Tinción de Gram", "Curva de crecimiento", "Priones y viroides"],
    bloques: [
      { t: "Clasificación", frases: ["«Microorganismo» se define por el tamaño, no por el parentesco.", "Los virus no son células."],
        tabla: { cab: ["Bloque", "Ejemplos"], filas: [["Acelulares", "virus, viroides, priones"], ["Procariotas", "bacterias, arqueas"], ["Eucariotas", "protozoos, algas, hongos"]] } },
      { t: "Virus", frases: ["Ácido nucleico + <b>cápsida</b> (± envoltura); parásito intracelular obligado.", "<b>Lítico:</b> mata la célula. <b>Lisogénico:</b> profago integrado."],
        tabla: { cab: ["Ciclo lítico", "Ciclo lisogénico"], filas: [["adsorción, penetración, síntesis, ensamblaje, lisis", "integración y replicación pasiva"], ["la célula muere", "la célula sigue viva"]] } },
      { t: "Bacterias", frases: ["Pared de <b>peptidoglucano</b>, nucleoide, plásmidos, ribosomas 70S.", "Se reproducen por <b>bipartición</b>; la parasexualidad solo intercambia ADN."],
        tabla: { cab: ["Gram +", "Gram −"], filas: [["pared gruesa", "pared fina + membrana externa"], ["violeta", "rosa"]] } },
      { t: "Crecimiento", frases: ["Cuatro fases: latencia, exponencial, estacionaria y declive.", "<b>N = N₀ · 2ⁿ</b>, con n = t / g, solo en la exponencial."],
        tabla: { cab: ["Fase", "Qué pasa"], filas: [["exponencial", "la población se duplica cada g"], ["estacionaria", "nacen tantas como mueren"]] } },
      { t: "Retrovirus, viroides y priones", frases: ["<b>Retrovirus</b> (VIH): ARN → ADN con transcriptasa inversa.", "Viroide: ARN desnudo. Prión: solo proteína mal plegada."],
        tabla: { cab: ["Agente", "Qué tiene"], filas: [["viroide", "ARN circular sin proteínas"], ["prión", "proteína sin ácido nucleico"]] } },
      { t: "Control y usos", frases: ["Esterilizar mata todo; los antibióticos no sirven contra virus.", "Fermentación láctica (yogur), alcohólica (vino), insulina recombinante."] }
    ],
    resumen: [
      "Los <b>virus</b> usan la célula; <b>bacterias</b> y <b>protozoos</b> son células; <b>priones</b> y <b>viroides</b> son más simples que un virus.",
      "En el cultivo, solo la fase <b>exponencial</b> sigue N = N₀ · 2ⁿ.",
      "Casi todos los microbios son <b>útiles o inocuos</b>: reciclan nutrientes y se usan en la industria."
    ],
    conecta: [
      { con: "Biología T1 y T6:", rel: "ósmosis y pared: por qué revienta una bacteria con penicilina." },
      { con: "Biología T8:", rel: "fermentaciones alcohólica y láctica." },
      { con: "Biología T12 y T13:", rel: "traducción, transcripción inversa y plásmidos en ingeniería genética." },
      { con: "Biología T15:", rel: "vacunas, anticuerpos y respuesta inmune." },
      { con: "Química II T7:", rel: "pH y acidez en la fermentación láctica." }
    ],
    claves: [
      ["Virión", "partícula vírica completa: ácido nucleico + cápsida (± envoltura)"],
      ["Bacteriófago", "virus que infecta bacterias"],
      ["Profago", "ADN de un fago integrado en el cromosoma bacteriano"],
      ["Peptidoglucano", "polímero de la pared bacteriana; diana de la penicilina"],
      ["Plásmido", "ADN circular extra que puede llevar genes de resistencia"],
      ["Bipartición", "reproducción asexual de bacterias en dos células hijas idénticas"],
      ["Tiempo de generación", "tiempo en que se duplica la población (g)"],
      ["Transcriptasa inversa", "enzima de los retrovirus que copia ARN en ADN"],
      ["Prión", "proteína infecciosa mal plegada, sin ácido nucleico"],
      ["Esterilización", "eliminación de todo microorganismo, incluidas las esporas"]
    ],
    cita: { txt: "Una sola bacteria con g = 20 min daría 2⁷² ≈ 4,7 · 10²¹ en un día si no faltara el alimento.", autor: "Dato para recordar", obra: "72 generaciones en 24 h; por eso el cultivo real entra en fase estacionaria" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    clasif: {
      titulo: "¿Acelular, procariota o eucariota?",
      consigna: "Clasifica cada microorganismo en su bloque.",
      categorias: ["Acelular", "Procariota", "Eucariota"],
      items: [
        { t: "Virus de la gripe", c: 0 }, { t: "Bacteriófago T4", c: 0 }, { t: "Prión", c: 0 },
        { t: "Escherichia coli", c: 1 }, { t: "Cianobacteria", c: 1 }, { t: "Arquea metanógena", c: 1 },
        { t: "Levadura", c: 2 }, { t: "Paramecium", c: 2 }, { t: "Diatomea", c: 2 }, { t: "Penicillium", c: 2 }
      ]
    },
    euca: {
      titulo: "Hongo, alga o protozoo",
      consigna: "Según cómo se alimenta y qué es, clasifica cada eucariota microscópico.",
      categorias: ["Hongo (absorción)", "Alga (fotosíntesis)", "Protozoo (ingestión)"],
      items: [
        { t: "Saccharomyces", c: 0 }, { t: "Penicillium", c: 0 }, { t: "Candida albicans", c: 0 },
        { t: "Diatomea", c: 1 }, { t: "Dinoflagelado", c: 1 }, { t: "Chlorella", c: 1 },
        { t: "Amoeba", c: 2 }, { t: "Paramecium", c: 2 }, { t: "Plasmodium", c: 2 }, { t: "Trypanosoma", c: 2 }
      ]
    },
    ordenlitico: {
      titulo: "Ciclo lítico de un fago",
      consigna: "Ordena las etapas, desde el principio.",
      items: [
        { t: "Adsorción: el fago se une a un receptor de la bacteria" },
        { t: "Penetración: inyecta su ADN" },
        { t: "Síntesis: replica el ADN y fabrica proteínas víricas" },
        { t: "Ensamblaje: se arman los fagos nuevos" },
        { t: "Lisis: la bacteria estalla y libera los fagos" }
      ]
    },
    estructuras: {
      titulo: "Estructuras de una bacteria",
      consigna: "Une cada estructura con su función.",
      pares: [
        ["Cápsula", "Protege y permite adherirse"],
        ["Pared de peptidoglucano", "Da forma y resiste la presión osmótica"],
        ["Nucleoide", "Contiene el cromosoma circular"],
        ["Plásmido", "ADN extra con genes como la resistencia a antibióticos"],
        ["Flagelo", "Movimiento"],
        ["Pilus sexual", "Contacto en la conjugación"],
        ["Ribosomas 70S", "Síntesis de proteínas"]
      ]
    },
    ordennitro: {
      titulo: "Ciclo del nitrógeno",
      consigna: "Ordena el recorrido del nitrógeno, desde el aire.",
      items: [
        { t: "Fijación: N₂ → NH₄⁺ (Rhizobium)" },
        { t: "Nitrificación: NH₄⁺ → NO₂⁻ (Nitrosomonas)" },
        { t: "Nitrificación: NO₂⁻ → NO₃⁻ (Nitrobacter)" },
        { t: "Las plantas absorben el NO₃⁻" },
        { t: "Desnitrificación: NO₃⁻ → N₂ (vuelve al aire)" }
      ]
    },
    nutricion: {
      titulo: "Nutrición bacteriana",
      consigna: "Clasifica cada bacteria según su nutrición.",
      categorias: ["Fotoautótrofa", "Quimioautótrofa", "Quimioheterótrofa"],
      items: [
        { t: "Cianobacteria", c: 0 }, { t: "Bacteria purpúrea del azufre", c: 0 },
        { t: "Nitrosomonas", c: 1 }, { t: "Nitrobacter", c: 1 }, { t: "Bacteria oxidante del hierro", c: 1 },
        { t: "Escherichia coli", c: 2 }, { t: "Lactobacillus", c: 2 }, { t: "Clostridium tetani", c: 2 }, { t: "Rhizobium", c: 2 }
      ]
    },
    parasex: {
      titulo: "Intercambio de genes en bacterias",
      consigna: "Une cada proceso con su descripción.",
      pares: [
        ["Conjugación", "Contacto por un pilus sexual; pasa un plásmido"],
        ["Transformación", "La bacteria capta ADN libre del medio"],
        ["Transducción", "Un bacteriófago transporta ADN de una bacteria a otra"],
        ["Bipartición", "Una célula da dos hijas idénticas"],
        ["Experimento de Griffith", "Neumococos R vivos + S muertos: transformación"]
      ]
    },
    fases: {
      titulo: "Fases del crecimiento bacteriano",
      consigna: "Une cada fase con lo que ocurre.",
      pares: [
        ["Latencia", "Se adaptan al medio y no aumenta el número"],
        ["Exponencial", "La población se duplica cada tiempo de generación"],
        ["Estacionaria", "Nacen tantas como mueren"],
        ["Declive", "Mueren más de las que nacen"]
      ]
    },
    acelulares: {
      titulo: "Virus, viroide o prión",
      consigna: "Clasifica cada rasgo según el agente al que describe.",
      categorias: ["Virus", "Viroide", "Prión"],
      items: [
        { t: "Cápsida de proteína con ADN o ARN", c: 0 }, { t: "Retrovirus como el VIH", c: 0 }, { t: "Envoltura con espículas (gripe)", c: 0 },
        { t: "ARN circular desnudo sin proteínas", c: 1 }, { t: "Cadang-cadang del cocotero", c: 1 }, { t: "No codifica ninguna proteína", c: 1 },
        { t: "Proteína PrPSc mal plegada", c: 2 }, { t: "Enfermedad de las vacas locas", c: 2 }, { t: "No tiene ácido nucleico", c: 2 }, { t: "Kuru", c: 2 }
      ]
    },
    control: {
      titulo: "¿Qué técnica es?",
      consigna: "Clasifica cada caso según la técnica de control microbiano.",
      categorias: ["Esterilización", "Desinfección", "Antisepsia", "Pasteurización"],
      items: [
        { t: "Autoclave a 121 °C", c: 0 }, { t: "Calor seco a 180 °C del material de vidrio", c: 0 },
        { t: "Lejía en el suelo del laboratorio", c: 1 }, { t: "Alcohol sobre una mesa", c: 1 },
        { t: "Povidona yodada en una herida", c: 2 }, { t: "Agua oxigenada sobre la piel", c: 2 },
        { t: "Leche a 72 °C durante 15 s", c: 3 }, { t: "Leche a 63 °C durante 30 min", c: 3 }
      ]
    },
    industria: {
      titulo: "Microorganismos útiles",
      consigna: "Une cada microorganismo con su aplicación.",
      pares: [
        ["Saccharomyces cerevisiae", "Pan, vino y cerveza"],
        ["Lactobacillus", "Yogur y queso"],
        ["Acetobacter", "Vinagre"],
        ["Penicillium", "Penicilina y queso azul"],
        ["E. coli modificada genéticamente", "Insulina humana recombinante"],
        ["Acidithiobacillus ferrooxidans", "Biolixiviación del cobre"],
        ["Arqueas metanógenas", "Biogás en la depuración de aguas"]
      ]
    },
    quiz14: {
      titulo: "Test del tema 14",
      preguntas: [
        { q: "¿Qué tienen en común todos los virus?", op: ["Son parásitos intracelulares obligados", "Tienen ribosomas propios", "Tienen metabolismo propio", "Tienen siempre ADN"], ok: 0, porque: "No tienen metabolismo ni ribosomas y necesitan una célula; su genoma puede ser ADN o ARN." },
        { q: "En el ciclo lisogénico, el ADN del fago…", op: ["se integra en el cromosoma bacteriano", "destruye de inmediato el ADN bacteriano", "forma cápsidas sin replicarse", "sale de la bacteria intacto"], ok: 0, porque: "Se integra como profago y se replica con el ADN de la bacteria." },
        { q: "Las bacterias Gram positivas retienen el cristal violeta porque tienen…", op: ["una capa gruesa de peptidoglucano", "membrana externa con LPS", "una pared de celulosa", "una cápsula de quitina"], ok: 0, porque: "La pared gruesa se deshidrata con el alcohol y atrapa el colorante." },
        { q: "La penicilina actúa sobre…", op: ["la síntesis del peptidoglucano de la pared", "los ribosomas 80S", "el ADN del virus", "las mitocondrias"], ok: 0, porque: "Impide formar la pared: la bacteria revienta por ósmosis." },
        { q: "Si una población se duplica cada 30 min, tras 3 h de fase exponencial habrá multiplicado su número por…", op: ["64", "6", "32", "128"], ok: 0, porque: "n = 180 / 30 = 6 → 2⁶ = 64." },
        { q: "En la fase estacionaria…", op: ["nacen tantas bacterias como mueren", "la población se duplica cada g", "hay muerte masiva", "las bacterias se adaptan al medio"], ok: 0, porque: "Se agotan los nutrientes: el número de células vivas se mantiene." },
        { q: "El experimento de Griffith demostró…", op: ["la transformación bacteriana", "la conjugación", "la transducción", "la estructura del ADN"], ok: 0, porque: "Las bacterias R vivas se transformaron con el ADN de las S muertas." },
        { q: "El VIH es un retrovirus porque…", op: ["su genoma de ARN se copia en ADN con la transcriptasa inversa", "su genoma es de ADN bicatenario", "no necesita una célula huésped", "infecta bacterias"], ok: 0, porque: "El ADN formado se integra como provirus." },
        { q: "Un prión es…", op: ["una proteína infecciosa sin ácido nucleico", "un ARN circular desnudo", "un virus con envoltura", "una bacteria sin pared"], ok: 0, porque: "PrPSc mal plegada que convierte a la PrPC normal." },
        { q: "La esterilización se diferencia de la desinfección en que…", op: ["elimina todas las formas de vida, incluidas las esporas", "se usa solo en la piel", "solo reduce el número de microbios", "solo se hace con alcohol"], ok: 0, porque: "El autoclave (121 °C) destruye las esporas." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre los virus es FALSA?", op: ["Los antibióticos sirven para curar las infecciones víricas", "Son parásitos intracelulares obligados", "Los fagos infectan bacterias", "Algunos tienen envoltura lipídica"], ok: 0, porque: "Los antibióticos actúan sobre dianas bacterianas, no sobre los virus." },
        { q: "¿Cuál de estas afirmaciones sobre las bacterias es FALSA?", op: ["Su pared es de celulosa", "Su pared es de peptidoglucano", "Su ADN suele ser circular", "Tienen ribosomas 70S"], ok: 0, porque: "La pared bacteriana es de peptidoglucano; la celulosa es de las plantas." },
        { q: "¿Cuál de estas afirmaciones sobre la tinción de Gram es FALSA?", op: ["Las Gram negativas se ven violeta", "Las Gram positivas se ven violeta", "Las Gram negativas tienen membrana externa", "Se usa safranina como colorante de contraste"], ok: 0, porque: "Las Gram negativas pierden el violeta y se ven rosadas." },
        { q: "¿Cuál de estas afirmaciones sobre el ciclo lisogénico es FALSA?", op: ["Se fabrican virus nuevos inmediatamente tras la infección", "El ADN vírico se integra como profago", "La bacteria sigue viva", "Puede inducirse y pasar al ciclo lítico"], ok: 0, porque: "En el lisogénico no se fabrican virus hasta la inducción." },
        { q: "¿Cuál de estas afirmaciones sobre la conjugación bacteriana es FALSA?", op: ["Es una forma de reproducción porque forma células nuevas", "Se transfiere ADN por un pilus sexual", "Suele pasar un plásmido", "Puede propagar resistencias a antibióticos"], ok: 0, porque: "No aumenta el número de células: solo intercambia ADN." },
        { q: "¿Cuál de estas afirmaciones sobre la curva de crecimiento es FALSA?", op: ["En la fase de latencia la población se duplica cada g", "En la exponencial el número se duplica cada g", "En la estacionaria nacen tantas como mueren", "En el declive mueren más de las que nacen"], ok: 0, porque: "En la latencia las bacterias se adaptan y casi no se dividen." },
        { q: "¿Cuál de estas afirmaciones sobre priones y viroides es FALSA?", op: ["Los priones contienen ARN", "Los viroides carecen de cápsida", "Los priones son proteínas mal plegadas", "Los viroides infectan plantas"], ok: 0, porque: "Los priones no tienen ácido nucleico." },
        { q: "¿Cuál de estas afirmaciones sobre el control de microbios es FALSA?", op: ["La pasteurización esteriliza la leche", "El autoclave esteriliza", "La antisepsia se aplica a tejidos vivos", "Los antibióticos pueden ser bactericidas o bacteriostáticos"], ok: 0, porque: "La pasteurización reduce los microbios, pero no mata las esporas." }
      ]
    },
    tarjetas14: {
      titulo: "Tarjetas: microbiología",
      cartas: [
        { a: "Microorganismo", b: "Ser o entidad que solo se ve al microscopio; es un grupo definido por el tamaño." },
        { a: "Virión", b: "Partícula vírica: ácido nucleico + cápsida (± envoltura)." },
        { a: "Ciclo lítico (5 etapas)", b: "Adsorción, penetración, síntesis, ensamblaje y lisis." },
        { a: "Ciclo lisogénico", b: "El ADN del fago se integra (profago) y se copia con el cromosoma; puede inducirse." },
        { a: "Retrovirus", b: "Genoma de ARN que se copia a ADN con la transcriptasa inversa y se integra (provirus). Ej.: VIH." },
        { a: "Viroide", b: "ARN circular desnudo, sin proteínas; infecta plantas." },
        { a: "Prión", b: "Proteína mal plegada (PrPSc), sin ácido nucleico; encefalopatías espongiformes." },
        { a: "Pared bacteriana", b: "Peptidoglucano: forma y resistencia osmótica. Diana de la penicilina." },
        { a: "Gram positiva / negativa", b: "Pared gruesa, violeta / pared fina con membrana externa, rosa." },
        { a: "Plásmido", b: "ADN circular extra; resistencia a antibióticos, conjugación, vector de clonación." },
        { a: "Bipartición", b: "Replicación del cromosoma, alargamiento, septo y dos células hijas idénticas." },
        { a: "Parasexualidad", b: "Conjugación (pilus), transformación (ADN libre) y transducción (fago)." },
        { a: "N = N₀ · 2ⁿ", b: "n = t / g. Solo en la fase exponencial." },
        { a: "Fases de crecimiento", b: "Latencia, exponencial, estacionaria y declive." },
        { a: "Tipos de nutrición", b: "Foto o quimio (energía) y auto o heterótrofa (carbono): cuatro combinaciones." },
        { a: "Ciclo del nitrógeno", b: "Fijación, amonificación, nitrificación y desnitrificación." },
        { a: "Esterilización, desinfección, antisepsia", b: "Todo / objetos / tejidos vivos. La pasteurización no esteriliza." },
        { a: "Resistencia a antibióticos", b: "Selección natural de bacterias con mutación o plásmido R; se extiende por conjugación." },
        { a: "Vacuna y suero", b: "Vacuna: antígeno, inmunidad activa y duradera. Suero: anticuerpos, pasiva e inmediata." },
        { a: "Fermentaciones", b: "Alcohólica (levadura): vino, pan. Láctica (Lactobacillus): yogur. Acética: vinagre." }
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
  O("b1", 1, "¿Cuál de estos agentes es acelular?", ["Un virus", "Una bacteria", "Una levadura", "Un protozoo"], 0, ["Los virus no tienen células: son ácido nucleico + cápsida.", "Bacterias, levaduras y protozoos son células."], "Un virus");
  O("b2", 1, "La pared celular de las bacterias está formada por…", ["peptidoglucano", "celulosa", "quitina", "almidón"], 0, ["La celulosa es de las plantas y la quitina, de los hongos.", "El peptidoglucano es propio de las bacterias."], "Peptidoglucano");
  O("b3", 1, "Tras la tinción de Gram, una bacteria Gram positiva se ve…", ["violeta", "rosada", "verde", "incolora"], 0, ["La pared gruesa retiene el cristal violeta tras el alcohol.", "Las Gram negativas se ven rosadas por la safranina."], "Violeta");
  V("b4", 1, "Los virus tienen metabolismo y ribosomas propios.", false, ["No tienen ni metabolismo ni ribosomas: usan los de la célula huésped", "Tienen ribosomas 70S", "Solo tienen metabolismo fuera de la célula", "Tienen mitocondrias"], 0, ["Son parásitos intracelulares obligados: sin célula no se reproducen."]);
  O("b5", 1, "En el ciclo lítico de un fago, ¿qué etapa sigue inmediatamente a la adsorción?", ["Penetración", "Lisis", "Ensamblaje", "Integración"], 0, ["Orden: adsorción, penetración, síntesis, ensamblaje, lisis.", "La integración es del ciclo lisogénico."], "Penetración");
  O("b6", 1, "Un profago es…", ["el ADN de un fago integrado en el cromosoma bacteriano", "una cápsida de fago vacía", "un fago que ya ha lisado la bacteria", "un plásmido de resistencia a antibióticos"], 0, ["Se integra en el ciclo lisogénico y se replica con la bacteria."], "ADN del fago integrado en el cromosoma");
  O("b7", 1, "Las bacterias se reproducen principalmente por…", ["bipartición", "mitosis", "meiosis", "gemación en cadena de esporas"], 0, ["No tienen núcleo ni huso: replican el cromosoma y se dividen por un septo."], "Bipartición");
  V("b8", 1, "La conjugación es una forma de reproducción de las bacterias.", false, ["No aumenta el número de células: solo se transfiere ADN", "Produce cuatro células hijas", "Forma gametos", "Siempre mata a la bacteria receptora"], 0, ["Es parasexualidad: intercambio de ADN sin formar individuos nuevos."]);
  T("b9", 1, "Completa: la enzima de los retrovirus que fabrica ADN a partir de ARN se llama transcriptasa…", "Palabra", ["inversa", "reversa"], ["Es la transcriptasa inversa (retrotranscriptasa).", "Va del ARN al ADN, al revés que la transcripción normal."], "Inversa");
  O("b10", 1, "¿En qué fase de la curva de crecimiento se duplica la población cada generación?", ["Exponencial", "Latencia", "Estacionaria", "Declive"], 0, ["Hay nutrientes de sobra y el tiempo de generación es constante."], "Fase exponencial");
  O("b11", 1, "Un hongo unicelular que se usa para hacer pan y cerveza es…", ["Saccharomyces cerevisiae", "Penicillium", "Escherichia coli", "Plasmodium"], 0, ["Es una levadura: fermentación alcohólica.", "E. coli es una bacteria y Plasmodium, un protozoo."], "Saccharomyces cerevisiae");
  O("b12", 1, "El paludismo (malaria) lo produce un…", ["protozoo (Plasmodium)", "virus", "hongo", "prión"], 0, ["Lo transmite el mosquito Anopheles."], "Plasmodium (protozoo)");
  O("b13", 1, "Los antibióticos son eficaces contra…", ["las bacterias", "los virus", "los priones", "todos los microorganismos"], 0, ["Actúan sobre pared, ribosomas 70S o replicación bacterianos.", "Los virus no tienen esas dianas."], "Las bacterias");
  M("b14", 1, "Une cada microorganismo con su función.",
    [C("Rhizobium", ["Fija el nitrógeno en las leguminosas", "Fermentación alcohólica", "Fermentación láctica"], 0), C("Saccharomyces", ["Fermentación alcohólica", "Fija el nitrógeno en las leguminosas", "Fermentación láctica"], 0), C("Lactobacillus", ["Fermentación láctica", "Fija el nitrógeno en las leguminosas", "Fermentación alcohólica"], 0)],
    ["Rhizobium vive en los nódulos de las raíces.", "La levadura hace etanol y CO₂.", "Las bacterias lácticas hacen ácido láctico (yogur)."], "Rhizobium → nitrógeno; Saccharomyces → alcohólica; Lactobacillus → láctica");
  O("b15", 1, "¿Qué forma tiene un bacilo?", ["Alargada, como un cilindro", "Esférica", "Curvada en coma", "En hélice"], 0, ["Coco = esférico; bacilo = cilindro; vibrio = coma; espirilo = hélice."], "Alargada (cilindro)");
  X("b16", 1, "Un virus mide 100 nm y una bacteria, 2 µm. ¿Cuántas veces es mayor la bacteria?", "Veces =", 20, "veces", ["2 µm = 2000 nm.", "2000 / 100 = 20."], "20 veces");

  // ---- nivel 2
  X("c1", 2, "Un cultivo tiene 500 bacterias y g = 30 min. ¿Cuántas habrá tras 3 h de crecimiento exponencial?", "N =", 32000, "bacterias", ["n = 180 / 30 = 6 generaciones.", "N = 500 · 2⁶ = 500 · 64 = 32 000."], "32 000 bacterias");
  X("c2", 2, "Una bacteria con g = 20 min crece sin límite durante 2 h 40 min. ¿Cuántas bacterias hay?", "N =", 256, "bacterias", ["t = 160 min; n = 160 / 20 = 8.", "N = 1 · 2⁸ = 256."], "256 bacterias");
  X("c3", 2, "Un cultivo pasa de 1 · 10⁴ a 2,56 · 10⁶ bacterias/mL en 2 h de crecimiento exponencial. Calcula g.", "g (min) =", 15, "min", ["N / N₀ = 256 = 2⁸ → n = 8.", "g = 120 min / 8 = 15 min."], "15 minutos");
  X("c4", 2, "¿Cuántas generaciones hacen falta para pasar de 10⁴ a 10⁷ bacterias?", "n =", 9.97, "", ["n = (log 10⁷ − log 10⁴) / log 2 = 3 / 0,301.", "n ≈ 9,97 (casi 10 duplicaciones: 2¹⁰ = 1024 ≈ 1000)."], "n ≈ 9,97", 0.005);
  X("c5", 2, "Con g = 20 min, ¿cuánto tarda un cultivo en pasar de 10⁴ a 10⁷ bacterias (fase exponencial)?", "t (min) =", 199.3, "min", ["n = 9,97 generaciones.", "t = 9,97 · 20 = 199 min ≈ 3,3 h."], "≈ 199 min", 0.005);
  X("c6", 2, "Se siembran 0,1 mL de una dilución 10⁻⁶ y salen 62 colonias. ¿Cuántas UFC/mL hay en el cultivo original?", "UFC/mL (·10⁸) =", 6.2, "·10⁸", ["62 colonias / 0,1 mL = 620 UFC/mL en la dilución.", "620 · 10⁶ = 6,2 · 10⁸ UFC/mL."], "6,2 · 10⁸ UFC/mL");
  X("c7", 2, "Se hacen 5 diluciones seriadas 1:10 (1 mL en 9 mL). ¿Cuál es el factor de dilución final?", "Factor =", 100000, "", ["Cada paso divide por 10.", "10⁵ = 100 000."], "10⁵");
  X("c8", 2, "Un fago libera 100 fagos nuevos por cada bacteria infectada. Si cada fago nuevo infecta otra bacteria, ¿cuántos fagos se liberan en el tercer ciclo?", "Fagos =", 1000000, "fagos", ["Ciclo 1: 100; ciclo 2: 100 · 100 = 10⁴.", "Ciclo 3: 100 · 10⁴ = 10⁶."], "10⁶ fagos");
  O("c9", 2, "En el experimento de Hershey y Chase con fagos marcados con ³²P, la radiactividad aparece dentro de las bacterias porque…", ["lo que entra en la bacteria es el ADN, que contiene fósforo", "la proteína contiene mucho fósforo y entra", "el fósforo es radiactivo en las bacterias", "el ADN no entra, solo la cápsida"], 0, ["El ADN tiene fósforo y casi no tiene azufre; la proteína, al revés.", "La marca de ³²P dentro indica que el ADN penetra."], "Lo que entra es el ADN");
  V("c10", 2, "Un antibiótico que bloquea la síntesis de peptidoglucano sirve para tratar la gripe.", false, ["Los virus no tienen pared ni peptidoglucano: no hay diana", "La gripe la causa una bacteria con pared gruesa", "El peptidoglucano está en la envoltura vírica", "El antibiótico solo actúa en el pulmón"], 0, ["La gripe es vírica; para ella hay vacunas y antivirales."]);
  O("c11", 2, "Un antibiograma da estos halos de inhibición: A, 18 mm; B, 0 mm; C, 9 mm; D, 24 mm. ¿Qué antibiótico es más eficaz?", ["D", "A", "B", "C"], 0, ["Halo mayor = bacteria más sensible.", "B no da halo: resistente."], "D (halo de 24 mm)");
  M("c12", 2, "Une cada técnica con su descripción.",
    [C("Esterilización", ["Elimina toda forma de vida, incluidas las esporas", "Elimina patógenos de objetos y superficies", "Se aplica sobre tejidos vivos"], 0), C("Desinfección", ["Elimina patógenos de objetos y superficies", "Elimina toda forma de vida, incluidas las esporas", "Se aplica sobre tejidos vivos"], 0), C("Antisepsia", ["Se aplica sobre tejidos vivos", "Elimina toda forma de vida, incluidas las esporas", "Elimina patógenos de objetos y superficies"], 0)],
    ["Esterilizar: todo (autoclave).", "Desinfectar: superficies (lejía).", "Antisepsia: piel y heridas."], "Esterilización → todo; desinfección → objetos; antisepsia → tejidos vivos");
  M("c13", 2, "Une cada fase de la curva de crecimiento con lo que ocurre.",
    [C("Latencia", ["Las bacterias se adaptan y no aumenta el número", "El número se duplica cada g", "Nacen tantas como mueren"], 0), C("Exponencial", ["El número se duplica cada g", "Las bacterias se adaptan y no aumenta el número", "Nacen tantas como mueren"], 0), C("Estacionaria", ["Nacen tantas como mueren", "El número se duplica cada g", "Las bacterias se adaptan y no aumenta el número"], 0)],
    ["En la latencia hay adaptación.", "En la exponencial, n = t / g.", "En la estacionaria, nutrientes limitantes."], "Adaptación; duplicación; equilibrio entre nacimientos y muertes");
  O("c14", 2, "Un ratón inyectado con neumococos R vivos y neumococos S muertos por calor muere y de su sangre se aíslan bacterias S vivas. ¿Qué explica el resultado?", ["Las R incorporaron ADN de las S muertas (transformación)", "Las S muertas resucitaron con el tiempo", "Las R se convirtieron en S por mutación en el ratón", "El calor no mató a las S"], 0, ["Este es el experimento de Griffith (1928).", "Algo de las S muertas (después se vio que era ADN) transformó a las R."], "Transformación bacteriana");
  O("c15", 2, "Nitrosomonas obtiene energía oxidando amonio y toma el carbono del CO₂. Es una bacteria…", ["quimioautótrofa", "fotoautótrofa", "quimioheterótrofa", "fotoheterótrofa"], 0, ["Energía de una reacción química → quimio-.", "Carbono del CO₂ → autótrofa."], "Quimioautótrofa");
  V("c16", 2, "Conservar un alimento con mucha sal impide el crecimiento de bacterias porque en un medio hipertónico pierden agua por ósmosis.", true, ["El medio hipertónico saca agua de la célula bacteriana y la deshidrata", "La sal destruye el ADN bacteriano", "La sal es un antibiótico", "La sal calienta el alimento"], 0, ["Es la misma ósmosis del tema 1: el agua va hacia el medio con más soluto."]);

  // ---- nivel 3
  X("d1", 3, "Una bacteria con g = 20 min se divide sin ningún límite de alimento durante 24 h. ¿Cuántas habría? (Da el resultado en múltiplos de 10²¹.)", "N (·10²¹) =", 4.72, "·10²¹", ["24 h = 1440 min; n = 1440 / 20 = 72.", "N = 2⁷² = 4,72 · 10²¹ (cifra teórica)."], "≈ 4,7 · 10²¹ bacterias", 0.005);
  X("d2", 3, "Una bacteria pesa unos 1 pg (10⁻¹² g). ¿Cuántas generaciones harían falta, sin límites, para que la descendencia de una sola pesara 1 g?", "n =", 39.86, "", ["Se necesitan 10¹² bacterias.", "n = log₂ 10¹² = 12 / 0,301 = 39,9."], "≈ 39,9 generaciones", 0.005);
  X("d3", 3, "Con g = 20 min, ¿cuántas horas tardaría la descendencia de una bacteria en pesar 1 g (n = 39,86)?", "t (h) =", 13.29, "h", ["t = 39,86 · 20 = 797 min.", "797 / 60 ≈ 13,3 h (en la práctica, el alimento se agota mucho antes)."], "≈ 13,3 h", 0.005);
  X("d4", 3, "Un cultivo tiene 1 · 10⁴ bacterias/mL a las 2 h y 5,12 · 10⁶ a las 5 h, todo en fase exponencial. ¿Cuál es el tiempo de generación?", "g (min) =", 20, "min", ["N / N₀ = 512 = 2⁹ → n = 9.", "g = 180 min / 9 = 20 min."], "20 minutos");
  X("d5", 3, "Un cultivo con 1000 bacterias/mL tiene 2 h de latencia y luego crece exponencialmente con g = 30 min. ¿Cuántas bacterias/mL habrá a las 8 h? (Da el resultado en múltiplos de 10⁶.)", "N (·10⁶) =", 4.096, "·10⁶", ["Tiempo exponencial: 8 − 2 = 6 h = 360 min.", "n = 360 / 30 = 12; N = 1000 · 2¹² = 1000 · 4096 = 4,096 · 10⁶."], "4,096 · 10⁶ bacterias/mL", 0.005);
  X("d6", 3, "Un cultivo tiene 3 · 10⁸ UFC/mL. Se siembran 0,1 mL de la dilución 10⁻⁶. ¿Cuántas colonias se esperan?", "Colonias =", 30, "", ["UFC/mL en la dilución: 3 · 10⁸ · 10⁻⁶ = 300.", "En 0,1 mL: 30 colonias (en el límite inferior fiable, 30–300)."], "30 colonias");
  O("d7", 3, "Una persona mordida por un animal con rabia recibe suero antirrábico (anticuerpos) además de la vacuna. ¿Por qué se le da el suero?", ["Da protección inmediata, aunque temporal, mientras la vacuna genera la inmunidad propia", "Porque el suero produce memoria inmunológica duradera", "Porque la vacuna no funciona sin suero", "Porque el suero mata al virus fuera de las células solo con antibióticos"], 0, ["El suero aporta anticuerpos ya hechos: inmunidad pasiva e inmediata.", "La vacuna tarda días en dar anticuerpos propios (inmunidad activa)."], "Protección inmediata mientras actúa la vacuna");
  R("d8", "Compara el ciclo lítico y el ciclo lisogénico de un bacteriófago. (Pregunta tipo PAU)", [
    { t: "Etapas comunes: adsorción y penetración del ADN", p: 0.3 },
    { t: "Lítico: replicación inmediata, síntesis y ensamblaje de fagos", p: 0.5 },
    { t: "Lítico: lisis y muerte de la bacteria", p: 0.4 },
    { t: "Lisogénico: integración como profago y replicación con el ADN bacteriano", p: 0.5 },
    { t: "Inducción (UV, estrés) que pasa al ciclo lítico", p: 0.3 }], ["Adsorción y penetración.", "Lítico.", "Lisogénico.", "Inducción."], "Lítico: mata ya; lisogénico: integra y espera");
  R("d9", "Dibuja y rotula una bacteria, y explica la tinción de Gram. (Pregunta tipo PAU)", [
    { t: "Rotula pared, membrana, nucleoide, ribosomas 70S y plásmido", p: 0.5 },
    { t: "Rotula cápsula, flagelo o fimbrias", p: 0.2 },
    { t: "Gram positiva: pared gruesa de peptidoglucano, retiene el violeta", p: 0.5 },
    { t: "Gram negativa: pared fina y membrana externa, se ve rosa", p: 0.5 },
    { t: "Importancia: antibióticos distintos (penicilina), LPS", p: 0.3 }], ["Estructuras.", "Gram positiva.", "Gram negativa.", "Importancia."], "Pared gruesa (violeta) / pared fina (rosa)");
  R("d10", "Describe las fases de la curva de crecimiento de un cultivo bacteriano y explica el motivo de cada una. (Pregunta tipo PAU)", [
    { t: "Latencia: adaptación, no se dividen apenas", p: 0.4 },
    { t: "Exponencial: división constante, nutrientes abundantes (recta en log)", p: 0.5 },
    { t: "Estacionaria: nutrientes agotados y residuos tóxicos, nacimientos = muertes", p: 0.5 },
    { t: "Declive: mueren más de las que nacen", p: 0.4 },
    { t: "Usa N = N₀ · 2ⁿ o escala logarítmica correctamente", p: 0.2 }], ["Latencia.", "Exponencial.", "Estacionaria.", "Declive."], "Latencia, exponencial, estacionaria y declive");
  R("d11", "Explica la estructura del VIH y cómo se reproduce en un linfocito. (Pregunta tipo PAU)", [
    { t: "Virus con envoltura, cápsida y dos copias de ARN", p: 0.4 },
    { t: "Adsorción: gp120 con CD4 en linfocitos T auxiliares", p: 0.4 },
    { t: "Transcriptasa inversa: ARN → ADN", p: 0.5 },
    { t: "Integración como provirus; transcripción y traducción por la célula", p: 0.4 },
    { t: "Ensamblaje, gemación y consecuencia (SIDA)", p: 0.3 }], ["Estructura.", "Entrada.", "Transcripción inversa.", "Integración y salida."], "ARN → ADN → provirus → nuevos virus");
  R("d12", "¿Por qué aparecen bacterias resistentes a los antibióticos y cómo se puede frenar el problema? (Pregunta tipo PAU)", [
    { t: "Mutaciones al azar o plásmidos R en algunas bacterias", p: 0.5 },
    { t: "El antibiótico elimina a las sensibles y selecciona a las resistentes", p: 0.5 },
    { t: "Transmisión horizontal por conjugación", p: 0.4 },
    { t: "Medidas: uso solo con receta y tratamiento completo", p: 0.4 },
    { t: "Los antibióticos no sirven contra virus", p: 0.2 }], ["Origen.", "Selección.", "Propagación.", "Medidas."], "Selección natural + conjugación; uso racional");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Ciclo lítico de un fago",
      pasos: ["Adsorción: se une a la bacteria.", "Penetración: inyecta su ADN.", "Síntesis: replica el ADN y fabrica proteínas.", "Ensamblaje de fagos nuevos.", "Lisis: la bacteria estalla."],
      nota: "Lisogénico: el ADN se integra (profago) y se copia con la bacteria." },
    { titulo: "Lítico y lisogénico", ancha: true,
      tabla: { cab: ["", "Lítico", "Lisogénico"], filas: [
        ["ADN del virus", "se replica ya", "se integra (profago)"],
        ["Virus nuevos", "sí, enseguida", "no, hasta la inducción"],
        ["La célula", "muere (lisis)", "sigue viva y se divide"]
      ] } },
    { titulo: "Gram positiva y Gram negativa", ancha: true,
      tabla: { cab: ["", "Gram +", "Gram −"], filas: [
        ["pared", "gruesa", "fina + membrana externa"],
        ["color final", "violeta", "rosa"],
        ["penicilina", "más sensible", "más resistente"]
      ] } },
    { titulo: "Curva de crecimiento", ancha: true,
      tabla: { cab: ["Fase", "Qué ocurre"], filas: [
        ["latencia", "adaptación"],
        ["exponencial", "se duplica cada g"],
        ["estacionaria", "nacen = mueren"],
        ["declive", "mueren > nacen"]
      ] } },
    { titulo: "Virus, viroide y prión", ancha: true,
      tabla: { cab: ["Agente", "Qué es"], filas: [
        ["virus", "ácido nucleico + cápsida"],
        ["viroide", "ARN circular desnudo"],
        ["prión", "proteína mal plegada"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Los antibióticos curan la gripe", bien: "No sirven contra los virus", por: "La gripe es vírica." },
        { mal: "La pared bacteriana es de celulosa", bien: "Es de peptidoglucano", por: "La celulosa es de las plantas." },
        { mal: "La conjugación es una reproducción", bien: "Solo intercambia ADN", por: "No aumenta el número de células." },
        { mal: "La pasteurización esteriliza la leche", bien: "Reduce los microbios, no mata las esporas", por: "Esterilizar es eliminarlo todo." }
      ] }
  ];

  B.registrar("bio2", "t14", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio14a.secciones,
    nuevas: B.parte.bio14a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
