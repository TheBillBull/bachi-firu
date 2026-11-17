/* ============================================================
   Biología II · ampliaciones · Tema 5 (parte B): Ácidos nucleicos
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t5.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Un <b>nucleótido</b> = pentosa + base nitrogenada + fosfato (sin fosfato es un nucleósido). Se encadenan por <b>enlaces fosfodiéster</b> (C3′ con C5′, con pérdida de agua) y la hebra se lee de 5′ a 3′.",
    "El <b>ADN</b> es una <b>doble hélice antiparalela</b> (Watson y Crick, 1953): esqueleto azúcar–fosfato por fuera, bases por dentro, A–T (2 puentes de H) y C–G (3). De ahí la regla de Chargaff: %A = %T y %C = %G.",
    "En los eucariotas el ADN se empaqueta: <b>nucleosoma</b> (≈ 146 pb sobre un octámero de histonas) → fibra de 30 nm (con H1) → bucles → cromosoma. Los procariotas tienen un cromosoma circular sin histonas y plásmidos.",
    "El <b>ARN</b> tiene ribosa y uracilo y es de cadena simple. <b>ARNm</b> lleva la copia del gen, <b>ARNt</b> transporta aminoácidos (anticodón) y <b>ARNr</b> forma los ribosomas; el ADN guarda la información y el ARN la expresa."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Ácidos nucleicos",
    autores: [
      { n: "Qué estudia", f: "las moléculas que guardan y expresan la información genética", l: "ADN · ARN · nucleótidos" },
      { n: "Miescher", f: "1869", l: "aísla la «nucleína» del núcleo" },
      { n: "Hershey y Chase", f: "1952", l: "el material genético es el ADN" },
      { n: "Watson y Crick", f: "1953", l: "modelo de la doble hélice (con datos de Franklin y Wilkins)" }
    ],
    obras: ["Nucleótido", "Enlace fosfodiéster", "Doble hélice", "Nucleosoma", "ARNm · ARNt · ARNr"],
    bloques: [
      { t: "El nucleótido", frases: ["Pentosa + <b>base nitrogenada</b> + <b>fosfato</b>.", "Se unen por <b>enlaces fosfodiéster</b> (C3′ con C5′) y salen H₂O.", "La hebra se lee de 5′ a 3′."],
        tabla: { cab: ["Púricas", "Pirimidínicas"], filas: [["A, G", "C, T, U"], ["dos anillos", "un anillo"]] } },
      { t: "El ADN: doble hélice", frases: ["Dos hebras <b>antiparalelas</b>, enrolladas en hélice dextrógira.", "Esqueleto azúcar–fosfato por fuera; bases por dentro.", "Diámetro 2 nm; 0,34 nm por par de bases; 10 pb por vuelta."],
        tabla: { cab: ["Pareja", "Puentes de H"], filas: [["A – T", "2"], ["C – G", "3"]] } },
      { t: "Regla de Chargaff", frases: ["%A = %T y %C = %G en el ADN bicatenario.", "Purinas = pirimidinas: A + G = C + T.", "La proporción (A+T)/(G+C) cambia según la especie."] },
      { t: "Empaquetamiento (eucariotas)", frases: ["<b>Nucleosoma</b>: ≈ 146 pb sobre 8 histonas (H2A, H2B, H3, H4 ×2).", "Fibra de 30 nm (con H1), bucles y cromosoma.", "Procariotas: cromosoma circular, sin histonas, y plásmidos."] },
      { t: "Tipos de ARN", frases: ["<b>ARNm</b>: copia del gen. <b>ARNt</b>: lleva aminoácidos (anticodón).", "<b>ARNr</b>: forma los ribosomas y cataliza el enlace peptídico.", "También hay ARNsn, microARN y ARN interferente."] },
      { t: "ADN frente a ARN", frases: ["La ribosa y el uracilo hacen al ARN más corto y menos estable.", "El ADN guarda la información; el ARN la expresa."],
        tabla: { cab: ["ADN", "ARN"], filas: [["desoxirribosa", "ribosa"], ["A, G, C, T", "A, G, C, U"], ["doble hélice", "cadena simple"]] } }
    ],
    resumen: [
      "Nucleótido = <b>pentosa + base + fosfato</b>; polinucleótido = nucleótidos unidos por <b>enlaces fosfodiéster</b>.",
      "<b>Complementariedad</b> A–T (2 puentes) y C–G (3): explica Chargaff, la replicación y la transcripción.",
      "<b>ADN</b>: doble hélice estable que guarda la información; <b>ARN</b>: cadena simple que la expresa (ARNm, ARNt, ARNr)."
    ],
    conecta: [
      { con: "Biología T1:", rel: "puentes de hidrógeno, carga de los fosfatos y papel de los iones." },
      { con: "Biología T2–T4:", rel: "mismo patrón de condensación; las histonas son proteínas." },
      { con: "Biología T8:", rel: "ATP y NAD⁺: nucleótidos libres en el metabolismo." },
      { con: "Biología T11:", rel: "replicación: cada hebra sirve de molde." },
      { con: "Biología T12:", rel: "transcripción y traducción (ARNm, ARNt, ARNr)." },
      { con: "Química II:", rel: "grupos funcionales: éster de fosfato, aminas, anillos de las bases." }
    ],
    claves: [
      ["Nucleótido", "pentosa, base nitrogenada y fosfato; unidad de los ácidos nucleicos"],
      ["Nucleósido", "pentosa unida a una base, sin grupo fosfato"],
      ["Enlace fosfodiéster", "une el C3′ de un nucleótido con el fosfato en C5′ del siguiente"],
      ["Complementariedad", "emparejamiento específico A–T (o A–U) y C–G por puentes de hidrógeno"],
      ["Antiparalelas", "dos hebras que corren en sentidos opuestos, 5′→3′ y 3′→5′"],
      ["Regla de Chargaff", "en el ADN bicatenario A = T y C = G"],
      ["Nucleosoma", "ADN enrollado sobre un octámero de histonas; unidad de la cromatina"],
      ["Histonas", "proteínas básicas que empaquetan el ADN eucariota"],
      ["Anticodón", "triplete del ARNt complementario al codón del ARNm"],
      ["Ribozima", "ARN con actividad catalítica, como el ARNr del ribosoma"]
    ],
    cita: { txt: "Una célula humana lleva ≈ 2 m de ADN en un núcleo de ≈ 6 µm.", autor: "Dato para recordar", obra: "se compacta unas 360 000 veces" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    bases: {
      titulo: "Púrica o pirimidínica",
      consigna: "Clasifica cada base nitrogenada según el número de anillos.",
      categorias: ["Púrica (dos anillos)", "Pirimidínica (un anillo)"],
      items: [{ t: "Adenina", c: 0 }, { t: "Guanina", c: 0 }, { t: "Citosina", c: 1 }, { t: "Timina", c: 1 }, { t: "Uracilo", c: 1 }]
    },
    adnarn: {
      titulo: "ADN o ARN",
      consigna: "Asigna cada rasgo a la molécula que lo tiene.",
      categorias: ["ADN", "ARN"],
      items: [
        { t: "Desoxirribosa", c: 0 }, { t: "Timina", c: 0 }, { t: "Doble hélice", c: 0 }, { t: "Histonas", c: 0 },
        { t: "Ribosa", c: 1 }, { t: "Uracilo", c: 1 }, { t: "Cadena simple", c: 1 }, { t: "Trébol con anticodón", c: 1 }
      ]
    },
    ordenpoli: {
      titulo: "Formación de un enlace fosfodiéster",
      consigna: "Ordena los pasos al añadir un nucleótido a una hebra.",
      items: [
        { t: "La hebra termina en un carbono 3′ con un grupo –OH libre" },
        { t: "El nucleótido que llega aporta su fosfato unido al carbono 5′" },
        { t: "El –OH del C3′ reacciona con el fosfato del C5′" },
        { t: "Se forma un enlace fosfodiéster y se libera una molécula de agua" },
        { t: "La hebra crece en sentido 5′→3′ y queda un nuevo C3′ libre" }
      ]
    },
    ordenempaq: {
      titulo: "Empaquetamiento del ADN eucariota",
      consigna: "Ordena los niveles de menor a mayor grado de compactación.",
      items: [
        { t: "Doble hélice de ADN (2 nm)" },
        { t: "Collar de perlas: nucleosomas (11 nm)" },
        { t: "Fibra de cromatina de 30 nm" },
        { t: "Bucles sobre un armazón proteico (300 nm)" },
        { t: "Cromosoma metafásico (1400 nm)" }
      ]
    },
    arn: {
      titulo: "Tipos de ARN",
      consigna: "Une cada tipo de ARN con su función.",
      pares: [
        ["ARNm", "lleva la copia de un gen hasta el ribosoma"],
        ["ARNt", "transporta un aminoácido y lo coloca gracias a su anticodón"],
        ["ARNr", "forma los ribosomas y cataliza el enlace peptídico"],
        ["ARNsn", "forma parte del espliceosoma, que elimina los intrones"],
        ["ARNmi", "apaga genes bloqueando o destruyendo ARNm concretos"]
      ]
    },
    quiz1: {
      titulo: "Test del tema 5",
      preguntas: [
        { q: "Un nucleótido está formado por…", op: ["una pentosa, una base nitrogenada y un grupo fosfato", "una pentosa y una base nitrogenada", "un aminoácido y un fosfato", "una hexosa y tres ácidos grasos"], ok: 0, porque: "Sin el fosfato sería un nucleósido." },
        { q: "El enlace que une nucleótidos consecutivos es…", op: ["fosfodiéster", "peptídico", "glucosídico", "éster simple entre ácidos grasos"], ok: 0, porque: "Une el C3′ de uno con el fosfato del C5′ del siguiente." },
        { q: "En el ADN, la adenina se empareja con…", op: ["timina, con dos puentes de hidrógeno", "citosina, con tres puentes de hidrógeno", "guanina, con dos puentes de hidrógeno", "uracilo, con tres puentes de hidrógeno"], ok: 0, porque: "A–T lleva 2 puentes; C–G, 3." },
        { q: "Una muestra de ADN bicatenario tiene un 20 % de citosina. ¿Qué porcentaje de adenina tiene?", op: ["30 %", "20 %", "40 %", "60 %"], ok: 0, porque: "C = G = 20 %; A + T = 60 %; A = T = 30 %." },
        { q: "Las dos hebras del ADN son…", op: ["antiparalelas y complementarias", "paralelas e idénticas", "paralelas y complementarias", "antiparalelas e idénticas"], ok: 0, porque: "Una va de 5′ a 3′ y la otra de 3′ a 5′, con bases complementarias." },
        { q: "El nucleosoma está formado por ADN enrollado sobre…", op: ["un octámero de histonas", "un tetrámero de ARN", "una molécula de ATP", "un ribosoma"], ok: 0, porque: "Dos copias de H2A, H2B, H3 y H4 (8 histonas)." },
        { q: "¿Qué ARN lleva el anticodón?", op: ["el ARN de transferencia", "el ARN mensajero", "el ARN ribosómico", "el ARN interferente"], ok: 0, porque: "El ARNt reconoce el codón del ARNm gracias a su anticodón." },
        { q: "Una diferencia entre el ADN y el ARN es que el ARN…", op: ["tiene ribosa y uracilo", "tiene desoxirribosa y timina", "siempre es de doble hélice", "no contiene fosfato"], ok: 0, porque: "El ADN tiene desoxirribosa y timina." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre el nucleótido es FALSA?", op: ["El nucleósido es el nucleótido con el grupo fosfato", "Lleva una pentosa", "Lleva una base nitrogenada", "Se une a otros por enlaces fosfodiéster"], ok: 0, porque: "El nucleósido es pentosa + base, sin fosfato." },
        { q: "¿Cuál de estas afirmaciones sobre las bases es FALSA?", op: ["La timina es una base púrica", "La adenina es una base púrica", "El uracilo es una base pirimidínica", "La citosina es una base pirimidínica"], ok: 0, porque: "La timina es pirimidínica (un solo anillo)." },
        { q: "¿Cuál de estas afirmaciones sobre la doble hélice es FALSA?", op: ["Las dos hebras son paralelas", "Las bases quedan en el interior", "El esqueleto azúcar–fosfato queda en el exterior", "Las bases se unen por puentes de hidrógeno"], ok: 0, porque: "Las hebras son antiparalelas." },
        { q: "¿Cuál de estas afirmaciones sobre la regla de Chargaff es FALSA?", op: ["En una molécula de ADN bicatenario, A + T siempre es igual a G + C", "En el ADN bicatenario, A = T", "En el ADN bicatenario, C = G", "La relación A+T / G+C varía según la especie"], ok: 0, porque: "A = T y C = G, pero A + T no tiene por qué igualar a G + C: depende de la especie." },
        { q: "¿Cuál de estas afirmaciones sobre el empaquetamiento del ADN es FALSA?", op: ["Los procariotas tienen nucleosomas con histonas", "El nucleosoma tiene un octámero de histonas", "La histona H1 se asocia al ADN de unión", "El cromosoma metafásico es el nivel más condensado"], ok: 0, porque: "Los procariotas no tienen histonas ni nucleosomas." },
        { q: "¿Cuál de estas afirmaciones sobre el ARN es FALSA?", op: ["El ARNr transporta los aminoácidos hasta el ribosoma", "El ARNm lleva la copia de un gen", "El ARNt tiene un anticodón", "El ARNr forma parte de los ribosomas"], ok: 0, porque: "Los aminoácidos los transporta el ARNt." },
        { q: "¿Cuál de estas afirmaciones sobre la desnaturalización del ADN es FALSA?", op: ["Rompe los enlaces fosfodiéster de cada hebra", "Se rompen los puentes de hidrógeno entre las bases", "Un ADN rico en G + C tiene una Tm mayor", "Al enfriar despacio las hebras pueden volver a unirse"], ok: 0, porque: "Solo rompe puentes de hidrógeno; los enlaces fosfodiéster son covalentes y no se rompen." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: ácidos nucleicos",
      cartas: [
        { a: "Nucleótido", b: "Pentosa + base nitrogenada + grupo fosfato." },
        { a: "Nucleósido", b: "Pentosa + base nitrogenada, sin fosfato." },
        { a: "Bases púricas y pirimidínicas", b: "Púricas (2 anillos): A y G. Pirimidínicas (1 anillo): C, T y U." },
        { a: "Enlace fosfodiéster", b: "Une C3′ de un nucleótido con el fosfato de C5′ del siguiente; libera agua." },
        { a: "Sentido de la hebra", b: "Extremo 5′ con fosfato libre; extremo 3′ con –OH libre. Se lee de 5′ a 3′." },
        { a: "Modelo de Watson y Crick (1953)", b: "Doble hélice dextrógira, antiparalela, bases por dentro, A–T y C–G." },
        { a: "Puentes de hidrógeno", b: "A–T: 2. C–G: 3." },
        { a: "Regla de Chargaff", b: "%A = %T y %C = %G (bicatenario); A + G = C + T." },
        { a: "Medidas del ADN-B", b: "2 nm de diámetro; 0,34 nm por pb; 3,4 nm por vuelta (10 pb)." },
        { a: "Nucleosoma", b: "≈ 146 pb sobre un octámero de histonas (H2A, H2B, H3, H4 ×2)." },
        { a: "Niveles de empaquetamiento", b: "Doble hélice → nucleosomas → fibra de 30 nm → bucles → cromosoma." },
        { a: "Procariotas y su ADN", b: "Cromosoma circular, sin histonas, en el nucleoide; plásmidos." },
        { a: "ARNm", b: "Copia de un gen; se lee en codones; en eucariotas lleva caperuza y cola de poli-A." },
        { a: "ARNt", b: "Trébol de 75–90 nt; anticodón; transporta un aminoácido." },
        { a: "ARNr", b: "Forma los ribosomas (70S en procariotas, 80S en eucariotas); ribozima." },
        { a: "ADN frente a ARN", b: "Desoxirribosa/ribosa; T/U; doble hélice/cadena simple; más estable/menos." },
        { a: "Hershey y Chase (1952)", b: "32P marca el ADN, 35S la proteína: solo el ADN entra en la bacteria." }
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
  O("b1", 1, "¿Qué tres componentes forman un nucleótido?", ["Pentosa, base nitrogenada y grupo fosfato", "Hexosa, base nitrogenada y grupo fosfato", "Pentosa, aminoácido y grupo fosfato", "Glicerina, ácido graso y grupo fosfato"], 0, ["Una pentosa (ribosa o desoxirribosa), una de las cinco bases y un fosfato."], "Pentosa, base nitrogenada y fosfato");
  O("b2", 1, "El enlace que une dos nucleótidos consecutivos de una hebra es el…", ["fosfodiéster", "peptídico", "glucosídico", "de hidrógeno"], 0, ["El –OH del C3′ de un nucleótido y el fosfato del C5′ del siguiente forman el enlace fosfodiéster.", "Libera una molécula de agua."], "Enlace fosfodiéster");
  V("b3", 1, "El ADN contiene uracilo en lugar de timina.", false, ["Es el ARN el que lleva uracilo; el ADN lleva timina", "Ambos ácidos nucleicos llevan uracilo", "El ADN no tiene ninguna pirimidina", "El uracilo es una base púrica del ADN"], 0, ["ADN: A, G, C, T. ARN: A, G, C, U."]);
  O("b4", 1, "¿Cuáles son las bases púricas?", ["Adenina y guanina", "Citosina y timina", "Citosina y uracilo", "Timina y uracilo"], 0, ["Púricas: dos anillos (A y G).", "Pirimidínicas: un anillo (C, T, U)."], "Adenina y guanina");
  O("b5", 1, "¿Cuántos puentes de hidrógeno unen una citosina con una guanina?", ["3", "2", "1", "4"], 0, ["A–T: 2 puentes de H; C–G: 3."], "3");
  V("b6", 1, "Las dos hebras de la doble hélice del ADN son antiparalelas.", true, ["Una se lee 5′→3′ y la otra, en sentido contrario, 3′→5′", "Las dos se leen en el mismo sentido", "Solo una de las hebras tiene extremos 5′ y 3′", "Están unidas por enlaces fosfodiéster entre sí"], 0, ["Antiparalelas: sentidos opuestos."]);
  T("b7", 1, "El azúcar del ARN se llama…", "Azúcar", ["ribosa"], ["El ARN lleva ribosa; el ADN, desoxirribosa."], "Ribosa");
  O("b8", 1, "¿Qué tipo de ARN transporta aminoácidos hasta el ribosoma?", ["ARN de transferencia (ARNt)", "ARN mensajero (ARNm)", "ARN ribosómico (ARNr)", "ARN nuclear pequeño (ARNsn)"], 0, ["El ARNt lleva un aminoácido en su extremo 3′ y un anticodón."], "ARN de transferencia");
  O("b9", 1, "¿Qué ARN forma parte de la estructura de los ribosomas?", ["ARN ribosómico (ARNr)", "ARN mensajero (ARNm)", "ARN de transferencia (ARNt)", "ARN interferente (ARNsi)"], 0, ["Los ribosomas son ARNr más proteínas."], "ARN ribosómico");
  V("b10", 1, "El ARN suele ser una molécula de doble cadena, como el ADN.", false, ["Normalmente es de cadena simple, aunque puede plegarse", "Siempre es de doble hélice", "Tiene dos hebras antiparalelas unidas por T–A", "Es más largo que el ADN"], 0, ["El ARN es normalmente monocatenario; algunas zonas se pliegan en horquillas."]);
  M("b11", 1, "Une cada ARN con su función.",
    [C("ARNm", ["Lleva la copia de un gen", "Transporta aminoácidos", "Forma los ribosomas"], 0), C("ARNt", ["Transporta aminoácidos", "Lleva la copia de un gen", "Forma los ribosomas"], 0), C("ARNr", ["Forma los ribosomas", "Lleva la copia de un gen", "Transporta aminoácidos"], 0)],
    ["ARNm: mensaje. ARNt: transporte de aminoácidos. ARNr: ribosomas."], "ARNm → copia del gen; ARNt → aminoácidos; ARNr → ribosomas");
  T("b12", 1, "¿Qué dos científicos propusieron en 1953 el modelo de la doble hélice del ADN?", "Autores", ["Watson y Crick", "Crick y Watson", "Watson and Crick", "Watson, Crick"], ["Usaron los datos de Chargaff y los de difracción de rayos X de Franklin y Wilkins."], "Watson y Crick");
  O("b13", 1, "Si el ADN se enrolla alrededor de un octámero de histonas, se forma un…", ["nucleosoma", "ribosoma", "plásmido", "codón"], 0, ["Es la unidad básica de la cromatina."], "Nucleosoma");
  O("b14", 1, "En la doble hélice, las bases nitrogenadas se encuentran…", ["en el interior, apiladas", "en el exterior, en contacto con el agua", "unidas por enlaces peptídicos", "solo en una de las hebras"], 0, ["Las bases (apolares) quedan dentro; el esqueleto azúcar–fosfato (polar) queda fuera."], "En el interior");
  V("b15", 1, "En una molécula de ADN bicatenario, el porcentaje de adenina es igual al de timina.", true, ["A se empareja siempre con T, así que hay tantas como tantas", "A se empareja con G", "A se empareja con C, y es distinto de T", "Solo ocurre en el ARN"], 0, ["Regla de Chargaff: %A = %T y %C = %G."]);
  O("b16", 1, "El ADN de una bacteria típica es…", ["una molécula circular, sin histonas, en el nucleoide", "varias moléculas lineales dentro de un núcleo", "una molécula lineal con nucleosomas", "una molécula de ARN"], 0, ["Los procariotas no tienen núcleo ni histonas.", "Pueden tener además plásmidos."], "Circular, sin histonas, en el nucleoide");

  // ---- nivel 2
  T("c1", 2, "La hebra 5′-ATCGGATC-3′ forma parte de un ADN bicatenario. Escribe la hebra complementaria, de 3′ a 5′, bajo ella (sin las marcas 3′ y 5′).", "Hebra complementaria", ["TAGCCTAG", "T-A-G-C-C-T-A-G"], ["A–T, T–A, C–G, G–C, G–C, A–T, T–A, C–G.", "La hebra complementaria, de 3′ a 5′, es TAGCCTAG."], "3′-TAGCCTAG-5′");
  X("c2", 2, "Una muestra de ADN bicatenario tiene un 30 % de adenina. ¿Qué porcentaje de guanina tiene?", "% de G =", 20, "%", ["A = T = 30 % → A + T = 60 %.", "G + C = 40 % y G = C → 20 % cada una."], "20 %");
  X("c3", 2, "Un ADN bicatenario tiene un 28 % de citosina. ¿Qué porcentaje de adenina tiene?", "% de A =", 22, "%", ["C = G = 28 % → G + C = 56 %.", "A + T = 44 % → A = T = 22 %."], "22 %");
  X("c4", 2, "Un fragmento de ADN bicatenario tiene en una hebra 5′-ATGCGC-3′ (6 pares de bases). ¿Cuántos puentes de hidrógeno unen las dos hebras?", "Nº de puentes de H =", 16, "", ["Pares: A–T (2), T–A (2), G–C (3), C–G (3), G–C (3), C–G (3).", "2 · 2 + 4 · 3 = 4 + 12 = 16."], "16 puentes de hidrógeno");
  X("c5", 2, "¿Qué longitud tiene un fragmento de ADN de 1000 pares de bases, si cada par ocupa 0,34 nm?", "Longitud (nm) =", 340, "nm", ["1000 · 0,34 nm = 340 nm."], "340 nm");
  X("c6", 2, "Con 10 pares de bases por vuelta, ¿cuántas vueltas completas da la hélice de un fragmento de 1000 pb?", "Nº de vueltas =", 100, "", ["1000 / 10 = 100 vueltas (de 3,4 nm cada una = 340 nm)."], "100 vueltas");
  X("c7", 2, "Una hebra de ADN tiene 20 nucleótidos. ¿Cuántos enlaces fosfodiéster contiene?", "Nº de enlaces =", 19, "", ["Cada enlace une dos nucleótidos consecutivos.", "n nucleótidos → n − 1 enlaces: 19."], "19 enlaces");
  X("c8", 2, "Un plásmido bicatenario de 3000 pb tiene un 40 % de G + C. ¿Cuántas adeninas tiene?", "Nº de A =", 1800, "", ["Bases totales: 2 · 3000 = 6000.", "G + C = 0,40 · 6000 = 2400; A + T = 3600.", "A = T = 1800."], "1800 adeninas");
  T("c9", 2, "Se transcribe una hebra molde 3′-TACGGATTC-5′. Escribe el ARNm resultante, de 5′ a 3′ (sin marcas).", "ARNm", ["AUGCCUAAG", "A-U-G-C-C-U-A-A-G"], ["T→A, A→U, C→G, G→C, G→C, A→U, T→A, T→A, C→G.", "5′-AUGCCUAAG-3′."], "5′-AUGCCUAAG-3′");
  O("c10", 2, "Un ARNm eucariota maduro se caracteriza por llevar…", ["una caperuza en el extremo 5′ y una cola de poli-A en el 3′", "una cola de poli-A en el 5′ y una caperuza en el 3′", "timina en lugar de uracilo", "dos hebras complementarias"], 0, ["Caperuza (7-metilguanosina) en 5′ y poli-A en 3′ protegen al ARNm."], "Caperuza en 5′ y cola de poli-A en 3′");
  M("c11", 2, "Asigna cada rasgo a ADN o a ARN.",
    [C("Desoxirribosa", ["ADN", "ARN"], 0), C("Uracilo", ["ARN", "ADN"], 0), C("Doble hélice", ["ADN", "ARN"], 0)],
    ["La desoxirribosa y la doble hélice son del ADN; el uracilo, del ARN."], "Desoxirribosa → ADN; uracilo → ARN; doble hélice → ADN");
  O("c12", 2, "¿Cuántas histonas forman el núcleo de un nucleosoma?", ["8 (un octámero: 2 de cada H2A, H2B, H3 y H4)", "4 (una de cada tipo)", "2 (H1 y H2)", "146 (una por par de bases)"], 0, ["Octámero de histonas = 8.", "La H1 es de unión y no forma el núcleo."], "8 histonas");
  V("c13", 2, "Las histonas se unen al ADN porque tienen carga positiva y el ADN tiene carga negativa.", true, ["Son proteínas básicas y los fosfatos del ADN están cargados negativamente", "Las histonas son ricas en ácidos grasos y se unen por afinidad hidrofóbica", "El ADN tiene carga positiva por sus bases", "Se unen por enlaces peptídicos con el azúcar"], 0, ["Lisina y arginina aportan carga positiva; los fosfatos, negativa."]);
  O("c14", 2, "La heterocromatina se diferencia de la eucromatina en que…", ["está muy condensada y sus genes están inactivos", "está poco condensada y sus genes están activos", "no contiene ADN", "solo existe en procariotas"], 0, ["Heterocromatina = condensada y silenciada (ej.: X inactivo).", "Eucromatina = laxa y activa."], "Está muy condensada y es inactiva");
  O("c15", 2, "En el experimento de Hershey y Chase, ¿qué molécula marca el isótopo 32P?", ["El ADN, porque contiene fósforo", "Las proteínas, porque contienen fósforo", "El ADN, porque contiene azufre", "Las proteínas, porque contienen azufre"], 0, ["El fósforo está en los grupos fosfato del ADN.", "El azufre (35S) marca las proteínas."], "El ADN");
  X("c16", 2, "Una célula humana diploide tiene 6,4 · 10⁹ pb. Con unos 200 pb por nucleosoma, ¿cuántos millones de nucleosomas hay?", "Millones de nucleosomas =", 32, "millones", ["6,4 · 10⁹ / 200 = 3,2 · 10⁷.", "3,2 · 10⁷ = 32 millones."], "32 millones");

  // ---- nivel 3
  X("d1", 3, "Calcula la longitud en metros del ADN de una célula humana diploide (6,4 · 10⁹ pb, 0,34 nm por pb).", "Longitud (m) =", 2.176, "m", ["6,4 · 10⁹ · 0,34 nm = 2,176 · 10⁹ nm.", "10⁹ nm = 1 m → 2,176 m."], "≈ 2,18 m", 0.01);
  X("d2", 3, "Con Tm ≈ 69,3 + 0,41 · (%G+C), ¿qué Tm (°C) tiene un ADN con un 50 % de G + C?", "Tm (°C) =", 89.8, "°C", ["0,41 · 50 = 20,5.", "69,3 + 20,5 = 89,8 °C."], "89,8 °C", 0.01);
  O("d3", 3, "Una muestra tiene A 20 %, T 20 %, G 30 % y C 30 %. ¿Qué se puede afirmar?", ["Es compatible con un ADN bicatenario (A = T y G = C)", "Es ARN, porque tiene G", "Es ADN monocatenario, porque no hay uracilo", "Es una proteína"], 0, ["A = T y G = C: cumple la regla de Chargaff.", "No hay U, así que no es ARN."], "Compatible con ADN bicatenario");
  O("d4", 3, "Una muestra tiene A 25 %, T 30 %, G 24 % y C 21 %. ¿Qué se puede afirmar?", ["Es ADN monocatenario: no cumple A = T ni G = C", "Es ADN bicatenario", "Es ARN, porque no suma 100", "Es ADN bicatenario con errores de medida"], 0, ["Hay T (no es ARN) pero A ≠ T y G ≠ C, así que no son dos hebras complementarias.", "Suma 100 %."], "ADN monocatenario");
  O("d5", 3, "En un experimento tipo Hershey y Chase, el 85 % del 32P está en el sedimento (bacterias) y el 80 % del 35S en el sobrenadante. La conclusión es que…", ["el ADN entra en la bacteria y es el material genético", "la proteína entra en la bacteria y es el material genético", "ni el ADN ni la proteína entran en la bacteria", "el ARN es el material genético del virus"], 0, ["32P marca el ADN y está dentro.", "35S marca la proteína y queda fuera."], "El ADN entra y es el material genético");
  O("d6", 3, "Dos ADN bicatenarios tienen Tm de 86 °C (X) y 94 °C (Y). ¿Qué es cierto?", ["Y es más rico en G + C", "X es más rico en G + C", "X tiene enlaces fosfodiéster más débiles", "Y es de cadena simple"], 0, ["Más G–C (3 puentes) → más calor para separar las hebras → Tm mayor.", "Los fosfodiéster no se rompen al desnaturalizar."], "Y es más rico en G + C");
  M("d7", 3, "Una hebra de ADN tiene A 20 %, T 30 %, G 25 % y C 25 % (porcentajes de esa hebra). Calcula: (1) el % de A en la hebra complementaria; (2) el % de A en la doble hélice (las dos hebras juntas).",
    [{ tipo: "num", etiqueta: "(1) % de A en la complementaria", valor: 30, unidad: "%" }, { tipo: "num", etiqueta: "(2) % de A en la doble hélice", valor: 25, unidad: "%" }],
    ["La A de la complementaria está frente a cada T de la primera: 30 %.", "En total: (20 + 30) / 2 = 25 %, igual que T (30 + 20)/2 = 25 %."], "(1) 30 %; (2) 25 %");
  R("d8", "Describe la estructura de un nucleótido y explica cómo se forma un polinucleótido. (Pregunta tipo PAU)", [
    { t: "Nucleótido: pentosa + base nitrogenada + grupo fosfato", p: 0.4 },
    { t: "Distingue nucleósido (sin fosfato) y las bases púricas y pirimidínicas", p: 0.4 },
    { t: "Enlace fosfodiéster entre C3′ y el fosfato del C5′", p: 0.5 },
    { t: "Se libera agua (condensación)", p: 0.3 },
    { t: "Esqueleto azúcar–fosfato y sentido 5′→3′ de la hebra", p: 0.4 }], ["Componentes.", "Nucleósido y bases.", "Enlace fosfodiéster.", "Pérdida de agua.", "Polaridad."], "Pentosa + base + fosfato; enlace fosfodiéster C3′–C5′; hebra 5′→3′");
  R("d9", "Explica el modelo de Watson y Crick del ADN y la regla de Chargaff. (Pregunta tipo PAU)", [
    { t: "Doble hélice dextrógira de dos hebras antiparalelas", p: 0.5 },
    { t: "Esqueleto azúcar–fosfato por fuera; bases por dentro", p: 0.3 },
    { t: "Complementariedad: A–T (2 puentes de H) y C–G (3)", p: 0.5 },
    { t: "Regla de Chargaff: A = T y C = G; A + T no tiene por qué igualar a G + C", p: 0.4 },
    { t: "Consecuencia: cada hebra sirve de molde (replicación)", p: 0.3 }], ["Hélice y antiparalelismo.", "Esqueleto y bases.", "Puentes de H.", "Chargaff.", "Replicación."], "Doble hélice antiparalela; A–T y C–G; A = T, C = G");
  R("d10", "Explica los niveles de empaquetamiento del ADN en las células eucariotas y por qué hacen falta. (Pregunta tipo PAU)", [
    { t: "Nucleosoma: ADN (≈ 146 pb) sobre un octámero de histonas", p: 0.5 },
    { t: "Fibra de cromatina de 30 nm (con histona H1)", p: 0.4 },
    { t: "Bucles y cromosoma metafásico", p: 0.4 },
    { t: "Orden creciente de compactación y cuándo se alcanza cada uno", p: 0.3 },
    { t: "Razón: ≈ 2 m de ADN en un núcleo de micras; regulación de genes", p: 0.4 }], ["Nucleosoma.", "Fibra de 30 nm.", "Bucles y cromosoma.", "Orden.", "Para qué."], "Nucleosoma → 30 nm → bucles → cromosoma; ≈ 2 m en un núcleo");
  R("d11", "Describe los principales tipos de ARN y la función de cada uno. (Pregunta tipo PAU)", [
    { t: "ARNm: copia de un gen, se lee en codones", p: 0.5 },
    { t: "ARNt: forma de trébol, anticodón, transporta un aminoácido", p: 0.5 },
    { t: "ARNr: forma los ribosomas (con proteínas) y cataliza el enlace peptídico", p: 0.5 },
    { t: "Menciona otros ARN (ARNsn, microARN)", p: 0.2 },
    { t: "Relación ADN → ARN → proteína", p: 0.3 }], ["ARNm.", "ARNt.", "ARNr.", "Otros.", "Relación."], "ARNm: mensaje; ARNt: aminoácidos; ARNr: ribosomas");
  R("d12", "Compara el ADN y el ARN en al menos cuatro aspectos. (Pregunta tipo PAU)", [
    { t: "Azúcar: desoxirribosa frente a ribosa", p: 0.4 },
    { t: "Bases: timina en el ADN y uracilo en el ARN", p: 0.4 },
    { t: "Cadenas: doble hélice frente a cadena simple", p: 0.4 },
    { t: "Tamaño y estabilidad: ADN más largo y estable", p: 0.4 },
    { t: "Función: almacena información frente a expresarla (tipos de ARN)", p: 0.4 }], ["Azúcar.", "Bases.", "Cadenas.", "Tamaño y estabilidad.", "Función."], "Desoxirribosa/ribosa; T/U; doble/simple; estable/menos; almacena/expresa");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "ADN frente a ARN", ancha: true,
      tabla: { cab: ["", "ADN", "ARN"], filas: [
        ["azúcar", "desoxirribosa", "ribosa"],
        ["bases", "A, G, C, T", "A, G, C, U"],
        ["cadenas", "doble hélice", "una (se pliega)"],
        ["función", "almacena la información", "la expresa"]
      ] } },
    { titulo: "Emparejamiento de bases", ancha: true,
      tabla: { cab: ["Pareja", "Puentes de H", "Tipo"], filas: [
        ["A – T (ADN)", "2", "purina + pirimidina"],
        ["A – U (ARN)", "2", "purina + pirimidina"],
        ["C – G", "3", "pirimidina + purina"]
      ] }, nota: "Regla de Chargaff: %A = %T y %C = %G." },
    { titulo: "Del nucleótido a la hebra",
      pasos: ["Pentosa + base + fosfato = nucleótido.", "C3′–OH + fosfato del C5′: enlace fosfodiéster.", "Sale H₂O; la hebra crece 5′→3′."],
      nota: "n nucleótidos → n − 1 enlaces." },
    { titulo: "Empaquetamiento del ADN",
      pasos: ["Doble hélice (2 nm).", "Nucleosomas, «collar de perlas» (11 nm).", "Fibra de 30 nm (con H1).", "Bucles (300 nm).", "Cromosoma metafásico (1400 nm)."],
      nota: "Nucleosoma = ≈ 146 pb + octámero de histonas." },
    { titulo: "Tipos de ARN", ancha: true,
      tabla: { cab: ["ARN", "Función", "Rasgo clave"], filas: [
        ["ARNm", "copia del gen", "codones; caperuza y poli-A"],
        ["ARNt", "transporta aminoácidos", "trébol y anticodón"],
        ["ARNr", "forma los ribosomas", "ribozima; 70S y 80S"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El nucleósido lleva fosfato", bien: "No: es pentosa + base", por: "El fosfato lo convierte en nucleótido." },
        { mal: "Las hebras del ADN son paralelas", bien: "Son antiparalelas", por: "5′→3′ frente a 3′→5′." },
        { mal: "A + T siempre es igual a G + C", bien: "A = T y C = G", por: "A+T / G+C cambia con la especie." },
        { mal: "La desnaturalización rompe los enlaces fosfodiéster", bien: "Solo rompe puentes de hidrógeno", por: "Los fosfodiéster son covalentes." }
      ] }
  ];

  B.registrar("bio2", "t5", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio5a.secciones,
    nuevas: B.parte.bio5a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
