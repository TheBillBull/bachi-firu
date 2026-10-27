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
    tabla(["Subnivel", "1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d"], [["n + l", "1", "2", "3", "3", "4", "4", "5", "5", "5", "6"], ["Orden", "1.º", "2.º", "3.º", "4.º", "5.º", "6.º", "7.º", "8.º", "9.º", "10.º"]]) +
    "<p>Con n + l igual se llena antes el de menor n: 2p y 3s (n + l = 3) → primero 2p; 3p y 4s (n + l = 4) → primero 3p; 4s antes que 3d porque 4 &lt; 5; 3d y 4p (n + l = 5) → primero 3d (menor n).</p>" +
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

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. De Dalton a la mecánica cuántica: la historia de los modelos atómicos",
      html:
        "<p>Cada modelo atómico explica unos hechos y fracasa ante otros; el siguiente nace para resolver el fracaso. Conocer esa cadena de «hecho que no encaja → modelo nuevo» es lo que se pregunta en los exámenes. Recorre la línea del tiempo de 1897 a 1932 y después repasa la tabla.</p>" +
        w("linea", "modelos") +
        tabla(["Modelo", "Año", "Idea principal", "Qué explica", "Qué no explica"], [
          ["Dalton", "1803", "átomos indivisibles, esferas macizas; cada elemento tiene los suyos", "leyes ponderales (conservación de la masa, proporciones definidas)", "la electricidad, los rayos catódicos"],
          ["Thomson (pudin de pasas)", "1904", "esfera positiva con electrones incrustados", "los átomos contienen electrones; neutralidad", "los resultados de Rutherford"],
          ["Rutherford", "1911", "núcleo diminuto, positivo y masivo; electrones girando alrededor", "la dispersión de partículas alfa", "estabilidad del átomo (el electrón acelerado debería radiar y caer) y los espectros"],
          ["Bohr", "1913", "órbitas circulares con energías cuantizadas; saltos con emisión/absorción de fotones", "el espectro del hidrógeno y su estabilidad", "átomos con varios electrones; enlace; anchura de las rayas"],
          ["Mecánico-cuántico", "1925–27", "orbitales como nubes de probabilidad; números cuánticos; espín", "la configuración electrónica, la tabla periódica, el enlace", "— (modelo vigente)"]
        ]) +
        "<h5>Por qué fracasa Rutherford y qué arregla Bohr</h5>" +
        "<p>Según la física clásica, una carga que describe una órbita está acelerada y debería irradiar energía electromagnética, perder energía y precipitarse en espiral sobre el núcleo en una fracción de segundo. Pero los átomos son estables. Además, los gases excitados emiten luz con <b>rayas</b> muy concretas (un espectro discontinuo), y no con todos los colores, como predecía el modelo clásico. Bohr (1913) propuso tres postulados «ad hoc» que resolvían ambos problemas: el electrón solo puede estar en órbitas estacionarias sin radiar; esas órbitas tienen un momento angular múltiplo de h/2π; y solo emite o absorbe energía al saltar entre órbitas, con ΔE = hν.</p>"
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. El modelo de Bohr y el espectro del hidrógeno",
      html:
        "<h5>Tipos de espectros</h5>" +
        "<ul><li><b>Espectro continuo</b>: un sólido incandescente (el filamento de una bombilla) emite luz de todos los colores sin huecos.</li>" +
        "<li><b>Espectro de emisión de rayas</b>: un gas a baja presión excitado con descargas eléctricas o calor (un tubo de neón) emite solo en longitudes de onda concretas. Cada elemento tiene su propio conjunto de rayas: es su «huella dactilar».</li>" +
        "<li><b>Espectro de absorción</b>: al atravesar un gas frío, una luz continua pierde justo las longitudes de onda que el gas emitiría: aparecen rayas oscuras. Así se identificó en 1868 un elemento nuevo en el Sol, el <b>helio</b> (del griego <i>helios</i>, Sol), 27 años antes de aislarlo en la Tierra.</li></ul>" +
        "<h5>Lo que dice el modelo de Bohr para el hidrógeno</h5>" +
        "<ul>" +
        "<li><b>Radios permitidos</b>: r<sub>n</sub> = n²·a₀, con el radio de Bohr a₀ = 0,0529 nm = 52,9 pm.</li>" +
        "<li><b>Energías permitidas</b>: E<sub>n</sub> = −13,6 eV / n² = −2,18·10⁻¹⁸ J / n² (n = 1, 2, 3…). Son negativas porque el electrón está ligado: la energía cero corresponde al electrón libre (n → ∞).</li>" +
        "<li><b>Salto entre niveles</b>: el fotón emitido o absorbido tiene la energía de la diferencia: ΔE = |E<sub>f</sub> − E<sub>i</sub>| = hν = hc/λ.</li>" +
        "</ul>" +
        tabla(["n", "1", "2", "3", "4", "5", "∞"], [["E<sub>n</sub> (eV)", "−13,60", "−3,40", "−1,51", "−0,85", "−0,54", "0"], ["r<sub>n</sub> (nm)", "0,0529", "0,212", "0,476", "0,846", "1,32", "—"]]) +
        "<p>La <b>fórmula de Rydberg</b> (que Bohr consiguió deducir) da directamente la longitud de onda de cada raya:</p>" +
        H.formula("1/λ = R<sub>H</sub> · (1/n<sub>f</sub>² − 1/n<sub>i</sub>²)   con   R<sub>H</sub> = 1,097·10⁷ m⁻¹") +
        "<p>Cada valor de n<sub>f</sub> da una <b>serie</b> de rayas (n<sub>i</sub> = n<sub>f</sub> + 1, n<sub>f</sub> + 2…). El límite de la serie (n<sub>i</sub> → ∞) es la raya más corta:</p>" +
        tabla(["Serie", "n<sub>f</sub>", "Región", "Primera raya (λ)", "Límite de la serie"], [
          ["Lyman", "1", "ultravioleta", "121,5 nm (2→1)", "91,2 nm"],
          ["Balmer", "2", "visible", "656,3 nm (3→2, roja)", "364,6 nm"],
          ["Paschen", "3", "infrarrojo", "1 875 nm (4→3)", "820 nm"],
          ["Brackett", "4", "infrarrojo", "4 051 nm (5→4)", "1 458 nm"],
          ["Pfund", "5", "infrarrojo", "7 460 nm (6→5)", "2 279 nm"]
        ]) +
        w("q1_bohr") +
        ejemplo("La raya roja de Balmer", "Calcula la longitud de onda, la frecuencia y la energía del fotón emitido cuando el electrón del hidrógeno pasa de n = 3 a n = 2. (R<sub>H</sub> = 1,097·10⁷ m⁻¹; h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s)", [
          "1/λ = 1,097·10⁷ · (1/2² − 1/3²) = 1,097·10⁷ · (1/4 − 1/9) = 1,097·10⁷ · 0,13889 = 1,524·10⁶ m⁻¹.",
          "λ = 1/1,524·10⁶ = 6,563·10⁻⁷ m = <b>656,3 nm</b> (rojo, región visible).",
          "ν = c/λ = 3,00·10⁸/6,563·10⁻⁷ = <b>4,571·10¹⁴ Hz</b>.",
          "E = hν = 6,626·10⁻³⁴ · 4,571·10¹⁴ = <b>3,03·10⁻¹⁹ J</b> = 1,89 eV (dividiendo entre 1,602·10⁻¹⁹ J/eV). Coincide con E₃ − E₂ = −1,51 − (−3,40) = 1,89 eV."
        ]) +
        ejemplo("Energía de ionización del hidrógeno", "¿Qué energía hay que dar a un átomo de hidrógeno en su estado fundamental para arrancarle el electrón? Exprésala en eV, en J por átomo y en kJ/mol.", [
          "Ionizar = llevar el electrón de n = 1 a n = ∞ (E = 0): ΔE = 0 − (−13,6) = <b>13,6 eV</b>.",
          "En julios: 13,6 · 1,602·10⁻¹⁹ = <b>2,18·10⁻¹⁸ J</b> por átomo.",
          "Por mol: 2,18·10⁻¹⁸ · 6,022·10²³ = 1,312·10⁶ J/mol = <b>1 312 kJ/mol</b>, justo el valor de EI₁ del hidrógeno en la tabla."
        ]) +
        ejemplo("Absorción", "¿Qué radiación debe absorber el átomo de hidrógeno para pasar de n = 1 a n = 3? ¿En qué región está?", [
          "1/λ = 1,097·10⁷ · (1/1² − 1/3²) = 1,097·10⁷ · (8/9) = 9,751·10⁶ m⁻¹ → λ = 1,0255·10⁻⁷ m = <b>102,6 nm</b>.",
          "Está por debajo de 380 nm: <b>ultravioleta</b> (es la segunda raya de la serie de Lyman). ΔE = 13,6 · 8/9 = 12,09 eV."
        ]) +
        "<h5>El color de la llama y los fuegos artificiales</h5>" +
        "<p>Cuando un compuesto de un metal se calienta en una llama, los electrones se excitan y al volver a su nivel emiten fotones de longitudes de onda características. Es la <b>prueba de la llama</b>, que sirve para identificar metales: <b>Li</b> carmín (671 nm), <b>Na</b> amarillo (589 nm), <b>K</b> violeta pálido, <b>Ca</b> naranja-rojizo (622 nm), <b>Sr</b> rojo intenso, <b>Ba</b> verde (524 nm), <b>Cu</b> verde-azulado. Los fuegos artificiales usan precisamente esas sales. Y las luces de neón son un tubo de gas excitado con una descarga.</p>" +
        ejemplo("La luz amarilla del sodio", "El sodio emite luz de 589 nm. Calcula la energía de un fotón y la de un mol de fotones.", [
          "E = hc/λ = 6,626·10⁻³⁴ · 3,00·10⁸/589·10⁻⁹ = <b>3,38·10⁻¹⁹ J</b> (2,11 eV).",
          "Un mol de fotones: 3,38·10⁻¹⁹ · 6,022·10²³ = 2,03·10⁵ J = <b>203 kJ/mol</b>."
        ]) +
        "<h5>Límites del modelo de Bohr</h5>" +
        "<p>Funciona muy bien para el hidrógeno y para los <i>hidrogenoides</i> (He⁺, Li²⁺, con un solo electrón), pero no explica los átomos con varios electrones, la forma de los orbitales, la anchura y estructura fina de las rayas ni el enlace químico. Tampoco justifica sus postulados. Los explicará la mecánica cuántica, que conserva de Bohr la idea esencial: <b>las energías del electrón están cuantizadas</b>.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Dualidad onda-partícula y principio de incertidumbre",
      html:
        "<h5>La luz es onda y partícula</h5>" +
        "<p><b>Planck (1900)</b> propuso que la energía solo se emite o absorbe en paquetes (<i>cuantos</i>) de valor E = hν. <b>Einstein (1905)</b> explicó el <b>efecto fotoeléctrico</b> admitiendo que la luz viaja en cuantos, los fotones: un fotón con energía suficiente arranca un electrón de un metal; si su frecuencia es menor que la umbral, no lo arranca por muy intensa que sea la luz.</p>" +
        ejemplo("Energía de un fotón violeta", "Calcula la energía de un fotón de luz violeta de 400 nm en julios y en eV.", [
          "E = hc/λ = 6,626·10⁻³⁴ · 3,00·10⁸ / 400·10⁻⁹ = <b>4,97·10⁻¹⁹ J</b>.",
          "En eV: 4,97·10⁻¹⁹ / 1,602·10⁻¹⁹ = <b>3,10 eV</b>."
        ]) +
        "<h5>La materia también es onda: de Broglie (1924)</h5>" +
        "<p>Si la luz tiene comportamiento de partícula, ¿por qué las partículas no tendrían comportamiento ondulatorio? De Broglie propuso que toda partícula de masa m y velocidad v lleva asociada una onda de longitud:</p>" +
        H.formula("λ = h / (m·v)") +
        "<p>Davisson y Germer (1927) comprobaron que un haz de electrones se <i>difracta</i> en un cristal como si fuera una onda: el fundamento del microscopio electrónico.</p>" +
        ejemplo("¿Cuándo se nota la onda?", "Calcula la longitud de onda asociada a: a) un electrón con velocidad 1,0·10⁶ m/s (m = 9,109·10⁻³¹ kg); b) una pelota de béisbol de 0,145 kg a 40 m/s.", [
          "<b>a)</b> λ = 6,626·10⁻³⁴ / (9,109·10⁻³¹ · 1,0·10⁶) = 7,27·10⁻¹⁰ m = <b>0,727 nm</b>: comparable al tamaño de un átomo, y por eso el electrón se difracta en los cristales.",
          "<b>b)</b> λ = 6,626·10⁻³⁴ / (0,145 · 40) = <b>1,14·10⁻³⁴ m</b>: inobservablemente pequeña. Los objetos cotidianos no muestran comportamiento ondulatorio."
        ]) +
        ejemplo("Electrón acelerado", "Un electrón se acelera desde el reposo con una diferencia de potencial de 100 V. Calcula su longitud de onda de De Broglie.", [
          "Energía cinética: ½mv² = eV → v = √(2eV/m) = √(2 · 1,602·10⁻¹⁹ · 100 / 9,109·10⁻³¹) = 5,93·10⁶ m/s.",
          "λ = h/(mv) = 6,626·10⁻³⁴ / (9,109·10⁻³¹ · 5,93·10⁶) = 1,23·10⁻¹⁰ m = <b>0,123 nm</b> (123 pm): del orden de las distancias entre átomos de un cristal."
        ]) +
        "<h5>Principio de incertidumbre de Heisenberg (1927)</h5>" +
        "<p>No se puede conocer simultáneamente, con precisión arbitraria, la posición y la cantidad de movimiento de una partícula. Si Δx y Δp son las incertidumbres respectivas:</p>" +
        H.formula("Δx · Δp ≥ h / (4π) = 5,27·10⁻³⁵ J·s") +
        ejemplo("Un electrón en un átomo", "Si localizamos un electrón dentro de un átomo (Δx ≈ 10⁻¹⁰ m), ¿qué incertidumbre mínima tiene su velocidad?", [
          "Δv ≥ h/(4π·m·Δx) = 5,27·10⁻³⁵ / (9,109·10⁻³¹ · 10⁻¹⁰) = <b>5,8·10⁵ m/s</b>.",
          "Es una incertidumbre enorme (cientos de km/s): por eso no tiene sentido hablar de una trayectoria precisa del electrón y se habla de orbitales (probabilidades). Aplicado a una pelota (Δx = 1 mm, m = 0,145 kg) da Δv ≥ 3,6·10⁻³¹ m/s, imperceptible."
        ]) +
        "<p>Conclusión: el electrón no es una bolita que gira, ni una onda que se extiende, sino un objeto cuántico cuyo estado se describe mediante una <b>función de onda</b> ψ; el cuadrado de ψ en cada punto da la probabilidad de encontrarlo allí. Los orbitales son las zonas de mayor probabilidad.</p>"
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Guion de seis pasos: deducirlo todo a partir de Z",
      html:
        "<p>Casi cualquier problema de este tema se resuelve con el mismo guion. Se parte de Z (o del nombre del elemento) y se deducen, en este orden:</p>" +
        "<ol>" +
        "<li><b>Electrones</b>: Z (neutro) o Z − q (ion).</li>" +
        "<li><b>Configuración electrónica</b> (Moeller; excepciones Cr, Cu).</li>" +
        "<li><b>Posición</b>: periodo = n máximo; grupo según el bloque; bloque = subnivel final.</li>" +
        "<li><b>Electrones de valencia</b> (los de la capa externa) e <b>ion más probable</b> (el que alcanza la configuración de gas noble).</li>" +
        "<li><b>Propiedades relativas</b>: radio, energía de ionización, electronegatividad respecto de sus vecinos.</li>" +
        "<li><b>Tipo de elemento</b>: metal/no metal, reductor/oxidante, tipo de enlace que formará (tema siguiente).</li>" +
        "</ol>" +
        ejemplo("Magnesio (Z = 12)", "Aplica el guion al magnesio.", [
          "<b>1–2</b>: 12 e⁻ → 1s² 2s² 2p⁶ 3s² = [Ne] 3s².",
          "<b>3</b>: periodo 3; termina en 3s con 2 e⁻ → bloque s, <b>grupo 2</b> (alcalinotérreos).",
          "<b>4</b>: 2 e⁻ de valencia; pierde 2 para quedar como el neón → <b>Mg²⁺</b> ([He]2s²2p⁶).",
          "<b>5</b>: radio menor que el Na (mismo periodo, Z mayor) y mayor que el Be (arriba); EI₁ = 738 kJ/mol (mayor que la del Na, menor que la del Be). Electronegatividad 1,31.",
          "<b>6</b>: metal, reductor; con los no metales formará compuestos iónicos (MgO, MgCl₂)."
        ]) +
        ejemplo("Azufre (Z = 16)", "Aplica el guion al azufre.", [
          "<b>1–2</b>: 16 e⁻ → [Ne] 3s² 3p⁴ (1s² 2s² 2p⁶ 3s² 3p⁴).",
          "<b>3</b>: periodo 3, bloque p, grupo 10 + (2 + 4) = <b>16</b> (anfígenos).",
          "<b>4</b>: 6 e⁻ de valencia; gana 2 → <b>S²⁻</b> ([Ne]3s²3p⁶, isoelectrónico con el argón). También puede usar valencias positivas (+4, +6) en compuestos con oxígeno.",
          "<b>5</b>: más electronegativo que el P y menos que el Cl; radio mayor que el O (debajo en el grupo).",
          "<b>6</b>: no metal, oxidante moderado; con metales da sulfuros iónicos; con otros no metales, enlaces covalentes."
        ]) +
        ejemplo("Hierro (Z = 26)", "Aplica el guion al hierro.", [
          "<b>1–2</b>: [Ar] 4s² 3d⁶.",
          "<b>3</b>: periodo 4, bloque d, grupo 2 + 6 = <b>8</b>.",
          "<b>4</b>: 2 e⁻ en la capa externa (4s²), pero también puede perder 3d: da <b>Fe²⁺</b> ([Ar]3d⁶) y <b>Fe³⁺</b> ([Ar]3d⁵, semilleno). Por eso tiene dos valencias.",
          "<b>5</b>: Fe³⁺ (64 pm) es menor que Fe²⁺ (78 pm), porque tiene menos electrones con la misma carga nuclear.",
          "<b>6</b>: metal de transición, paramagnético (4 electrones desapareados en el átomo; 5 en el Fe³⁺)."
        ]) +
        ejemplo("Bromo (Z = 35)", "Aplica el guion al bromo.", [
          "<b>1–2</b>: [Ar] 4s² 3d¹⁰ 4p⁵.",
          "<b>3</b>: periodo 4, bloque p, grupo 10 + (2 + 5) = <b>17</b> (halógenos).",
          "<b>4</b>: 7 e⁻ de valencia; gana 1 → <b>Br⁻</b> ([Kr]).",
          "<b>5</b>: electronegatividad 2,96 (menor que Cl 3,16 y mayor que I 2,66); radio covalente 120 pm.",
          "<b>6</b>: no metal, oxidante; Br₂ es un líquido pardo-rojizo."
        ]) +
        ejemplo("Potasio (Z = 19)", "Aplica el guion al potasio.", [
          "<b>1–2</b>: [Ar] 4s¹.",
          "<b>3</b>: periodo 4, bloque s, <b>grupo 1</b> (alcalino).",
          "<b>4</b>: 1 e⁻ de valencia: <b>K⁺</b> ([Ar]). Su EI₂ es enorme (3 052 kJ/mol): solo forma K⁺.",
          "<b>5</b>: radio grande (203 pm), EI₁ = 419 kJ/mol, χ = 0,82: uno de los más electropositivos.",
          "<b>6</b>: metal muy reductor y reactivo: reacciona con el agua desprendiendo H₂ (más violentamente que el Na)."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Ordenar elementos por una propiedad: razonamiento y excepciones",
      html:
        "<p>Los exámenes piden «ordena y justifica». La justificación se construye con una plantilla de tres pasos: <b>(1)</b> situar los elementos (periodo/grupo), <b>(2)</b> decir qué cambia (Z<sub>ef</sub> o número de capas) y <b>(3)</b> concluir.</p>" +
        tabla(["Si están en…", "Razonamiento", "Para el radio", "Para EI y χ"], [
          ["el mismo periodo", "mismas capas, Z<sub>ef</sub> crece hacia la derecha", "disminuye →", "aumentan →"],
          ["el mismo grupo", "más capas hacia abajo; el electrón externo más lejos", "aumenta ↓", "disminuyen ↓"],
          ["una serie isoelectrónica", "mismo nº de e⁻, más protones = más atracción", "disminuye al aumentar Z", "—"]
        ]) +
        ejemplo("Radio atómico", "Ordena de mayor a menor radio atómico: Mg, Ca, Be, Sr. Justifica.", [
          "Los cuatro están en el <b>grupo 2</b> (periodos 3, 4, 2 y 5 respectivamente).",
          "Al bajar en un grupo se añaden capas electrónicas y el electrón externo está cada vez más lejos del núcleo y más apantallado: el radio aumenta.",
          "<b>Sr (195 pm) &gt; Ca (176) &gt; Mg (141) &gt; Be (96)</b>."
        ]) +
        ejemplo("Energía de ionización con una excepción", "Ordena de mayor a menor primera energía de ionización: Na, Mg, Al, Si. ¿Se cumple la tendencia general?", [
          "Los cuatro están en el periodo 3: en general, EI crece hacia la derecha: Na &lt; Mg &lt; Al &lt; Si.",
          "Valores reales (kJ/mol): Na 496 · Mg 738 · Al 578 · Si 787. El <b>aluminio rompe la tendencia</b>: EI(Al) &lt; EI(Mg), porque el electrón que pierde el Al está en un orbital 3p (más alto en energía y más apantallado por los 3s²) y el del Mg está en un 3s completo.",
          "Orden de mayor a menor: <b>Si (787) &gt; Mg (738) &gt; Al (578) &gt; Na (496)</b>."
        ]) +
        ejemplo("Electronegatividad", "Ordena de mayor a menor electronegatividad: P, Cl, Si, S.", [
          "Periodo 3: la electronegatividad aumenta hacia la derecha con la carga efectiva: Si (grupo 14) &lt; P (15) &lt; S (16) &lt; Cl (17).",
          "<b>Cl (3,16) &gt; S (2,58) &gt; P (2,19) &gt; Si (1,90)</b>."
        ]) +
        ejemplo("Serie isoelectrónica", "Ordena de mayor a menor radio: S²⁻, Cl⁻, K⁺, Ca²⁺. Justifica.", [
          "Todos tienen 18 electrones ([Ar]), pero distinto número de protones: S²⁻ (16), Cl⁻ (17), K⁺ (19), Ca²⁺ (20).",
          "Con los mismos electrones, cuantos más protones, mayor atracción y menor tamaño: <b>S²⁻ (184 pm) &gt; Cl⁻ (181) &gt; K⁺ (138) &gt; Ca²⁺ (100)</b>."
        ]) +
        ejemplo("Reactividad", "¿Cuál es más reactivo con el agua, el Na o el K? ¿Y cuál es más oxidante, el Cl₂ o el Br₂?", [
          "Los alcalinos reaccionan perdiendo un electrón: cuanto menor es la energía de ionización, más reactivo. EI(K) = 419 &lt; EI(Na) = 496 → <b>el K es más reactivo</b>.",
          "Los halógenos reaccionan ganando un electrón: cuanto mayor es la electronegatividad y la afinidad electrónica, más oxidante. Cl (3,16; AE 349) &gt; Br (2,96; AE 325) → <b>el Cl₂ es más oxidante</b>."
        ]) +
        "<h5>Frases que no deben faltar en una justificación</h5>" +
        "<ul><li>«Al avanzar en el periodo aumenta la carga nuclear efectiva (Z aumenta y el apantallamiento casi no cambia), por lo que los electrones externos son atraídos con más fuerza.»</li>" +
        "<li>«Al bajar en el grupo aumenta el número de capas: el electrón externo está más lejos del núcleo y más apantallado.»</li>" +
        "<li>«Los iones isoelectrónicos tienen los mismos electrones; el de mayor Z atrae con más fuerza y es más pequeño.»</li></ul>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Problemas resueltos de nivel PAU",
      html:
        ejemplo("Problema 1: un elemento desconocido", "Un elemento X tiene la configuración electrónica 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁷. a) Identifícalo y sitúalo en la tabla. b) Escribe la configuración de su ion X²⁺. c) ¿Es paramagnético? ¿Cuántos electrones desapareados tiene el X²⁺?", [
          "<b>a)</b> Electrones: 2 + 2 + 6 + 2 + 6 + 2 + 7 = 27 → Z = 27: <b>cobalto</b>. Periodo 4; bloque d; grupo 2 + 7 = 9.",
          "<b>b)</b> Al formar el catión pierde primero los 4s: Co²⁺ = 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ ([Ar] 3d⁷).",
          "<b>c)</b> 3d⁷: ↑↓ ↑↓ ↑ ↑ ↑ → 3 electrones desapareados: el Co²⁺ es <b>paramagnético</b>."
        ]) +
        ejemplo("Problema 2: números cuánticos", "Escribe los cuatro números cuánticos de un electrón del subnivel 3d y razona si es posible un electrón con (3, 3, 0, +½).", [
          "Un electrón 3d tiene n = 3, l = 2, m<sub>l</sub> ∈ {−2, −1, 0, +1, +2} y m<sub>s</sub> = ±½. Un ejemplo: (3, 2, −1, +½).",
          "El conjunto (3, 3, 0, +½) es <b>imposible</b>: para n = 3, l solo puede valer 0, 1 o 2 (l ≤ n − 1)."
        ]) +
        ejemplo("Problema 3: Bohr", "Un electrón de un átomo de hidrógeno pasa del nivel n = 4 al n = 2. a) Calcula la longitud de onda del fotón y di si es visible. b) ¿Absorbe o emite? c) Calcula su energía en eV.", [
          "<b>a)</b> 1/λ = 1,097·10⁷ (1/4 − 1/16) = 1,097·10⁷ · 0,1875 = 2,057·10⁶ m⁻¹ → λ = 4,862·10⁻⁷ m = <b>486,2 nm</b>: visible (azul-verdoso).",
          "<b>b)</b> Pasa a un nivel de menor energía: <b>emite</b> un fotón.",
          "<b>c)</b> ΔE = 13,6 · (1/4 − 1/16) = <b>2,55 eV</b>."
        ]) +
        ejemplo("Problema 4: masa atómica y abundancias", "El cobre natural tiene dos isótopos: ⁶³Cu (62,93 u) y ⁶⁵Cu (64,93 u). Su masa atómica es 63,55 u. Calcula la abundancia de cada uno.", [
          "Sea x la fracción de ⁶³Cu: 63,55 = 62,93x + 64,93(1 − x) = 64,93 − 2,00x.",
          "2,00x = 64,93 − 63,55 = 1,38 → x = 0,69.",
          "<b>⁶³Cu: 69 %</b> y <b>⁶⁵Cu: 31 %</b>."
        ]) +
        ejemplo("Problema 5: radiación para ionizar", "¿Cuál es la longitud de onda máxima de un fotón capaz de ionizar un átomo de hidrógeno en su estado fundamental?", [
          "Hace falta E = 13,6 eV = 2,18·10⁻¹⁸ J.",
          "λ = hc/E = 6,626·10⁻³⁴ · 3,00·10⁸ / 2,18·10⁻¹⁸ = 9,12·10⁻⁸ m = <b>91,2 nm</b> (ultravioleta lejano; es el límite de la serie de Lyman)."
        ]) +
        ejemplo("Problema 6: propiedades periódicas", "Considera los elementos A (Z = 11), B (Z = 17) y C (Z = 19). a) Escribe sus configuraciones. b) Ordénalos por radio atómico. c) ¿Cuál tiene la mayor primera energía de ionización? d) ¿Qué ion forma cada uno?", [
          "<b>a)</b> A (Na): [Ne] 3s¹ · B (Cl): [Ne] 3s² 3p⁵ · C (K): [Ar] 4s¹.",
          "<b>b)</b> A y B están en el periodo 3 (el Na, a la izquierda, es mayor que el Cl); C está en el periodo 4 (más capas): <b>K (203) &gt; Na (166) &gt; Cl (102 pm)</b>.",
          "<b>c)</b> El <b>cloro</b> (EI = 1 251 kJ/mol): está más a la derecha y arriba.",
          "<b>d)</b> Na⁺, Cl⁻ y K⁺."
        ]) +
        ejemplo("Problema 7: carga nuclear efectiva", "Calcula la carga nuclear efectiva sobre un electrón de la capa de valencia del magnesio y del aluminio y compárala con la del sodio (Z<sub>ef</sub> = 2,2). ¿Qué tendencia se observa?", [
          "<b>Mg</b> ([Ne]3s², Z = 12): S = 1 · 0,35 + 8 · 0,85 + 2 · 1,00 = 0,35 + 6,8 + 2 = 9,15 → Z<sub>ef</sub> = 12 − 9,15 = <b>2,85</b>.",
          "<b>Al</b> ([Ne]3s²3p¹, Z = 13): S = 2 · 0,35 + 8 · 0,85 + 2 = 0,7 + 6,8 + 2 = 9,5 → Z<sub>ef</sub> = <b>3,5</b>.",
          "Na 2,2 &lt; Mg 2,85 &lt; Al 3,5: crece al avanzar en el periodo, y eso encoge el radio (166 → 141 → 121 pm)."
        ]) +
        ejemplo("Problema 8: radiactividad", "Una muestra de ¹⁴C tiene 800 mg. ¿Cuánto queda al cabo de 17 190 años? (T<sub>½</sub> = 5 730 años). ¿Cuánto se habrá desintegrado?", [
          "t/T = 17 190/5 730 = 3 semividas.",
          "Queda N = 800 · (½)³ = <b>100 mg</b>; se habrá desintegrado 800 − 100 = <b>700 mg</b> (el 87,5 %)."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las ideas clave y tres juegos para fijar: unir cada grupo con su nombre y característica, clasificar especies y ordenar el cálculo de una raya espectral.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "grupos") + w("clasificar", "especies") + w("orden", "rydberg")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    modelos: {
      titulo: "Los experimentos y las ideas que construyeron el átomo (1897–1932)",
      desde: 1897, hasta: 1932,
      tipos: { exp: ["Experimento", "var(--pen)"], mod: ["Modelo o teoría", "var(--red)"], par: ["Partícula descubierta", "var(--ok)"] },
      eventos: [
        { a: 1897, f: 0.4, m: "", t: "Thomson: el electrón", tipo: "par", d: "J. J. Thomson desvía los rayos catódicos con campos eléctricos y magnéticos y deduce que están formados por partículas negativas, mucho más ligeras que el átomo. Es la primera partícula subatómica." },
        { a: 1900, f: 0.9, m: "dic", t: "Planck: los cuantos", tipo: "mod", d: "Para explicar la radiación del cuerpo negro, Max Planck propone que la energía se emite en paquetes de valor E = hν. Nace la física cuántica." },
        { a: 1905, f: 0.3, m: "", t: "Einstein: fotones", tipo: "mod", d: "Explica el efecto fotoeléctrico: la luz está formada por cuantos de energía hν (fotones). Un fotón solo arranca un electrón si su energía supera el trabajo de extracción del metal." },
        { a: 1909, f: 0.3, m: "", t: "Millikan: la carga del electrón", tipo: "exp", d: "Con gotas de aceite cargadas mide la carga elemental, e = 1,602·10⁻¹⁹ C, y demuestra que la carga está cuantizada." },
        { a: 1911, f: 0.4, m: "", t: "Rutherford: el núcleo", tipo: "exp", d: "Bombardea una lámina de oro con partículas alfa. Casi todas pasan, unas pocas rebotan: toda la carga positiva y casi toda la masa están en un núcleo diminuto." },
        { a: 1913, f: 0.35, m: "", t: "Bohr: niveles de energía", tipo: "mod", d: "Propone órbitas con energías cuantizadas para el electrón del hidrógeno y explica por primera vez el espectro de rayas con E = hν." },
        { a: 1913, f: 0.8, m: "", t: "Moseley: el número atómico", tipo: "exp", d: "Mide los rayos X emitidos por los elementos y demuestra que su frecuencia depende de Z (la carga del núcleo). Ordena la tabla periódica por Z." },
        { a: 1919, f: 0.5, m: "", t: "Rutherford: el protón", tipo: "par", d: "Al bombardear nitrógeno con partículas alfa obtiene núcleos de hidrógeno: identifica el protón como partícula de todos los núcleos." },
        { a: 1924, f: 0.9, m: "", t: "De Broglie: ondas de materia", tipo: "mod", d: "Propone λ = h/(m·v) para toda partícula: los electrones deben comportarse también como ondas." },
        { a: 1925, f: 0.1, m: "", t: "Pauli: exclusión", tipo: "mod", d: "En un átomo no puede haber dos electrones con los cuatro números cuánticos iguales. Explica la estructura de capas y la tabla periódica." },
        { a: 1926, f: 0.2, m: "", t: "Schrödinger: ecuación de onda", tipo: "mod", d: "Plantea la ecuación cuyas soluciones son los orbitales y los números cuánticos n, l, m<sub>l</sub>. Es el modelo mecanocuántico del átomo." },
        { a: 1927, f: 0.2, m: "", t: "Heisenberg: incertidumbre", tipo: "mod", d: "No se pueden conocer a la vez con precisión posición y velocidad de un electrón: Δx·Δp ≥ h/4π." },
        { a: 1927, f: 0.8, m: "", t: "Davisson y Germer", tipo: "exp", d: "Observan la difracción de electrones en un cristal de níquel: confirmación experimental de la naturaleza ondulatoria de la materia." },
        { a: 1932, f: 0.5, m: "", t: "Chadwick: el neutrón", tipo: "par", d: "Descubre el neutrón, una partícula neutra con masa casi igual a la del protón. Explica la diferencia entre Z y A y los isótopos." }
      ]
    },
    grupos: {
      titulo: "Cada grupo con su nombre y su configuración externa",
      consigna: "Une cada grupo de la tabla periódica con su descripción.",
      pares: [
        ["Grupo 1", "Alcalinos · ns¹ · forman M⁺"],
        ["Grupo 2", "Alcalinotérreos · ns² · forman M²⁺"],
        ["Grupo 13", "Térreos (boroideos) · ns² np¹ · forman M³⁺"],
        ["Grupo 15", "Nitrogenoideos · ns² np³ · forman X³⁻"],
        ["Grupo 16", "Anfígenos o calcógenos · ns² np⁴ · forman X²⁻"],
        ["Grupo 17", "Halógenos · ns² np⁵ · forman X⁻"],
        ["Grupo 18", "Gases nobles · ns² np⁶ · no forman iones"],
        ["Grupos 3–12", "Metales de transición · ns² (n−1)d¹⁻¹⁰ · varias cargas"]
      ]
    },
    especies: {
      titulo: "¿Qué relación hay entre las dos especies?",
      consigna: "Toca una pareja de especies y después la relación que cumplen.",
      categorias: ["Isótopos", "Isóbaros", "Isoelectrónicos", "Isótonos"],
      items: [
        { t: "¹²C y ¹⁴C", c: 0 }, { t: "³⁵Cl y ³⁷Cl", c: 0 }, { t: "¹H y ³H", c: 0 },
        { t: "⁴⁰Ar y ⁴⁰Ca", c: 1 }, { t: "¹⁴C y ¹⁴N", c: 1 }, { t: "³H y ³He", c: 1 },
        { t: "Na⁺ y Ne", c: 2 }, { t: "O²⁻ y F⁻", c: 2 }, { t: "S²⁻ y Ar", c: 2 },
        { t: "¹³C y ¹⁴N", c: 3 }, { t: "³⁹K y ⁴⁰Ca", c: 3 }
      ]
    },
    rydberg: {
      titulo: "Calcular una raya del espectro del hidrógeno",
      consigna: "Ordena los pasos para hallar la longitud de onda del fotón en la transición n = 4 → n = 2.",
      items: [
        { t: "Identificar n<sub>i</sub> = 4 y n<sub>f</sub> = 2 (serie de Balmer)", nota: "Se empieza siempre por saber de qué nivel a qué nivel se salta." },
        { t: "Escribir la fórmula de Rydberg: 1/λ = R<sub>H</sub>·(1/n<sub>f</sub>² − 1/n<sub>i</sub>²)", nota: "R<sub>H</sub> = 1,097·10⁷ m⁻¹." },
        { t: "Sustituir: 1/λ = 1,097·10⁷ · (1/4 − 1/16) = 1,097·10⁷ · 0,1875", nota: "Cuidado con la resta: 1/4 − 1/16 = 3/16." },
        { t: "Calcular: 1/λ = 2,057·10⁶ m⁻¹", nota: "El resultado sale en m⁻¹: todavía es la inversa de la longitud de onda." },
        { t: "Invertir: λ = 4,862·10⁻⁷ m = 486,2 nm", nota: "Se pasa a nm multiplicando por 10⁹." },
        { t: "Interpretar: está en el visible (azul-verdoso) y, como n<sub>i</sub> &gt; n<sub>f</sub>, el átomo emite el fotón", nota: "Comprobación final: Balmer β." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno dice que un átomo de sodio (Z = 11) con 12 neutrones tiene número másico 11. ¿Qué falla?",
          op: ["Nada", "A = Z + N = 11 + 12 = 23, no 11", "A = N − Z = 1", "A = Z · N"], ok: 1,
          porque: "El número másico cuenta todos los nucleones: protones (Z) más neutrones (N). El número atómico es el que vale 11." },
        { q: "Un alumno afirma que dos isótopos del mismo elemento tienen distinto número de protones. ¿Qué falla?",
          op: ["Nada", "Los isótopos tienen el mismo Z y distinto número de neutrones", "Tienen distinto número de electrones", "Tienen el mismo A"], ok: 1,
          porque: "Si cambia Z cambia el elemento. Los isótopos son átomos del mismo elemento (igual Z) con distinto A." },
        { q: "Un alumno escribe la configuración del Fe²⁺ como [Ar] 4s² 3d⁴. ¿Qué falla?",
          op: ["Nada", "Un catión pierde primero los electrones de la capa más externa (4s): Fe²⁺ = [Ar] 3d⁶", "Debe tener 3d⁸", "Debe perder dos electrones 2p"], ok: 1,
          porque: "El Fe es [Ar] 4s² 3d⁶. Al ionizarse pierde primero los 4s (n más alto): Fe²⁺ = [Ar] 3d⁶. Quitar dos electrones 3d dejando 4s² es un error muy habitual." },
        { q: "Un alumno escribe la configuración del cromo como [Ar] 4s² 3d⁴. ¿Qué falla?",
          op: ["Nada", "Es una excepción: el cromo prefiere [Ar] 4s¹ 3d⁵ (subnivel d semilleno)", "Debe ser [Ar] 4s² 3d⁵", "Debe ser [Ar] 3d⁶"], ok: 1,
          porque: "El 3d semilleno es especialmente estable: un electrón del 4s pasa al 3d. Lo mismo ocurre con el cobre ([Ar] 4s¹ 3d¹⁰)." },
        { q: "Un alumno dice que el radio del Cl⁻ es menor que el del átomo de Cl «porque tiene más carga». ¿Qué falla?",
          op: ["Nada", "Un anión es mayor que su átomo: más electrones con la misma carga nuclear se repelen más", "El radio no cambia", "Un anión pierde un electrón"], ok: 1,
          porque: "Cl 102 pm → Cl⁻ 181 pm. Al ganar un electrón aumenta la repulsión electrónica y la carga nuclear efectiva por electrón disminuye." },
        { q: "Un alumno dice que el oxígeno tiene mayor primera energía de ionización que el nitrógeno «porque está más a la derecha». ¿Qué falla?",
          op: ["Nada", "Es una excepción: N (1 402 kJ/mol) &gt; O (1 314): el N tiene 2p³ semilleno y el O un par apareado que se repele", "El O no tiene energía de ionización", "Los dos valen lo mismo"], ok: 1,
          porque: "La tendencia general crece hacia la derecha, pero hay irregularidades: Be &gt; B y N &gt; O." },
        { q: "Un alumno dice que cuando el electrón del hidrógeno pasa de n = 1 a n = 2 se emite un fotón. ¿Qué falla?",
          op: ["Nada", "Pasar a un nivel de mayor energía exige absorber un fotón", "Se emite un electrón", "Se emite un protón"], ok: 1,
          porque: "n = 2 tiene más energía (−3,4 eV) que n = 1 (−13,6 eV): hay que absorber exactamente 10,2 eV. Se emite cuando se baja de nivel." },
        { q: "Un alumno dice que, como la masa atómica del cloro es 35,45 u, existen átomos de cloro de 35,45 u. ¿Qué falla?",
          op: ["Nada", "35,45 es una media ponderada: los átomos reales pesan 34,97 u (³⁵Cl) o 36,97 u (³⁷Cl)", "35,45 es el número másico", "Los átomos de cloro tienen 35,45 neutrones"], ok: 1,
          porque: "La masa atómica de la tabla promedia los isótopos según su abundancia; ningún átomo concreto la tiene." },
        { q: "Un alumno afirma que existe el subnivel 2d. ¿Qué falla?",
          op: ["Nada", "Para n = 2 solo hay l = 0 y l = 1 (2s y 2p): el subnivel d aparece a partir de n = 3", "Existe pero tiene 3 orbitales", "Existe pero solo con espín +½"], ok: 1,
          porque: "l va de 0 a n − 1. Con n = 2, l máximo es 1. El subnivel d (l = 2) exige n ≥ 3; el f (l = 3), n ≥ 4." },
        { q: "Un alumno dice que en un mismo orbital pueden caber 3 electrones si tienen espines distintos. ¿Qué falla?",
          op: ["Nada", "Pauli: solo hay dos valores de espín, así que como máximo caben 2 electrones por orbital, con espines opuestos", "Caben 4 electrones", "Caben tantos como el valor de n"], ok: 1,
          porque: "El espín solo puede ser +½ o −½. Dos electrones del mismo orbital ya tienen (n, l, m<sub>l</sub>) iguales y solo pueden diferir en m<sub>s</sub>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El ion ⁵⁹₂₇Co³⁺ tiene…",
          op: ["27 protones, 32 neutrones y 24 electrones", "27 protones, 32 neutrones y 30 electrones", "30 protones, 29 neutrones y 27 electrones", "27 protones, 59 neutrones y 24 electrones"], ok: 0,
          porque: "p = Z = 27; N = 59 − 27 = 32; e = 27 − 3 = 24." },
        { q: "La configuración electrónica del Cl⁻ es…",
          op: ["1s² 2s² 2p⁶ 3s² 3p⁶", "1s² 2s² 2p⁶ 3s² 3p⁵", "1s² 2s² 2p⁶ 3s² 3p⁴", "1s² 2s² 2p⁶ 3s²"], ok: 0,
          porque: "Cl tiene 17 e⁻ y Cl⁻ tiene 18: como el argón." },
        { q: "¿Cuántos electrones desapareados tiene el átomo de nitrógeno (Z = 7)?",
          op: ["3", "1", "2", "0"], ok: 0,
          porque: "2p³ → ↑ ↑ ↑ (regla de Hund)." },
        { q: "El elemento de configuración [Ne] 3s² 3p⁴ es del grupo…",
          op: ["16 (periodo 3)", "14 (periodo 3)", "6 (periodo 2)", "16 (periodo 4)"], ok: 0,
          porque: "n máximo = 3 → periodo 3. Grupo = 10 + (2 + 4) = 16: azufre." },
        { q: "Un conjunto de números cuánticos NO permitido es…",
          op: ["(2, 2, 1, +½)", "(2, 1, −1, −½)", "(3, 2, 0, +½)", "(1, 0, 0, −½)"], ok: 0,
          porque: "Con n = 2 no existe l = 2 (l ≤ n − 1 = 1)." },
        { q: "La masa atómica de un elemento con dos isótopos de masas 10,01 u (20 %) y 11,01 u (80 %) es…",
          op: ["10,81 u", "10,51 u", "10,01 u", "11,01 u"], ok: 0,
          porque: "10,01·0,20 + 11,01·0,80 = 2,002 + 8,808 = 10,81 u (boro)." },
        { q: "¿Cuál de estos elementos tiene mayor radio atómico?",
          op: ["K", "Na", "Mg", "Cl"], ok: 0,
          porque: "Está en el periodo 4 (más capas) y en el grupo 1 (a la izquierda de su periodo)." },
        { q: "¿Cuál tiene mayor electronegatividad?",
          op: ["O", "N", "C", "Na"], ok: 0,
          porque: "Crece hacia la derecha en un periodo: O (3,44) &gt; N (3,04) &gt; C (2,55) &gt; Na (0,93)." },
        { q: "En el espectro del hidrógeno, la transición que emite el fotón de mayor energía es…",
          op: ["n = 4 → n = 1", "n = 3 → n = 2", "n = 5 → n = 3", "n = 2 → n = 1"], ok: 0,
          porque: "ΔE mayor: 13,6·(1 − 1/16) = 12,75 eV. Las otras: 1,89; 0,97; 10,2 eV." },
        { q: "Las energías de ionización sucesivas de un elemento son 496, 4 562 y 6 910 kJ/mol. ¿Cuántos electrones de valencia tiene?",
          op: ["1", "2", "3", "No se puede saber"], ok: 0,
          porque: "El salto grande (×9) viene tras el primero: un electrón de valencia (grupo 1; sodio)." },
        { q: "¿Cuál es el isótopo que se usa para datar restos arqueológicos orgánicos?",
          op: ["¹⁴C", "¹²C", "¹³¹I", "²³⁵U"], ok: 0,
          porque: "El carbono-14 (T½ = 5 730 años) se incorpora a los seres vivos y deja de renovarse al morir." },
        { q: "Los iones Na⁺, Mg²⁺ y F⁻ son…",
          op: ["isoelectrónicos (10 e⁻)", "isótopos", "isóbaros", "isótonos"], ok: 0,
          porque: "Na⁺: 11 − 1 = 10; Mg²⁺: 12 − 2 = 10; F⁻: 9 + 1 = 10." }
      ]
    },
    tj1: {
      titulo: "Estructura atómica y sistema periódico",
      cartas: [
        { a: "Notación del átomo", b: "<sup>A</sup><sub>Z</sub>X<sup>q</sup>: p = Z · n = A − Z · e = Z − q." },
        { a: "Isótopos, isóbaros, isótonos, isoelectrónicos", b: "Isótopos: igual Z. Isóbaros: igual A. Isótonos: igual nº de neutrones. Isoelectrónicos: igual nº de electrones." },
        { a: "Masa atómica media", b: "M̄ = Σ (masa isotópica × abundancia/100). Es una media ponderada, no la masa de un átomo real." },
        { a: "Semivida y desintegración", b: "N = N₀·(½)^(t/T). Tras n semividas queda 1/2ⁿ de la muestra." },
        { a: "Números cuánticos", b: "n = 1, 2, 3… · l = 0…n−1 · m<sub>l</sub> = −l…+l · m<sub>s</sub> = ±½. Nivel n: n² orbitales, 2n² electrones." },
        { a: "Capacidades de los subniveles", b: "s: 1 orbital (2 e⁻) · p: 3 (6 e⁻) · d: 5 (10 e⁻) · f: 7 (14 e⁻)." },
        { a: "Orden de llenado", b: "1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p (regla n + l)." },
        { a: "Reglas de llenado", b: "Aufbau (mínima energía) · Pauli (máx. 2 e⁻ por orbital, espines opuestos) · Hund (uno en cada orbital antes de aparear)." },
        { a: "Excepciones", b: "Cr: [Ar] 4s¹ 3d⁵ · Cu: [Ar] 4s¹ 3d¹⁰ (subnivel d semilleno o lleno). Los cationes pierden primero los electrones de mayor n." },
        { a: "Posición en la tabla", b: "Periodo = n máximo. Grupo: s → nº de e⁻ en ns · p → 10 + (ns + np) · d → ns + (n−1)d." },
        { a: "Carga nuclear efectiva", b: "Z<sub>ef</sub> = Z − S (Slater: 0,35 misma capa · 0,85 capa n−1 · 1,00 capas inferiores)." },
        { a: "Radio atómico", b: "Aumenta hacia abajo y hacia la izquierda. Catión &lt; átomo &lt; anión. Isoelectrónicos: menor al aumentar Z." },
        { a: "Energía de ionización", b: "Aumenta hacia arriba y hacia la derecha. Excepciones: Be &gt; B y N &gt; O. Salto brusco tras los electrones de valencia." },
        { a: "Electronegatividad", b: "Aumenta hacia arriba y hacia la derecha. F = 3,98 (máxima). Base del tipo de enlace." },
        { a: "Modelo de Bohr", b: "E<sub>n</sub> = −13,6/n² eV · 1/λ = R<sub>H</sub>(1/n<sub>f</sub>² − 1/n<sub>i</sub>²) · ΔE = hν = hc/λ." },
        { a: "De Broglie e incertidumbre", b: "λ = h/(m·v) · Δx·Δp ≥ h/4π." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "a1", nivel: 1,
      enunciado: "El cloro-37 es un isótopo del cloro (Z = 17). ¿Cuántos neutrones tiene?",
      check: { tipo: "num", etiqueta: "Neutrones =", valor: 20 },
      pistas: ["El 37 es el número másico A = Z + N."],
      pasos: ["N = A − Z = 37 − 17 = 20."],
      resultado: "20 neutrones" },
    { id: "a2", nivel: 1,
      enunciado: "Indica el número de protones, neutrones y electrones del ion <sup>56</sup><sub>26</sub>Fe³⁺.",
      check: [{ tipo: "num", etiqueta: "Protones =", valor: 26 }, { tipo: "num", etiqueta: "Neutrones =", valor: 30 }, { tipo: "num", etiqueta: "Electrones =", valor: 23 }],
      pistas: ["p = Z; n = A − Z; en un catión de carga +3 faltan 3 electrones."],
      pasos: ["p = Z = 26.", "n = 56 − 26 = 30.", "e = 26 − 3 = 23."],
      resultado: "26 p · 30 n · 23 e" },
    { id: "a3", nivel: 1,
      enunciado: "Escribe la configuración electrónica del azufre (Z = 16). ¿Cuántos electrones hay en el subnivel 3p?",
      check: { tipo: "num", etiqueta: "e⁻ en 3p =", valor: 4 },
      pistas: ["1s² 2s² 2p⁶ 3s² y el resto en 3p."],
      pasos: ["16 e⁻: 1s² (2) 2s² (4) 2p⁶ (10) 3s² (12) 3p⁴ (16).", "En 3p hay 4 electrones."],
      resultado: "1s² 2s² 2p⁶ 3s² 3p⁴ → 4 electrones en 3p" },
    { id: "a4", nivel: 1,
      enunciado: "¿Qué pareja está formada por isótopos?",
      check: { tipo: "opcion", etiqueta: "Isótopos:", opciones: ["¹²C y ¹⁴C", "¹⁴C y ¹⁴N", "Na⁺ y Ne", "¹³C y ¹⁴N"], ok: 0 },
      pistas: ["Isótopos: mismo número atómico Z, distinto número másico A."],
      pasos: ["¹²C y ¹⁴C: Z = 6 en ambos y A distinto → isótopos.", "¹⁴C y ¹⁴N tienen el mismo A (isóbaros); Na⁺ y Ne tienen 10 e⁻ (isoelectrónicos); ¹³C y ¹⁴N tienen 7 neutrones (isótonos)."],
      resultado: "¹²C y ¹⁴C" },
    { id: "a5", nivel: 1,
      enunciado: "¿Cuántos electrones de valencia tiene el fósforo (Z = 15)?",
      check: { tipo: "num", etiqueta: "e⁻ de valencia =", valor: 5 },
      pistas: ["Configuración: [Ne] 3s² 3p³. Cuenta los de la capa más externa."],
      pasos: ["P: 1s² 2s² 2p⁶ 3s² 3p³. Capa n = 3: 2 + 3 = 5 electrones (grupo 15)."],
      resultado: "5" },
    { id: "a6", nivel: 1,
      enunciado: "Sitúa en la tabla periódica el elemento de Z = 19: indica periodo y grupo.",
      check: [{ tipo: "num", etiqueta: "Periodo =", valor: 4 }, { tipo: "num", etiqueta: "Grupo =", valor: 1 }],
      pistas: ["Configuración: [Ar] 4s¹."],
      pasos: ["Z = 19: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹. Mayor n = 4 → periodo 4; un electrón en 4s → grupo 1 (potasio)."],
      resultado: "periodo 4, grupo 1 (K)" },
    { id: "a7", nivel: 1,
      enunciado: "De los elementos Na, Mg, Al y Cl (todos del periodo 3), ¿cuál tiene el menor radio atómico?",
      check: { tipo: "opcion", etiqueta: "Menor radio:", opciones: ["Na", "Mg", "Al", "Cl"], ok: 3 },
      pistas: ["En un periodo el radio disminuye hacia la derecha."],
      pasos: ["Al avanzar en el periodo aumenta la carga nuclear efectiva y la capa externa se contrae: Na 166 &gt; Mg 141 &gt; Al 121 &gt; Cl 102 pm."],
      resultado: "Cl" },
    { id: "a8", nivel: 1,
      enunciado: "¿Qué carga (en valor absoluto) tendrá el ion más estable del magnesio (Z = 12)?",
      check: { tipo: "num", etiqueta: "Carga =", valor: 2 },
      pistas: ["Mg: [Ne] 3s². ¿Cuántos electrones pierde para quedar como el neón?"],
      pasos: ["Pierde los 2 electrones de 3s y queda con la configuración del Ne: Mg²⁺."],
      resultado: "+2 (Mg²⁺)" },
    { id: "a9", nivel: 1,
      enunciado: "¿Cuántos electrones caben como máximo en un subnivel d?",
      check: { tipo: "num", etiqueta: "e⁻ =", valor: 10 },
      pistas: ["Un subnivel d tiene 2l + 1 orbitales con l = 2."],
      pasos: ["2·2 + 1 = 5 orbitales y 2 electrones por orbital: 10 electrones."],
      resultado: "10" },
    { id: "a10", nivel: 1,
      enunciado: "Un elemento tiene dos isótopos: de masa 63 u (70 %) y de masa 65 u (30 %). Calcula su masa atómica media (en u).",
      check: { tipo: "num", etiqueta: "Masa media =", valor: 63.6 },
      pistas: ["M̄ = Σ masa·abundancia/100."],
      pasos: ["M̄ = 63·0,70 + 65·0,30 = 44,1 + 19,5 = 63,6 u."],
      resultado: "63,6 u" },
    { id: "a11", nivel: 1,
      enunciado: "¿Cuántos orbitales hay en el nivel n = 3?",
      check: { tipo: "num", etiqueta: "Orbitales =", valor: 9 },
      pistas: ["Un nivel n tiene n² orbitales."],
      pasos: ["n = 3 → 3s (1) + 3p (3) + 3d (5) = 9 = 3²."],
      resultado: "9 orbitales (18 electrones como máximo)" },
    { id: "a12", nivel: 1,
      enunciado: "¿Cuál de estas especies es isoelectrónica con el argón (Z = 18)?",
      check: { tipo: "opcion", etiqueta: "Isoelectrónico:", opciones: ["Cl⁻", "Cl", "F⁻", "Na⁺"], ok: 0 },
      pistas: ["El argón tiene 18 electrones."],
      pasos: ["Cl⁻: 17 + 1 = 18 e⁻ ✓. Cl: 17. F⁻: 10. Na⁺: 10."],
      resultado: "Cl⁻" },

    // ================= ★★ medio =================
    { id: "a13", nivel: 2,
      enunciado: "Para el ion Fe³⁺ (Z = 26) indica cuántos electrones hay en el subnivel 3d y cuántos están desapareados.",
      check: [{ tipo: "num", etiqueta: "e⁻ en 3d =", valor: 5 }, { tipo: "num", etiqueta: "Desapareados =", valor: 5 }],
      pistas: ["Fe: [Ar] 4s² 3d⁶. El catión pierde primero los 4s."],
      pasos: ["Fe³⁺ pierde 2 electrones 4s y 1 electrón 3d: [Ar] 3d⁵.", "3d⁵: ↑ ↑ ↑ ↑ ↑ → 5 desapareados (Hund)."],
      resultado: "5 en 3d y 5 desapareados" },
    { id: "a14", nivel: 2,
      enunciado: "El cromo (Z = 24) es una excepción en el llenado. ¿Cuántos electrones tiene en el subnivel 4s y en el 3d?",
      check: [{ tipo: "num", etiqueta: "e⁻ en 4s =", valor: 1 }, { tipo: "num", etiqueta: "e⁻ en 3d =", valor: 5 }],
      pistas: ["El subnivel d semilleno es especialmente estable."],
      pasos: ["La configuración esperada [Ar] 4s² 3d⁴ pasa a [Ar] 4s¹ 3d⁵."],
      resultado: "4s¹ y 3d⁵" },
    { id: "a15", nivel: 2,
      enunciado: "Un elemento tiene Z = 33. Indica su grupo y su número de electrones de valencia.",
      check: [{ tipo: "num", etiqueta: "Grupo =", valor: 15 }, { tipo: "num", etiqueta: "e⁻ de valencia =", valor: 5 }],
      pistas: ["[Ar] 4s² 3d¹⁰ 4p³."],
      pasos: ["Configuración: [Ar] 4s² 3d¹⁰ 4p³. Capa externa n = 4: 2 + 3 = 5 electrones.", "Bloque p: grupo = 10 + 5 = 15 (arsénico)."],
      resultado: "grupo 15; 5 e⁻ de valencia" },
    { id: "a16", nivel: 2,
      enunciado: "Un átomo neutro tiene la configuración [Ar] 4s² 3d¹⁰ 4p². ¿Cuál es su número atómico?",
      check: { tipo: "num", etiqueta: "Z =", valor: 32 },
      pistas: ["[Ar] son 18 electrones."],
      pasos: ["18 + 2 + 10 + 2 = 32: germanio."],
      resultado: "Z = 32 (Ge)" },
    { id: "a17", nivel: 2,
      enunciado: "El magnesio natural tiene tres isótopos: ²⁴Mg (23,985 u; 78,99 %), ²⁵Mg (24,986 u; 10,00 %) y ²⁶Mg (25,983 u; 11,01 %). Calcula su masa atómica media.",
      check: { tipo: "num", etiqueta: "Masa media (u) =", valor: 24.305 },
      pistas: ["Media ponderada con las tres abundancias."],
      pasos: ["M̄ = 23,985·0,7899 + 24,986·0,1000 + 25,983·0,1101 = 18,946 + 2,499 + 2,861 = 24,305 u."],
      resultado: "24,305 u" },
    { id: "a18", nivel: 2,
      enunciado: "El bromo tiene dos isótopos: ⁷⁹Br (78,92 u) y ⁸¹Br (80,92 u). Su masa atómica es 79,90 u. ¿Qué porcentaje de ⁷⁹Br hay?",
      check: { tipo: "num", etiqueta: "% de ⁷⁹Br =", valor: 51 },
      pistas: ["Si x es la fracción de ⁷⁹Br, la de ⁸¹Br es 1 − x."],
      pasos: ["79,90 = 78,92x + 80,92(1 − x) = 80,92 − 2,00x → x = 1,02/2,00 = 0,51."],
      resultado: "51 %" },
    { id: "a19", nivel: 2,
      enunciado: "Calcula la longitud de onda (en nm) del fotón emitido cuando el electrón del hidrógeno pasa de n = 3 a n = 2 (R<sub>H</sub> = 1,097·10⁷ m⁻¹).",
      check: { tipo: "num", etiqueta: "λ (nm) =", valor: 656.3 },
      pistas: ["1/λ = R<sub>H</sub>(1/n<sub>f</sub>² − 1/n<sub>i</sub>²)."],
      pasos: ["1/λ = 1,097·10⁷·(1/4 − 1/9) = 1,524·10⁶ m⁻¹.", "λ = 6,563·10⁻⁷ m = 656,3 nm (rojo)."],
      resultado: "656,3 nm" },
    { id: "a20", nivel: 2,
      enunciado: "Calcula la energía de un fotón de 656 nm, en unidades de 10⁻¹⁹ J (h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s).",
      check: { tipo: "num", etiqueta: "E (·10⁻¹⁹ J) =", valor: 3.03 },
      pistas: ["E = hc/λ. Pasa λ a metros."],
      pasos: ["E = 6,626·10⁻³⁴·3,00·10⁸/656·10⁻⁹ = 3,03·10⁻¹⁹ J."],
      resultado: "3,03·10⁻¹⁹ J" },
    { id: "a21", nivel: 2,
      enunciado: "La energía de ionización del hidrógeno es 13,6 eV por átomo. Exprésala en kJ/mol (1 eV = 1,602·10⁻¹⁹ J; N<sub>A</sub> = 6,022·10²³).",
      check: { tipo: "num", etiqueta: "EI (kJ/mol) =", valor: 1312 },
      pistas: ["Pasa eV a J por átomo y multiplica por N<sub>A</sub>."],
      pasos: ["13,6·1,602·10⁻¹⁹ = 2,179·10⁻¹⁸ J/átomo.", "·6,022·10²³ = 1,312·10⁶ J/mol = 1 312 kJ/mol."],
      resultado: "1 312 kJ/mol" },
    { id: "a22", nivel: 2,
      enunciado: "Con las reglas de Slater, calcula la carga nuclear efectiva sobre el electrón 3s del sodio (Z = 11).",
      check: { tipo: "num", etiqueta: "Z<sub>ef</sub> =", valor: 2.2 },
      pistas: ["Na: 1s² 2s² 2p⁶ 3s¹. Capa n−1 (8 e⁻): 0,85 cada uno; capa n−2 (2 e⁻): 1,00."],
      pasos: ["S = 8·0,85 + 2·1,00 = 8,8.", "Z<sub>ef</sub> = 11 − 8,8 = 2,2."],
      resultado: "2,2" },
    { id: "a23", nivel: 2,
      enunciado: "Calcula la carga nuclear efectiva sobre un electrón de valencia del cloro (Z = 17).",
      check: { tipo: "num", etiqueta: "Z<sub>ef</sub> =", valor: 6.1 },
      pistas: ["Cl: 1s² 2s² 2p⁶ 3s² 3p⁵. Misma capa: 6 electrones (0,35 cada uno)."],
      pasos: ["S = 6·0,35 + 8·0,85 + 2·1,00 = 2,1 + 6,8 + 2 = 10,9.", "Z<sub>ef</sub> = 17 − 10,9 = 6,1."],
      resultado: "6,1" },
    { id: "a24", nivel: 2,
      enunciado: "¿Cuál de los dos tiene mayor primera energía de ionización, el boro (Z = 5) o el berilio (Z = 4)?",
      check: { tipo: "opcion", etiqueta: "Mayor EI₁:", opciones: ["Be", "B", "Son iguales", "No se puede decidir"], ok: 0 },
      pistas: ["Fíjate en el orbital del que sale el electrón."],
      pasos: ["Be: 2s² (900 kJ/mol); B: 2s² 2p¹ (801 kJ/mol). El electrón 2p del boro está más alto en energía y más apantallado: cuesta menos arrancarlo."],
      resultado: "Be (excepción a la tendencia)" },
    { id: "a25", nivel: 2,
      enunciado: "Las cuatro primeras energías de ionización de un elemento son 738, 1 451, 7 733 y 10 543 kJ/mol. ¿Cuántos electrones de valencia tiene?",
      check: { tipo: "num", etiqueta: "e⁻ de valencia =", valor: 2 },
      pistas: ["Busca el mayor salto entre valores consecutivos."],
      pasos: ["1 451/738 = 2,0 · 7 733/1 451 = 5,3 · 10 543/7 733 = 1,4.", "El salto grande está tras la 2.ª: 2 electrones de valencia (magnesio, grupo 2)."],
      resultado: "2" },
    { id: "a26", nivel: 2,
      enunciado: "¿Cuántos electrones de un átomo pueden tener los números cuánticos n = 4 y l = 2?",
      check: { tipo: "num", etiqueta: "e⁻ =", valor: 10 },
      pistas: ["n = 4, l = 2 es el subnivel 4d."],
      pasos: ["m<sub>l</sub> toma 5 valores (−2…+2) y m<sub>s</sub> 2 valores: 5·2 = 10 electrones."],
      resultado: "10" },
    { id: "a27", nivel: 2,
      enunciado: "Uno de estos conjuntos (n, l, m<sub>l</sub>, m<sub>s</sub>) no es posible. ¿Cuál?",
      check: { tipo: "opcion", etiqueta: "Imposible:", opciones: ["(3, 1, −1, +½)", "(2, 2, 0, +½)", "(4, 0, 0, −½)", "(3, 2, 2, −½)"], ok: 1 },
      pistas: ["Recuerda: l va de 0 a n − 1 y m<sub>l</sub> de −l a +l."],
      pasos: ["(2, 2, 0, +½): con n = 2, l no puede ser 2.", "Los demás cumplen todas las condiciones."],
      resultado: "(2, 2, 0, +½)" },
    { id: "a28", nivel: 2,
      enunciado: "En un resto orgánico queda el 25 % del carbono-14 original. ¿Cuántos años tiene? (T<sub>½</sub> = 5 730 años)",
      check: { tipo: "num", etiqueta: "t (años) =", valor: 11460 },
      pistas: ["25 % = (½)²."],
      pasos: ["25 % = 1/4 = (1/2)² → 2 semividas → 2·5 730 = 11 460 años."],
      resultado: "11 460 años" },
    { id: "a29", nivel: 2,
      enunciado: "¿Cuántos electrones desapareados tiene el ion Mn²⁺ (Z = 25)?",
      check: { tipo: "num", etiqueta: "Desapareados =", valor: 5 },
      pistas: ["Mn: [Ar] 4s² 3d⁵. Pierde los dos 4s."],
      pasos: ["Mn²⁺ = [Ar] 3d⁵ → ↑ ↑ ↑ ↑ ↑ → 5 desapareados."],
      resultado: "5" },
    { id: "a30", nivel: 2,
      enunciado: "Entre los iones O²⁻, F⁻, Na⁺ y Mg²⁺, ¿cuál tiene el mayor radio?",
      check: { tipo: "opcion", etiqueta: "Mayor radio:", opciones: ["O²⁻", "F⁻", "Na⁺", "Mg²⁺"], ok: 0 },
      pistas: ["Son isoelectrónicos (10 e⁻). Compara el número de protones."],
      pasos: ["Con los mismos electrones, a menor Z menor atracción y mayor radio: O²⁻ (8 p, 140 pm) &gt; F⁻ (133) &gt; Na⁺ (102) &gt; Mg²⁺ (72)."],
      resultado: "O²⁻" },

    // ================= ★★★ avanzado =================
    { id: "a31", nivel: 3,
      enunciado: "El cobre tiene dos isótopos, ⁶³Cu (62,93 u) y ⁶⁵Cu (64,93 u), y su masa atómica es 63,55 u. Calcula el porcentaje de ⁶⁵Cu.",
      check: { tipo: "num", etiqueta: "% de ⁶⁵Cu =", valor: 31 },
      pistas: ["x = fracción de ⁶⁵Cu: 63,55 = 62,93(1 − x) + 64,93x."],
      pasos: ["63,55 = 62,93 + 2,00x → x = 0,62/2,00 = 0,31."],
      resultado: "31 %" },
    { id: "a32", nivel: 3,
      enunciado: "Calcula la longitud de onda (en nm) de la raya de la serie de Balmer que corresponde a la transición n = 5 → n = 2 del hidrógeno.",
      check: { tipo: "num", etiqueta: "λ (nm) =", valor: 434.1 },
      pistas: ["1/λ = 1,097·10⁷(1/4 − 1/25)."],
      pasos: ["1/4 − 1/25 = 0,21 → 1/λ = 2,304·10⁶ m⁻¹.", "λ = 4,341·10⁻⁷ m = 434,1 nm (violeta-azul)."],
      resultado: "434,1 nm" },
    { id: "a33", nivel: 3,
      enunciado: "¿Cuál es la longitud de onda (en nm) del límite de la serie de Lyman (n<sub>i</sub> → ∞, n<sub>f</sub> = 1)?",
      check: { tipo: "num", etiqueta: "λ (nm) =", valor: 91.2 },
      pistas: ["Con n<sub>i</sub> → ∞, 1/n<sub>i</sub>² = 0."],
      pasos: ["1/λ = R<sub>H</sub>·(1 − 0) = 1,097·10⁷ → λ = 9,116·10⁻⁸ m = 91,2 nm (ultravioleta)."],
      resultado: "91,2 nm" },
    { id: "a34", nivel: 3,
      enunciado: "¿Qué longitud de onda (en nm) debe tener el fotón que absorbe un átomo de hidrógeno para pasar de n = 2 a n = 4?",
      check: { tipo: "num", etiqueta: "λ (nm) =", valor: 486.2 },
      pistas: ["La energía absorbida es la misma que se emitiría en la transición inversa."],
      pasos: ["1/λ = 1,097·10⁷·(1/4 − 1/16) = 2,057·10⁶ m⁻¹ → λ = 486,2 nm (azul-verdoso)."],
      resultado: "486,2 nm" },
    { id: "a35", nivel: 3,
      enunciado: "Calcula la frecuencia, en unidades de 10¹⁴ Hz, de la raya roja de Balmer (656,3 nm). (c = 3,00·10⁸ m/s)",
      check: { tipo: "num", etiqueta: "ν (·10¹⁴ Hz) =", valor: 4.57 },
      pistas: ["ν = c/λ."],
      pasos: ["ν = 3,00·10⁸ / 656,3·10⁻⁹ = 4,571·10¹⁴ Hz."],
      resultado: "4,57·10¹⁴ Hz" },
    { id: "a36", nivel: 3,
      enunciado: "Explica por qué la primera energía de ionización del magnesio (738 kJ/mol) es mayor que la del sodio (496 kJ/mol) pero la del aluminio (578 kJ/mol) es menor que la del magnesio.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Sitúa los tres elementos en el periodo 3 y escribe sus configuraciones (Na 3s¹, Mg 3s², Al 3s² 3p¹)", p: 0.4 },
        { t: "Explica Na → Mg: aumenta la carga nuclear efectiva y el electrón sale de un orbital s más atraído", p: 0.5 },
        { t: "Explica Mg → Al: el electrón del Al sale de un orbital 3p, de mayor energía y más apantallado por los 3s²", p: 0.6 },
        { t: "Concluye que es una excepción a la tendencia general de crecimiento en el periodo", p: 0.3 }
      ] },
      pasos: ["Na (3s¹) → Mg (3s²): Z<sub>ef</sub> aumenta (2,2 → 2,85): EI sube.", "Mg → Al: el electrón que sale del Al está en 3p, más alejado y apantallado por 3s²; compensa el aumento de Z: EI baja.", "Excepción análoga: Be &gt; B."],
      resultado: "Excepción por el cambio de subnivel (s → p)" },
    { id: "a37", nivel: 3,
      enunciado: "Justifica que la configuración del cromo sea [Ar] 4s¹ 3d⁵ y no [Ar] 4s² 3d⁴.",
      check: { tipo: "rubrica", etiqueta: "Tu justificación", filas: 5, items: [
        { t: "Escribe la configuración esperada ([Ar] 4s² 3d⁴) y la real ([Ar] 4s¹ 3d⁵)", p: 0.5 },
        { t: "Dice que 4s y 3d tienen energías muy parecidas", p: 0.5 },
        { t: "Explica que el subnivel d semilleno (d⁵) es especialmente estable (seis electrones con el mismo espín: más energía de intercambio)", p: 0.7 },
        { t: "Cita la excepción análoga del cobre ([Ar] 4s¹ 3d¹⁰)", p: 0.3 }
      ] },
      pasos: ["La configuración esperada sería [Ar] 4s² 3d⁴, pero 4s y 3d están muy próximos en energía.", "Pasar un electrón del 4s al 3d da seis electrones desapareados con el mismo espín (4s¹ 3d⁵), que minimiza la repulsión y maximiza la energía de intercambio.", "Lo mismo ocurre con el cobre (3d¹⁰ lleno)."],
      resultado: "[Ar] 4s¹ 3d⁵: el subnivel d semilleno es más estable" },
    { id: "a38", nivel: 3,
      enunciado: "Explica por qué el radio de un catión es menor que el de su átomo neutro y el de un anión es mayor. Pon un ejemplo numérico.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Catión: pierde electrones (a menudo toda la capa externa) y los restantes sienten mayor carga nuclear efectiva", p: 0.6 },
        { t: "Anión: gana electrones con la misma carga nuclear: más repulsión electrónica y menos atracción por electrón", p: 0.6 },
        { t: "Ejemplo numérico correcto (Na 166 pm → Na⁺ 102 pm; Cl 102 pm → Cl⁻ 181 pm)", p: 0.4 }
      ] },
      pasos: ["Na (166 pm) pierde su capa 3s: queda con n = 2 (Na⁺, 102 pm).", "Cl (102 pm) gana un electrón en 3p: la repulsión mayor expande la nube (Cl⁻, 181 pm)."],
      resultado: "catión &lt; átomo &lt; anión" },
    { id: "a39", nivel: 3,
      enunciado: "Un elemento tiene tres capas electrónicas y dos electrones en la más externa. ¿Cuál es su número atómico?",
      check: { tipo: "num", etiqueta: "Z =", valor: 12 },
      pistas: ["Tres capas completas serían 2 + 8 + 2."],
      pasos: ["1.ª capa: 2; 2.ª: 8; 3.ª: 2 → Z = 12 (magnesio)."],
      resultado: "Z = 12 (Mg)" },
    { id: "a40", nivel: 3,
      enunciado: "Un átomo tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. Indica su número atómico, su periodo y su grupo.",
      check: [{ tipo: "num", etiqueta: "Z =", valor: 26 }, { tipo: "num", etiqueta: "Periodo =", valor: 4 }, { tipo: "num", etiqueta: "Grupo =", valor: 8 }],
      pistas: ["Suma los exponentes. Para el grupo de un elemento d: e⁻ en ns + e⁻ en (n−1)d."],
      pasos: ["2 + 2 + 6 + 2 + 6 + 2 + 6 = 26 → hierro.", "Mayor n = 4 → periodo 4. Grupo = 2 + 6 = 8."],
      resultado: "Z = 26 · periodo 4 · grupo 8 (Fe)" },
    { id: "a41", nivel: 3,
      enunciado: "Las dos primeras energías de ionización del magnesio son 738 y 1 451 kJ/mol. Calcula la energía (en kJ) necesaria para convertir 1 mol de átomos de Mg(g) en Mg²⁺(g).",
      check: { tipo: "num", etiqueta: "E (kJ) =", valor: 2189 },
      pistas: ["Hay que arrancar el primero y el segundo electrón."],
      pasos: ["E = EI₁ + EI₂ = 738 + 1 451 = 2 189 kJ."],
      resultado: "2 189 kJ" },
    { id: "a42", nivel: 3,
      enunciado: "Calcula, en eV, la energía mínima que hay que comunicar a un átomo de hidrógeno que ya está en el nivel n = 2 para ionizarlo.",
      check: { tipo: "num", etiqueta: "E (eV) =", valor: 3.4 },
      pistas: ["E<sub>n</sub> = −13,6/n² eV; ionizar es llegar a E = 0."],
      pasos: ["E₂ = −13,6/4 = −3,40 eV → hay que dar 3,40 eV."],
      resultado: "3,40 eV" },
    { id: "a43", nivel: 3,
      enunciado: "Calcula la carga nuclear efectiva de un electrón de valencia del aluminio con las reglas de Slater y explica cómo permite justificar que su radio sea menor que el del sodio.",
      check: { tipo: "rubrica", etiqueta: "Tu resolución", filas: 6, items: [
        { t: "Configuración del Al: 1s² 2s² 2p⁶ 3s² 3p¹", p: 0.3 },
        { t: "Apantallamiento: 2·0,35 (otros de la misma capa) + 8·0,85 + 2·1,00 = 9,5", p: 0.6 },
        { t: "Z<sub>ef</sub> = 13 − 9,5 = 3,5 (frente a 2,2 en el Na)", p: 0.4 },
        { t: "Concluye que con mayor Z<sub>ef</sub> la nube se contrae: radio menor", p: 0.4 }
      ] },
      pasos: ["S = 2·0,35 + 8·0,85 + 2·1,00 = 0,7 + 6,8 + 2 = 9,5.", "Z<sub>ef</sub> = 3,5 &gt; 2,2 (Na): el núcleo atrae más y el radio del Al (121 pm) es menor que el del Na (166 pm)."],
      resultado: "Z<sub>ef</sub>(Al) = 3,5" },
    { id: "a44", nivel: 3,
      enunciado: "El neón natural contiene ²⁰Ne (19,992 u; 90,48 %), ²¹Ne (20,994 u; 0,27 %) y ²²Ne (21,991 u; 9,25 %). Calcula su masa atómica media (en u).",
      check: { tipo: "num", etiqueta: "Masa media (u) =", valor: 20.18 },
      pistas: ["Media ponderada con las tres abundancias."],
      pasos: ["M̄ = 19,992·0,9048 + 20,994·0,0027 + 21,991·0,0925 = 18,089 + 0,057 + 2,034 = 20,18 u."],
      resultado: "20,18 u" },
    { id: "a45", nivel: 3,
      enunciado: "Calcula la longitud de onda de De Broglie, en nm, de un electrón (m = 9,109·10⁻³¹ kg) que se mueve a 1,0·10⁶ m/s (h = 6,626·10⁻³⁴ J·s).",
      check: { tipo: "num", etiqueta: "λ (nm) =", valor: 0.727 },
      pistas: ["λ = h/(m·v)."],
      pasos: ["λ = 6,626·10⁻³⁴/(9,109·10⁻³¹·1,0·10⁶) = 7,27·10⁻¹⁰ m = 0,727 nm."],
      resultado: "0,727 nm" },
    { id: "a46", nivel: 3,
      enunciado: "Si la posición de un electrón se conoce con una incertidumbre de 1·10⁻¹⁰ m, ¿cuál es la incertidumbre mínima de su velocidad? Da la respuesta en unidades de 10⁵ m/s (Δx·Δp ≥ h/4π, m = 9,109·10⁻³¹ kg).",
      check: { tipo: "num", etiqueta: "Δv (·10⁵ m/s) =", valor: 5.79 },
      pistas: ["Δp = m·Δv."],
      pasos: ["Δv ≥ 5,27·10⁻³⁵/(9,109·10⁻³¹·10⁻¹⁰) = 5,79·10⁵ m/s."],
      resultado: "5,8·10⁵ m/s" },
    { id: "a47", nivel: 3,
      enunciado: "Se administran 200 mg de yodo-131 (T<sub>½</sub> = 8,02 días). ¿Cuántos mg quedan a los 16,04 días?",
      check: { tipo: "num", etiqueta: "Queda (mg) =", valor: 50 },
      pistas: ["¿Cuántas semividas son 16,04 días?"],
      pasos: ["16,04/8,02 = 2 semividas → 200·(½)² = 50 mg."],
      resultado: "50 mg" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Partículas y notación del átomo",
      tabla: { cab: ["Partícula", "Carga", "Masa (u)"], filas: [["protón", "+1", "1,0073"], ["neutrón", "0", "1,0087"], ["electrón", "−1", "0,00055"]] },
      items: [
        { label: "Notación", formula: "<sup>A</sup><sub>Z</sub>X<sup>q</sup>", cuando: "p = Z · n = A − Z · e = Z − q", ejemplo: "⁵⁶Fe³⁺ → 26 p, 30 n, 23 e" }
      ],
      nota: "1 u = 1,6605·10⁻²⁷ kg · e = 1,602·10⁻¹⁹ C" },
    { titulo: "Isótopos y masa atómica",
      items: [
        { label: "Isótopos", formula: "mismo Z, distinto A", cuando: "Misma química, distinta masa." },
        { label: "Masa atómica media", formula: "M̄ = Σ masa<sub>i</sub>·ab<sub>i</sub>/100", ejemplo: "Cl: 34,969·0,7576 + 36,966·0,2424 = 35,45 u" },
        { label: "Dos isótopos, M̄ conocida", formula: "M̄ = m₁x + m₂(1 − x)", cuando: "Despeja x." },
        { label: "Desintegración", formula: "N = N₀(½)<sup>t/T</sup>", ejemplo: "¹⁴C: 25 % → 2 semividas = 11 460 años" }
      ] },
    { titulo: "Números cuánticos y orbitales", ancha: true,
      tabla: { cab: ["Número", "Valores", "Informa de"], filas: [["n", "1, 2, 3…", "nivel y tamaño"], ["l", "0 … n−1  (s, p, d, f)", "forma del orbital"], ["m<sub>l</sub>", "−l … +l", "orientación"], ["m<sub>s</sub>", "±½", "espín"]] },
      nota: "s: 1 orbital (2 e⁻) · p: 3 (6) · d: 5 (10) · f: 7 (14) · nivel n: n² orbitales, 2n² electrones." },
    { titulo: "Configuración electrónica",
      pasos: ["Cuenta los electrones (Z − q).", "Orden: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s…", "Pauli: máx. 2 e⁻ por orbital (↑↓). Hund: uno en cada orbital antes de aparear.", "Excepciones: Cr [Ar]4s¹3d⁵ y Cu [Ar]4s¹3d¹⁰.", "Cationes: pierden primero los e⁻ de mayor n (4s antes que 3d)."],
      nota: "Aniones: añaden electrones en el orden normal (Cl⁻ = [Ar])." },
    { titulo: "Tabla periódica: posición y grupos", ancha: true,
      tabla: { cab: ["Grupo", "Nombre", "Config. externa", "Ion"], filas: [["1", "alcalinos", "ns¹", "+1"], ["2", "alcalinotérreos", "ns²", "+2"], ["13", "térreos", "ns²np¹", "+3"], ["15", "nitrogenoideos", "ns²np³", "−3"], ["16", "anfígenos", "ns²np⁴", "−2"], ["17", "halógenos", "ns²np⁵", "−1"], ["18", "gases nobles", "ns²np⁶", "—"]] },
      nota: "Periodo = n máximo. Grupo: s → e⁻ en ns · p → 10 + (ns + np) · d → ns + (n−1)d." },
    { titulo: "Tendencias periódicas", ancha: true,
      tabla: { cab: ["Propiedad", "En un periodo (→)", "En un grupo (↓)"], filas: [["Radio atómico", "disminuye", "aumenta"], ["Energía de ionización", "aumenta", "disminuye"], ["Electronegatividad", "aumenta", "disminuye"], ["Carácter metálico", "disminuye", "aumenta"], ["Afinidad electrónica (en valor)", "aumenta (salvo irregularidades)", "disminuye (F &lt; Cl)"]] },
      nota: "Razón: Z<sub>ef</sub> = Z − S crece en el periodo; en el grupo crece el nº de capas. Irregularidades: Be &gt; B y N &gt; O en EI." },
    { titulo: "Radios iónicos e isoelectrónicos",
      items: [
        { label: "Catión", formula: "radio &lt; radio del átomo", ejemplo: "Na 166 → Na⁺ 102 pm" },
        { label: "Anión", formula: "radio &gt; radio del átomo", ejemplo: "Cl 102 → Cl⁻ 181 pm" },
        { label: "Isoelectrónicos", formula: "a mayor Z, menor radio", ejemplo: "O²⁻ &gt; F⁻ &gt; Na⁺ &gt; Mg²⁺ &gt; Al³⁺" }
      ] },
    { titulo: "Bohr y espectros",
      items: [
        { label: "Energía de los niveles", formula: "E<sub>n</sub> = −13,6/n² eV = −2,18·10⁻¹⁸/n² J" },
        { label: "Rydberg", formula: "1/λ = R<sub>H</sub>(1/n<sub>f</sub>² − 1/n<sub>i</sub>²)", ejemplo: "R<sub>H</sub> = 1,097·10⁷ m⁻¹" },
        { label: "Fotón", formula: "E = hν = hc/λ", ejemplo: "h = 6,626·10⁻³⁴ J·s · c = 3,00·10⁸ m/s" },
        { label: "Series", formula: "Lyman n<sub>f</sub>=1 (UV) · Balmer 2 (visible) · Paschen 3 (IR)" }
      ],
      nota: "n<sub>i</sub> &gt; n<sub>f</sub>: emite · n<sub>i</sub> &lt; n<sub>f</sub>: absorbe." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "A = N − Z", bien: "A = Z + N", por: "El número másico cuenta protones y neutrones." },
        { mal: "Fe²⁺ = [Ar] 4s² 3d⁴", bien: "Fe²⁺ = [Ar] 3d⁶", por: "El catión pierde primero los 4s." },
        { mal: "Cr = [Ar] 4s² 3d⁴", bien: "Cr = [Ar] 4s¹ 3d⁵", por: "Excepción: d semilleno." },
        { mal: "El anión es menor que su átomo", bien: "El anión es mayor", por: "Más repulsión, misma carga nuclear." },
        { mal: "La masa atómica 35,45 es la de un átomo de Cl", bien: "Es una media ponderada", por: "Los átomos pesan 34,97 u o 36,97 u." },
        { mal: "2d existe", bien: "El primer d es el 3d", por: "l ≤ n − 1." }
      ] }
  ];

  B.registrar("fyq1", "t1", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
