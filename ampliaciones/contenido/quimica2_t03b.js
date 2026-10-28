/* ============================================================
   Química II · ampliaciones · Tema 3: Sistema periódico
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t3/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5
    {
      h: "5. Radio iónico y especies isoelectrónicas",
      html: env(
        "<h5>Un átomo y su ion no tienen el mismo tamaño</h5>" +
        "<p>Cuando un átomo se convierte en ion, <b>cambia el número de electrones pero no el de protones</b>, y eso cambia muchísimo el tamaño:</p>" +
        "<ul>" +
        "<li><b>Un catión es más pequeño que su átomo.</b> Pierde electrones, y a menudo toda su capa externa (Na → Na⁺ pasa de n = 3 a n = 2). Además los electrones que quedan sienten una Z* mayor porque hay menos repulsión entre ellos: en el Na el electrón de valencia siente Z* = 2,2; en el Na⁺ el electrón más externo siente 6,85. Cuanta más carga positiva, mayor contracción.</li>" +
        "<li><b>Un anión es más grande que su átomo.</b> Gana electrones sin ganar protones: la repulsión entre electrones aumenta, el apantallamiento crece, Z* baja y la nube se «hincha». En el F el electrón externo siente Z* = 5,2; en el F⁻, 4,85.</li>" +
        "</ul>" +
        "<h5>Especies isoelectrónicas</h5>" +
        "<p>Se llaman <b>isoelectrónicas</b> las especies (átomos o iones) con <b>el mismo número de electrones</b> (y, por tanto, la misma configuración), aunque tengan distinto número de protones. N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺ y Al³⁺ tienen todas 10 electrones: 1s² 2s² 2p⁶. ¿Cuál es la más grande? Como los electrones y la capa son idénticos, <b>solo importa la carga del núcleo</b>: a más protones, más fuerte se atrae la misma nube y menor es el radio.</p>" +
        "<div class='formula-wrap'><div class='formula'>Isoelectrónicas: a mayor <i>Z</i>, menor radio &nbsp;&nbsp; r(N³⁻) &gt; r(O²⁻) &gt; r(F⁻) &gt; r(Na⁺) &gt; r(Mg²⁺) &gt; r(Al³⁺)</div></div>" +
        "<p>Elige una serie y compara; la pestaña «Átomo → ion» compara cada ion con su átomo de origen.</p>" +
        w("q3_radios") +
        ejemplo("Ejemplo resuelto: ordenar radios de iones", "Ordena de mayor a menor radio: S²⁻, Cl⁻, K⁺, Ca²⁺ y el átomo de argón. Justifica la respuesta. (Z: S 16, Cl 17, Ar 18, K 19, Ca 20)", [
          "Número de electrones de cada especie: S²⁻ 16 + 2 = 18; Cl⁻ 17 + 1 = 18; Ar 18; K⁺ 19 − 1 = 18; Ca²⁺ 20 − 2 = 18. <b>Son isoelectrónicas</b> (18 e⁻, configuración [Ne] 3s² 3p⁶).",
          "Misma configuración → misma capa externa (n = 3) y el mismo apantallamiento. Lo único que cambia es el número de protones: 16 &lt; 17 &lt; 18 &lt; 19 &lt; 20.",
          "A mayor Z, mayor fuerza de atracción sobre los 18 electrones y menor radio: <b>S²⁻ &gt; Cl⁻ &gt; Ar &gt; K⁺ &gt; Ca²⁺</b>. (Datos de radios: 184, 181, —, 138, 100 pm.)"
        ]) +
        ejemplo("Ejemplo resuelto: ¿mayor el catión de un periodo o el del anterior?", "Compara el radio del Na⁺, el del K⁺ y el del Mg²⁺.", [
          "Na⁺ y Mg²⁺ son isoelectrónicos (10 e⁻, n = 2): Z = 11 y 12 → r(Na⁺) &gt; r(Mg²⁺) (102 y 72 pm).",
          "El K⁺ tiene 18 electrones y su capa externa es n = 3: más capas que los otros dos → <b>mayor radio</b> (138 pm).",
          "Orden: <b>K⁺ &gt; Na⁺ &gt; Mg²⁺</b>. Regla práctica: primero cuenta capas (n); a igual n, compara Z o Z*."
        ]) +
        "<h5>Estrategia para comparar tamaños (y casi todo lo demás)</h5>" +
        "<ol><li>Escribe las configuraciones y <b>cuenta electrones</b>. ¿Son isoelectrónicas? Entonces decide el número de protones.</li>" +
        "<li>Si no, compara el número de <b>capas</b> (n). Más capas, más grande.</li>" +
        "<li>Si tienen las mismas capas, compara <b>Z*</b> (más cargado el núcleo, más pequeño).</li></ol>" +
        ojo("Al comparar átomos con sus iones no mezcles «cuanto más a la derecha, más pequeño»: Na⁺ (102 pm) es mucho <b>menor</b> que Na (166 pm) y que F⁻ (133 pm), a pesar de que Na está a la izquierda de F. El ion cambia las reglas; lo que manda es el número de electrones.")
      )
    },
    // ------------------------------------------------------------ 6
    {
      h: "6. Carácter metálico, reactividad y tipo de enlace",
      html: env(
        "<h5>Metales y no metales</h5>" +
        "<p>El <b>carácter metálico</b> (tendencia a perder electrones y dar cationes) crece <b>hacia la izquierda y hacia abajo</b>: es la tendencia inversa a la EI y a la electronegatividad. Los metales tienen EI baja y χ baja (≤ 1,9, aproximadamente); los no metales, EI y χ altas. En la frontera están los semimetales (B, Si, Ge, As, Sb, Te): una «escalera» que separa unos de otros.</p>" +
        tabla(["Propiedad", "Metales", "No metales"], [
          ["EI y electronegatividad", "bajas", "altas"],
          ["Ion que forman", "cationes (pierden e⁻)", "aniones (ganan e⁻) o enlaces covalentes"],
          ["Óxido con agua", "básico: Na₂O + H₂O → 2 NaOH", "ácido: SO₃ + H₂O → H₂SO₄"],
          ["Tendencia en la tabla", "crece abajo y a la izquierda (Cs, Fr)", "crece arriba y a la derecha (F, O)"]
        ], "q3t") +
        "<p>Un caso curioso es el aluminio: está cerca de la frontera y su óxido, Al₂O₃, es <b>anfótero</b> (reacciona tanto con ácidos como con bases). Los óxidos de los no metales (CO₂, SO₂, P₄O₁₀) forman ácidos al disolverse en agua.</p>" +
        "<h5>Reactividad: tiene sentido con la EI y la electronegatividad</h5>" +
        "<ul>" +
        "<li><b>Alcalinos</b>: su reactividad con el agua <b>aumenta al bajar</b> en el grupo (Li &lt; Na &lt; K &lt; Rb &lt; Cs), porque su EI baja: el electrón de valencia se pierde cada vez más fácilmente.</li>" +
        "<li><b>Halógenos</b>: su reactividad <b>disminuye al bajar</b> (F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂), porque su electronegatividad y su afinidad (en lo posible) bajan y el átomo capta electrones con menos fuerza. Un halógeno más reactivo desplaza al menos reactivo de sus sales: Cl₂ + 2 NaBr → 2 NaCl + Br₂.</li>" +
        "</ul>" +
        "<h5>Diferencia de electronegatividad y tipo de enlace</h5>" +
        "<p>Si dos átomos se enlazan, la <b>diferencia de electronegatividad Δχ</b> da una idea del carácter del enlace (Tema 4): Δχ ≈ 0 → covalente apolar (Cl₂, H₂); Δχ pequeña (menos de 1,7 aproximadamente) → covalente polar (HCl, H₂O); Δχ grande (más de 1,7–2) → enlace con fuerte carácter iónico (NaCl, MgO, CsF).</p>" +
        ejemplo("Ejemplo resuelto: tipo de enlace por Δχ", "Calcula la diferencia de electronegatividad en H–Cl, Na–Cl y C–H y clasifica el enlace. (χ: H 2,20; C 2,55; Na 0,93; Cl 3,16)", [
          "H–Cl: Δχ = 3,16 − 2,20 = <b>0,96</b> → covalente polar (el Cl atrae más al par, δ⁻ sobre el Cl).",
          "Na–Cl: Δχ = 3,16 − 0,93 = <b>2,23</b> → fuerte carácter iónico (Na⁺ Cl⁻ en el cristal).",
          "C–H: Δχ = 2,55 − 2,20 = <b>0,35</b> → casi apolar; por eso los hidrocarburos son poco polares."
        ]) +
        "<p>Clasifica estos elementos por su carácter y después comprueba la tabla coloreada con el modo «Metal / no metal».</p>" +
        w("clasificar", "clas1") +
        ojo("«Mayor carácter metálico» no significa «mejor conductor» ni «más duro». Es la tendencia de un átomo a <b>perder</b> electrones. El elemento con mayor carácter metálico estable es el cesio; el francio sería mayor, pero es radiactivo y casi no se estudia.")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Cómo justificar una ordenación en la EvAU",
      html: env(
        "<h5>Un esquema que se aplica siempre</h5>" +
        "<p>Las preguntas de este tema suelen ser del tipo «ordena X, Y y Z según… y justifica la respuesta». La mitad de los puntos está en la <b>justificación</b>, y casi siempre se pierde por dar solo la ordenación o por justificar con «porque sí, es la tendencia». Un esquema de cuatro pasos que suma la puntuación completa:</p>" +
        "<ol>" +
        "<li><b>Configuraciones</b> electrónicas (y posición: periodo y grupo).</li>" +
        "<li><b>Qué es lo que cambia</b> entre las especies: capas (n), carga nuclear (Z o Z*), número de electrones.</li>" +
        "<li><b>Cómo afecta</b> a la propiedad: «más Z* → electrón más atraído → menor radio / mayor EI».</li>" +
        "<li><b>Orden final</b>, con los símbolos &gt; o &lt; y, si hay una anomalía conocida, mencionarla.</li>" +
        "</ol>" +
        ejemplo("Ejemplo resuelto 1: radio y energía de ionización", "Dados los elementos de números atómicos 7, 8 y 9: (a) escribe sus configuraciones electrónicas; (b) ordénalos por radio atómico creciente; (c) ordénalos por primera energía de ionización creciente. Justifica.", [
          "(a) N: 1s² 2s² 2p³ · O: 1s² 2s² 2p⁴ · F: 1s² 2s² 2p⁵. Los tres son del periodo 2 (grupos 15, 16 y 17).",
          "(b) Misma capa (n = 2); aumenta Z y Z* de N a F (3,9 &lt; 4,55 &lt; 5,2 con Slater). Con el mismo n, una mayor Z* atrae más la capa externa y la contrae: <b>r(F) &lt; r(O) &lt; r(N)</b> (57, 66 y 71 pm).",
          "(c) La EI aumenta, en general, con Z* a lo largo del periodo, pero hay una anomalía: el N (2p³, semicapa llena, tres desapareados) tiene EI mayor que el O (2p⁴, un par apareado cuya repulsión facilita arrancar un electrón). Orden creciente: <b>EI(O) &lt; EI(N) &lt; EI(F)</b> (1314 &lt; 1402 &lt; 1681 kJ/mol). Un orden «O &lt; N &lt; F» sin esa explicación pierde la mitad del apartado."
        ]) +
        ejemplo("Ejemplo resuelto 2: isoelectrónicas y electronegatividad", "Se tienen los iones Na⁺, Mg²⁺ y F⁻ y los elementos Na, Mg y F. (a) ¿Cuáles son isoelectrónicos? (b) Ordena los iones por radio. (c) Ordena los elementos por electronegatividad y justifica la respuesta.", [
          "(a) Na⁺ (11 − 1 = 10 e⁻), Mg²⁺ (12 − 2 = 10 e⁻) y F⁻ (9 + 1 = 10 e⁻): <b>los tres iones</b> son isoelectrónicos entre sí y con el Ne (1s² 2s² 2p⁶).",
          "(b) Mismo número de electrones → decide Z: 9 &lt; 11 &lt; 12. A mayor Z, menor radio: <b>F⁻ &gt; Na⁺ &gt; Mg²⁺</b> (133, 102 y 72 pm).",
          "(c) Electronegatividad: F (2.º periodo, a la derecha) es el más electronegativo: Z* alta, capa n = 2 cerca del núcleo. Na y Mg están en el periodo 3 y a la izquierda; Mg tiene más Z* (más a la derecha) y atrae algo más: <b>F (3,98) &gt; Mg (1,31) &gt; Na (0,93)</b>."
        ]) +
        ejemplo("Ejemplo resuelto 3: explicar un dato", "La primera energía de ionización del Al (578 kJ/mol) es menor que la del Mg (738 kJ/mol), aunque el Al está a la derecha. Explícalo.", [
          "Configuraciones: Mg 1s² 2s² 2p⁶ <b>3s²</b>; Al 1s² 2s² 2p⁶ <b>3s² 3p¹</b>.",
          "En el Mg se arranca un electrón 3s; en el Al se arranca el 3p, un electrón de un subnivel <b>de mayor energía</b>, más alejado del núcleo y apantallado por los 3s² (y el resto).",
          "Aunque el Al tiene un protón más, ese efecto no compensa: <b>EI(Al) &lt; EI(Mg)</b>. Es el mismo fenómeno que Be → B."
        ]) +
        ejemplo("Ejemplo resuelto 4: de datos a razonamiento", "Se dan los radios (pm): A = 128, B = 166, C = 203 y las EI (kJ/mol): A = 520, B = 496, C = 419, de tres elementos del mismo grupo. (a) ¿Qué grupo puede ser? (b) ¿Qué relación hay entre radio y EI? (c) ¿Qué elemento es el más reactivo con el agua?", [
          "(a) Mismo grupo, radio y EI muy parecidos a los alcalinos (Li, Na, K): son los de la columna 1 (ns¹).",
          "(b) <b>A mayor radio, menor EI</b>: el electrón externo está cada vez más lejos del núcleo (n mayor, con Z* casi igual) y se arranca con menos energía.",
          "(c) El de menor EI: C (K, 419 kJ/mol). Su electrón se pierde con más facilidad, así que es el más reactivo."
        ]) +
        ojo("Palabras que quitan puntos: «porque tiene más electrones» (sin decir cuáles ni dónde), «porque está más a la derecha» (es descripción, no razón) y «por la tendencia periódica». Palabras que suman: <b>capa</b>, <b>carga nuclear efectiva</b>, <b>apantallamiento</b>, <b>distancia</b>, <b>atracción</b>, <b>configuración</b>, <b>subnivel</b>, <b>semicapa llena</b>.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Problemas tipo EvAU: energías, fotones y datos de ionización",
      html: env(
        "<h5>Con la energía de ionización se puede hacer cálculo</h5>" +
        "<p>Cuando la energía de ionización aparece en un problema, casi siempre hay que pasar de <b>kJ/mol</b> (por mol de átomos) a <b>J por átomo</b> (para un solo átomo o un solo fotón) o de <b>eV</b> a J. Los cambios son siempre los mismos: dividir entre N<sub>A</sub> = 6,022·10²³ para pasar de mol a átomo; multiplicar por 1000 para pasar de kJ a J; y la relación entre energía y longitud de onda de un fotón E = h·c/λ (h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s).</p>" +
        ejemplo("Ejemplo resuelto: la luz que ioniza", "La primera energía de ionización del sodio es 496 kJ/mol. Calcula la longitud de onda máxima de un fotón capaz de ionizar un átomo de sodio y di en qué región del espectro está.", [
          "Energía por átomo: E = 496·10³ J/mol / 6,022·10²³ mol⁻¹ = <b>8,236·10⁻¹⁹ J</b>.",
          "Un fotón ioniza el átomo si E<sub>fotón</sub> ≥ EI. Para la longitud de onda máxima, E = EI: λ = h·c / E = 6,626·10⁻³⁴ · 3,00·10⁸ / 8,236·10⁻¹⁹ = 2,413·10⁻⁷ m = <b>241 nm</b>.",
          "Una longitud de onda menor da fotones más energéticos, así que sirve cualquier λ ≤ 241 nm: <b>ultravioleta</b>. La luz visible (400–700 nm) no ioniza el sodio."
        ]) +
        ejemplo("Ejemplo resuelto: energía cinética del electrón arrancado", "Se ilumina un vapor de potasio (EI = 419 kJ/mol) con radiación de 250 nm. Calcula la energía cinética de los electrones que salen.", [
          "Energía del fotón: E = h·c/λ = 6,626·10⁻³⁴ · 3,00·10⁸ / 250·10⁻⁹ = <b>7,951·10⁻¹⁹ J</b>.",
          "Energía necesaria por átomo: EI = 419·10³ / 6,022·10²³ = <b>6,958·10⁻¹⁹ J</b>.",
          "Balance de energía: E<sub>fotón</sub> = EI + E<sub>c</sub> → E<sub>c</sub> = 7,951·10⁻¹⁹ − 6,958·10⁻¹⁹ = <b>9,93·10⁻²⁰ J</b> (unos 0,62 eV)."
        ]) +
        ejemplo("Ejemplo resuelto: energía por gramo y varias ionizaciones", "(a) ¿Qué energía hace falta para ionizar los átomos de 1,00 g de sodio gaseoso (EI₁ = 496 kJ/mol; M = 22,99 g/mol)? (b) ¿Y para convertir 0,50 mol de Na en Na²⁺ (EI₂ = 4562 kJ/mol)?", [
          "(a) n = 1,00 / 22,99 = 0,0435 mol. Energía = 0,0435 · 496 = <b>21,6 kJ</b>.",
          "(b) Para formar Na²⁺ hay que pasar dos ionizaciones: EI₁ + EI₂ = 496 + 4562 = 5058 kJ/mol. Con 0,50 mol: 0,50 · 5058 = <b>2529 kJ</b>.",
          "La mayor parte del coste es la segunda ionización: arrancar un electrón de la capa interna cuesta nueve veces más que el primero."
        ]) +
        "<h5>Identificar un elemento a partir de datos</h5>" +
        "<p>Un tipo de pregunta muy habitual: te dan un ion, unos electrones o unas energías y tienes que decir <b>qué elemento es</b>. Casi siempre se resuelve contando electrones y pasando a la tabla.</p>" +
        ejemplo("Ejemplo resuelto: ¿qué elemento es?", "(a) El ion X²⁺ es isoelectrónico con el argón. ¿Qué elemento es X? (b) El ion Y²⁻ tiene la misma configuración que el Ar. ¿Qué elemento es Y? (c) Un átomo tiene 3 electrones desapareados y su capa de valencia es n = 3; ¿qué elemento es?", [
          "(a) Ar: 18 electrones. X²⁺ tiene 18 e⁻, así que X tiene 20 e⁻ y Z = 20: <b>calcio</b> (Ca²⁺).",
          "(b) Y²⁻ tiene 18 e⁻, así que Y tiene 16 e⁻ y Z = 16: <b>azufre</b> (S²⁻).",
          "(c) Tres desapareados en n = 3: 3p³ (el 3p tiene tres orbitales con un electrón cada uno), es decir, 3s² 3p³ → Z = 15: <b>fósforo</b>. (La alternativa 3d³ pertenece al n = 4, que sería ya la capa de valencia 4s²: V, Z = 23; no cumple «capa de valencia n = 3».)"
        ]) +
        ojo("Si el enunciado da <b>kJ/mol</b> y te pide energía de <b>un átomo</b> o de <b>un fotón</b>, tienes que dividir entre N<sub>A</sub>. Y si te da eV, multiplica por 1,602·10⁻¹⁹ J/eV. El error más frecuente es olvidar la conversión de kJ a J: da energías de 10⁻²² J en vez de 10⁻¹⁹ J.")
      )
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. ¿Qué falla aquí? Errores típicos del sistema periódico",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y tres juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1")
    }
  ];

  B.parte.q2t3b = { nuevas: nuevas };
})(window);
