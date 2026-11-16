/* ============================================================
   Biología II · ampliaciones · Tema 4 (parte B): Proteínas y enzimas
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t4.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Un <b>aminoácido</b> es H₂N–CH(R)–COOH; hay 20 y solo cambia el radical R. Se unen por <b>enlaces peptídicos</b> (–CO–NH–), que liberan agua: <b>n aminoácidos → n − 1 enlaces</b>.",
    "La proteína tiene cuatro niveles: <b>primaria</b> (secuencia), <b>secundaria</b> (hélice α o lámina β), <b>terciaria</b> (forma 3D de una cadena) y <b>cuaternaria</b> (varias cadenas). Los enlaces débiles mantienen los tres últimos.",
    "La <b>desnaturalización</b> rompe los enlaces débiles, no los peptídicos: la proteína pierde la forma y la función, con la secuencia intacta.",
    "Una <b>enzima</b> es un catalizador proteico específico: el sustrato se une al <b>sitio activo</b>, baja la energía de activación y la enzima se recupera. Su velocidad satura (<b>V<sub>max</sub></b>) y <b>K<sub>m</sub></b> mide la afinidad.",
    "La actividad depende de [S], [E], <b>temperatura</b> y <b>pH</b> (curvas en campana) y de los <b>inhibidores</b>: el competitivo sube la K<sub>m</sub> y el no competitivo baja la V<sub>max</sub>."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Proteínas y enzimas",
    autores: [
      { n: "Qué estudia", f: "las proteínas y las enzimas", l: "estructura · función · cinética" },
      { n: "Fischer", f: "1894", l: "modelo llave-cerradura" },
      { n: "Michaelis y Menten", f: "1913", l: "cinética enzimática" },
      { n: "Sumner", f: "1926", l: "cristaliza la ureasa: una enzima es una proteína" },
      { n: "Koshland", f: "1958", l: "ajuste inducido" },
      { n: "Anfinsen", f: "1961", l: "renaturalización de la ribonucleasa" }
    ],
    obras: ["Aminoácidos", "Enlace peptídico", "Niveles de estructura", "Desnaturalización", "Enzimas", "Michaelis–Menten", "Inhibición"],
    bloques: [
      { t: "Aminoácidos y péptidos", frases: ["20 aminoácidos: <b>H₂N–CH(R)–COOH</b>; solo cambia R.", "Enlace peptídico <b>–CO–NH–</b>: libera H₂O.", "n aminoácidos → <b>n − 1</b> enlaces."],
        tabla: { cab: ["Tipo de R", "Ejemplos"], filas: [["Apolar", "Gly, Ala, Val"], ["Polar", "Ser, Cys"], ["Ácido", "Asp, Glu"], ["Básico", "Lys, Arg"]] } },
      { t: "Niveles de estructura", frases: ["Primaria: secuencia de aminoácidos.", "Secundaria: hélice α o lámina β.", "Terciaria: forma 3D; cuaternaria: varias cadenas."],
        tabla: { cab: ["Nivel", "Enlace"], filas: [["Primaria", "peptídico"], ["Secundaria", "puentes de H"], ["Terciaria", "S–S, iónico, hidrofóbico"], ["Cuaternaria", "los mismos, entre cadenas"]] } },
      { t: "Desnaturalización", frases: ["Pierde la forma 3D; <b>no</b> rompe enlaces peptídicos.", "Agentes: calor, pH, alcohol, urea, metales pesados.", "Se pierde la función; a veces es reversible."],
        tabla: { cab: ["Desnaturalizar", "Hidrolizar"], filas: [["rompe enlaces débiles", "rompe enlaces peptídicos"], ["conserva la primaria", "destruye la primaria"]] } },
      { t: "Funciones de las proteínas", frases: ["Estructural, enzimática, transporte, defensiva.", "Hormonal, contráctil, reserva, homeostática.", "Ejemplos: colágeno, amilasa, hemoglobina, anticuerpos."] },
      { t: "Enzimas", frases: ["Catalizador proteico: baja la <b>E<sub>a</sub></b> y no se consume.", "Sustrato + sitio activo → complejo ES → producto.", "Apoenzima + cofactor = holoenzima."],
        tabla: { cab: ["Modelo", "Idea"], filas: [["Llave-cerradura", "sitio activo rígido"], ["Ajuste inducido", "el sitio se adapta"]] } },
      { t: "Cinética y factores", frases: ["v frente a [S]: hipérbola; <b>V<sub>max</sub></b> = saturación.", "<b>K<sub>m</sub></b> = [S] a V<sub>max</sub>/2; K<sub>m</sub> baja = más afinidad.", "Temperatura y pH: curva en campana."],
        tabla: { cab: ["Inhibidor", "V<sub>max</sub> / K<sub>m</sub>"], filas: [["Competitivo", "igual / sube"], ["No competitivo", "baja / igual"]] } }
    ],
    resumen: [
      "La <b>forma 3D</b> lo decide todo: si cambia, la proteína pierde su función.",
      "Una enzima <b>baja la energía de activación</b>; no se consume ni cambia el equilibrio.",
      "<b>Temperatura</b>, <b>pH</b> e <b>inhibidores</b> actúan sobre la forma del sitio activo o sobre su ocupación."
    ],
    conecta: [
      { con: "Biología T2:", rel: "la condensación que une glúcidos es la misma que une aminoácidos." },
      { con: "Biología T5:", rel: "la secuencia de aminoácidos está escrita en el ADN." },
      { con: "Biología T6:", rel: "proteínas de membrana: transporte y receptores." },
      { con: "Química II T5:", rel: "catalizadores, cinética y energía de activación." },
      { con: "Química II T11:", rel: "polímeros de condensación." }
    ],
    claves: [
      ["Aminoácido", "molécula con grupo amino, carboxilo, H y radical R sobre el carbono α"],
      ["Enlace peptídico", "enlace –CO–NH– entre aminoácidos; libera agua"],
      ["Estructura primaria", "secuencia de aminoácidos de la cadena"],
      ["Desnaturalización", "pérdida de la forma 3D por rotura de enlaces débiles"],
      ["Enzima", "proteína que cataliza una reacción de forma específica"],
      ["Sitio activo", "zona de la enzima donde se une el sustrato"],
      ["Coenzima", "cofactor orgánico, derivado de una vitamina"],
      ["Vmax", "velocidad máxima: todas las enzimas saturadas"],
      ["Km", "concentración de sustrato a la que v = Vmax/2"],
      ["Inhibidor competitivo", "se parece al sustrato y ocupa el sitio activo"]
    ],
    cita: { txt: "Un solo aminoácido cambiado en la hemoglobina (Glu → Val) deforma el glóbulo rojo: anemia falciforme.", autor: "Dato para recordar", obra: "posición 6 de la cadena β" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    aminoacidos: {
      titulo: "Tipo de radical",
      consigna: "Clasifica cada aminoácido según su radical R.",
      categorias: ["Apolar", "Polar sin carga", "Ácido", "Básico"],
      items: [
        { t: "Glicina", c: 0 }, { t: "Alanina", c: 0 }, { t: "Valina", c: 0 }, { t: "Fenilalanina", c: 0 },
        { t: "Serina", c: 1 }, { t: "Cisteína", c: 1 }, { t: "Tirosina", c: 1 }, { t: "Glutamina", c: 1 },
        { t: "Ácido aspártico", c: 2 }, { t: "Ácido glutámico", c: 2 },
        { t: "Lisina", c: 3 }, { t: "Arginina", c: 3 }
      ]
    },
    niveles: {
      titulo: "¿De qué nivel de estructura es?",
      consigna: "Une cada hecho con el nivel de estructura proteica al que pertenece.",
      categorias: ["Primaria", "Secundaria", "Terciaria", "Cuaternaria"],
      items: [
        { t: "Enlace peptídico entre dos aminoácidos", c: 0 },
        { t: "Sustituir Glu por Val en la cadena β de la hemoglobina", c: 0 },
        { t: "Puentes de H en una hélice α", c: 1 },
        { t: "Lámina β de la fibroína de la seda", c: 1 },
        { t: "Puente disulfuro entre dos cisteínas de la misma cadena", c: 2 },
        { t: "Radicales apolares agrupados en el interior de la mioglobina", c: 2 },
        { t: "Unión de las cuatro cadenas de la hemoglobina", c: 3 },
        { t: "Dos subunidades que se asocian por enlaces débiles", c: 3 }
      ]
    },
    funciones: {
      titulo: "Proteína y función",
      consigna: "Une cada proteína con su función.",
      pares: [
        ["Colágeno", "Resistencia de tendones y piel (estructural)"],
        ["Hemoglobina", "Transporte de oxígeno"],
        ["Insulina", "Hormona que baja la glucosa de la sangre"],
        ["Anticuerpo", "Defensa: neutraliza antígenos"],
        ["Actina y miosina", "Contracción del músculo"],
        ["Caseína", "Reserva de aminoácidos en la leche"]
      ]
    },
    catalisis: {
      titulo: "Una enzima en acción",
      consigna: "Ordena los pasos de una reacción enzimática.",
      items: [
        { t: "El sustrato se acerca al sitio activo de la enzima" },
        { t: "Se forma el complejo enzima-sustrato (ES)" },
        { t: "La enzima baja la energía de activación y el sustrato se transforma" },
        { t: "Se libera el producto" },
        { t: "La enzima queda libre e intacta para otro ciclo" }
      ]
    },
    enzimas: {
      titulo: "Enzima y sustrato",
      consigna: "Une cada enzima con la sustancia sobre la que actúa.",
      pares: [
        ["Amilasa", "Almidón"],
        ["Lactasa", "Lactosa"],
        ["Lipasa", "Grasas (triglicéridos)"],
        ["Pepsina", "Proteínas del alimento (en el estómago)"],
        ["Catalasa", "Agua oxigenada (H₂O₂)"],
        ["Ureasa", "Urea"]
      ]
    },
    coenzimas: {
      titulo: "Coenzima y vitamina",
      consigna: "Une cada coenzima con la vitamina de la que deriva.",
      pares: [
        ["NAD⁺", "Vitamina B₃ (niacina)"],
        ["FAD", "Vitamina B₂ (riboflavina)"],
        ["Coenzima A", "Vitamina B₅ (ácido pantoténico)"],
        ["TPP", "Vitamina B₁ (tiamina)"]
      ]
    },
    clases: {
      titulo: "Clase de enzima",
      consigna: "Clasifica cada enzima en su clase según la reacción que cataliza.",
      categorias: ["Oxidorreductasa", "Transferasa", "Hidrolasa", "Liasa", "Isomerasa", "Ligasa"],
      items: [
        { t: "Deshidrogenasa láctica", c: 0 }, { t: "Catalasa", c: 0 },
        { t: "Hexoquinasa", c: 1 },
        { t: "Amilasa", c: 2 }, { t: "Lipasa", c: 2 },
        { t: "Fumarasa", c: 3 },
        { t: "Glucosa-fosfato isomerasa", c: 4 },
        { t: "ADN ligasa", c: 5 }
      ]
    },
    inhibicion: {
      titulo: "¿Qué tipo de inhibición es?",
      consigna: "Clasifica cada afirmación o ejemplo.",
      categorias: ["Competitiva", "No competitiva", "Irreversible"],
      items: [
        { t: "Se parece al sustrato y ocupa el sitio activo", c: 0 },
        { t: "Se supera añadiendo mucho sustrato", c: 0 },
        { t: "Aumenta la Km y la Vmax no cambia", c: 0 },
        { t: "Malonato frente al succinato", c: 0 },
        { t: "Baja la Vmax y la Km no cambia", c: 1 },
        { t: "Metal pesado unido a grupos –SH", c: 1 },
        { t: "Se une fuera del sitio activo", c: 1 },
        { t: "Penicilina sobre la transpeptidasa bacteriana", c: 2 },
        { t: "Aspirina sobre la ciclooxigenasa", c: 2 },
        { t: "Se une a la enzima con enlace covalente", c: 2 }
      ]
    },
    quiz1: {
      titulo: "Test del tema 4",
      preguntas: [
        { q: "¿Qué parte de un aminoácido es la que cambia de uno a otro?", op: ["El radical R", "El grupo amino", "El grupo carboxilo", "El carbono α"], ok: 0, porque: "El grupo amino, el carboxilo y el H son comunes; el radical R da la identidad." },
        { q: "El enlace peptídico une…", op: ["el carboxilo de un aminoácido con el amino del siguiente, liberando agua", "dos radicales R entre sí", "dos aminoácidos mediante un puente de hidrógeno", "el grupo amino con el hidrógeno del mismo aminoácido"], ok: 0, porque: "Es una condensación –CO–NH– con pérdida de H₂O." },
        { q: "Un péptido de 100 aminoácidos en una sola cadena tiene…", op: ["99 enlaces peptídicos", "100 enlaces peptídicos", "101 enlaces peptídicos", "50 enlaces peptídicos"], ok: 0, porque: "n aminoácidos → n − 1 enlaces." },
        { q: "Los puentes disulfuro entre cisteínas de la misma cadena mantienen la estructura…", op: ["terciaria", "primaria", "secundaria", "cuaternaria"], ok: 0, porque: "Unen radicales de la misma cadena plegada: terciaria." },
        { q: "La desnaturalización de una proteína…", op: ["rompe enlaces débiles y la proteína pierde su función", "rompe los enlaces peptídicos", "cambia la secuencia de aminoácidos", "siempre es reversible"], ok: 0, porque: "Se pierde la forma 3D; la primaria queda intacta." },
        { q: "La Km es…", op: ["la concentración de sustrato a la que v = Vmax/2", "la velocidad máxima de la enzima", "la cantidad de enzima presente", "el pH óptimo"], ok: 0, porque: "Es una concentración (mM) y mide la afinidad." },
        { q: "Un inhibidor competitivo…", op: ["se une al sitio activo; la Vmax no cambia y la Km aumenta", "se une fuera del sitio activo y baja la Vmax", "destruye la enzima", "aumenta la Vmax"], ok: 0, porque: "Compite con el sustrato; se supera con más sustrato." },
        { q: "La actividad de una enzima cae tras su temperatura óptima porque…", op: ["la enzima se desnaturaliza", "el sustrato se agota", "la energía de activación sube", "el pH baja"], ok: 0, porque: "El calor rompe los enlaces débiles y el sitio activo pierde su forma." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre los aminoácidos es FALSA?", op: ["Todos los aminoácidos tienen el mismo radical R", "Todos tienen un grupo amino y un grupo carboxilo", "En las proteínas hay 20 distintos", "Son anfóteros"], ok: 0, porque: "Lo que cambia es el R: por eso hay 20 aminoácidos distintos." },
        { q: "¿Cuál de estas afirmaciones sobre el enlace peptídico es FALSA?", op: ["Se forma con el consumo de una molécula de agua", "Se forma entre un –COOH y un –NH₂", "Es un enlace covalente", "Se rompe por hidrólisis"], ok: 0, porque: "Al formarse se libera agua; para romperlo se añade agua." },
        { q: "¿Cuál de estas afirmaciones sobre la desnaturalización es FALSA?", op: ["La proteína desnaturalizada pierde su secuencia de aminoácidos", "Se rompen puentes de hidrógeno e interacciones débiles", "El calor puede causarla", "La proteína pierde su función"], ok: 0, porque: "La secuencia primaria, con sus enlaces peptídicos, se conserva." },
        { q: "¿Cuál de estas afirmaciones sobre la estructura de las proteínas es FALSA?", op: ["Todas las proteínas tienen estructura cuaternaria", "La hélice α es estructura secundaria", "La primaria es la secuencia de aminoácidos", "La hemoglobina tiene estructura cuaternaria"], ok: 0, porque: "Solo la tienen las proteínas formadas por varias cadenas." },
        { q: "¿Cuál de estas afirmaciones sobre las enzimas es FALSA?", op: ["La enzima se consume al catalizar la reacción", "Baja la energía de activación", "Es muy específica de su sustrato", "Se desnaturaliza con calor excesivo"], ok: 0, porque: "La enzima se recupera intacta al final de cada ciclo." },
        { q: "¿Cuál de estas afirmaciones sobre la cinética enzimática es FALSA?", op: ["Al aumentar el sustrato, la velocidad aumenta sin límite", "Existe una velocidad máxima por saturación", "Una Km baja indica gran afinidad", "Duplicar la enzima duplica la Vmax"], ok: 0, porque: "Con todas las enzimas ocupadas la velocidad llega a un tope (Vmax)." },
        { q: "¿Cuál de estas afirmaciones sobre los factores de la actividad enzimática es FALSA?", op: ["El frío desnaturaliza las enzimas de forma irreversible", "El calor excesivo desnaturaliza las enzimas", "Cada enzima tiene su pH óptimo", "El inhibidor competitivo se parece al sustrato"], ok: 0, porque: "El frío solo ralentiza; no destruye la forma de la enzima." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: proteínas y enzimas",
      cartas: [
        { a: "Aminoácido", b: "H₂N–CH(R)–COOH: amino, carboxilo, H y radical R sobre el carbono α. Hay 20." },
        { a: "Enlace peptídico", b: "–CO–NH–, covalente, entre carboxilo y amino; libera H₂O. n aminoácidos → n − 1 enlaces." },
        { a: "Aminoácidos esenciales", b: "Los que no fabricamos: 9 en el adulto (His, Ile, Leu, Lys, Met, Phe, Thr, Trp, Val)." },
        { a: "Aminoácido anfótero", b: "Actúa como ácido o base; a pH ≈ 7 es un ion dipolar. Punto isoeléctrico: carga neta cero." },
        { a: "Estructura primaria", b: "Secuencia de aminoácidos. Enlaces peptídicos." },
        { a: "Estructura secundaria", b: "Hélice α o lámina β. Puentes de hidrógeno entre –CO– y –NH–." },
        { a: "Estructura terciaria", b: "Forma 3D de una cadena. Enlaces entre radicales (S–S, H, iónicos, hidrofóbicos)." },
        { a: "Estructura cuaternaria", b: "Varias cadenas unidas. Solo en proteínas con subunidades (hemoglobina)." },
        { a: "Desnaturalización", b: "Pérdida de la forma 3D por rotura de enlaces débiles; la primaria se conserva. Calor, pH, alcohol, urea." },
        { a: "Holoproteína y heteroproteína", b: "Solo aminoácidos / con grupo prostético (hemoglobina, glucoproteínas)." },
        { a: "Enzima", b: "Catalizador biológico proteico: baja la Ea, es específico y no se consume." },
        { a: "Sitio activo", b: "Zona de la enzima que une al sustrato: centro de unión y centro catalítico." },
        { a: "Llave-cerradura y ajuste inducido", b: "Fischer, 1894 (sitio rígido). Koshland, 1958 (la enzima se adapta al sustrato)." },
        { a: "Apoenzima, cofactor y holoenzima", b: "Proteína sola + cofactor = enzima activa. Coenzima: orgánica, de una vitamina." },
        { a: "Vmax y Km", b: "Vmax: todas las enzimas saturadas. Km: [S] a Vmax/2; Km baja = alta afinidad." },
        { a: "Inhibidor competitivo", b: "Ocupa el sitio activo. Km aparente ↑, Vmax igual. Se supera con más sustrato." },
        { a: "Inhibidor no competitivo", b: "Se une fuera del sitio activo. Vmax ↓, Km igual. No se supera con sustrato." },
        { a: "Zimógeno y retroinhibición", b: "Enzima inactiva que se activa donde hace falta / el producto final inhibe la primera enzima de su ruta." },
        { a: "Temperatura y pH óptimos", b: "Curva en campana. Humana ≈ 37 °C; pepsina pH ≈ 2, amilasa ≈ 6,8, tripsina ≈ 8." }
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
  O("b1", 1, "¿Qué cuatro grupos se unen al carbono α de un aminoácido?", ["Grupo amino, grupo carboxilo, hidrógeno y radical R", "Dos grupos amino, un carboxilo y un hidrógeno", "Un grupo fosfato, un azúcar, una base y un hidrógeno", "Un carboxilo, un hidroxilo, un metilo y un fosfato"], 0, ["Todos los aminoácidos comparten amino, carboxilo y H.", "Lo único que cambia es el radical R."], "Amino, carboxilo, H y R");
  O("b2", 1, "¿Cuántos aminoácidos distintos forman las proteínas de los seres vivos?", ["20", "4", "64", "9"], 0, ["Son 20 aminoácidos proteinogénicos.", "El 4 son las bases del ADN, el 64 los tripletes y el 9 los aminoácidos esenciales del adulto."], "20");
  O("b3", 1, "¿Qué se libera cuando se forma un enlace peptídico?", ["Una molécula de agua", "Una molécula de oxígeno", "Un ion fosfato", "Nada: los aminoácidos solo se pegan"], 0, ["Es una condensación: –COOH + H₂N– → –CO–NH– + H₂O."], "Una molécula de agua");
  V("b4", 1, "Todas las proteínas tienen estructura cuaternaria.", false, ["Solo la tienen las formadas por más de una cadena", "La estructura cuaternaria es la secuencia de aminoácidos", "La estructura cuaternaria no existe", "Solo la tienen las enzimas"], 0, ["La mioglobina (una cadena) llega hasta la terciaria.", "La hemoglobina (cuatro cadenas) tiene cuaternaria."]);
  O("b5", 1, "La hélice α y la lámina β son estructuras…", ["secundarias", "primarias", "terciarias", "cuaternarias"], 0, ["Son plegamientos locales regulares mantenidos por puentes de H.", "Eso es la estructura secundaria."], "Secundarias");
  T("b6", 1, "¿Qué tipo de enlace débil estabiliza la hélice α y la lámina β?", "Enlace", ["puentes de hidrogeno", "puente de hidrogeno", "enlaces de hidrogeno", "enlace de hidrogeno"], ["Se forman entre el –CO– de un aminoácido y el –NH– de otro de la cadena."], "Puentes de hidrógeno");
  O("b7", 1, "Al cocer un huevo se desnaturalizan sus proteínas. ¿Qué significa?", ["Pierden su forma 3D, pero conservan su secuencia de aminoácidos", "Se rompen todos los enlaces peptídicos", "Pierden su secuencia primaria", "Se convierten en aminoácidos libres"], 0, ["El calor rompe los enlaces débiles.", "Los enlaces peptídicos resisten: la primaria queda intacta."], "Pierden la forma 3D; la primaria se conserva");
  O("b8", 1, "¿Qué proteína transporta el oxígeno en la sangre?", ["Hemoglobina", "Colágeno", "Insulina", "Actina"], 0, ["La hemoglobina de los glóbulos rojos une O₂ en su grupo hemo."], "Hemoglobina");
  M("b9", 1, "Une cada proteína con su función.",
    [C("Colágeno", ["Estructural", "Transporte de O₂", "Hormonal", "Defensiva"], 0), C("Hemoglobina", ["Transporte de O₂", "Estructural", "Hormonal", "Defensiva"], 0), C("Insulina", ["Hormonal", "Estructural", "Transporte de O₂", "Defensiva"], 0), C("Anticuerpo", ["Defensiva", "Estructural", "Transporte de O₂", "Hormonal"], 0)],
    ["El colágeno forma tendones y piel.", "La hemoglobina transporta O₂.", "La insulina es una hormona.", "Los anticuerpos defienden frente a antígenos."], "Colágeno: estructural; hemoglobina: transporte; insulina: hormonal; anticuerpo: defensiva");
  O("b10", 1, "Una enzima es…", ["un catalizador biológico de naturaleza proteica", "un glúcido de reserva", "un lípido de la membrana", "un ácido nucleico"], 0, ["Casi todas las enzimas son proteínas que aceleran reacciones."], "Un catalizador biológico proteico");
  V("b11", 1, "Una enzima se consume en la reacción que cataliza.", false, ["Se recupera intacta al final y puede actuar de nuevo", "Se transforma en el producto", "Se gasta para dar energía a la reacción", "Se disuelve en el agua"], 0, ["E + S ⇌ ES → E + P: la enzima aparece a ambos lados."]);
  O("b12", 1, "La zona de la enzima a la que se une el sustrato se llama…", ["sitio activo", "cofactor", "apoenzima", "zimógeno"], 0, ["Es una pequeña región formada por pocos aminoácidos."], "Sitio activo");
  T("b13", 1, "Muchos nombres de enzimas terminan con el sufijo…", "Sufijo", ["asa", "-asa"], ["Lactosa → lactasa; lipasa; amilasa."], "-asa");
  O("b14", 1, "Si una enzima humana se calienta a 90 °C…", ["se desnaturaliza y deja de funcionar", "trabaja más deprisa que nunca", "se hace más específica", "se convierte en cofactor"], 0, ["Por encima del óptimo se rompen los enlaces débiles que dan forma al sitio activo."], "Se desnaturaliza");
  O("b15", 1, "La pepsina trabaja en el estómago. Su pH óptimo es…", ["≈ 2 (muy ácido)", "≈ 7 (neutro)", "≈ 8 (ligeramente básico)", "≈ 12 (muy básico)"], 0, ["El jugo gástrico tiene pH ≈ 1,5–2.", "Cada enzima tiene el óptimo del lugar donde trabaja."], "pH ≈ 2");
  X("b16", 1, "Un péptido está formado por 12 aminoácidos unidos en una cadena. ¿Cuántos enlaces peptídicos tiene?", "Enlaces =", 11, "", ["n aminoácidos → n − 1 enlaces.", "12 − 1 = 11."], "11 enlaces peptídicos");

  // ---- nivel 2
  X("c1", 2, "Una proteína de una sola cadena de 150 aminoácidos se forma por condensación. ¿Cuántas moléculas de agua se liberaron?", "Moléculas de agua =", 149, "", ["Cada enlace peptídico libera una molécula de agua.", "150 − 1 = 149 enlaces → 149 H₂O."], "149 moléculas de agua");
  X("c2", 2, "Calcula la masa molar del dipéptido Gly-Ala. (Gly 75,07; Ala 89,09; agua 18,015 g/mol)", "M (g/mol) =", 146.15, "g/mol", ["Suma: 75,07 + 89,09 = 164,16.", "Se pierde 1 H₂O: 164,16 − 18,015 = 146,15 g/mol."], "146,15 g/mol");
  X("c3", 2, "¿Cuántos tripéptidos distintos se pueden formar con los 20 aminoácidos (cada uno puede repetirse)?", "Tripéptidos =", 8000, "", ["20 opciones en cada una de las 3 posiciones.", "20³ = 8000."], "8000");
  X("c4", 2, "¿Cuántos tetrapéptidos distintos hay con los 20 aminoácidos?", "Tetrapéptidos =", 160000, "", ["20⁴ = 20 · 20 · 20 · 20.", "= 160 000."], "160 000");
  X("c5", 2, "Calcula la masa molar del tetrapéptido Ser-Gly-Ala-Cys. (Ser 105,09; Gly 75,07; Ala 89,09; Cys 121,16; agua 18,015 g/mol)", "M (g/mol) =", 336.37, "g/mol", ["Suma: 105,09 + 75,07 + 89,09 + 121,16 = 390,41.", "4 aminoácidos → 3 enlaces → 3 H₂O: 3 · 18,015 = 54,045.", "390,41 − 54,045 = 336,37 g/mol."], "336,37 g/mol");
  V("c6", 2, "Si se aumenta la concentración de sustrato sin límite, la velocidad de la reacción aumenta sin límite.", false, ["Se llega a la Vmax, cuando todas las enzimas están saturadas", "Porque el sustrato inhibe a la enzima", "Porque la enzima se consume", "Porque la Km aumenta"], 0, ["Con todas las enzimas ocupadas, más sustrato no acelera nada."]);
  O("c7", 2, "La enzima A tiene Km = 0,5 mM y la enzima B, Km = 5 mM para el mismo sustrato. ¿Cuál tiene más afinidad?", ["La A: con menos sustrato ya está a media velocidad", "La B: necesita más sustrato", "Las dos por igual", "No se puede saber sin la Vmax"], 0, ["Km baja = alta afinidad.", "A llega a Vmax/2 con 0,5 mM; B necesita 5 mM."], "La enzima A");
  X("c8", 2, "Con la ecuación v = Vmax · [S] / (Km + [S]), ¿qué fracción de la Vmax se alcanza cuando [S] = Km?", "v / Vmax =", 0.5, "", ["[S] = Km → v = Vmax · Km / (2 Km).", "= Vmax / 2: una fracción de 0,5 (50 %)."], "0,5 (la mitad de Vmax)");
  X("c9", 2, "¿Qué fracción de la Vmax se alcanza cuando [S] = 9 · Km?", "v / Vmax =", 0.9, "", ["v / Vmax = 9 Km / (Km + 9 Km) = 9 / 10.", "= 0,9 (90 %)."], "0,9 (el 90 %)");
  M("c10", 2, "Une cada descripción con el tipo de inhibición.",
    [C("Se parece al sustrato y compite por el sitio activo", ["Competitiva", "No competitiva", "Irreversible"], 0), C("Se une fuera del sitio activo y baja la Vmax", ["No competitiva", "Competitiva", "Irreversible"], 0), C("Se une con enlace covalente (como la penicilina)", ["Irreversible", "Competitiva", "No competitiva"], 0)],
    ["Competitiva: mismo sitio, Vmax igual.", "No competitiva: otro sitio, Vmax baja.", "Irreversible: enlace covalente, la enzima queda inutilizada."], "Competitiva; no competitiva; irreversible");
  O("c11", 2, "¿Qué efecto tiene un inhibidor competitivo?", ["La Km aparente aumenta y la Vmax no cambia", "La Vmax disminuye y la Km no cambia", "La Km y la Vmax aumentan", "La Km disminuye y la Vmax aumenta"], 0, ["Compite por el sitio activo: hace falta más sustrato para llegar a Vmax/2.", "Con mucho sustrato se alcanza la misma Vmax."], "Km aparente ↑, Vmax igual");
  O("c12", 2, "¿Qué efecto tiene un inhibidor no competitivo?", ["La Vmax disminuye y la Km no cambia", "La Km aparente aumenta y la Vmax no cambia", "La Vmax aumenta", "Ni la Vmax ni la Km cambian"], 0, ["Inutiliza una parte de las enzimas: la meseta baja.", "No afecta a la unión del sustrato: la Km es la misma."], "Vmax ↓, Km igual");
  O("c13", 2, "La actividad de una enzima aumenta de 10 a 40 °C y cae casi a cero a 60 °C. ¿Por qué cae?", ["La enzima se desnaturaliza", "Se agota el sustrato del tubo", "El calor aumenta la energía de activación", "Las enzimas solo funcionan por debajo de 40 °C por definición"], 0, ["Por encima del óptimo se rompen los enlaces débiles del plegamiento.", "El sitio activo pierde su forma y la enzima deja de funcionar."], "Desnaturalización por el calor");
  X("c14", 2, "A 20 °C una reacción enzimática va a 1,5 µmol/min y tiene Q₁₀ = 2. ¿A qué velocidad irá a 40 °C (por debajo del óptimo)?", "v (µmol/min) =", 6, "µmol/min", ["De 20 a 40 °C hay dos saltos de 10 °C.", "1,5 · 2 · 2 = 6 µmol/min."], "6 µmol/min");
  V("c15", 2, "En la inhibición competitiva, aumentar la concentración de sustrato puede superar el efecto del inhibidor.", true, ["El sustrato desplaza al inhibidor del sitio activo", "El inhibidor se destruye con el sustrato", "El sustrato cambia la forma del inhibidor", "El sustrato aumenta la Km"], 0, ["Inhibidor y sustrato compiten por el mismo sitio: con mucho sustrato, este gana."]);
  O("c16", 2, "Se duplica la concentración de enzima manteniendo el sustrato en exceso. Entonces…", ["la Vmax se duplica y la Km no cambia", "la Vmax no cambia y la Km se duplica", "ambas se duplican", "ninguna cambia"], 0, ["El doble de enzima ofrece el doble de sitios activos.", "La Km depende de la enzima y del sustrato, no de cuánta enzima haya."], "Vmax ×2, Km igual");
  T("c17", 2, "Completa: la parte proteica de una enzima unida a su cofactor, completa y activa, se llama…", "Término", ["holoenzima"], ["Apoenzima (proteína sola, inactiva) + cofactor = holoenzima."], "Holoenzima");
  M("c18", 2, "Completa lo que le pasa a una enzima humana con la temperatura.",
    [C("De 0 a 37 °C", ["La actividad aumenta", "La actividad disminuye", "No cambia"], 0), C("Muy por encima de su óptimo", ["La enzima se desnaturaliza", "La enzima se hace más específica", "Aumentan los choques sin límite"], 0), C("Si estaba desnaturalizada y se enfría", ["No recupera la actividad", "Recupera toda la actividad", "Se convierte en coenzima"], 0)],
    ["Hasta el óptimo: más energía cinética, más choques.", "Pasado el óptimo se rompen los enlaces débiles.", "Cuando el calor ha deformado el sitio activo, enfriar no lo recompone."], "Aumenta; se desnaturaliza; no se recupera");
  O("c19", 2, "En la desnaturalización de una proteína, ¿cuál de estos enlaces NO se rompe?", ["El enlace peptídico", "Los puentes de hidrógeno", "Las interacciones hidrofóbicas", "Las atracciones iónicas"], 0, ["Los enlaces peptídicos son covalentes y fuertes.", "Los otros tres son los enlaces débiles que mantienen la forma."], "El enlace peptídico");
  O("c20", 2, "La gelatina no cuaja si se le añade piña fresca, pero sí con piña en lata. ¿Por qué?", ["La piña fresca tiene bromelina, que rompe las proteínas de la gelatina; en la lata se desnaturalizó con el calor", "La piña fresca es muy ácida y desnaturaliza la bromelina", "La piña tiene mucha agua y diluye la gelatina", "La piña fresca contiene lipasa, que digiere el colágeno"], 0, ["La bromelina es una proteasa y la gelatina es colágeno.", "El enlatado calienta la piña: la enzima se desnaturaliza y deja de actuar."], "Bromelina activa (fresca) frente a desnaturalizada (lata)");

  // ---- nivel 3
  X("d1", 3, "Una enzima tiene Vmax = 100 µmol/min y Km = 2 mM. ¿Cuál es su velocidad con [S] = 6 mM?", "v (µmol/min) =", 75, "µmol/min", ["v = Vmax · [S] / (Km + [S]).", "v = 100 · 6 / (2 + 6) = 75 µmol/min."], "75 µmol/min");
  X("d2", 3, "Una enzima con Vmax = 80 µmol/min alcanza 40 µmol/min con [S] = 3 mM. ¿Cuál es su Km?", "Km (mM) =", 3, "mM", ["40 es la mitad de Vmax.", "La [S] a la que v = Vmax/2 es la Km: 3 mM."], "Km = 3 mM");
  X("d3", 3, "Con un inhibidor competitivo la Km aparente de la enzima del ejercicio d1 pasa a 6 mM (la Vmax sigue siendo 100 µmol/min). ¿Qué velocidad se alcanza con [S] = 12 mM?", "v (µmol/min) =", 66.67, "µmol/min", ["v = 100 · 12 / (6 + 12).", "= 1200 / 18 = 66,7 µmol/min (sin inhibidor serían 85,7)."], "≈ 66,7 µmol/min", 0.005);
  X("d4", 3, "Con un inhibidor no competitivo la enzima del ejercicio d1 baja su Vmax a 50 µmol/min (Km = 2 mM). ¿Qué velocidad se alcanza con [S] = 18 mM?", "v (µmol/min) =", 45, "µmol/min", ["v = 50 · 18 / (2 + 18).", "= 900 / 20 = 45 µmol/min: nunca supera 50, por mucho sustrato que haya."], "45 µmol/min");
  X("d5", 3, "Una proteína de 300 aminoácidos está codificada por un gen. ¿Cuántos nucleótidos, como mínimo, tiene la región codificante si se cuenta también el triplete de terminación?", "Nucleótidos =", 903, "", ["Cada aminoácido: 3 nucleótidos → 300 · 3 = 900.", "Más el triplete de terminación (3): 903."], "903 nucleótidos");
  X("d6", 3, "La masa media de un aminoácido dentro de una cadena es ≈ 110 Da. ¿Cuál es la masa aproximada, en kDa, de una proteína de 250 aminoácidos?", "M (kDa) =", 27.5, "kDa", ["250 · 110 = 27 500 Da.", "1 kDa = 1000 Da → 27,5 kDa."], "≈ 27,5 kDa");
  X("d7", 3, "La hemoglobina adulta tiene 4 cadenas: 2 α de 141 aminoácidos y 2 β de 146. ¿Cuántos enlaces peptídicos hay en total dentro de las cadenas?", "Enlaces =", 570, "", ["Aminoácidos totales: 2 · 141 + 2 · 146 = 574.", "Cada cadena tiene un enlace menos que aminoácidos: 574 − 4 = 570."], "570 enlaces peptídicos");
  X("d8", 3, "La insulina madura tiene dos cadenas, A (21 aminoácidos) y B (30 aminoácidos), unidas por puentes disulfuro. ¿Cuántos enlaces peptídicos hay?", "Enlaces =", 49, "", ["Aminoácidos: 21 + 30 = 51.", "Dos cadenas → 51 − 2 = 49 enlaces peptídicos (los puentes S–S no son peptídicos)."], "49 enlaces peptídicos");
  X("d9", 3, "Una proteína hipotética está formada por 3 cadenas de 1000 aminoácidos cada una. Si se hidroliza por completo en aminoácidos libres, ¿cuántas moléculas de agua se consumen?", "Moléculas de agua =", 2997, "", ["Hay 3 · 1000 = 3000 aminoácidos y 3 cadenas.", "Enlaces peptídicos: 3000 − 3 = 2997.", "Romper cada enlace por hidrólisis consume una molécula de agua: 2997."], "2997 moléculas de agua");
  O("d10", 3, "Se mide el O₂ desprendido por la catalasa de una patata en un minuto: 20 °C: 4 mL; 37 °C: 9 mL; 60 °C: 1 mL; extracto previamente hervido (a 37 °C): 0 mL. ¿Qué conclusión es correcta?", ["La mayor actividad es a 37 °C; a 60 °C el calor desnaturaliza parte de la enzima y el hervido la inactiva del todo", "A más temperatura siempre hay más actividad", "La catalasa no depende de la temperatura", "El extracto hervido es el más activo porque está esterilizado"], 0, ["De 20 a 37 °C la actividad sube.", "A 60 °C baja: desnaturalización parcial.", "El hervido no produce nada: desnaturalización irreversible."], "Óptimo cerca de 37 °C; el calor desnaturaliza");
  O("d11", 3, "Se mezclan amilasa salival y almidón a distintos pH y se mide cuánto tarda en desaparecer el color azul del lugol: pH 2: no desaparece; pH 4: 20 min; pH 6,8: 2 min; pH 9: 15 min. ¿Qué indica?", ["El pH óptimo está cerca de 6,8; a pH muy ácido casi no actúa", "El pH óptimo es 2", "El pH no influye en la actividad", "A pH 9 la actividad es máxima"], 0, ["Cuanto menos tarda en desaparecer el azul, más activa es la amilasa.", "La mayor rapidez es a pH 6,8."], "Óptimo ≈ 6,8");
  O("d12", 3, "Una proteína tratada con urea pierde su actividad. Al eliminar la urea por diálisis, la recupera. ¿Qué se concluye?", ["La secuencia primaria contiene la información para replegarse: la desnaturalización fue reversible", "La urea rompió los enlaces peptídicos y estos se rehicieron solos", "La proteína se sintetizó de nuevo", "La urea actuaba como cofactor"], 0, ["Es el experimento de Anfinsen con la ribonucleasa (1961).", "La urea rompe enlaces débiles, no los peptídicos."], "Reversible: la secuencia determina el plegamiento");
  V("d13", 3, "Un inhibidor no competitivo puede anularse añadiendo mucho sustrato.", false, ["El inhibidor no está en el sitio activo y el sustrato no puede desplazarlo", "Porque el sustrato aumenta la Km", "Porque el inhibidor es covalente", "Porque la Vmax aumenta con el sustrato"], 0, ["En la competitiva sí compite el sustrato; en la no competitiva, no."]);
  O("d14", 3, "Dos curvas de v frente a [S]: A se aplana en 100 y B, con un inhibidor, se aplana en 60 con la misma Km. ¿Cómo se explica B?", ["Inhibición no competitiva: baja la Vmax", "Inhibición competitiva: sube la Km", "Tiene más enzima que A", "Tiene más afinidad por el sustrato que A"], 0, ["Una Vmax menor con la misma Km es la huella de la inhibición no competitiva.", "Más enzima elevaría la Vmax; mayor afinidad bajaría la Km."], "Inhibición no competitiva");
  X("d15", 3, "Una enzima tiene Km = 4 mM. ¿Qué concentración de sustrato hace falta para alcanzar el 80 % de su Vmax?", "[S] (mM) =", 16, "mM", ["0,8 = [S] / (4 + [S]) → 0,8 · 4 + 0,8 [S] = [S].", "3,2 = 0,2 [S] → [S] = 16 mM (4 veces la Km)."], "16 mM");
  R("d16", "Define enzima y explica cómo actúa y por qué es específica. (Pregunta tipo PAU)", [
    { t: "Definición: catalizador biológico, casi siempre una proteína", p: 0.4 },
    { t: "Sitio activo y complejo enzima-sustrato (E + S → ES → E + P)", p: 0.5 },
    { t: "Baja la energía de activación; no se consume ni cambia el equilibrio", p: 0.5 },
    { t: "Especificidad por la forma 3D del sitio activo (llave-cerradura o ajuste inducido)", p: 0.4 },
    { t: "Ejemplo correcto (amilasa, catalasa, lactasa…)", p: 0.2 }], ["Definición.", "Sitio activo y complejo ES.", "Energía de activación.", "Especificidad."], "Catalizador proteico; ES; baja la Ea; específico por la forma");
  R("d17", "Describe los cuatro niveles de estructura de una proteína e indica los enlaces de cada uno. (Pregunta tipo PAU)", [
    { t: "Primaria: secuencia de aminoácidos con enlaces peptídicos", p: 0.4 },
    { t: "Secundaria: hélice α o lámina β con puentes de hidrógeno", p: 0.5 },
    { t: "Terciaria: plegamiento 3D de una cadena (S–S, H, iónicos, hidrofóbicos)", p: 0.5 },
    { t: "Cuaternaria: varias cadenas (ejemplo: hemoglobina)", p: 0.4 },
    { t: "Lenguaje científico correcto y orden", p: 0.2 }], ["Primaria.", "Secundaria.", "Terciaria.", "Cuaternaria."], "Primaria → secundaria → terciaria → cuaternaria");
  R("d18", "¿Qué es la desnaturalización de una proteína? Indica causas, qué se rompe y consecuencias. (Pregunta tipo PAU)", [
    { t: "Definición: pérdida de la estructura 3D con la secuencia intacta", p: 0.5 },
    { t: "Causas: calor, pH extremo, disolventes, urea, metales pesados", p: 0.4 },
    { t: "Se rompen enlaces débiles; no los peptídicos", p: 0.4 },
    { t: "Consecuencia: pérdida de función (y de solubilidad); ejemplo del huevo", p: 0.4 },
    { t: "Puede ser reversible (renaturalización) o irreversible", p: 0.3 }], ["Definición.", "Causas.", "Enlaces.", "Consecuencias y reversibilidad."], "Pérdida de forma y función sin romper la primaria");
  R("d19", "Compara la inhibición competitiva y la no competitiva, y explica cómo cambia la gráfica de Michaelis–Menten en cada caso. (Pregunta tipo PAU)", [
    { t: "Competitiva: inhibidor parecido al sustrato que ocupa el sitio activo", p: 0.5 },
    { t: "No competitiva: se une a otro sitio y cambia la forma de la enzima", p: 0.5 },
    { t: "Efectos: competitiva sube la Km y mantiene la Vmax; no competitiva baja la Vmax y mantiene la Km", p: 0.4 },
    { t: "La competitiva se supera con más sustrato; la no competitiva no", p: 0.3 },
    { t: "Ejemplo correcto de alguna", p: 0.3 }], ["Competitiva.", "No competitiva.", "Gráfica.", "Con más sustrato."], "Competitiva: Km ↑; no competitiva: Vmax ↓");
  R("d20", "Explica cómo influyen la concentración de sustrato, la temperatura, el pH y los inhibidores en la actividad de una enzima. (Pregunta tipo PAU)", [
    { t: "Sustrato: aumenta la velocidad hasta la saturación (Vmax)", p: 0.4 },
    { t: "Concentración de enzima: más enzima, mayor Vmax", p: 0.3 },
    { t: "Temperatura: sube hasta el óptimo y cae por desnaturalización", p: 0.5 },
    { t: "pH: curva en campana con óptimo propio de cada enzima", p: 0.5 },
    { t: "Inhibidores y regulación (competitivo, no competitivo, alostérico)", p: 0.3 }], ["Sustrato y enzima.", "Temperatura.", "pH.", "Inhibidores."], "Saturación; óptimo de T y pH; inhibidores");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Niveles de estructura", ancha: true,
      tabla: { cab: ["Nivel", "Enlace", "Ejemplo"], filas: [
        ["Primaria", "peptídico", "secuencia"],
        ["Secundaria", "puentes de H", "hélice α, lámina β"],
        ["Terciaria", "S–S, iónico, hidrofóbico", "mioglobina"],
        ["Cuaternaria", "enlaces débiles", "hemoglobina"]
      ] } },
    { titulo: "Del aminoácido al péptido",
      pasos: ["Aminoácido: H₂N–CH(R)–COOH.", "El –COOH de uno reacciona con el –NH₂ del siguiente.", "Se forma –CO–NH– y sale H₂O.", "n aminoácidos → n − 1 enlaces y n − 1 H₂O."],
      nota: "La secuencia se escribe del extremo N al extremo C." },
    { titulo: "Michaelis–Menten",
      tabla: { cab: ["Concepto", "Significado"], filas: [
        ["Vmax", "todas las enzimas saturadas"],
        ["Km", "[S] a Vmax/2"],
        ["Km baja", "alta afinidad"],
        ["[E] ×2", "Vmax ×2, Km igual"]
      ] } },
    { titulo: "Inhibición enzimática", ancha: true,
      tabla: { cab: ["Tipo", "Dónde se une", "Vmax", "Km"], filas: [
        ["Competitiva", "sitio activo", "igual", "sube"],
        ["No competitiva", "otro sitio", "baja", "igual"],
        ["Irreversible", "covalente", "baja", "—"]
      ] } },
    { titulo: "Temperatura y pH",
      tabla: { cab: ["Factor", "Efecto"], filas: [
        ["T baja", "lenta, sin daño"],
        ["T óptima", "máxima actividad"],
        ["T alta", "desnaturaliza"],
        ["pH óptimo", "propio de cada enzima"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "La enzima se consume en la reacción", bien: "Se recupera intacta", por: "E + S → ES → E + P." },
        { mal: "La desnaturalización rompe los enlaces peptídicos", bien: "Rompe enlaces débiles", por: "La primaria se conserva." },
        { mal: "Más sustrato, más velocidad sin límite", bien: "Se alcanza la Vmax", por: "Saturación." },
        { mal: "El frío desnaturaliza las enzimas", bien: "El frío solo las ralentiza", por: "El calor excesivo es lo que las destruye." }
      ] }
  ];

  B.registrar("bio2", "t4", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio4a.secciones,
    nuevas: B.parte.bio4a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
