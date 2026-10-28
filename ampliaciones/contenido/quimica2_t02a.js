/* ============================================================
   Química II · ampliaciones · Tema 2: Estructura de la materia
   (parte A: se añade al final de las cuatro secciones originales)

   IDEAS QUE MÁS CUESTAN EN LA EvAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Modelos atómicos y por qué cada uno se queda corto → tabla + «clasificar» y «emparejar» (un gráfico no ayuda: es memoria razonada).
   2. Espectros y Bohr: E, λ, ν de una transición del H con Rydberg, series → se reutiliza q1_bohr (niveles, flecha del fotón y espectro de la serie).
   3. Efecto fotoeléctrico: umbral, Ec = hν − W, «la intensidad no cambia la Ec» → NUEVO qq2_fotoel (recta Ec frente a ν con pendiente h).
   4. Dualidad onda-corpúsculo (De Broglie): ¿por qué no se nota en una pelota? → NUEVO qq2_broglie (λ frente a v para cuatro objetos).
   5. Principio de incertidumbre: por qué no hay «órbitas» → mismo widget qq2_broglie (Δx mínima frente al tamaño del átomo).
   6. Números cuánticos: conjuntos válidos y no válidos → se reutiliza q1_cuanticos (marca el error) + tabla de n, l, m.
   7. Forma y orientación de los orbitales (s, p, d) y nodos → q1_cuanticos (dibuja el orbital).
   8. Aufbau, Pauli, Hund y excepciones Cr y Cu → NUEVO qq2_llenar («llénalo tú» con comprobación) + q1_config.
   9. Electrones desapareados, paramagnetismo y capa de valencia → q1_config.
   10. Configuración de iones (el 4s se pierde antes que el 3d) e isoelectrónicos → q1_config con carga.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t2/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso
  secciones[0] = env(
    "<h5>Qué vas a poder explicar al terminar el tema</h5>" +
    "<p>Este tema contesta a tres preguntas que se repiten en la EvAU de Madrid: <b>(1)</b> ¿cómo es el átomo y por qué cada modelo se quedó corto?; <b>(2)</b> ¿cómo interacciona la luz con el átomo (espectros, efecto fotoeléctrico) y qué dice eso sobre la energía?; <b>(3)</b> ¿cómo se reparten los electrones (números cuánticos, orbitales, configuración) y qué propiedades se deducen de ello? Las tres se enlazan: la luz que emite un átomo es la huella de sus niveles de energía, y esos niveles son los que llenan los electrones.</p>" +
    "<h5>Notación que vas a usar siempre</h5>" +
    tabla(["Símbolo", "Significa", "Valor o unidad habitual"], [
      ["Z, A", "número atómico (protones) y número másico (protones + neutrones)", "Z identifica el elemento; en un átomo neutro, electrones = Z"],
      ["h", "constante de Planck", "6,626·10⁻³⁴ J·s"],
      ["c", "velocidad de la luz en el vacío", "3,00·10⁸ m/s"],
      ["R<sub>H</sub>", "constante de Rydberg del hidrógeno", "1,097·10⁷ m⁻¹"],
      ["1 eV", "electronvoltio: energía de un electrón acelerado con 1 V", "1,602·10⁻¹⁹ J"],
      ["m<sub>e</sub>", "masa del electrón", "9,109·10⁻³¹ kg"],
      ["λ, ν", "longitud de onda (m, nm) y frecuencia (Hz = s⁻¹)", "c = λ·ν"]
    ], "q3t") +
    "<p>Con los datos de un examen casi nunca hace falta recordar más constantes que estas; lo que se pide es <b>usarlas con unidades coherentes</b>: nanómetros a metros (×10⁻⁹), electronvoltios a julios (×1,602·10⁻¹⁹).</p>" +
    ojo("Un átomo neutro tiene tantos electrones como protones (Z), pero un <b>ion</b> no: el número de electrones es Z − carga. El Fe³⁺ (Z = 26) tiene 23 electrones, no 26.")
  );

  // ---------------------------------------------------------------- 2. Números cuánticos
  secciones[1] = env(
    "<h5>De dónde salen los números cuánticos</h5>" +
    "<p>En el modelo de Bohr bastaba un número (<i>n</i>) para describir al electrón. Al resolver la ecuación de Schrödinger para el átomo de hidrógeno, los tres primeros números <b>aparecen solos</b> como condiciones matemáticas, y el cuarto (el espín) se añade para explicar los experimentos. No hace falta resolver nada: basta saber qué significa cada uno y <b>qué valores permite</b>.</p>" +
    tabla(["Número", "Describe", "Valores permitidos", "Ejemplo (n = 3)"], [
      ["<i>n</i> principal", "tamaño y energía del nivel", "1, 2, 3, … (enteros positivos)", "3"],
      ["<i>l</i> secundario", "forma del orbital (subnivel)", "0, 1, …, n − 1", "0 (s), 1 (p), 2 (d)"],
      ["<i>m</i><sub>l</sub> magnético", "orientación en el espacio", "−l, …, 0, …, +l (2l + 1 valores)", "para l = 2: −2, −1, 0, +1, +2"],
      ["<i>m</i><sub>s</sub> espín", "giro del electrón", "+½ o −½", "dos valores siempre"]
    ], "q3t") +
    "<p><b>Contar orbitales y electrones</b> es mecánico: un subnivel de valor <i>l</i> tiene 2<i>l</i> + 1 orbitales (s: 1, p: 3, d: 5, f: 7) y, como cada orbital admite 2 electrones, 2(2<i>l</i> + 1) electrones (s: 2, p: 6, d: 10, f: 14). Un nivel <i>n</i> contiene <i>n</i>² orbitales y 2<i>n</i>² electrones: 2, 8, 18, 32…</p>" +
    ejemplo("Ejemplo resuelto: ¿es válido este conjunto?", "Indica si cada conjunto (n, l, m<sub>l</sub>, m<sub>s</sub>) puede describir a un electrón de un átomo y, si no, qué regla incumple: (a) (2, 1, 0, +½); (b) (3, 3, 1, −½); (c) (2, 0, 1, +½); (d) (4, 2, −2, ½).", [
      "<b>(a)</b> l = 1 ≤ n − 1 = 1 ✓; |m<sub>l</sub>| = 0 ≤ 1 ✓; m<sub>s</sub> = +½ ✓. <b>Válido</b>: electrón de un orbital 2p.",
      "<b>(b)</b> l debe ser como máximo n − 1 = 2, pero l = 3. <b>No válido</b>: no existe el subnivel 3f.",
      "<b>(c)</b> con l = 0 el único m<sub>l</sub> posible es 0 (2·0 + 1 = 1 orbital), y aquí m<sub>l</sub> = 1. <b>No válido</b>.",
      "<b>(d)</b> l = 2 ≤ 3 ✓; m<sub>l</sub> = −2 está entre −2 y +2 ✓; m<sub>s</sub> = ½ ✓. <b>Válido</b>: electrón de un orbital 4d."
    ]) +
    "<p>Prueba tú: mueve <i>n</i>, <i>l</i>, <i>m</i><sub>l</sub> y <i>m</i><sub>s</sub> y mira cuándo el conjunto se pone en rojo, qué regla lo rompe y cómo cambia el orbital dibujado.</p>" +
    w("q1_cuanticos") +
    "<h5>Qué es un orbital (y qué no es)</h5>" +
    "<p>Un <b>orbital</b> no es una órbita: es la <b>región del espacio donde la probabilidad de encontrar al electrón es alta</b> (por ejemplo, del 90 %). Su forma depende de <i>l</i>: el orbital <b>s</b> es esférico; los tres <b>p</b> tienen dos lóbulos opuestos y apuntan según los ejes x, y, z; los cinco <b>d</b> tienen sobre todo cuatro lóbulos. A mayor <i>n</i>, mayor tamaño (el electrón está, en promedio, más lejos del núcleo y menos ligado). Todos los orbitales de un mismo subnivel (por ejemplo, los tres 2p) tienen <b>la misma energía</b>: se dice que son <b>degenerados</b>.</p>" +
    "<p>Hay también un número de <b>nodos</b> (zonas con probabilidad nula): un orbital tiene <i>l</i> nodos angulares y <i>n</i> − <i>l</i> − 1 nodos radiales. Por eso el 1s no tiene ninguno, el 2s tiene uno radial y el 2p tiene uno angular (el plano que separa sus dos lóbulos). Este nivel de detalle rara vez se pide, pero ayuda a entender por qué los orbitales «crecen» con <i>n</i>.</p>" +
    ojo("Confundir «n», «l» y «m»: n da el <b>nivel</b>, l el <b>subnivel</b> y m el <b>orbital concreto</b> dentro del subnivel. «El electrón está en el nivel 3» no dice si es s, p o d.")
  );

  // ---------------------------------------------------------------- 3. Pauli y Hund
  secciones[2] = env(
    "<h5>Las tres reglas, en una frase cada una</h5>" +
    tabla(["Regla", "Qué ordena", "Qué evita o explica"], [
      ["<b>Aufbau</b> (construcción)", "se ocupan primero los orbitales de menor energía: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s…", "cada electrón va al hueco más estable libre"],
      ["<b>Exclusión de Pauli</b>", "no puede haber dos electrones con los cuatro números cuánticos iguales", "máximo 2 por orbital, con espines opuestos (apareados)"],
      ["<b>Máxima multiplicidad de Hund</b>", "en orbitales de la misma energía, un electrón en cada uno, con espines paralelos, antes de aparear", "repulsión entre electrones; da el mayor número de desapareados"]
    ], "q3t") +
    "<p>El orden de llenado (diagrama de Moeller) se obtiene del criterio <b>n + l</b>: se llena antes el subnivel con menor suma n + l y, si empatan, el de menor n. Así, 4s (4 + 0 = 4) va antes que 3d (3 + 2 = 5), y 4p (5) después de 3d (5) por tener mayor n.</p>" +
    ejemplo("Ejemplo resuelto: ¿qué regla se rompe?", "Un alumno dibuja el diagrama del oxígeno (Z = 8) como 1s ↑↓ · 2s ↑↓ · 2p ↑↓ ↑↓ ▢ (cuatro electrones 2p con dos orbitales llenos y uno vacío). ¿Es correcto?", [
      "Electrones: 2 + 2 + 4 = 8 ✓ (cuadra con Z = 8).",
      "Pauli: cada orbital tiene como máximo 2 electrones con espines opuestos ✓.",
      "Hund: en el subnivel 2p, con 4 electrones y 3 orbitales, deben ocupar los tres orbitales antes de aparear: ↑↓ ↑ ↑. El alumno ha apareado dos orbitales y dejado uno vacío: <b>incumple Hund</b>.",
      "Correcto: 2p ↑↓ ↑ ↑ → <b>2 electrones desapareados</b>. El diagrama del alumno daría 0 y el O sería diamagnético; en realidad el oxígeno es paramagnético."
    ]) +
    "<p>Ahora, el ejercicio de verdad: elige un elemento, coloca los electrones pulsando las cajas y pulsa <em>Comprobar</em>. El widget te dice qué regla has roto. Prueba con el Cr y el Cu para ver las excepciones.</p>" +
    w("qq2_llenar")
  );

  // ---------------------------------------------------------------- 4. Configuración electrónica
  secciones[3] = env(
    "<h5>Escribir la configuración, paso a paso</h5>" +
    "<p>(1) Cuenta los electrones: Z para un átomo neutro; Z − carga para un ion. (2) Llena por el orden de energía hasta agotarlos, con las capacidades 2, 6, 10, 14. (3) Si te lo piden, abrevia con el gas noble anterior entre corchetes y da la <b>capa de valencia</b> (el último nivel: ns y np; en un metal de transición también el (n−1)d). (4) Dibuja las cajas del último subnivel con Hund para contar <b>electrones desapareados</b>.</p>" +
    ejemplo("Ejemplo resuelto: del Z a las propiedades", "Un elemento tiene Z = 34. Escribe su configuración, indica periodo, grupo, electrones de valencia y desapareados, y los números cuánticos posibles del último electrón.", [
      "34 electrones: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁴ (2 + 2 + 6 + 2 + 6 + 2 + 10 + 4 = 34 ✓). Abreviada: [Ar] 4s² 3d¹⁰ 4p⁴.",
      "Periodo = mayor n = 4. Capa de valencia 4s² 4p⁴: 6 electrones → grupo 16 (anfígenos): es el <b>selenio</b>.",
      "En 4p hay 4 electrones y 3 orbitales: ↑↓ ↑ ↑ → <b>2 desapareados</b> (paramagnético).",
      "Último electrón (el 4.º del 4p, el que cierra el primer orbital): n = 4, l = 1, m<sub>l</sub> = −1 (o +1, según el convenio), m<sub>s</sub> = −½. Cualquier convenio consistente es aceptado en la EvAU si se explica."
    ]) +
    "<h5>Excepciones: Cr y Cu (y poco más)</h5>" +
    "<p>El cromo (Z = 24) y el cobre (Z = 29) no siguen la regla: Cr = [Ar] 4s¹ 3d⁵ (no 4s² 3d⁴) y Cu = [Ar] 4s¹ 3d¹⁰ (no 4s² 3d⁹). La explicación habitual: los subniveles <b>d semillenos (d⁵) o llenos (d¹⁰) son especialmente estables</b> (los electrones d son muy parecidos en energía a los 4s, y repartirlos en orbitales distintos con espines paralelos reduce la repulsión). Con las dos excepciones basta en Bachillerato (en 4d y 5d hay más: Nb, Mo, Ag, etc., pero no se piden).</p>" +
    "<h5>Iones: ¿qué electrones se pierden?</h5>" +
    "<p>Un <b>catión</b> pierde primero los electrones del <b>nivel más externo (mayor n)</b>, aunque se hubieran llenado después de los 3d. Por eso el Fe ([Ar] 4s² 3d⁶) forma Fe²⁺ = [Ar] 3d⁶ y Fe³⁺ = [Ar] 3d⁵: salen primero los dos 4s y, luego, uno 3d. Un <b>anión</b> gana electrones en el siguiente hueco del orden de llenado: Cl⁻ = [Ne] 3s² 3p⁶ = configuración del Ar. Las especies con el mismo número de electrones se llaman <b>isoelectrónicas</b>: S²⁻, Cl⁻, Ar, K⁺ y Ca²⁺ tienen 18 electrones.</p>" +
    ejemplo("Ejemplo resuelto: iones del cobre", "Escribe la configuración del Cu, del Cu⁺ y del Cu²⁺ y di cuál es paramagnético.", [
      "Cu (Z = 29, excepción): [Ar] 4s¹ 3d¹⁰ → un electrón desapareado (4s¹).",
      "Cu⁺ (28 e⁻): pierde el 4s¹ → [Ar] 3d¹⁰: <b>0 desapareados</b> (diamagnético).",
      "Cu²⁺ (27 e⁻): pierde además un 3d → [Ar] 3d⁹: <b>1 desapareado</b> (paramagnético).",
      "Cu y Cu²⁺ son paramagnéticos; Cu⁺ no. Por eso las sales de Cu(I) son incoloras y las de Cu(II) azules."
    ]) +
    w("q1_config") +
    "<h5>Desapareados, paramagnetismo y capa de valencia</h5>" +
    "<p>Una sustancia con electrones desapareados es <b>paramagnética</b> (la atrae un imán); si todos están apareados, es <b>diamagnética</b> (la repele muy débilmente). El número de desapareados se lee del último subnivel parcialmente lleno: p³ → 3; p⁴ → 2; d⁵ → 5; d⁶ → 4; d¹⁰ → 0. Los <b>electrones de valencia</b> son los de la capa más externa y deciden las propiedades químicas: el grupo del elemento coincide con ellos en el bloque s y p (1, 2, 13–18).</p>" +
    ojo("«Desapareados» no es lo mismo que «electrones de valencia»: el Cl tiene 7 de valencia (3s² 3p⁵) pero <b>1</b> desapareado, que es el que le permite formar un enlace.")
  );

  B.parte.q2t2a = { secciones: secciones };
})(window);
