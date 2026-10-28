/* ============================================================
   Química II · ampliaciones · Tema 9: Química de los compuestos del carbono
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Hibridación</b> (cuenta los átomos unidos al C, con los H): 4 → sp³ (109,5°, tetraédrico) · 3 → sp² (120°, plano; C=C, C=O) · 2 → sp (180°, lineal; C≡C, C≡N). Un enlace σ siempre; el π solo en dobles (1 π) y triples (2 π) e impide el giro.",
    "<b>Nomenclatura</b>: 1) grupo principal (ácido &gt; éster &gt; amida &gt; nitrilo &gt; aldehído &gt; cetona &gt; alcohol &gt; amina); 2) cadena que lo contiene (y a los enlaces múltiples), la más larga; 3) numera para dar el localizador más bajo al principal, luego a los enlaces múltiples y a los sustituyentes; 4) prefijos por orden alfabético. Éteres y halogenuros solo como prefijos (alcoxi-, cloro-…).",
    "<b>Isomería estructural</b> (misma fórmula molecular): de <b>cadena</b> (esqueleto), de <b>posición</b> (dónde está el grupo o el enlace) y de <b>función</b> (otro grupo). Método: DI → esqueletos → posiciones → funciones.",
    "<b>Estereoisomería</b>: <b>cis-trans</b> si cada C del C=C tiene dos sustituyentes distintos; <b>óptica</b> si hay un C con cuatro sustituyentes distintos (quiral): enantiómeros, 2ⁿ estereoisómeros como máximo (menos si hay forma meso).",
    "<b>Propiedades físicas</b>: Teb por fuerzas intermoleculares: London (masa, forma) &lt; dipolo–dipolo (C=O, C–Cl) &lt; puente de H (O–H, N–H). A masa parecida: alcano &lt; éter &lt; aldehído/cetona &lt; alcohol &lt; ácido. Cada CH₂ sube la Teb; las ramificaciones la bajan.",
    "<b>Fórmula a partir de datos</b>: n(C) = m(CO₂)/44; n(H) = 2·m(H₂O)/18; O por diferencia; divide entre el menor → empírica; k = M/M_emp → molecular. DI = (2C + 2 + N − H − X)/2."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«CH₃–CH₂–CHO tiene 2 carbonos de cadena porque el C del –CHO no cuenta; se llama etanal.» ¿Qué falla?",
          op: ["Nada", "El C del –CHO sí cuenta en la cadena: son 3 C → propanal", "Se llama propan-1-ol", "Es una cetona"], ok: 1,
          porque: "En aldehídos, ácidos, amidas y nitrilos el carbono del grupo forma parte de la cadena principal." },
        { q: "«CH₃–O–CH₂CH₃ se llama etoximetano.» ¿Qué falla?",
          op: ["Nada", "La cadena más larga (2 C) es la base y la corta con el O es el sustituyente: metoxietano", "Es un alcohol", "Se llama etanoato de metilo"], ok: 1,
          porque: "Éter: alcoxi-alcano; el alcano es la cadena más larga y el sustituyente alcoxi, la más corta." },
        { q: "«(CH₃)₂C=CH–CH₃ tiene isomería cis-trans porque tiene un doble enlace.» ¿Qué falla?",
          op: ["Nada", "El C2 lleva dos CH₃ iguales: no existe isomería geométrica", "Solo los alquinos tienen cis-trans", "Es un alcohol"], ok: 1,
          porque: "El doble enlace es necesario pero no suficiente: cada carbono debe llevar dos sustituyentes distintos." },
        { q: "«En el pentan-3-ol, el C3 es quiral porque lleva un –OH.» ¿Qué falla?",
          op: ["Nada", "Lleva dos grupos etilo iguales: no es quiral", "El OH impide la quiralidad", "Los alcoholes no pueden ser quirales"], ok: 1,
          porque: "Un C quiral necesita 4 sustituyentes distintos: H, OH, etilo y etilo no lo son." },
        { q: "«El etanol hierve más que el metoximetano porque su enlace O–H es más fuerte.» ¿Qué falla?",
          op: ["Nada", "El O–H no se rompe al hervir: lo que importa son los puentes de H entre moléculas", "El metoximetano pesa más", "El etanol es apolar"], ok: 1,
          porque: "Hervir vence las fuerzas intermoleculares, no los enlaces covalentes. El etanol forma puentes de H; el éter no." },
        { q: "«El carbono del grupo C=O del propanal tiene hibridación sp³.» ¿Qué falla?",
          op: ["Nada", "Tiene 3 vecinos (O, C, H): es sp², plano a 120°", "Es sp", "No se hibrida"], ok: 1,
          porque: "El carbonilo tiene un σ y un π con el O más dos σ con C y H: tres vecinos, sp²." },
        { q: "«En HOOC–CH₂–CH(OH)–CH₃ numero desde el OH para que tenga el 1 y lo llamo ácido 1-hidroxi…» ¿Qué falla?",
          op: ["Nada", "El grupo principal es el –COOH y es el que lleva el 1: ácido 3-hidroxibutanoico", "Debe llamarse butanol", "No tiene nombre"], ok: 1,
          porque: "Primero el principal (ácido &gt; alcohol); el –OH queda de prefijo «hidroxi» y no manda en la numeración." },
        { q: "«Los dos enantiómeros de un compuesto quiral hierven a temperaturas distintas.» ¿Qué falla?",
          op: ["Nada", "Tienen las mismas propiedades físicas (Teb, solubilidad…); solo difieren en el sentido en que desvían la luz polarizada", "Tienen distinta fórmula", "Uno es sólido y el otro líquido"], ok: 1,
          porque: "Los enantiómeros son idénticos salvo en la actividad óptica y en su reacción con otras moléculas quirales." },
        { q: "«C₄H₈ es un alcano porque tiene cuatro carbonos.» ¿Qué falla?",
          op: ["Nada", "Un alcano acíclico de 4 C es C₄H₁₀; C₄H₈ tiene DI = 1 (alqueno o ciclo)", "Es un alquino", "Es un alcohol"], ok: 1,
          porque: "DI = (2·4 + 2 − 8)/2 = 1: un doble enlace o un ciclo." },
        { q: "«El propan-1-ol y el propan-2-ol son isómeros de función.» ¿Qué falla?",
          op: ["Nada", "Tienen el mismo grupo (–OH) en distinta posición: isomería de posición", "Son isómeros de cadena", "No son isómeros"], ok: 1,
          porque: "Función = grupos distintos; aquí el grupo es el mismo y solo cambia el carbono donde está." },
        { q: "«Al quemar la muestra, 0,90 g de H₂O contienen 0,90/18 = 0,050 mol de H.» ¿Qué falla?",
          op: ["Nada", "Cada H₂O contiene 2 H: n(H) = 2 · 0,050 = 0,100 mol", "Hay que dividir entre 44", "Hay que dividir entre 2"], ok: 1,
          porque: "Mol de H₂O = 0,050, pero cada molécula aporta dos átomos de H." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La hibridación de cada carbono del eteno, CH₂=CH₂, es…", op: ["sp²", "sp³", "sp", "ninguna"], ok: 0, porque: "Cada C tiene 3 vecinos (2 H y 1 C): sp², plano y a 120°." },
        { q: "El grupo funcional de mayor prioridad entre éstos es…", op: ["–COOH", "–OH", "–CHO", "–NH₂"], ok: 0, porque: "Orden: ácido &gt; … &gt; aldehído &gt; … &gt; alcohol &gt; amina." },
        { q: "El nombre del CH₃–CH(CH₃)–CH₂–OH es…", op: ["2-metilpropan-1-ol", "isobutano", "butan-2-ol", "3-metilpropan-1-ol"], ok: 0, porque: "Cadena de 3 C con el –OH en C1 y un metilo en C2." },
        { q: "La fórmula del propanoato de etilo es…", op: ["CH₃CH₂COOCH₂CH₃", "CH₃COOCH₂CH₂CH₃", "CH₃CH₂CH₂COOCH₃", "CH₃CH₂OCH₂CH₃"], ok: 0, porque: "La parte ácida (3 C: propanoato) y el etilo del alcohol." },
        { q: "El etanol y el metoximetano son isómeros de…", op: ["función", "cadena", "posición", "geométricos"], ok: 0, porque: "C₂H₆O con grupos distintos (–OH frente a –O–)." },
        { q: "¿Cuál tiene isomería cis-trans?", op: ["CH₃–CH=CH–CH₃", "CH₂=CH–CH₃", "(CH₃)₂C=CH₂", "CH₂=CH₂"], ok: 0, porque: "Solo el but-2-eno tiene dos sustituyentes distintos (H y CH₃) en cada carbono del doble enlace." },
        { q: "Un carbono quiral es el que…", op: ["está unido a cuatro sustituyentes distintos", "forma un doble enlace", "está unido a un halógeno", "tiene hibridación sp"], ok: 0, porque: "Es la condición para que exista una imagen especular no superponible." },
        { q: "Las propiedades de dos enantiómeros difieren en…", op: ["el sentido en que desvían la luz polarizada", "su punto de ebullición", "su fórmula molecular", "su densidad"], ok: 0, porque: "Solo en la actividad óptica y en cómo reaccionan con otras moléculas quirales." },
        { q: "El orden creciente de Teb de butano, butanal y butan-1-ol es…", op: ["butano &lt; butanal &lt; butan-1-ol", "butan-1-ol &lt; butanal &lt; butano", "butanal &lt; butano &lt; butan-1-ol", "butano &lt; butan-1-ol &lt; butanal"], ok: 0, porque: "London &lt; dipolo–dipolo &lt; puente de hidrógeno." },
        { q: "El grado de insaturación del C₅H₈ es…", op: ["2", "1", "0", "3"], ok: 0, porque: "(2·5 + 2 − 8)/2 = 2: un triple enlace, dos dobles o un doble y un ciclo…" },
        { q: "Un compuesto de empírica CH₂O y M = 90 g/mol tiene fórmula molecular…", op: ["C₃H₆O₃", "C₂H₄O₂", "C₆H₁₂O₆", "CH₂O"], ok: 0, porque: "k = 90/30 = 3." },
        { q: "El nombre del CH₃–CO–CH₂–CH₃ es…", op: ["butanona", "butanal", "butan-1-ona", "ácido butanoico"], ok: 0, porque: "Cetona de 4 C: el C=O siempre en un carbono interior, el 2 (se omite el 2 en «butanona»)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: química del carbono",
      cartas: [
        { a: "Hibridación (regla)", b: "Cuenta los átomos unidos al C (con H): 4 → sp³ · 3 → sp² · 2 → sp." },
        { a: "σ y π", b: "σ: todo enlace (frontal). π: solo en dobles (1) y triples (2); lateral, más débil e impide el giro." },
        { a: "Orden de prioridad", b: "Ácido &gt; éster &gt; amida &gt; nitrilo &gt; aldehído &gt; cetona &gt; alcohol &gt; amina. Éter y halógeno: solo prefijo." },
        { a: "Numerar la cadena", b: "Localizador más bajo: 1.º al grupo principal, 2.º a dobles y triples, 3.º a sustituyentes; prefijos por orden alfabético." },
        { a: "Éster", b: "R–COO–R′: nombre del ácido en «-oato» + «de» + radical del alcohol. Ej.: etanoato de etilo." },
        { a: "Éter", b: "R–O–R′: alcoxi-alcano. CH₃OCH₂CH₃ = metoxietano (la cadena larga es la base)." },
        { a: "Isomería de cadena, posición y función", b: "Esqueleto distinto · grupo o enlace en otro carbono · grupo funcional distinto. Misma fórmula molecular." },
        { a: "Isomería cis-trans", b: "Alquenos con dos sustituyentes distintos en cada carbono del C=C. Cis: del mismo lado; trans: de lados opuestos." },
        { a: "Carbono quiral", b: "C sp³ con cuatro sustituyentes distintos. Genera dos enantiómeros (imágenes especulares no superponibles)." },
        { a: "Enantiómeros", b: "Mismas propiedades físicas y químicas; desvían la luz polarizada en sentidos opuestos. Máximo 2ⁿ estereoisómeros." },
        { a: "Forma meso", b: "Compuesto con carbonos quirales pero plano de simetría interno: ópticamente inactivo. Reduce el número de estereoisómeros (el 2,3-dibromobutano tiene 3)." },
        { a: "Fuerzas intermoleculares", b: "London (todas; masa y forma) &lt; dipolo–dipolo (C=O, C–Cl) &lt; puente de H (O–H, N–H). Mandan en el punto de ebullición." },
        { a: "Grado de insaturación", b: "DI = (2C + 2 + N − H − X)/2. Cuenta dobles enlaces, 2 por cada triple, y ciclos." },
        { a: "Empírica y molecular", b: "Empírica: proporción mínima. Molecular = empírica × k, con k = M/M_emp. O por diferencia; 1 H₂O = 2 H." }
      ]
    },
    emp1: {
      titulo: "Empareja grupo funcional y compuesto",
      consigna: "Une cada familia con un compuesto de ejemplo.",
      pares: [["Ácido carboxílico", "ácido etanoico"], ["Éster", "etanoato de etilo"], ["Amida", "etanamida"], ["Nitrilo", "etanonitrilo"], ["Aldehído", "propanal"], ["Cetona", "propanona"], ["Alcohol", "propan-2-ol"], ["Amina", "etanamina"], ["Éter", "metoxietano"]]
    },
    orden1: {
      titulo: "Ordena el proceso de nombrar",
      consigna: "Pon los pasos en el orden correcto.",
      items: [
        { t: "Localizar el grupo funcional de mayor prioridad", nota: "da el sufijo" },
        { t: "Elegir la cadena principal", nota: "la más larga que contiene el grupo principal y los enlaces múltiples" },
        { t: "Numerar la cadena", nota: "localizador más bajo al principal, luego a dobles/triples y sustituyentes" },
        { t: "Nombrar los sustituyentes por orden alfabético", nota: "di-, tri- no cuentan" },
        { t: "Ensamblar prefijos + raíz + sufijo", nota: "comas entre números y guiones entre números y letras" }
      ]
    },
    clas1: {
      titulo: "Hibridación del carbono señalado",
      consigna: "Toca cada carbono (en negrita) y después su hibridación.",
      categorias: ["sp³", "sp²", "sp"],
      items: [
        { t: "<b>C</b>H₄", c: 0 }, { t: "CH₃–<b>C</b>H₂–CH₃", c: 0 }, { t: "<b>C</b>H₂=CH₂", c: 1 }, { t: "CH₃–<b>C</b>HO", c: 1 },
        { t: "CH₃–<b>C</b>OOH", c: 1 }, { t: "H–<b>C</b>≡<b>C</b>–H", c: 2 }, { t: "CH₃–<b>C</b>≡N", c: 2 }, { t: "CH₂=<b>C</b>=CH₂ (el central)", c: 2 }
      ]
    },
    clas2: {
      titulo: "Fuerza intermolecular dominante",
      consigna: "En el líquido puro, ¿cuál es la fuerza más importante entre sus moléculas?",
      categorias: ["London (apolar)", "Dipolo–dipolo", "Puente de hidrógeno"],
      items: [
        { t: "pentano", c: 0 }, { t: "hexano", c: 0 }, { t: "propanona", c: 1 }, { t: "propanal", c: 1 }, { t: "clorometano", c: 1 },
        { t: "etanol", c: 2 }, { t: "ácido etanoico", c: 2 }, { t: "propan-1-amina", c: 2 }
      ]
    }
  };
  // Los bancos de moléculas y retos del tema 7 de Física y Química I (el constructor, los juegos de nombrar y el reto)
  datos.moleculas = B.parte.t7datos.moleculas;
  datos.retos = B.parte.t7datos.retos;

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function tx(id, nivel, enun, etq, vals, otras, pistas, pasos, res) { var c = { tipo: "texto", etiqueta: etq, valores: vals }; if (otras && otras.length) c.otras = otras; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  function nc(etq, val, tol) { return { tipo: "num", etiqueta: etq, valor: val, tol: tol || 0.01 }; }

  // ---------------- ★
  op("c1", 1, "¿Qué hibridación tienen los carbonos del etano, CH₃–CH₃?", "Hibridación", ["sp³", "sp²", "sp", "s"], 0,
    ["Cuenta los átomos unidos a cada C."], ["Cada C está unido a 3 H y 1 C: 4 átomos.", "4 vecinos → sp³ (tetraédrico, 109,5°)."], "sp³");
  op("c2", 1, "¿Qué hibridación tienen los dos carbonos del eteno, CH₂=CH₂?", "Hibridación", ["sp²", "sp³", "sp", "sp²d"], 0,
    ["Cada C: 2 H y 1 C (con doble enlace)."], ["3 vecinos por carbono.", "3 → sp² (plano, 120°)."], "sp²");
  nu("c3", 1, "¿Cuántos enlaces σ tiene la molécula de eteno, C₂H₄?", "n.º de enlaces σ =", 5,
    ["Cada C–H es σ; en el doble enlace, uno σ y otro π."], ["4 enlaces C–H: 4 σ.", "C=C: 1 σ + 1 π.", "Total: 5 σ (y 1 π)."], "5", 0.01);
  op("c4", 1, "¿A qué familia pertenece el CH₃CH₂COOH?", "Familia", ["ácido carboxílico", "éster", "aldehído", "alcohol"], 0,
    ["Mira el grupo –COOH."], ["–COOH = carboxilo.", "El compuesto es el ácido propanoico."], "Ácido carboxílico");
  tx("c5", 1, "Nombra el compuesto CH₃–CH₂–CH₂–OH.", "Nombre IUPAC", ["propan-1-ol"], ["1-propanol"],
    ["Tres carbonos y un –OH en el extremo."], ["Cadena de 3 C: prop-.", "Alcohol: sufijo «-ol»; el –OH en el C1.", "Propan-1-ol."], "propan-1-ol");
  tx("c6", 1, "Nombra el compuesto CH₃–CH₂–CHO.", "Nombre IUPAC", ["propanal"], [],
    ["El C del –CHO cuenta en la cadena."], ["Aldehído con 3 C: prop- + «-al».", "El grupo –CHO siempre está en el C1: no hace falta localizador."], "propanal");
  tx("c7", 1, "Nombra el compuesto CH₃–CO–CH₃.", "Nombre IUPAC", ["propanona"], ["acetona"],
    ["Cetona de 3 carbonos."], ["Cadena de 3 C: prop-.", "Cetona: sufijo «-ona» (el C=O solo puede estar en el C2)."], "propanona (acetona)");
  op("c8", 1, "La fórmula semidesarrollada del ácido etanoico es…", "Fórmula", ["CH₃–COOH", "CH₃–CHO", "CH₃–CH₂–OH", "HCOOCH₃"], 0,
    ["Dos carbonos y un grupo carboxilo."], ["Etan- = 2 C; «ácido …oico» = –COOH en el extremo.", "CH₃–COOH."], "CH₃–COOH");
  op("c9", 1, "El sufijo que caracteriza a las amidas es…", "Sufijo", ["-amida", "-amina", "-nitrilo", "-oato"], 0,
    ["Piensa en –CONH₂."], ["Amidas: –CONH₂ → «-amida».", "Aminas: –NH₂ → «-amina»."], "-amida");
  op("c10", 1, "En el 2-hidroxietanal, HO–CH₂–CHO, ¿qué grupo da el sufijo?", "Grupo principal", ["aldehído", "alcohol", "los dos", "ninguno"], 0,
    ["Compara las prioridades: aldehído y alcohol."], ["Aldehído (5.º) tiene más prioridad que alcohol (7.º).", "El –OH pasa a prefijo «hidroxi»."], "El aldehído (–al)");
  op("c11", 1, "El propan-1-ol y el propan-2-ol son isómeros de…", "Isomería", ["posición", "cadena", "función", "no son isómeros"], 0,
    ["El grupo es el mismo, pero…"], ["Ambos son C₃H₈O y alcoholes.", "El –OH cambia de carbono: posición."], "Posición");
  op("c12", 1, "El etanol y el metoximetano (CH₃OCH₃) son isómeros de…", "Isomería", ["función", "cadena", "posición", "geométrica"], 0,
    ["Uno tiene –OH y el otro –O–."], ["Los dos son C₂H₆O.", "Alcohol frente a éter: grupos funcionales distintos."], "Función");
  nu("c13", 1, "Calcula el grado de insaturación del C₄H₆.", "DI =", 2,
    ["DI = (2C + 2 − H)/2."], ["DI = (2·4 + 2 − 6)/2 = 4/2 = 2.", "Un triple enlace, dos dobles o un doble y un ciclo."], "2", 0.01);
  op("c14", 1, "¿Cuál de estos alquenos presenta isomería cis-trans?", "Cis-trans", ["but-2-eno", "eteno", "propeno", "2-metilpropeno"], 0,
    ["Debe haber dos sustituyentes distintos en cada carbono del doble enlace."], ["But-2-eno: CH₃–CH=CH–CH₃ → H y CH₃ en cada C: sí.", "Eteno, propeno y 2-metilpropeno tienen un C con dos grupos iguales."], "But-2-eno");
  op("c15", 1, "¿Cuál de estos compuestos tiene un carbono quiral?", "Quiral", ["CH₃–CH(OH)–COOH", "CH₃–CH₂–OH", "CH₃–CH₂–COOH", "CH₃–CO–CH₃"], 0,
    ["Busca un C con cuatro grupos distintos."], ["En CH₃–CH(OH)–COOH el C2 lleva H, OH, CH₃ y COOH.", "En los demás, ningún carbono sp³ tiene 4 sustituyentes distintos."], "Ácido láctico");
  op("c16", 1, "¿Cuál es la fuerza intermolecular más importante en el etanol líquido?", "Fuerza", ["puentes de hidrógeno", "solo London", "enlace iónico", "enlace metálico"], 0,
    ["Hay un H unido a O."], ["O–H → puentes de H entre moléculas.", "Explican su Teb de 78,4 °C."], "Puentes de hidrógeno");
  nu("c17", 1, "Calcula la masa molar del etanol, C₂H₆O (C 12,01; H 1,008; O 16,00 g/mol).", "M (g/mol) =", 46.07,
    ["M = 2·12,01 + 6·1,008 + 16,00."], ["24,02 + 6,048 + 16,00 = 46,07 g/mol."], "46,07 g/mol", 0.005);
  op("c18", 1, "El etanol y el metoximetano tienen la misma masa molar. ¿Cuál hierve a mayor temperatura?", "Mayor Teb", ["el etanol", "el metoximetano", "igual", "depende de la presión únicamente"], 0,
    ["¿Cuál puede formar puentes de H?"], ["El etanol tiene O–H: puentes de H.", "El éter no: solo dipolo débil y London."], "Etanol (78,4 °C frente a −24,8 °C)");

  // ---------------- ★★
  tx("d1", 2, "Nombra el compuesto CH₃–CH(CH₃)–CH₂–CH₃.", "Nombre IUPAC", ["2-metilbutano"], [],
    ["La cadena más larga tiene 4 C."], ["Cadena de 4 C (butano) con un CH₃ lateral.", "Numerando desde el extremo cercano al CH₃: localizador 2 (desde el otro, 3).", "2-metilbutano."], "2-metilbutano");
  tx("d2", 2, "Nombra el compuesto CH₃–CH(OH)–CH₂–CH₃.", "Nombre IUPAC", ["butan-2-ol"], ["2-butanol"],
    ["El –OH debe llevar el localizador más bajo."], ["Cadena de 4 C.", "El –OH está en el segundo carbono desde cualquiera de los dos lados más cercanos: 2.", "Butan-2-ol."], "butan-2-ol");
  tx("d3", 2, "Nombra el compuesto CH₃–CH₂–COO–CH₃.", "Nombre IUPAC", ["propanoato de metilo"], [],
    ["Parte ácida: 3 C. Radical del alcohol: 1 C."], ["Lado del C=O: CH₃CH₂CO– → propanoato.", "Lado del O: –CH₃ → metilo.", "Propanoato de metilo."], "propanoato de metilo");
  tx("d4", 2, "Nombra el compuesto CH₃–CH₂–C≡N.", "Nombre IUPAC", ["propanonitrilo"], [],
    ["El C del –C≡N cuenta en la cadena."], ["3 C en total (incluido el del grupo).", "Sufijo «-nitrilo»."], "propanonitrilo");
  tx("d5", 2, "Nombra el compuesto CH₂=CH–CH₂–CH₂–CH₃.", "Nombre IUPAC", ["pent-1-eno"], ["1-penteno"],
    ["Cinco carbonos y un doble enlace en el extremo."], ["Cadena de 5 C: pent-.", "Doble enlace entre C1 y C2: pent-1-eno."], "pent-1-eno");
  op("d6", 2, "La fórmula semidesarrollada de la 3-metilbutan-2-ona es…", "Fórmula", ["CH₃–CO–CH(CH₃)–CH₃", "CH₃–CH₂–CO–CH₂–CH₃", "CH₃–CH(CH₃)–CH₂–CHO", "CH₃–CH(OH)–CH(CH₃)–CH₃"], 0,
    ["Cadena de 4 C, C=O en el 2 y un metilo en el 3."], ["Butan-2-ona: CH₃–CO–CH₂–CH₃.", "Metilo en C3: CH₃–CO–CH(CH₃)–CH₃."], "CH₃–CO–CH(CH₃)–CH₃");
  op("d7", 2, "La fórmula del ácido 2-hidroxipropanoico es…", "Fórmula", ["CH₃–CH(OH)–COOH", "HO–CH₂–CH₂–COOH", "CH₃–CO–CH₂–OH", "CH₃–CH(OH)–CHO"], 0,
    ["Propanoico: 3 C con –COOH en C1; hidroxi en C2."], ["C1 = COOH, C2 lleva –OH, C3 = CH₃.", "Es el ácido láctico."], "CH₃–CH(OH)–COOH");
  nu("d8", 2, "(Estilo EvAU) ¿Cuántos isómeros estructurales de fórmula C₄H₁₀O hay que sean alcoholes o éteres (sin contar estereoisómeros)?", "n.º de isómeros =", 7,
    ["DI = 0. Alcoholes: busca los esqueletos de 4 C. Éteres: reparte los C a los dos lados del O."],
    ["Alcoholes lineales: butan-1-ol y butan-2-ol; ramificados: 2-metilpropan-1-ol y 2-metilpropan-2-ol (4).", "Éteres: metoxipropano, 2-metoxipropano y etoxietano (3).", "Total 4 + 3 = 7."], "7", 0.01);
  nu("d9", 2, "¿Cuántos isómeros estructurales tiene el C₅H₁₂ (alcanos), contando el pentano?", "n.º de isómeros =", 3,
    ["Un esqueleto lineal y los ramificados."], ["Pentano.", "2-metilbutano.", "2,2-dimetilpropano.", "Total: 3."], "3", 0.01);
  nu("d10", 2, "¿Cuántos carbonos quirales tiene el CH₃–CHBr–CHCl–CH₃?", "n.º de C quirales =", 2,
    ["Cada C central lleva H, un halógeno, CH₃ y otro carbono sustituido."], ["C2: H, Br, CH₃ y CHCl–CH₃ → distintos: quiral.", "C3: H, Cl, CH₃ y CHBr–CH₃ → distintos: quiral.", "Hay 2."], "2", 0.01);
  nu("d11", 2, "¿Cuál es el número máximo de estereoisómeros de una molécula con 3 carbonos quirales distintos?", "máx. estereoisómeros =", 8,
    ["2 elevado al número de centros."], ["Máx. = 2ⁿ = 2³ = 8."], "8", 0.01);
  op("d12", 2, "¿Qué hibridación tiene el carbono del grupo –CHO?", "Hibridación", ["sp²", "sp³", "sp", "sp²d"], 0,
    ["3 vecinos: O (doble), C y H."], ["Tres átomos unidos → sp².", "Es plano, con ángulos de 120°."], "sp²");
  nu("d13", 2, "Calcula el grado de insaturación del tolueno, C₇H₈.", "DI =", 4,
    ["Aplica DI = (2C + 2 − H)/2."], ["DI = (2·7 + 2 − 8)/2 = 8/2 = 4.", "Tres dobles enlaces y un ciclo."], "4", 0.01);
  op("d14", 2, "Ordena de menor a mayor punto de ebullición: butanal, butan-1-ol y pentano.", "Orden", ["pentano &lt; butanal &lt; butan-1-ol", "butanal &lt; pentano &lt; butan-1-ol", "butan-1-ol &lt; butanal &lt; pentano", "pentano &lt; butan-1-ol &lt; butanal"], 0,
    ["M parecida: mira el tipo de fuerza."], ["Pentano: London (36,1 °C).", "Butanal: dipolo–dipolo (74,8 °C).", "Butan-1-ol: puentes de H (117,7 °C)."], "Pentano < butanal < butan-1-ol");
  op("d15", 2, "¿Cuál es un isómero de función del butanal, CH₃CH₂CH₂CHO?", "Isómero", ["butanona", "butan-1-ol", "ácido butanoico", "pentanal"], 0,
    ["Misma fórmula C₄H₈O y otro grupo."], ["El butanal es C₄H₈O.", "La butanona (cetona) también: C₄H₈O.", "El butan-1-ol es C₄H₁₀O y el ácido butanoico C₄H₈O₂."], "Butanona");
  nu("d16", 2, "Al quemar una muestra se obtienen 0,880 g de CO₂. ¿Cuántos moles de C había en la muestra? (M(CO₂) = 44,0 g/mol)", "n(C) (mol) =", 0.0200,
    ["1 mol de CO₂ contiene 1 mol de C."], ["n(CO₂) = 0,880/44,0 = 0,0200 mol.", "n(C) = 0,0200 mol."], "0,0200 mol", 0.01);
  tx("d17", 2, "Nombra el compuesto CH₃–CH₂–O–CH₃.", "Nombre IUPAC", ["metoxietano"], ["etil metil éter"],
    ["La cadena más larga es la base; la corta con el O es «alcoxi»."], ["Cadena larga: 2 C (etano). Cadena corta: –O–CH₃ → metoxi.", "Metoxietano."], "metoxietano");
  op("d18", 2, "El nombre de CH₃–COO–CH₂–CH₃ es…", "Nombre", ["etanoato de etilo", "propanoato de metilo", "etil etanol", "ácido butanoico"], 0,
    ["Mira cada lado del grupo –COO–."], ["Lado del C=O: CH₃CO– → etanoato.", "Lado del O: CH₂CH₃ → etilo."], "Etanoato de etilo");

  // ---------------- ★★★
  tx("e1", 3, "(Estilo EvAU) Nombra HOOC–CH₂–CH(OH)–CH₃.", "Nombre IUPAC", ["ácido 3-hidroxibutanoico"], [],
    ["El ácido es el grupo principal y lleva el 1."], ["Cadena de 4 C con el –COOH en el C1.", "El –OH queda en el C3: prefijo «hidroxi».", "Ácido 3-hidroxibutanoico."], "ácido 3-hidroxibutanoico");
  tx("e2", 3, "(Estilo EvAU) Nombra CH₃–CO–CH₂–CH₂–OH.", "Nombre IUPAC", ["4-hidroxibutan-2-ona"], [],
    ["La cetona es el grupo principal."], ["Cetona > alcohol: sufijo «-ona», prefijo «hidroxi».", "Numerando desde el CH₃: C=O en 2, OH en 4 (frente a 3 y 1 desde el otro extremo: gana el 2 para la cetona).", "4-hidroxibutan-2-ona."], "4-hidroxibutan-2-ona");
  tx("e3", 3, "(Estilo EvAU) Nombra CH₃–CH(CH₃)–CH₂–CH(CH₂CH₃)–CH₂–CH₃.", "Nombre IUPAC", ["4-etil-2-metilhexano"], [],
    ["Cadena más larga: 6 carbonos."], ["Hexano con metilo y etilo.", "Localizadores {2, 4} frente a {3, 5}: gana {2, 4}.", "Alfabético: etil antes que metil."], "4-etil-2-metilhexano");
  ge("e4", 3, "(Estilo EvAU) Un compuesto contiene 62,1 % de C, 10,3 % de H y 27,6 % de O y su masa molar es 58 g/mol. Halla su fórmula molecular: número de átomos de C, H y O.",
    [nc("n.º de C =", 3), nc("n.º de H =", 6), nc("n.º de O =", 1)],
    ["En 100 g de compuesto hay 62,1 g de C…"], ["Moles: C = 62,1/12,0 = 5,18; H = 10,3/1,01 = 10,2; O = 27,6/16,0 = 1,73.", "Entre el menor (1,73): C = 3,0; H = 5,9; O = 1. Empírica C₃H₆O (M = 58).", "k = 58/58 = 1 → C₃H₆O (propanal o propanona)."], "C₃H₆O");
  ge("e5", 3, "(Estilo EvAU) Al quemar 0,920 g de un compuesto de C, H y O se obtienen 1,76 g de CO₂ y 1,08 g de H₂O. Calcula la masa de oxígeno de la muestra (g) y el número de átomos de H de la fórmula molecular si M = 46 g/mol.",
    [nc("m(O) (g) =", 0.32, 0.02), nc("n.º de H =", 6)],
    ["m(C) = n(C)·12; m(H) = 2·n(H₂O)·1; O por diferencia."], ["n(C) = 1,76/44,0 = 0,0400 mol → 0,480 g.", "n(H) = 2·1,08/18,0 = 0,120 mol → 0,120 g.", "m(O) = 0,920 − 0,480 − 0,120 = 0,320 g → 0,0200 mol.", "C : H : O = 2 : 6 : 1 → C₂H₆O (M = 46): k = 1."], "m(O) = 0,320 g; C₂H₆O");
  nu("e6", 3, "¿Cuántos isómeros estructurales de fórmula C₃H₆O₂ son ácidos carboxílicos o ésteres (acíclicos, sin otros grupos)?", "n.º de isómeros =", 3,
    ["Un ácido y dos ésteres."], ["Ácido propanoico, CH₃CH₂COOH.", "Éster: etanoato de metilo, CH₃COOCH₃.", "Éster: metanoato de etilo, HCOOCH₂CH₃.", "Total 3."], "3", 0.01);
  op("e7", 3, "(Estilo EvAU) ¿Cuál de estos compuestos presenta isomería cis-trans?", "Cis-trans", ["CH₃–CH=CHCl", "CH₂=CHCl", "(CH₃)₂C=CH₂", "CH₂=CH–CH₃"], 0,
    ["Cada C del doble enlace necesita dos sustituyentes distintos."], ["CH₃–CH=CHCl: H y CH₃ en un C; H y Cl en el otro. Sí.", "En los demás, un carbono del doble enlace lleva dos H o dos CH₃."], "CH₃–CH=CHCl");
  ge("e8", 3, "(Estilo EvAU) Para el 3-metilpentan-2-ol, CH₃–CH(OH)–CH(CH₃)–CH₂–CH₃, indica el número de carbonos quirales y el número máximo de estereoisómeros.",
    [nc("C quirales =", 2), nc("estereoisómeros (máx.) =", 4)],
    ["C2: H, OH, CH₃ y …; C3: H, CH₃, etilo y …"], ["C2: H, OH, CH₃ y CH(CH₃)CH₂CH₃ → distintos: quiral.", "C3: H, CH₃, CH₂CH₃ y CH(OH)CH₃ → distintos: quiral.", "2ⁿ = 2² = 4 estereoisómeros."], "2 carbonos quirales; 4 estereoisómeros");
  nu("e9", 3, "¿Cuántos estereoisómeros distintos tiene el 2,3-dibromobutano, CH₃–CHBr–CHBr–CH₃? (Atención a la forma meso.)", "n.º de estereoisómeros =", 3,
    ["Los dos C quirales son iguales entre sí."], ["Hay 2 centros: máx. 2² = 4.", "Como los dos C son equivalentes, el isómero (R,S) tiene un plano de simetría: forma meso, igual que el (S,R).", "Reales: (R,R), (S,S) y meso → 3."], "3", 0.01);
  op("e10", 3, "(Estilo EvAU) El ácido etanoico (118 °C) hierve a más temperatura que el propan-1-ol (97 °C) aunque su masa molar sea igual (60 g/mol). La causa es que…", "Causa", ["forma dímeros con dos puentes de hidrógeno entre moléculas", "tiene un enlace O–H más fuerte", "tiene mayor masa molar", "es un compuesto iónico"], 0,
    ["Tiene O–H y también C=O."], ["El –COOH da dos puentes de H entre dos moléculas (dímero).", "El alcohol solo forma uno por pareja. Más fuerza intermolecular → mayor Teb."], "Dímeros con dos puentes de H");
  op("e11", 3, "El butano (C₄H₁₀) hierve a −0,5 °C y el 2-metilpropano (C₄H₁₀) a −11,7 °C. ¿Por qué el butano hierve más?", "Causa", ["su cadena lineal ofrece más superficie de contacto y más fuerzas de London", "tiene puentes de hidrógeno", "tiene mayor masa molar", "es polar"], 0,
    ["Mismos átomos; ¿qué cambia?"], ["Son isómeros: igual M.", "La molécula ramificada es más compacta y se atrae menos con sus vecinas."], "Mayor superficie de contacto en la lineal");
  nu("e12", 3, "Calcula la densidad del propano (C₃H₈, M = 44,1 g/mol) a 25 °C y 1 atm, en g/L, tratándolo como gas ideal. (R = 0,082 atm·L/(mol·K))", "d (g/L) =", 1.80,
    ["d = pM/(RT)."], ["T = 298 K.", "d = 1 · 44,1/(0,082 · 298) = 44,1/24,44 = 1,80 g/L."], "1,80 g/L", 0.01);
  ge("e13", 3, "Para el CH₂=CH–C≡CH (but-1-en-3-ino), cuenta los enlaces σ y los π de la molécula.",
    [nc("n.º de enlaces σ =", 7), nc("n.º de enlaces π =", 3)],
    ["Un doble enlace: 1 σ + 1 π. Un triple: 1 σ + 2 π."], ["C–H: 2 + 1 + 1 = 4 σ.", "C–C: C1=C2 (1 σ), C2–C3 (1 σ), C3≡C4 (1 σ) = 3 σ.", "σ = 7. π: 1 + 2 = 3."], "7 σ y 3 π");
  nu("e14", 3, "¿Cuántos alquenos acíclicos de fórmula C₄H₈ existen contando los estereoisómeros cis-trans?", "n.º de alquenos =", 4,
    ["Esqueletos: lineal y ramificado."], ["But-1-eno.", "Cis-but-2-eno y trans-but-2-eno.", "2-metilpropeno.", "Total 4 (3 isómeros estructurales; el but-2-eno tiene dos estereoisómeros)."], "4", 0.01);
  op("e15", 3, "En HOOC–CH₂–CHO, ¿qué grupo da el sufijo y cuál es el nombre?", "Nombre", ["ácido 3-oxopropanoico (manda el ácido)", "3-carboxipropanal (manda el aldehído)", "propanal-ácido", "ácido 2-formiletanoico"], 0,
    ["Ácido &gt; aldehído."], ["El –COOH es el principal: ácido …oico en C1.", "El –CHO queda como prefijo «oxo» en el C3."], "Ácido 3-oxopropanoico");
  tx("e16", 3, "Nombra la amida CH₃–CH₂–CH₂–CO–NH₂.", "Nombre IUPAC", ["butanamida"], [],
    ["El C del –CONH₂ cuenta en la cadena."], ["Cadena de 4 C.", "Sufijo «-amida»."], "butanamida");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Grupos funcionales: prioridad y nombre", ancha: true,
      tabla: { cab: ["#", "Familia", "Grupo", "Sufijo", "Prefijo"], filas: [
        ["1", "Ácido carboxílico", "–COOH", "ácido …oico", "carboxi-"],
        ["2", "Éster", "–COO–", "…oato de …ilo", "—"],
        ["3", "Amida", "–CONH₂", "…amida", "carbamoil-"],
        ["4", "Nitrilo", "–C≡N", "…nitrilo", "ciano-"],
        ["5", "Aldehído", "–CHO", "…al", "oxo- / formil-"],
        ["6", "Cetona", ">C=O", "…ona", "oxo-"],
        ["7", "Alcohol", "–OH", "…ol", "hidroxi-"],
        ["8", "Amina", "–NH₂", "…amina", "amino-"],
        ["—", "Éter · halógeno · nitro", "–O– · –X · –NO₂", "(no)", "alcoxi- · cloro-… · nitro-"]
      ] },
      nota: "Numera para dar el localizador más bajo primero al grupo principal, luego a los enlaces múltiples y a los sustituyentes." },
    { titulo: "Isomería: ¿de qué tipo es?", ancha: true,
      tabla: { cab: ["Pregunta", "Si la respuesta es sí…"], filas: [
        ["¿Misma fórmula molecular?", "son isómeros; si no, son compuestos distintos"],
        ["¿Cambia el esqueleto de C?", "isomería de cadena"],
        ["¿Mismo grupo en otro carbono?", "isomería de posición"],
        ["¿Distinto grupo funcional?", "isomería de función"],
        ["¿Mismos enlaces pero distinto lado del C=C?", "geométrica (cis-trans): cada C con dos sustituyentes distintos"],
        ["¿C con cuatro sustituyentes distintos?", "óptica: enantiómeros, 2ⁿ estereoisómeros como máximo"]
      ] },
      nota: "Primero decide si cambia la conectividad (estructural) o solo la disposición en el espacio (estereoisomería)." },
    { titulo: "Teb y fuerzas intermoleculares (M ≈ 60)", ancha: true,
      tabla: { cab: ["Compuesto", "Teb (°C)", "Fuerza dominante"], filas: [
        ["butano", "−0,5", "London"],
        ["metoxietano", "7,4", "dipolo débil"],
        ["propanal", "48,0", "dipolo–dipolo"],
        ["propanona", "56,1", "dipolo–dipolo"],
        ["propan-1-ol", "97,2", "puentes de H"],
        ["ácido etanoico", "118,1", "puentes de H (dímeros)"]
      ] },
      nota: "Con masas parecidas manda el tipo de fuerza. Cada CH₂ más sube la Teb; las ramificaciones la bajan." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "CH₃CH₂CHO = etanal", bien: "propanal (el C del –CHO cuenta)", por: "3 C en la cadena." },
        { mal: "CH₃OCH₂CH₃ = etoximetano", bien: "metoxietano", por: "La cadena larga es la base." },
        { mal: "Doble enlace ⇒ siempre cis-trans", bien: "solo si cada C tiene dos sustituyentes distintos", por: "(CH₃)₂C=… no lo tiene." },
        { mal: "Pentan-3-ol tiene C quiral", bien: "no: lleva dos etilos iguales", por: "4 sustituyentes distintos." },
        { mal: "El O–H más fuerte explica la Teb", bien: "los puentes de H entre moléculas", por: "El enlace no se rompe al hervir." },
        { mal: "Mol de H = mol de H₂O", bien: "n(H) = 2·n(H₂O)", por: "Cada H₂O tiene 2 H." }
      ] }
  ];

  B.registrar("quimica2", "t9", { resumen: resumen, secciones: B.parte.q2t9a.secciones, nuevas: B.parte.q2t9b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
