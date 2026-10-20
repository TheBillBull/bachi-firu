/* ============================================================
   Física y Química I · ampliaciones · Tema 1: Estructura atómica y sistema periódico
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula, Q = B.lab.quim;
  function w(n, ref) { return H.w(n, ref && "fyq1/t1/" + ref); }
  function lim(a, f) { return "lím<sub>x→" + a + "</sub> " + f; }

  var resumen = [
    "<b>Z</b> = nº de protones (identifica el elemento) · <b>A = Z + N</b> · átomo neutro: electrones = Z · ion: electrones = Z − carga. Se escribe <sup>A</sup><sub>Z</sub>X<sup>q</sup>.",
    "<b>Isótopos</b>: mismo Z, distinto A. La masa atómica de la tabla es la <b>media ponderada</b> de las masas isotópicas: M̄ = Σ (masa × abundancia/100).",
    "<b>Configuración electrónica</b>: Aufbau (1s 2s 2p 3s 3p 4s 3d 4p 5s 4d…), Pauli (máx. 2 e⁻ por orbital) y Hund (primero uno en cada orbital). Excepciones: Cr y Cu.",
    "Números cuánticos: <b>n</b> (1, 2, 3…), <b>l</b> (0…n−1), <b>m<sub>l</sub></b> (−l…+l), <b>m<sub>s</sub></b> (±½). Un nivel tiene n² orbitales y 2n² electrones.",
    "Tabla periódica: <b>periodo</b> = nivel más externo; <b>grupo</b> = electrones de valencia (grupos 1–2: s, 13–18: p, 3–12: d). Mismo grupo ⇒ misma configuración externa ⇒ propiedades químicas parecidas.",
    "Tendencias: el <b>radio</b> crece hacia abajo y a la izquierda; la <b>energía de ionización</b> y la <b>electronegatividad</b> crecen hacia arriba y a la derecha. Todo se explica con la <b>carga nuclear efectiva</b>.",
    "Bohr: E<sub>n</sub> = −13,6 eV/n² · 1/λ = R<sub>H</sub>(1/n<sub>f</sub>² − 1/n<sub>i</sub>²) con R<sub>H</sub> = 1,097·10⁷ m⁻¹ · ΔE = hν = hc/λ."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Partículas subatómicas
  secciones[0] =
    "<h5>Cómo sabemos lo que hay dentro de un átomo</h5>" +
    "<p>Nadie ha «visto» un átomo con la forma de un sistema solar en miniatura: lo que sabemos viene de experimentos cuyos resultados obligaron a cambiar los modelos. Tres de ellos son imprescindibles:</p>" +
    "<ul>" +
    "<li><b>J. J. Thomson (1897)</b> estudió los <i>rayos catódicos</i> (haces que salen del polo negativo de un tubo con gas a muy baja presión). Al desviarlos con campos eléctricos y magnéticos comprobó que eran partículas con <b>carga negativa</b> y muy ligeras, las mismas con cualquier gas o metal: había descubierto el <b>electrón</b>, un componente de todos los átomos.</li>" +
    "<li><b>R. Millikan (1909)</b> midió la carga de gotitas de aceite y halló que siempre era un múltiplo entero de una carga mínima, la <b>carga elemental</b> e = 1,602·10⁻¹⁹ C. La carga está <i>cuantizada</i>.</li>" +
    "<li><b>E. Rutherford (1911)</b> bombardeó una lámina finísima de oro con partículas alfa (núcleos de helio, carga +2). Casi todas la atravesaban sin desviarse, algunas se desviaban mucho y unas pocas (1 de cada ~8 000) <i>rebotaban</i> hacia atrás. Conclusión: casi toda la masa y toda la carga positiva están concentradas en un <b>núcleo</b> diminuto, y el resto del átomo es espacio «casi vacío» por donde se mueven los electrones.</li>" +
    "</ul>" +
    "<p>Faltaba explicar por qué la masa del núcleo es mayor que la suma de las masas de sus protones. <b>J. Chadwick (1932)</b> descubrió el <b>neutrón</b>, una partícula sin carga y casi igual de pesada que el protón. Con él, el cuadro de las partículas elementales para un químico quedó completo.</p>" +
    "<h5>Las tres partículas en números</h5>" +
    tabla(["Partícula", "Símbolo", "Carga", "Masa (kg)", "Masa (u)", "Dónde está"], [
      ["Protón", "p⁺", "+1,602·10⁻¹⁹ C (+1)", "1,6726·10⁻²⁷", "1,00728", "núcleo"],
      ["Neutrón", "n", "0", "1,6749·10⁻²⁷", "1,00867", "núcleo"],
      ["Electrón", "e⁻", "−1,602·10⁻¹⁹ C (−1)", "9,109·10⁻³¹", "0,000549", "corteza (alrededor del núcleo)"]
    ]) +
    "<p>La <b>unidad de masa atómica</b> (u) se define como la doceava parte de la masa de un átomo de carbono-12: 1 u = 1,6605·10⁻²⁷ kg. Con ella, protón y neutrón pesan aproximadamente 1 u, y el electrón unas <b>1 836 veces menos</b>: por eso la masa de un átomo está prácticamente toda en el núcleo.</p>" +
    ejemplo("¿Cuánto pesa el núcleo respecto al átomo?", "Calcula qué fracción de la masa de un átomo de carbono-12 aportan sus electrones.", [
      "El carbono-12 tiene 6 protones, 6 neutrones y 6 electrones.",
      "Masa de los electrones: 6 · 0,000549 u = 0,00329 u. Masa total: 12 u (por definición).",
      "Fracción: 0,00329/12 = 2,7·10⁻⁴ → los electrones aportan <b>menos del 0,03 %</b> de la masa; el 99,97 % está en el núcleo."
    ]) +
    "<h5>Tamaños: casi todo es espacio vacío</h5>" +
    "<p>Un átomo mide del orden de 10⁻¹⁰ m (0,1 nm = 100 pm), mientras que su núcleo mide del orden de 10⁻¹⁵ m (1 femtómetro), es decir, <b>100 000 veces menos</b>. Si el átomo fuese un estadio de 100 m de diámetro, el núcleo sería una canica de 1 mm en el centro y los electrones, motas de polvo girando por las gradas. Y esa canica pesaría prácticamente lo que pesa todo el estadio: la <b>densidad nuclear</b> ronda los 2·10¹⁷ kg/m³; una cucharadita de núcleos pesaría unos mil millones de toneladas.</p>" +
    "<h5>Cómo se describe un átomo: Z, A y la carga</h5>" +
    "<ul>" +
    "<li><b>Número atómico Z</b>: número de protones. Es lo que define el elemento: todos los átomos con Z = 6 son carbono, con Z = 8 oxígeno… Z es la «huella dactilar» del elemento.</li>" +
    "<li><b>Número másico A</b>: protones + neutrones (nucleones). Es siempre un número entero. El <b>número de neutrones</b> es N = A − Z.</li>" +
    "<li>En un <b>átomo neutro</b>, nº de electrones = Z (las cargas se compensan). Un <b>ion</b> es un átomo (o grupo de átomos) con carga: si <i>pierde</i> electrones queda positivo (<b>catión</b>); si los <i>gana</i>, negativo (<b>anión</b>). En un ion, nº de electrones = Z − q, siendo q la carga (con signo).</li>" +
    "</ul>" +
    H.formula("<sup>A</sup><sub>Z</sub>X<sup>q</sup>   →   p = Z  ·  n = A − Z  ·  e = Z − q") +
    ejemplo("Contar partículas", "Indica el número de protones, neutrones y electrones en: <sup>27</sup><sub>13</sub>Al³⁺, <sup>32</sup><sub>16</sub>S²⁻ y <sup>56</sup><sub>26</sub>Fe²⁺.", [
      "<b>Al³⁺</b>: Z = 13 → 13 protones. N = 27 − 13 = 14 neutrones. Carga +3: ha perdido 3 electrones → 13 − 3 = <b>10 electrones</b>.",
      "<b>S²⁻</b>: 16 protones; N = 32 − 16 = 16 neutrones; carga −2: ha ganado 2 electrones → 16 + 2 = <b>18 electrones</b>.",
      "<b>Fe²⁺</b>: 26 protones; N = 56 − 26 = 30 neutrones; electrones: 26 − 2 = <b>24</b>."
    ]) +
    w("q1_particulas") +
    "<h5>Isótopos, isóbaros, isótonos e isoelectrónicos</h5>" +
    tabla(["Nombre", "Qué comparten", "Qué cambia", "Ejemplo"], [
      ["Isótopos", "Z (mismo elemento)", "A (neutrones)", "¹²C y ¹⁴C; ¹H, ²H y ³H"],
      ["Isóbaros", "A", "Z (distinto elemento)", "⁴⁰Ar, ⁴⁰K y ⁴⁰Ca"],
      ["Isótonos", "nº de neutrones", "Z y A", "¹³C y ¹⁴N (7 neutrones)"],
      ["Isoelectrónicos", "nº de electrones", "Z y/o carga", "Na⁺, Ne, F⁻ y O²⁻ (10 e⁻)"]
    ]) +
    w("q1_comparar") +
    ojo("el <b>número másico</b> A es un entero (se cuentan nucleones), pero la <b>masa atómica</b> que ves en la tabla periódica (35,45 para el cloro) es una media de las masas de los isótopos naturales y casi nunca es entera. Son dos magnitudes distintas: se verán en el apartado de isótopos.");

  // ---------------------------------------------------------------- 2. Isótopos
  secciones[1] =
    "<h5>Los isótopos de los elementos más conocidos</h5>" +
    "<p>La mayoría de los elementos aparecen en la naturaleza como mezcla de varios isótopos, siempre en la misma proporción (la <b>abundancia natural</b>). Algunos ejemplos:</p>" +
    tabla(["Elemento", "Isótopos naturales (abundancia)", "Comentario"], [
      ["Hidrógeno (Z = 1)", "¹H protio (99,985 %), ²H deuterio (0,015 %), ³H tritio (trazas)", "El deuterio forma «agua pesada», D₂O; el tritio es radiactivo"],
      ["Carbono (Z = 6)", "¹²C (98,93 %), ¹³C (1,07 %), ¹⁴C (trazas)", "El ¹⁴C es radiactivo y sirve para datar"],
      ["Oxígeno (Z = 8)", "¹⁶O (99,76 %), ¹⁷O (0,04 %), ¹⁸O (0,20 %)", "La proporción ¹⁸O/¹⁶O en el hielo informa de climas antiguos"],
      ["Cloro (Z = 17)", "³⁵Cl (75,76 %), ³⁷Cl (24,24 %)", "Por eso su masa atómica es 35,45"],
      ["Uranio (Z = 92)", "²³⁸U (99,27 %), ²³⁵U (0,72 %)", "El ²³⁵U es el que se usa como combustible en fisión"],
      ["Flúor, sodio, aluminio, fósforo…", "un único isótopo estable", "Se llaman elementos monoisotópicos: su masa atómica es casi un entero"]
    ]) +
    "<p>Químicamente los isótopos de un elemento se comportan igual (la química la hacen los electrones, y todos tienen los mismos), pero sus propiedades <i>físicas</i> difieren un poco (masa, velocidad de difusión, estabilidad del núcleo). El agua pesada D₂O, por ejemplo, tiene punto de fusión 3,8 °C, no 0 °C.</p>" +
    "<h5>Tres masas que no hay que confundir</h5>" +
    tabla(["Magnitud", "Qué es", "Ejemplo (cloro)"], [
      ["Número másico A", "protones + neutrones de <b>un</b> isótopo; es entero y no tiene unidades", "35 y 37"],
      ["Masa isotópica", "masa real de un átomo de ese isótopo, en u", "34,9689 u y 36,9659 u"],
      ["Masa atómica (relativa)", "<b>media ponderada</b> de las masas isotópicas según su abundancia", "35,45 u"]
    ]) +
    "<h5>Cálculo de la masa atómica media</h5>" +
    H.formula("M̄ = Σ (masa isotópica<sub>i</sub> × abundancia<sub>i</sub> / 100)") +
    "<p>Es una media ponderada: cada isótopo «cuenta» tanto como su abundancia. Si un elemento está formado por 100 átomos, 75,76 de ³⁵Cl y 24,24 de ³⁷Cl, la masa media por átomo es la que sale de repartir la masa total entre los 100.</p>" +
    ejemplo("Masa atómica del cloro", "El cloro natural contiene 75,76 % de ³⁵Cl (34,9689 u) y 24,24 % de ³⁷Cl (36,9659 u). Calcula su masa atómica.", [
      "M̄ = 34,9689 · 0,7576 + 36,9659 · 0,2424",
      "= 26,4929 + 8,9605 = <b>35,45 u</b> (el valor de la tabla periódica)."
    ]) +
    ejemplo("Tres isótopos: magnesio", "El magnesio tiene ²⁴Mg (23,985 u; 78,99 %), ²⁵Mg (24,986 u; 10,00 %) y ²⁶Mg (25,983 u; 11,01 %). Calcula la masa atómica media.", [
      "M̄ = 23,985·0,7899 + 24,986·0,1000 + 25,983·0,1101",
      "= 18,945 + 2,499 + 2,861 = <b>24,305 u</b>."
    ]) +
    "<h5>El problema inverso: hallar las abundancias</h5>" +
    "<p>Si un elemento tiene solo <b>dos</b> isótopos y se conoce la masa atómica media, las abundancias salen de una ecuación con una incógnita: llamando x a la fracción del primero, la del segundo es 1 − x y M̄ = m₁·x + m₂·(1 − x).</p>" +
    ejemplo("Abundancias del bromo", "El bromo tiene dos isótopos, ⁷⁹Br (78,92 u) y ⁸¹Br (80,92 u). Su masa atómica es 79,90 u. Calcula la abundancia de cada uno.", [
      "Sea x la fracción de ⁷⁹Br: 79,90 = 78,92·x + 80,92·(1 − x) = 80,92 − 2,00·x.",
      "Despejando: 2,00·x = 80,92 − 79,90 = 1,02 → x = 0,51.",
      "<b>⁷⁹Br: 51 %</b> y <b>⁸¹Br: 49 %</b>."
    ]) +
    w("q1_isotopos") +
    "<h5>El espectrómetro de masas: cómo se miden los isótopos</h5>" +
    "<p>Un <b>espectrómetro de masas</b> funciona en cuatro pasos: <b>1)</b> la muestra se vaporiza y se <i>ioniza</i> (se le arrancan electrones con un haz electrónico), dando iones X⁺; <b>2)</b> los iones se <i>aceleran</i> con un campo eléctrico; <b>3)</b> entran en un campo magnético que <i>curva</i> su trayectoria: los más ligeros se desvían más, los pesados menos (el radio de curvatura es proporcional a la masa para una misma carga y velocidad); <b>4)</b> un detector cuenta cuántos iones llegan a cada posición. El resultado, el <b>espectro de masas</b>, es un diagrama de barras: la posición da la masa y la altura, la abundancia.</p>" +
    ejemplo("El espectro del cloro molecular", "El cloro gaseoso está formado por moléculas Cl₂. ¿Qué picos aparecen en el espectro de masas de Cl₂ y con qué intensidad relativa?", [
      "Combinando dos átomos de ³⁵Cl o ³⁷Cl hay tres moléculas posibles: ³⁵Cl–³⁵Cl (masa 70), ³⁵Cl–³⁷Cl (72) y ³⁷Cl–³⁷Cl (74).",
      "Probabilidades (con 0,7576 y 0,2424): 0,7576² = 0,574 (70) · 2·0,7576·0,2424 = 0,367 (72) · 0,2424² = 0,059 (74).",
      "Tres picos en la proporción aproximada <b>57 : 37 : 6</b> (algo más de 9 : 6 : 1). El del medio es el de la molécula mixta."
    ]) +
    "<h5>Isótopos radiactivos: desintegración y semivida</h5>" +
    "<p>No todas las combinaciones de protones y neutrones son estables. Un núcleo con demasiados neutrones (o protones) es <b>radiactivo</b>: se transforma espontáneamente en otro emitiendo radiación (alfa, beta o gamma). No se puede predecir cuándo se desintegrará un átomo concreto, pero sí qué fracción de una muestra lo hará: cada isótopo tiene su <b>periodo de semidesintegración</b> o <b>semivida</b> T<sub>½</sub>, el tiempo que tarda en desintegrarse la mitad de los núcleos presentes.</p>" +
    H.formula("N = N₀ · (½)<sup>t / T<sub>½</sub></sup>   ⟺   t = T<sub>½</sub> · log₂(N₀ / N)") +
    tabla(["Isótopo", "Semivida", "Uso o importancia"], [
      ["Carbono-14", "5 730 años", "datación de restos orgánicos (hasta unos 50 000 años)"],
      ["Yodo-131", "8,02 días", "tratamiento del tiroides"],
      ["Cobalto-60", "5,27 años", "radioterapia y esterilización por rayos gamma"],
      ["Tecnecio-99m", "6,01 horas", "diagnóstico por imagen (gammagrafías)"],
      ["Uranio-238", "4,47·10⁹ años", "datación de rocas y de la edad de la Tierra"]
    ]) +
    ejemplo("Datar un resto con carbono-14", "Un hueso conserva el 12,5 % del carbono-14 que tenía al morir el ser vivo. ¿Qué edad tiene? (T<sub>½</sub> = 5 730 años)", [
      "12,5 % = 1/8 = (½)³: han transcurrido <b>3 semividas</b>.",
      "t = 3 · 5 730 = <b>17 190 años</b>.",
      "Con la fórmula: t = 5 730 · log₂(100/12,5) = 5 730 · log₂ 8 = 5 730 · 3."
    ]) +
    ejemplo("Un isótopo médico", "Se administra una dosis con 100 mg de yodo-131. ¿Cuánto queda a los 24 días? (T<sub>½</sub> = 8,02 días)", [
      "Semividas transcurridas: 24/8,02 = 2,99.",
      "Queda N = 100 · (½)<sup>2,99</sup> = 100 · 0,126 = <b>12,6 mg</b> (casi exactamente 3 semividas: 12,5 mg)."
    ]) +
    w("q1_decaimiento");

  // ---------------------------------------------------------------- 3. Configuración electrónica
  secciones[2] =
    "<h5>De la órbita al orbital</h5>" +
    "<p>Bohr (1913) imaginó los electrones en órbitas circulares con energías permitidas. Funcionaba para el hidrógeno, pero no para átomos con más electrones. La <b>mecánica cuántica</b> (Schrödinger, Heisenberg, 1925–27) cambió la idea: no se puede conocer a la vez la posición y la velocidad de un electrón (<i>principio de incertidumbre</i>), así que solo se puede hablar de la <b>probabilidad</b> de encontrarlo en cada región. A la región del espacio donde es muy probable (≈ 90 %) encontrar a un electrón se le llama <b>orbital</b>. Un orbital no es una trayectoria: es una nube de probabilidad.</p>" +
    "<h5>Los cuatro números cuánticos</h5>" +
    "<p>Cada electrón de un átomo se describe con cuatro números cuánticos que salen de resolver la ecuación de Schrödinger:</p>" +
    tabla(["Número", "Valores", "Qué determina"], [
      ["<b>n</b> (principal)", "1, 2, 3, 4…", "el <b>nivel</b> de energía y el tamaño del orbital"],
      ["<b>l</b> (secundario o azimutal)", "0, 1, …, n − 1", "la <b>forma</b> del orbital: l = 0 (s), 1 (p), 2 (d), 3 (f)"],
      ["<b>m<sub>l</sub></b> (magnético)", "−l, …, 0, …, +l", "la <b>orientación</b>; hay 2l + 1 orbitales por subnivel"],
      ["<b>m<sub>s</sub></b> (de espín)", "+½ o −½", "el sentido de giro del electrón sobre sí mismo"]
    ]) +
    "<p>De ahí se deducen las capacidades: un subnivel s tiene 1 orbital (2 e⁻), uno p tiene 3 (6 e⁻), uno d tiene 5 (10 e⁻) y uno f tiene 7 (14 e⁻). Un nivel n tiene <b>n² orbitales</b> y puede alojar hasta <b>2n² electrones</b> (2, 8, 18, 32…).</p>" +
    w("q1_cuanticos") +
    ejemplo("¿Conjunto permitido?", "Indica cuáles de estos conjuntos (n, l, m<sub>l</sub>, m<sub>s</sub>) son posibles: a) (3, 2, −1, +½) b) (2, 2, 0, −½) c) (4, 1, 2, +½) d) (1, 0, 0, +½).", [
      "<b>a)</b> n = 3 → l puede ser 0, 1, 2: l = 2 vale; m<sub>l</sub> entre −2 y +2: −1 vale. <b>Permitido</b> (subnivel 3d).",
      "<b>b)</b> n = 2 → l solo puede ser 0 o 1. l = 2 no vale. <b>Prohibido</b> (no existe el subnivel 2d).",
      "<b>c)</b> l = 1 → m<sub>l</sub> entre −1 y +1; m<sub>l</sub> = 2 no vale. <b>Prohibido</b>.",
      "<b>d)</b> n = 1, l = 0, m<sub>l</sub> = 0, m<sub>s</sub> = +½: es el electrón del orbital 1s. <b>Permitido</b>."
    ]) +
    "<h5>Cómo se llenan los orbitales: tres reglas</h5>" +
    "<ol>" +
    "<li><b>Principio de mínima energía (Aufbau):</b> los electrones ocupan primero los orbitales de menor energía. El orden de energía no es el «natural» por capas: lo da la <b>regla de Madelung (n + l)</b>: se llena antes el subnivel con menor n + l y, si hay empate, el de menor n. Así, 4s (4 + 0 = 4) se llena antes que 3d (3 + 2 = 5).</li>" +
    "<li><b>Principio de exclusión de Pauli:</b> en un átomo no puede haber dos electrones con los cuatro números cuánticos iguales. En un orbital caben como máximo 2 electrones, con espines opuestos (↑↓).</li>" +
    "<li><b>Regla de máxima multiplicidad de Hund:</b> los electrones de un mismo subnivel ocupan orbitales distintos con el mismo espín (↑ ↑ ↑) antes de aparearse: así se minimiza la repulsión entre ellos.</li>" +
    "</ol>" +
    "<p>El orden de llenado se recuerda con el diagrama de Moeller (las diagonales): <b>1s · 2s 2p · 3s 3p · 4s 3d 4p · 5s 4d 5p · 6s 4f 5d 6p · 7s 5f 6d 7p</b>.</p>" +
    H.tabla(["Subnivel", "n + l", "Orden de llenado"], [["1s", "1", "1.º"], ["2s", "2", "2.º"], ["2p", "3", "3.º"], ["3s", "3", "4.º (n menor que 2p? no: 2p ya llena antes)"], ["3p", "4", "5.º"], ["4s", "4", "6.º (antes que 3d: 3d tiene n+l = 5)"], ["3d", "5", "7.º"], ["4p", "5", "8.º"]]).replace("4.º (n menor que 2p? no: 2p ya llena antes)", "4.º") +
    "<h5>Método para escribir una configuración electrónica</h5>" +
    "<ol><li>Averigua el número de electrones (Z si es neutro; Z − q si es ion).</li><li>Rellena los subniveles en el orden de Moeller hasta agotar los electrones, respetando las capacidades (s: 2, p: 6, d: 10, f: 14).</li><li>Escribe la configuración con exponentes (1s² 2s² 2p⁶…). Opcionalmente, abrevia con el gas noble anterior entre corchetes: [Ne] 3s² 3p⁵.</li><li>Comprueba que la suma de exponentes es el número de electrones.</li></ol>" +
    ejemplo("Cuatro configuraciones", "Escribe la configuración electrónica de: a) P (Z = 15) b) Br (Z = 35) c) Fe (Z = 26) d) Cl⁻.", [
      "<b>P</b>: 1s² 2s² 2p⁶ 3s² 3p³ = [Ne] 3s² 3p³ (2 + 2 + 6 + 2 + 3 = 15 ✓).",
      "<b>Br</b>: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵ = [Ar] 4s² 3d¹⁰ 4p⁵ (35 e⁻).",
      "<b>Fe</b>: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ = [Ar] 4s² 3d⁶ (26 e⁻).",
      "<b>Cl⁻</b>: tiene 17 + 1 = 18 electrones: 1s² 2s² 2p⁶ 3s² 3p⁶ = [Ar]. Es isoelectrónico con el argón."
    ]) +
    "<h5>El diagrama de orbitales y la regla de Hund</h5>" +
    "<p>Para ver cuántos electrones están desapareados se dibuja cada orbital como una casilla. Los electrones se colocan como flechas: primero una ↑ en cada casilla del subnivel y luego se aparean con ↓.</p>" +
    ejemplo("Nitrógeno y oxígeno", "Dibuja el subnivel 2p del nitrógeno (3 e⁻ en 2p) y del oxígeno (4 e⁻ en 2p) y cuenta los electrones desapareados.", [
      "<b>N</b> (2p³): ↑ | ↑ | ↑ → <b>3 desapareados</b> (Hund: uno en cada orbital).",
      "<b>O</b> (2p⁴): ↑↓ | ↑ | ↑ → <b>2 desapareados</b> (el cuarto electrón se aparea en el primer orbital)."
    ]) +
    "<p>Un átomo con electrones desapareados es <b>paramagnético</b> (lo atrae un imán); si todos están apareados es <b>diamagnético</b> (lo repele débilmente).</p>" +
    w("q1_config") +
    "<h5>Las excepciones: cromo y cobre</h5>" +
    "<p>Hay átomos cuya configuración real no sigue el orden de llenado, porque el subnivel d <b>semilleno</b> (d⁵) o <b>lleno</b> (d¹⁰) es especialmente estable (la energía de repulsión y de intercambio se compensan mejor). Las excepciones que debes conocer son:</p>" +
    tabla(["Elemento", "Esperada", "Real"], [
      ["Cromo (Z = 24)", "[Ar] 4s² 3d⁴", "<b>[Ar] 4s¹ 3d⁵</b>"],
      ["Cobre (Z = 29)", "[Ar] 4s² 3d⁹", "<b>[Ar] 4s¹ 3d¹⁰</b>"],
      ["Molibdeno (Z = 42)", "[Kr] 5s² 4d⁴", "[Kr] 5s¹ 4d⁵"],
      ["Plata (Z = 47)", "[Kr] 5s² 4d⁹", "[Kr] 5s¹ 4d¹⁰"]
    ]) +
    "<h5>Configuración de los iones</h5>" +
    "<p><b>Aniones</b>: se añaden electrones siguiendo el orden normal (el Cl⁻ completa el subnivel 3p). <b>Cationes</b>: se quitan los electrones de la <b>capa más externa</b> (mayor n) y, si hay empate, del subnivel de mayor l. Por eso los metales de transición pierden primero los 4s y después los 3d:</p>" +
    tabla(["Átomo", "Configuración", "Ion", "Configuración del ion"], [
      ["Fe (26)", "[Ar] 4s² 3d⁶", "Fe²⁺", "[Ar] 3d⁶"],
      ["Fe (26)", "[Ar] 4s² 3d⁶", "Fe³⁺", "[Ar] 3d⁵ (semilleno, estable)"],
      ["Cu (29)", "[Ar] 4s¹ 3d¹⁰", "Cu²⁺", "[Ar] 3d⁹"],
      ["Al (13)", "[Ne] 3s² 3p¹", "Al³⁺", "[He] 2s² 2p⁶ = [Ne]"]
    ]) +
    "<h5>Tabla: configuración de los 36 primeros elementos</h5>" +
    (function () {
      var filas = [];
      for (var z = 1; z <= 36; z++) { var e = Q.EL[z - 1], c = Q.config(z, true); filas.push([z + " " + e.s, Q.cfgTxt(c, true), String(e.p), String(e.g), String(Q.electronesValencia(c)), String(Q.desapareados(c))]); }
      return tabla(["Elemento", "Configuración", "Periodo", "Grupo", "e⁻ capa externa", "e⁻ desapareados"], filas);
    })();

  // ---------------------------------------------------------------- 4. Tabla periódica
  secciones[3] =
    "<h5>Un poco de historia: de Mendeleiev a Moseley</h5>" +
    "<p>Hacia 1860 se conocían unos sesenta elementos y varios químicos intentaron clasificarlos. <b>Dmitri Mendeleiev (1869)</b> los ordenó por <i>masa atómica creciente</i> agrupando los de propiedades parecidas en columnas, y se atrevió a dejar huecos para elementos aún sin descubrir, a los que predijo propiedades: su «eka-aluminio» y «eka-silicio» resultaron ser el <b>galio</b> (1875) y el <b>germanio</b> (1886). Esa capacidad predictiva convenció a la comunidad científica.</p>" +
    "<p>El orden por masa tenía fallos (el telurio pesa más que el yodo, pero sus propiedades piden colocarlo antes). <b>Henry Moseley (1913)</b> midió la frecuencia de los rayos X emitidos por distintos elementos y demostró que depende del <b>número atómico Z</b>, no de la masa. La <b>ley periódica moderna</b> dice: <i>las propiedades de los elementos son función periódica de su número atómico</i>.</p>" +
    "<h5>La estructura de la tabla</h5>" +
    "<ul>" +
    "<li><b>7 periodos</b> (filas): el número de periodo es el <b>nivel (n) más externo ocupado</b>. Sus longitudes son 2, 8, 8, 18, 18, 32, 32 elementos.</li>" +
    "<li><b>18 grupos</b> (columnas): los elementos de un grupo tienen la misma configuración de la capa externa y, por eso, propiedades químicas parecidas.</li>" +
    "<li><b>Bloques</b> según el subnivel donde entra el último electrón: <b>s</b> (grupos 1–2), <b>p</b> (13–18), <b>d</b> (3–12, metales de transición) y <b>f</b> (lantánidos y actínidos).</li>" +
    "</ul>" +
    tabla(["Grupo", "Nombre", "Configuración externa", "Ion habitual", "Ejemplos"], [
      ["1", "Alcalinos", "ns¹", "+1", "Li, Na, K, Rb"],
      ["2", "Alcalinotérreos", "ns²", "+2", "Be, Mg, Ca, Sr"],
      ["3–12", "Metales de transición", "ns² (n−1)d¹⁻¹⁰", "varios (+2, +3…)", "Fe, Cu, Zn, Ag"],
      ["13", "Térreos (boroideos)", "ns² np¹", "+3", "B, Al, Ga"],
      ["14", "Carbonoideos", "ns² np²", "±4 (varios)", "C, Si, Ge, Sn"],
      ["15", "Nitrogenoideos", "ns² np³", "−3", "N, P, As"],
      ["16", "Anfígenos o calcógenos", "ns² np⁴", "−2", "O, S, Se"],
      ["17", "Halógenos", "ns² np⁵", "−1", "F, Cl, Br, I"],
      ["18", "Gases nobles", "ns² np⁶ (He: 1s²)", "no forman iones", "He, Ne, Ar, Kr"]
    ]) +
    "<h5>Cómo deducir la posición a partir de la configuración</h5>" +
    "<ul>" +
    "<li><b>Periodo</b> = valor más alto de n en la configuración.</li>" +
    "<li><b>Grupo</b>: bloque s → grupo = nº de e⁻ en ns (1 o 2). Bloque p → grupo = 10 + (e⁻ en ns + e⁻ en np). Bloque d → grupo = nº de e⁻ en ns + (n−1)d (de 3 a 12).</li>" +
    "</ul>" +
    ejemplo("Situar un elemento", "Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p³. Indica su Z, periodo, grupo y nombre.", [
      "Electrones: 2 + 2 + 6 + 2 + 6 + 2 + 10 + 3 = 33 → <b>Z = 33</b>.",
      "Mayor n = 4 → <b>periodo 4</b>.",
      "Termina en 4p: bloque p. Grupo = 10 + (2 + 3) = <b>15</b> (nitrogenoideos). Es el <b>arsénico</b> (As)."
    ]) +
    ejemplo("Del grupo a la configuración", "El elemento del periodo 3 y grupo 16 es el azufre. Escribe su configuración externa y su ion más probable.", [
      "Periodo 3 → n = 3. Grupo 16 → 10 + 6: seis electrones en 3s y 3p → 3s² 3p⁴ (configuración externa).",
      "Le faltan 2 para completar el octeto (3s² 3p⁶): gana 2 e⁻ → <b>S²⁻</b>, isoelectrónico con el argón."
    ]) +
    "<h5>Metales, no metales y semimetales</h5>" +
    tabla(["", "Metales", "No metales", "Semimetales (B, Si, Ge, As, Sb, Te)"], [
      ["Posición", "izquierda y centro", "arriba a la derecha", "frontera en «escalera»"],
      ["Aspecto", "brillo metálico, sólidos (salvo Hg)", "sin brillo; sólidos, líquido (Br₂) o gases", "brillo metálico pero frágiles"],
      ["Conductividad", "buenos conductores del calor y la electricidad", "malos (aislantes)", "semiconductores"],
      ["Iones", "forman cationes", "forman aniones", "—"],
      ["Óxidos", "básicos", "ácidos", "anfóteros o ácidos"]
    ]) +
    "<p>El <b>hidrógeno</b> es un caso especial: tiene configuración 1s¹ (como los alcalinos) pero es un no metal que forma H⁺ y H⁻; por eso se coloca a veces aparte.</p>" +
    w("q1_tabla");

  // ---------------------------------------------------------------- 5. Propiedades periódicas
  secciones[4] =
    "<h5>La clave de todo: la carga nuclear efectiva</h5>" +
    "<p>Un electrón de la capa externa no «siente» la carga completa del núcleo (+Z): los electrones de capas internas lo <b>apantallan</b>, es decir, repelen parte de la atracción. La carga que realmente nota es la <b>carga nuclear efectiva</b> Z<sub>ef</sub> = Z − S, donde S es la constante de apantallamiento. Con las <b>reglas de Slater</b> (simplificadas) para un electrón ns o np:</p>" +
    "<ul><li>Cada electrón de la <b>misma capa</b> contribuye 0,35 (0,30 si es 1s).</li><li>Cada electrón de la capa <b>n−1</b> contribuye 0,85.</li><li>Cada electrón de capas <b>n−2 o menores</b> contribuye 1,00.</li></ul>" +
    ejemplo("Z<sub>ef</sub> del sodio y del cloro", "Calcula la carga nuclear efectiva sobre un electrón de valencia del Na (Z = 11, [Ne]3s¹) y del Cl (Z = 17, [Ne]3s²3p⁵).", [
      "<b>Na</b>: S = 8 · 0,85 (los 8 e⁻ de n = 2) + 2 · 1,00 (los 2 de n = 1) = 6,8 + 2 = 8,8. Z<sub>ef</sub> = 11 − 8,8 = <b>2,2</b>.",
      "<b>Cl</b>: S = 6 · 0,35 (los otros 6 e⁻ de n = 3: 2 en 3s y 4 en 3p) + 8 · 0,85 + 2 · 1,00 = 2,1 + 6,8 + 2 = 10,9. Z<sub>ef</sub> = 17 − 10,9 = <b>6,1</b>.",
      "Al avanzar en el periodo de Na a Cl la carga efectiva sube de 2,2 a 6,1: el núcleo tira cada vez más fuerte de la capa externa."
    ]) +
    "<p>Idea fundamental: <b>en un periodo</b> (misma capa) Z aumenta y el apantallamiento casi no cambia, luego Z<sub>ef</sub> crece; <b>en un grupo</b> (hacia abajo) se añaden capas: el electrón externo está más lejos y más apantallado, aunque Z crezca.</p>" +
    "<h5>Radio atómico</h5>" +
    "<p>El tamaño de un átomo no está bien definido (la nube no termina); se toma la mitad de la distancia entre dos núcleos del mismo elemento enlazados (<i>radio covalente</i>) o en el metal. <b>Tendencia:</b> disminuye al avanzar en un periodo (Z<sub>ef</sub> crece: contracción) y aumenta al bajar en un grupo (más capas).</p>" +
    tabla(["Periodo 3", "Na", "Mg", "Al", "Si", "P", "S", "Cl"], [["Radio covalente (pm)", "166", "141", "121", "111", "107", "105", "102"]]) +
    tabla(["Alcalinos", "Li", "Na", "K", "Rb"], [["Radio covalente (pm)", "128", "166", "203", "220"]]) +
    "<h5>Radio iónico</h5>" +
    "<ul><li>Un <b>catión</b> es <b>más pequeño</b> que su átomo (pierde la capa externa y los electrones restantes sienten más carga efectiva): Na 166 pm → Na⁺ 102 pm.</li>" +
    "<li>Un <b>anión</b> es <b>más grande</b> que su átomo (más repulsión entre más electrones con la misma carga nuclear): Cl 102 pm → Cl⁻ 181 pm.</li>" +
    "<li>En una serie de <b>isoelectrónicos</b> (mismo número de electrones) el radio disminuye al aumentar Z: <b>O²⁻ (140) &gt; F⁻ (133) &gt; Na⁺ (102) &gt; Mg²⁺ (72) &gt; Al³⁺ (54 pm)</b>.</li></ul>" +
    "<h5>Energía de ionización</h5>" +
    "<p>La <b>primera energía de ionización</b> (EI<sub>1</sub>) es la energía mínima necesaria para arrancar el electrón más débilmente ligado de un átomo gaseoso en su estado fundamental: X(g) → X⁺(g) + e⁻. Se mide en kJ/mol (o en eV por átomo; 1 eV = 96,485 kJ/mol). <b>Tendencia:</b> crece hacia la derecha en un periodo (más Z<sub>ef</sub>, átomo más pequeño) y disminuye hacia abajo en un grupo (electrón más lejano). Los gases nobles tienen los valores máximos y los alcalinos los mínimos de cada periodo.</p>" +
    tabla(["Periodo 2", "Li", "Be", "B", "C", "N", "O", "F", "Ne"], [["EI₁ (kJ/mol)", "520", "900", "801", "1086", "1402", "1314", "1681", "2081"]]) +
    "<p>Observa las <b>dos irregularidades</b>: Be (900) &gt; B (801), porque el electrón de B sale de un orbital 2p, más alto y mejor apantallado que el 2s del Be; y N (1402) &gt; O (1314), porque el oxígeno tiene un par apareado en 2p cuya repulsión facilita arrancar un electrón, mientras que el N tiene 2p³ semilleno (estable).</p>" +
    "<h5>Energías de ionización sucesivas</h5>" +
    "<p>Una vez arrancado un electrón, el siguiente cuesta más (hay menos electrones que repelan y la misma carga nuclear): EI₁ &lt; EI₂ &lt; EI₃… Pero hay un <b>salto enorme</b> cuando se pasa de arrancar los electrones de valencia a los de la capa interna. Ese salto delata el número de electrones de valencia:</p>" +
    ejemplo("Leer las energías de ionización", "Las cuatro primeras energías de ionización (kJ/mol) de un elemento X son 578, 1 817, 2 745 y 11 577. ¿Cuántos electrones de valencia tiene y de qué grupo es?", [
      "Cocientes sucesivos: 1 817/578 = 3,1 · 2 745/1 817 = 1,5 · 11 577/2 745 = 4,2.",
      "El salto mayor (×4,2) está entre la 3.ª y la 4.ª: se arrancan 3 electrones «fáciles» y el 4.º viene de una capa interna.",
      "<b>3 electrones de valencia</b> → grupo 13. Con estos valores es el aluminio."
    ]) +
    w("q1_ionsucesiva") +
    "<h5>Afinidad electrónica</h5>" +
    "<p>La <b>afinidad electrónica</b> (AE) es la energía que se <i>libera</i> cuando un átomo gaseoso capta un electrón: X(g) + e⁻ → X⁻(g). Los halógenos tienen las mayores (captan un electrón y completan el octeto): <b>Cl 349 kJ/mol</b> (el máximo de la tabla), F 328, Br 325, I 295; para O es 141 y para S 200. Las AE de los metales alcalinotérreos y los gases nobles son prácticamente nulas o negativas (el átomo no «quiere» el electrón). Anomalía: la AE del flúor es menor que la del cloro porque su átomo es tan pequeño que la repulsión entre los electrones de su capa 2p es grande.</p>" +
    "<h5>Electronegatividad</h5>" +
    "<p>La <b>electronegatividad</b> (χ) mide la tendencia de un átomo a atraer hacia sí el par de electrones de un enlace. No se mide directamente: es una escala relativa. La más usada es la de <b>Pauling</b> (máximo: flúor 3,98; mínimo: francio ≈ 0,7), y la de <b>Mulliken</b> la define como la media entre la energía de ionización y la afinidad electrónica: χ ∝ (EI + AE)/2. Tendencia: crece hacia arriba y hacia la derecha. Es la base del tema siguiente: la diferencia de electronegatividad entre dos átomos decide el tipo de enlace.</p>" +
    tabla(["Elemento", "H", "C", "N", "O", "F", "Na", "Cl", "K", "Br"], [["Electronegatividad (Pauling)", "2,20", "2,55", "3,04", "3,44", "3,98", "0,93", "3,16", "0,82", "2,96"]]) +
    "<h5>Carácter metálico, poder reductor y poder oxidante</h5>" +
    "<p>Cuanto <b>menor</b> es la energía de ionización (es fácil perder electrones), más <b>metálico</b> y más <b>reductor</b> es un elemento: el carácter metálico crece hacia abajo y hacia la izquierda (el francio y el cesio son los más metálicos). Cuanto <b>mayor</b> es la electronegatividad y la afinidad electrónica, más <b>oxidante</b> es: el flúor es el oxidante más fuerte (F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂). Por eso los alcalinos son más reactivos hacia abajo (el Cs reacciona violentamente con el agua; el Li, con calma) y los halógenos, hacia arriba.</p>" +
    w("q1_tendencias");

  var nuevas = [];
