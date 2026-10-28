/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 4 (parte B): Aristóteles
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t4.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Aristóteles (384–322 a. C.) rechaza las Ideas separadas: hay <b>un solo mundo</b> de sustancias, compuestas de <b>materia y forma</b> (hilemorfismo).",
    "El cambio es el paso de <b>potencia a acto</b>; para explicar algo hay <b>cuatro causas</b> (material, formal, eficiente y final).",
    "La <b>felicidad</b> (eudaimonía) es la actividad racional virtuosa; la virtud ética es un <b>término medio</b> guiado por la prudencia.",
    "El ser humano es <b>animal político</b>: la polis es anterior al individuo y su fin es vivir bien."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Aristóteles · 384–322 a. C.",
    autores: [{ n: "Aristóteles", f: "384–322 a. C.", l: "Estagira; Atenas (fundó el Liceo, 335 a. C.)" }],
    obras: ["Organon", "Física", "Metafísica", "Acerca del alma", "Ética a Nicómaco", "Política", "Poética", "Retórica"],
    bloques: [
      { t: "Contexto", frases: ["Discípulo de Platón en la Academia durante unos veinte años.", "Preceptor de Alejandro Magno; funda el <b>Liceo</b> (335 a. C.).", "Sus tratados son apuntes de clase; parte de la observación."] },
      { t: "Realidad: hilemorfismo", frases: ["Un solo mundo: no hay Ideas separadas.", "Toda <b>sustancia</b> es materia y forma.", "El cambio es paso de <b>potencia</b> a <b>acto</b>."],
        tabla: { cab: ["Materia", "Forma"], filas: [["de qué está hecha", "qué es (esencia)"], ["bronce, cuerpo", "figura, alma"]] } },
      { t: "Causas y Dios", frases: ["Cuatro causas: material, formal, eficiente y <b>final</b>.", "Todo ser natural tiende a un fin (<i>télos</i>): teleología.", "El <b>Primer motor inmóvil</b> mueve como causa final; no crea el mundo."] },
      { t: "Conocimiento", frases: ["Parte de los sentidos: sensación, memoria, experiencia, ciencia.", "Lo universal se obtiene por <b>abstracción</b>.", "Funda la lógica: el <b>silogismo</b>."] },
      { t: "Ser humano y ética", frases: ["Alma = forma del cuerpo; tres almas (vegetativa, sensitiva, racional).", "<b>Eudaimonía</b>: actividad racional virtuosa en una vida completa.", "Virtud ética = <b>término medio</b>, que fija la <b>prudencia</b>."],
        tabla: { cab: ["Virtud", "Entre…"], filas: [["valentía", "cobardía y temeridad"], ["generosidad", "avaricia y derroche"], ["templanza", "insensibilidad y desenfreno"]] } },
      { t: "Política", frases: ["El ser humano es <b>animal político</b>; la <b>polis</b> es anterior al individuo.", "Seis constituciones: tres rectas y tres desviadas.", "Mejor en la práctica: la <b>politeia</b> con clase media fuerte."] }
    ],
    resumen: [
      "No hay dos mundos: la <b>forma</b> está en las cosas y se capta por abstracción.",
      "Explicar es dar las <b>cuatro causas</b>; la <b>causa final</b> da sentido a las demás.",
      "La <b>felicidad</b> es actuar según la razón con <b>virtud</b> (término medio) y <b>prudencia</b>.",
      "La ética culmina en la <b>política</b>: la polis existe para vivir bien."
    ],
    conecta: [
      { con: "Parménides y Heráclito (T1):", rel: "resuelve el problema del cambio con potencia y acto." },
      { con: "Platón (T3):", rel: "su maestro; critica las Ideas separadas y sitúa la forma en la cosa." },
      { con: "Tomás de Aquino (T7):", rel: "lo asume y lo cristianiza (hilemorfismo, causas, ética de virtudes)." },
      { con: "Galileo y Descartes (T8–T9):", rel: "rechazan la física aristotélica y las causas finales." },
      { con: "Kant (T12):", rel: "ética formal del deber frente a la ética de la felicidad." }
    ],
    claves: [
      ["Sustancia", "ser individual que existe por sí mismo (este caballo)"],
      ["Hilemorfismo", "toda sustancia natural es materia más forma"],
      ["Potencia y acto", "capacidad de llegar a ser y su realización; explican el cambio"],
      ["Cuatro causas", "material, formal, eficiente y final"],
      ["Teleología", "todo ser natural tiende a un fin propio (<i>télos</i>)"],
      ["Primer motor inmóvil", "acto puro que mueve como causa final"],
      ["Eudaimonía", "felicidad: actividad racional virtuosa en una vida completa"],
      ["Término medio", "la virtud ética entre el exceso y el defecto, relativa a nosotros"],
      ["Prudencia", "virtud intelectual que decide el término medio en cada caso"],
      ["Animal político", "el ser humano necesita vivir en la polis"]
    ],
    cita: { txt: "Toda arte y toda investigación, e igualmente toda acción y toda elección, parecen tender a algún bien.", autor: "Aristóteles", obra: "Ética a Nicómaco, I, 1 (1094a)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    medio: {
      titulo: "¿Defecto, virtud o exceso?",
      consigna: "Toca cada palabra y después el lugar que ocupa en el esquema del término medio.",
      categorias: ["Defecto", "Término medio (virtud)", "Exceso"],
      items: [
        { t: "Cobardía", c: 0 },
        { t: "Valentía", c: 1 },
        { t: "Temeridad", c: 2 },
        { t: "Avaricia", c: 0 },
        { t: "Generosidad", c: 1 },
        { t: "Derroche", c: 2 },
        { t: "Insensibilidad ante el placer", c: 0 },
        { t: "Templanza", c: 1 },
        { t: "Jactancia (presumir)", c: 2 }
      ]
    },
    ordenconoc: {
      titulo: "La escalera del conocimiento",
      consigna: "Ordena, de abajo arriba, los escalones por los que se llega al saber según Aristóteles.",
      items: [
        { t: "Sensación: captar lo individual con los sentidos" },
        { t: "Memoria: conservar lo sentido" },
        { t: "Experiencia: muchos recuerdos del mismo tipo" },
        { t: "Ciencia: conocer las causas y lo universal" },
        { t: "Sabiduría: conocer los primeros principios y causas" }
      ]
    },
    constituciones: {
      titulo: "Constituciones: recta y desviada",
      consigna: "Une cada forma recta de gobierno con su forma desviada.",
      pares: [["Monarquía", "Tiranía"], ["Aristocracia", "Oligarquía"], ["Politeia", "Democracia"]]
    },
    quiz1: {
      titulo: "Test del tema 4",
      preguntas: [
        { q: "Según Aristóteles, la esencia de las cosas está…", op: ["dentro de las propias cosas", "en un mundo de Ideas separado", "solo en la mente", "en los dioses"], ok: 0, porque: "Rechaza las Ideas separadas: la forma está en la sustancia concreta." },
        { q: "El hilemorfismo afirma que toda sustancia natural es…", op: ["materia y forma", "cuerpo y alma separables", "átomos y vacío", "sombra y luz"], ok: 0, porque: "<i>Hýle</i> = materia; <i>morfé</i> = forma." },
        { q: "La semilla es un árbol…", op: ["en potencia", "en acto", "en causa final", "en accidente"], ok: 0, porque: "Tiene la posibilidad real de serlo; el árbol crecido lo es en acto." },
        { q: "¿Cuál NO es una de las cuatro causas?", op: ["Causa moral", "Causa material", "Causa eficiente", "Causa final"], ok: 0, porque: "Son material, formal, eficiente y final." },
        { q: "La causa final de un cuchillo es…", op: ["cortar", "el acero", "el herrero", "su filo concreto"], ok: 0, porque: "Es aquello «para lo cual» existe. El acero es la causa material; el herrero, la eficiente." },
        { q: "Para Aristóteles, el fin último de las acciones humanas es…", op: ["la felicidad (eudaimonía)", "el placer", "la riqueza", "el honor"], ok: 0, porque: "Se busca siempre por sí misma y nunca como medio." },
        { q: "La valentía es un término medio entre…", op: ["cobardía y temeridad", "avaricia y derroche", "mentira y jactancia", "tristeza y alegría"], ok: 0, porque: "Defecto: cobardía. Exceso: temeridad." },
        { q: "¿Qué virtud decide el término medio en cada caso concreto?", op: ["La prudencia", "La valentía", "La generosidad", "La sabiduría teórica"], ok: 0, porque: "La <i>phrónesis</i> es la virtud intelectual práctica." },
        { q: "Para Aristóteles, el ser humano es por naturaleza…", op: ["un animal político", "un ser aislado", "un alma encerrada en un cuerpo", "un siervo de los dioses"], ok: 0, porque: "Necesita la polis y tiene lenguaje para discutir lo justo y lo injusto." },
        { q: "El Primer motor inmóvil…", op: ["mueve como causa final, sin ser movido", "creó el mundo de la nada", "se ocupa de cada persona", "es una Idea de Platón"], ok: 0, porque: "Es acto puro; atrae como lo amado mueve al amante." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Aristóteles y Platón es FALSA?", op: ["Aristóteles acepta que las Ideas existen separadas de las cosas", "Aristóteles fue discípulo de Platón", "Aristóteles fundó el Liceo", "Aristóteles sitúa la esencia dentro de las cosas"], ok: 0, porque: "Esa es la tesis de Platón; Aristóteles la critica." },
        { q: "¿Cuál de estas afirmaciones sobre la forma es FALSA?", op: ["La forma es la figura exterior de la cosa", "La forma es la esencia que organiza la materia", "La forma del ojo es su capacidad de ver", "Materia y forma no se separan en la realidad"], ok: 0, porque: "La forma es la esencia, no el aspecto." },
        { q: "¿Cuál de estas afirmaciones sobre las causas es FALSA?", op: ["La causa final significa que la bellota piensa en ser roble", "La causa eficiente es quien produce la cosa", "La causa material es aquello de lo que está hecha", "Aristóteles es finalista"], ok: 0, porque: "La finalidad natural es una tendencia, no un pensamiento." },
        { q: "¿Cuál de estas afirmaciones sobre el término medio es FALSA?", op: ["Es la media aritmética, igual para todos", "Es relativo a cada persona y situación", "Lo determina la razón del prudente", "Hay acciones, como el asesinato, que no tienen término medio"], ok: 0, porque: "No es una media matemática: es relativo a nosotros." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Aristóteles es anterior a Platón", "Aristóteles nació en 384 a. C.", "Platón murió en 347 a. C.", "Aristóteles murió en 322 a. C."], ok: 0, porque: "Platón (427–347) es anterior a Aristóteles (384–322), su discípulo." },
        { q: "¿Cuál de estas afirmaciones sobre el Primer motor es FALSA?", op: ["Creó el mundo y se ocupa de los humanos", "Es acto puro", "Mueve como causa final", "Es eterno e inmóvil"], ok: 0, porque: "No es creador ni providente: no es el Dios cristiano." },
        { q: "¿Cuál de estas afirmaciones sobre el alma es FALSA?", op: ["El alma es un ser distinto metido en el cuerpo, como piensa Platón", "El alma es la forma del cuerpo", "Hay tres almas: vegetativa, sensitiva y racional", "Las plantas tienen alma vegetativa"], ok: 0, porque: "Eso es el dualismo de Platón; Aristóteles es hilemorfista." },
        { q: "¿Cuál de estas afirmaciones sobre la política de Aristóteles es FALSA?", op: ["La democracia es la forma recta del gobierno de muchos", "El ser humano es animal político", "La politeia es la forma recta del gobierno de muchos", "La polis es anterior al individuo"], ok: 0, porque: "La democracia es la forma desviada; la recta es la politeia." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Aristóteles",
      cartas: [
        { a: "Sustancia", b: "Ser individual que existe por sí mismo (este caballo, tú). Lo demás son accidentes." },
        { a: "Hilemorfismo", b: "Toda sustancia natural es un compuesto de materia (<i>hýle</i>) y forma (<i>morfé</i>)." },
        { a: "Materia", b: "Sustrato del que está hecha una cosa; puede recibir una forma." },
        { a: "Forma", b: "Esencia que organiza la materia y la hace ser esta cosa. No es solo la figura exterior." },
        { a: "Potencia", b: "Capacidad real de llegar a ser algo (la semilla es árbol en potencia)." },
        { a: "Acto", b: "Realización efectiva de la potencia (el árbol crecido)." },
        { a: "Causa final", b: "Aquello para lo que existe algo (<i>télos</i>); da sentido a las demás causas." },
        { a: "Teleología", b: "Concepción según la cual todo ser natural tiende a un fin propio." },
        { a: "Primer motor inmóvil", b: "Acto puro, eterno; mueve como causa final. No crea el mundo." },
        { a: "Eudaimonía", b: "Felicidad: actividad racional virtuosa a lo largo de una vida completa." },
        { a: "Virtud ética", b: "Hábito que consiste en un término medio entre exceso y defecto, relativo a nosotros." },
        { a: "Prudencia (phrónesis)", b: "Virtud intelectual práctica que decide el término medio en cada caso." },
        { a: "Animal político", b: "El ser humano necesita vivir en la polis y tiene lenguaje para discutir lo justo." },
        { a: "Politeia", b: "Forma recta del gobierno de muchos; en la práctica, el mejor régimen." },
        { a: "Liceo", b: "Escuela fundada por Aristóteles en Atenas (335 a. C.); «peripatética»." }
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
  function R(id, enun, filas, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("ha1", 1, "¿Dónde nació Aristóteles?", ["Estagira", "Atenas", "Esparta", "Mileto"], 0,
    ["Nació en Estagira (norte de Grecia) en 384 a. C."]);
  O("ha2", 1, "¿Cómo se llama la escuela que fundó Aristóteles en Atenas?", ["El Liceo", "La Academia", "El Jardín", "El Pórtico"], 0,
    ["Liceo (335 a. C.). Academia = Platón; Jardín = Epicuro; Pórtico = estoicos."]);
  O("ha3", 1, "¿Cuánto tiempo estuvo Aristóteles en la Academia de Platón?", ["Unos veinte años", "Unos dos años", "Toda su vida", "Nunca estuvo"], 0,
    ["Entró a los 17 años (367 a. C.) y se quedó hasta la muerte de Platón (347 a. C.)."]);
  O("ha4", 1, "¿A quién educó Aristóteles como preceptor?", ["Alejandro Magno", "Pericles", "Platón", "Filipo II"], 0,
    ["Fue preceptor de Alejandro, hijo de Filipo de Macedonia."]);
  O("ha5", 1, "¿En qué obra expone Aristóteles su ética?", ["Ética a Nicómaco", "Física", "Organon", "República"], 0,
    ["La <i>República</i> es de Platón; la <i>Física</i> trata del movimiento; el <i>Organon</i> es la lógica."]);
  T("ha6", 1, "Completa: la teoría de que toda sustancia es materia y forma se llama ______.", "Término =", ["hilemorfismo"],
    ["De <i>hýle</i> (materia) y <i>morfé</i> (forma)."], "hilemorfismo");
  M("ha7", 1, "Clasifica cada elemento como materia o forma.", [
    C("El bronce de una estatua", ["Materia", "Forma"], 0),
    C("La figura de Hermes", ["Materia", "Forma"], 1),
    C("El cuerpo de un ser vivo", ["Materia", "Forma"], 0),
    C("El alma de un ser vivo", ["Materia", "Forma"], 1)],
    ["Materia = de qué está hecho; forma = qué es (esencia)."], "Bronce–materia, figura–forma, cuerpo–materia, alma–forma");
  M("ha8", 1, "Empareja cada causa con su ejemplo en una mesa de madera hecha por un carpintero para comer sobre ella.", [
    C("La madera", ["Material", "Formal", "Eficiente", "Final"], 0),
    C("La forma de mesa", ["Material", "Formal", "Eficiente", "Final"], 1),
    C("El carpintero", ["Material", "Formal", "Eficiente", "Final"], 2),
    C("Comer o trabajar encima", ["Material", "Formal", "Eficiente", "Final"], 3)],
    ["¿De qué? material · ¿qué es? formal · ¿quién? eficiente · ¿para qué? final."], "Madera–material, forma–formal, carpintero–eficiente, comer–final");
  O("ha9", 1, "La capacidad real de llegar a ser algo, como la semilla respecto al árbol, es…", ["la potencia", "el acto", "el accidente", "la privación"], 0,
    ["Potencia = posibilidad real; acto = su realización."]);
  T("ha10", 1, "Completa: el fin último de las acciones humanas, según Aristóteles, es la ______ (<i>eudaimonía</i>).", "Término =", ["felicidad"],
    ["Se busca siempre por sí misma."], "felicidad");
  O("ha11", 1, "¿Qué virtud es el término medio entre la cobardía y la temeridad?", ["La valentía", "La generosidad", "La templanza", "La prudencia"], 0,
    ["Cobardía (defecto) – valentía – temeridad (exceso)."]);
  O("ha12", 1, "En la <i>Política</i>, Aristóteles define al ser humano como…", ["un animal político", "un animal racional solitario", "un alma prisionera", "un ser caído"], 0,
    ["<i>Zôon politikón</i>: vive por naturaleza en la polis."]);
  O("ha13", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Platón → Aristóteles → Tomás de Aquino", "Aristóteles → Platón → Tomás de Aquino", "Tomás de Aquino → Aristóteles → Platón", "Platón → Tomás de Aquino → Aristóteles"], 0,
    ["Platón (427–347 a. C.), Aristóteles (384–322 a. C.), Tomás de Aquino (1225–1274)."], "Platón → Aristóteles → Tomás de Aquino");
  O("ha14", 1, "Para Aristóteles, el alma de un ser vivo es…", ["la forma de su cuerpo", "un ser separado que lo habita", "su materia", "una ilusión"], 0,
    ["Hilemorfismo aplicado a los seres vivos: cuerpo = materia, alma = forma."]);

  // ---- nivel 2
  V("ha15", 2, "«Aristóteles acepta que las Ideas existen en un mundo separado, como pensaba Platón.»", false, [
    "Es falso: sitúa la esencia dentro de las propias cosas", "Es falso: no cree en la esencia", "Es falso: solo existen las Ideas", "Es verdad: era discípulo de Platón"], 0,
    ["Rechaza el mundo de las Ideas: hay un solo mundo."]);
  V("ha16", 2, "«La forma, en Aristóteles, es la esencia que organiza la materia, no solo la figura exterior.»", true, [
    "Es verdad: la forma del ojo, por ejemplo, es su capacidad de ver", "Es verdad: porque la forma es siempre el aspecto visible", "Es verdad: porque la forma existe separada", "Es verdad: porque no hay materia"], 0,
    ["La forma es la esencia; por eso un ojo que no ve ya no es un ojo en sentido pleno."]);
  V("ha17", 2, "«Con la causa final, Aristóteles quiere decir que la bellota piensa en llegar a ser roble.»", false, [
    "Es falso: es una tendencia natural, no un pensamiento", "Es falso: las bellotas no tienen causa", "Es verdad: la naturaleza planifica", "Es falso: la bellota no llega a roble"], 0,
    ["Finalidad natural = orientación del desarrollo, sin deliberación."]);
  V("ha18", 2, "«Para Aristóteles las virtudes éticas se adquieren por el hábito, practicándolas.»", true, [
    "Es verdad: nos hacemos justos realizando acciones justas", "Es verdad: porque se nace con ellas", "Es verdad: porque basta con conocerlas", "Es verdad: porque las enseñan los dioses"], 0,
    ["<i>Éthos</i> = hábito, costumbre."]);
  V("ha19", 2, "«El término medio de la virtud es la media aritmética, igual para todos.»", false, [
    "Es falso: es relativo a cada persona y circunstancia, y lo fija la razón del prudente", "Es falso: no existe término medio", "Es verdad: se calcula con una fórmula", "Es verdad: según el ejemplo de Milón"], 0,
    ["Ejemplo de Milón: lo que es mucho para un principiante es poco para un atleta."]);
  V("ha20", 2, "«El Primer motor inmóvil es un Dios que creó el mundo y se ocupa de las personas.»", false, [
    "Es falso: es acto puro que mueve como causa final; no es creador ni providente", "Es falso: no existe", "Es verdad: es el Dios cristiano", "Es verdad: crea la materia"], 0,
    ["El Dios cristiano es obra de la reelaboración posterior (Tomás de Aquino)."]);
  V("ha21", 2, "«Aristóteles piensa que el alma es la forma del cuerpo, no un ser distinto metido en él.»", true, [
    "Es verdad: es hilemorfista, no dualista como Platón", "Es verdad: porque el alma es mortal por completo en todos los sentidos", "Es verdad: porque niega el alma", "Es verdad: porque el cuerpo es la forma"], 0,
    ["Hilemorfismo: cuerpo (materia) y alma (forma) forman una sola sustancia."]);
  O("ha22", 2, "¿Cómo resuelve Aristóteles el problema del cambio planteado por Parménides?",
    ["Como paso de la potencia al acto, sin salir de la nada", "Negando que haya cambio", "Diciendo que todo es agua", "Con las Ideas separadas"], 0,
    ["El cambio no viene de la nada: es la realización de una posibilidad real."]);
  O("ha23", 2, "La causa final de un ojo es…", ["ver", "ser de carne", "la herencia", "la forma redonda"], 0,
    ["El ojo existe «para» ver: es su función propia."]);
  O("ha24", 2, "La función propia del ser humano, que lo distingue de plantas y animales, es…", ["la actividad racional", "nutrirse", "sentir", "moverse"], 0,
    ["Vivir lo comparte con las plantas; sentir, con los animales. Lo propio es la razón."]);
  O("ha25", 2, "La prudencia (<i>phrónesis</i>) es…", ["la virtud intelectual que decide qué hacer en cada caso", "una virtud ética más, entre el miedo y la audacia", "la capacidad de contemplar el Primer motor", "el hábito de evitar todo riesgo"], 0,
    ["Es dianoética y práctica: fija el término medio."]);
  O("ha26", 2, "¿En qué se distancia Aristóteles de Sócrates y Platón en ética?",
    ["En que saber el bien no basta: hacen falta hábito y carácter", "En que niega la virtud", "En que el bien es una Idea separada", "En que solo importa el placer"], 0,
    ["Introduce el hábito y la incontinencia (<i>akrasía</i>)."]);
  O("ha27", 2, "Cuando un niño crece, hablamos de cambio…", ["cuantitativo", "local", "sustancial", "formal"], 0,
    ["Cambia su tamaño. Sustancial = generación o corrupción; local = lugar."]);
  O("ha28", 2, "La madera que arde y se convierte en ceniza es un ejemplo de cambio…", ["sustancial", "local", "cuantitativo", "ninguno"], 0,
    ["Desaparece una sustancia y aparece otra: corrupción y generación."]);
  O("ha29", 2, "Según la <i>Política</i>, ¿cuál es la forma desviada del gobierno de muchos?", ["La democracia", "La politeia", "La aristocracia", "La monarquía"], 0,
    ["Rectas: monarquía, aristocracia, politeia. Desviadas: tiranía, oligarquía, democracia."]);
  O("ha30", 2, "¿Cuál es el mejor régimen en la práctica para Aristóteles?", ["La politeia, con una clase media numerosa", "La tiranía", "La oligarquía", "Un Estado dirigido solo por filósofos"], 0,
    ["Realismo: un gobierno mixto que evite el dominio de ricos o pobres."]);

  // ---- nivel 3
  O("ha31", 3, "Texto: «Todos los hombres desean por naturaleza saber» (<i>Metafísica</i>, I, 1). Su idea principal es…",
    ["que el afán de saber es una tendencia natural del ser humano", "que el saber es solo útil", "que el saber es innato en forma de Ideas", "que nadie desea saber"], 0,
    ["Tema: origen natural del deseo de saber; parte de la sensación."]);
  O("ha32", 3, "Texto: «El hombre es por naturaleza un animal político» (<i>Política</i>, I, 2). Su idea principal es…",
    ["que el ser humano necesita vivir en comunidad política para realizarse", "que el ser humano es un lobo para el hombre", "que la política es un artificio", "que se debe huir de la ciudad"], 0,
    ["Naturalismo político: la polis es natural y anterior al individuo."]);
  O("ha33", 3, "Una alumna afirma: «la causa final de una mesa es el carpintero». ¿Qué matiz es el correcto?",
    ["El carpintero es la causa eficiente; la final es el uso que se le dará", "Tiene razón: lo es", "El carpintero es la causa material", "La mesa no tiene causas"], 0,
    ["Final = para qué; eficiente = quién la produce."]);
  O("ha34", 3, "¿Por qué el Primer motor puede mover sin ser movido?",
    ["Porque mueve como causa final: atrae como lo amado mueve al amante", "Porque empuja con fuerza física", "Porque es una Idea", "Porque tiene materia"], 0,
    ["Mueve por atracción, no por empuje."]);
  O("ha35", 3, "¿Qué distingue el dualismo de Platón del hilemorfismo de Aristóteles?",
    ["En Platón, alma y cuerpo son separables; en Aristóteles, forma y materia de una sola sustancia", "En Platón no hay alma", "En Aristóteles el cuerpo es inmortal", "No hay diferencia"], 0,
    ["Dualismo: dos sustancias. Hilemorfismo: un compuesto."]);
  O("ha36", 3, "El argumento del «tercer hombre» contra las Ideas muestra que…",
    ["explicar el parecido entre Sócrates y la Idea de Hombre exige una tercera realidad, y así sin fin", "las Ideas no son eternas", "no existe el parecido", "Sócrates no era un hombre"], 0,
    ["Regresión infinita: el parecido exigiría otro modelo."]);
  O("ha37", 3, "Aristóteles y Kant se diferencian en que…",
    ["para Aristóteles la moral busca la felicidad por las virtudes; para Kant, el deber universal", "Kant defiende la eudaimonía", "ambos defienden el deber", "Aristóteles rechaza la razón"], 0,
    ["Ética material y teleológica frente a ética formal."]);
  M("ha38", 3, "Empareja cada tipo de alma con sus funciones.", [
    C("Alma vegetativa", ["Nutrirse y reproducirse", "Sentir y desear", "Razonar y elegir"], 0),
    C("Alma sensitiva", ["Nutrirse y reproducirse", "Sentir y desear", "Razonar y elegir"], 1),
    C("Alma racional", ["Nutrirse y reproducirse", "Sentir y desear", "Razonar y elegir"], 2)],
    ["Plantas: la primera; animales: primera y segunda; personas: las tres."], "Vegetativa–nutrirse, sensitiva–sentir, racional–razonar");
  M("ha39", 3, "Empareja cada vicio con la virtud y el extremo que le corresponde.", [
    C("Defecto de la valentía", ["Cobardía", "Temeridad", "Derroche", "Avaricia"], 0),
    C("Exceso de la valentía", ["Cobardía", "Temeridad", "Derroche", "Avaricia"], 1),
    C("Exceso de la generosidad", ["Cobardía", "Temeridad", "Derroche", "Avaricia"], 2),
    C("Defecto de la generosidad", ["Cobardía", "Temeridad", "Derroche", "Avaricia"], 3)],
    ["Valentía: cobardía–temeridad. Generosidad: avaricia–derroche."], "Cobardía, temeridad, derroche, avaricia");
  R("ha40", "Explica el hilemorfismo y la pareja potencia–acto en Aristóteles, y su crítica a la teoría de las Ideas de Platón. (Pregunta tipo PAU)", 9, [
    { t: "Define hilemorfismo: toda sustancia natural es materia y forma, con ejemplo", p: 0.5 },
    { t: "Distingue sustancia y accidentes (un solo mundo de sustancias individuales)", p: 0.3 },
    { t: "Define potencia y acto con ejemplo (semilla y árbol)", p: 0.4 },
    { t: "Explica que el cambio es paso de potencia a acto y lo relaciona con Parménides", p: 0.4 },
    { t: "Expone la crítica a las Ideas separadas (duplicación, tercer hombre, no explican el cambio)", p: 0.4 }],
    ["Define materia y forma.", "Sustancia y accidentes.", "Potencia y acto.", "Cambio y Parménides.", "Crítica a las Ideas."], "Un mundo de sustancias, compuestas de materia y forma; el cambio es potencia→acto");
  R("ha41", "Explica las cuatro causas y la teleología de Aristóteles con un ejemplo, y valora su relación con la ciencia moderna. (Pregunta tipo PAU)", 8, [
    { t: "Enuncia las cuatro causas: material, formal, eficiente y final", p: 0.6 },
    { t: "Las aplica con un ejemplo coherente (estatua, mesa, casa…)", p: 0.4 },
    { t: "Explica la causa final y la teleología (<i>télos</i>), sin atribuir pensamiento a la naturaleza", p: 0.4 },
    { t: "Diferencia entre seres naturales y artificiales (principio interno o externo)", p: 0.2 },
    { t: "Valora la ciencia moderna (Galileo, Descartes) eliminando las causas finales", p: 0.4 }],
    ["Cuatro causas.", "Ejemplo.", "Causa final.", "Natural y artificial.", "Ciencia moderna."], "Cuatro porqués; la causa final da sentido a las demás");
  R("ha42", "Explica la ética de Aristóteles: la felicidad, la virtud como término medio y la prudencia. Compárala con la de Platón o la de Kant. (Pregunta tipo PAU)", 9, [
    { t: "Felicidad como fin último, buscado por sí mismo, y función propia (actividad racional)", p: 0.5 },
    { t: "Virtudes éticas (hábito) y dianoéticas; la prudencia", p: 0.4 },
    { t: "Término medio entre exceso y defecto con ejemplo; relativo a nosotros", p: 0.5 },
    { t: "Contemplación y amistad como parte de la vida feliz", p: 0.2 },
    { t: "Comparación con Platón (el saber no basta) o Kant (deber)", p: 0.4 }],
    ["Felicidad.", "Virtudes y prudencia.", "Término medio.", "Contemplación y amistad.", "Comparación."], "Eudaimonía = actividad racional virtuosa; virtud = término medio");
  R("ha43", "Explica la política de Aristóteles y su crítica al Estado de Platón. Valórala críticamente. (Pregunta tipo PAU)", 8, [
    { t: "Animal político y lenguaje; polis anterior al individuo", p: 0.5 },
    { t: "Origen natural y fin de la polis: vivir bien (familia, aldea, polis)", p: 0.3 },
    { t: "Las seis constituciones (tres rectas y tres desviadas) y el criterio", p: 0.5 },
    { t: "Politeia y clase media como mejor régimen en la práctica", p: 0.3 },
    { t: "Crítica a Platón y valoración (esclavitud natural, límites)", p: 0.4 }],
    ["Animal político.", "Polis.", "Constituciones.", "Politeia.", "Crítica y valoración."], "Polis natural; seis constituciones; politeia");
  R("ha44", "Comenta este texto: «La virtud es, pues, un hábito selectivo que consiste en un término medio relativo a nosotros, determinado por la razón y por aquella por la cual decidiría el hombre prudente» (Aristóteles, <i>Ética a Nicómaco</i>). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: definición de la virtud ética como término medio", p: 0.3 },
    { t: "Idea principal: hábito que elige el punto justo entre exceso y defecto, fijado por la razón del prudente", p: 0.4 },
    { t: "Aclara términos: hábito, relativo a nosotros (no media aritmética), prudencia", p: 0.4 },
    { t: "Relaciona con el autor: felicidad, función propia, virtudes éticas y dianoéticas", p: 0.5 },
    { t: "Compara con Platón o Kant", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario del término medio");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Platón y Aristóteles", ancha: true,
      tabla: { cab: ["", "Platón", "Aristóteles"], filas: [
        ["Mundos", "dos (sensible e inteligible)", "uno"],
        ["Esencia", "Idea separada", "forma dentro de la cosa"],
        ["Conocimiento", "recordar (anámnesis)", "sentidos y abstracción"],
        ["Ser humano", "dualismo: alma separable", "alma = forma del cuerpo"],
        ["Política", "filósofo-rey, Estado ideal", "constituciones, politeia"]
      ] } },
    { titulo: "Las cuatro causas", ancha: true,
      tabla: { cab: ["Causa", "Pregunta", "Estatua"], filas: [
        ["Material", "¿de qué?", "mármol"],
        ["Formal", "¿qué es?", "figura de Hermes"],
        ["Eficiente", "¿quién?", "escultor"],
        ["Final", "¿para qué?", "adornar el templo"]
      ] } },
    { titulo: "El término medio", ancha: true,
      tabla: { cab: ["Defecto", "Virtud", "Exceso"], filas: [
        ["cobardía", "valentía", "temeridad"],
        ["avaricia", "generosidad", "derroche"],
        ["insensibilidad", "templanza", "desenfreno"]
      ] } },
    { titulo: "Escalera del conocimiento",
      pasos: ["Sensación.", "Memoria.", "Experiencia.", "Ciencia: causas y universal.", "Sabiduría: primeros principios."],
      nota: "Todo empieza en los sentidos: no hay ideas innatas." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "La forma es la figura exterior", bien: "Es la esencia que organiza la materia", por: "Un ojo que no ve no es un ojo pleno." },
        { mal: "La causa final es que la bellota piensa", bien: "Es una tendencia natural a un fin", por: "Finalidad sin deliberación." },
        { mal: "El término medio es la media aritmética", bien: "Es relativo a nosotros y lo fija la prudencia", por: "Ejemplo de Milón." },
        { mal: "El Primer motor es el Dios creador cristiano", bien: "Es acto puro que mueve como causa final", por: "No crea ni tiene providencia." }
      ] }
  ];

  B.registrar("historia_fil", "t4", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf4a.secciones,
    nuevas: B.parte.hf4a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
