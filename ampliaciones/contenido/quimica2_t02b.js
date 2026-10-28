/* ============================================================
   Química II · ampliaciones · Tema 2: Estructura de la materia
   (parte B: secciones nuevas 5 a 9)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t2/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5
    {
      h: "5. Modelos atómicos: qué explicó cada uno y por qué se quedó corto",
      html: env(
        "<h5>Una historia de modelos que se corrigen</h5>" +
        "<p>Un modelo científico no es «verdadero o falso»: es <b>útil mientras explica los datos que se conocen</b>, y se sustituye cuando aparece un dato que no cuadra. Cada modelo atómico nace de un experimento que el anterior no podía explicar. En la EvAU suelen pedirte justo eso: <b>el hecho experimental</b> y <b>la limitación</b>.</p>" +
        tabla(["Modelo", "Qué propone", "Qué explica", "Qué no puede explicar"], [
          ["<b>Dalton</b> (1808)", "átomos esféricos, indivisibles e indestructibles; los de un elemento son iguales", "leyes ponderales (conservación de la masa, proporciones definidas y múltiples)", "la electricidad de la materia (rayos catódicos, electrólisis); isótopos"],
          ["<b>Thomson</b> (1904)", "«pudin de pasas»: esfera positiva con electrones incrustados (descubrió el electrón en 1897)", "que la materia es neutra y que existen partículas negativas; la ionización", "los resultados de Rutherford: no hay forma de que una esfera difusa desvíe mucho las partículas α"],
          ["<b>Rutherford</b> (1911)", "núcleo diminuto, positivo y muy denso, con los electrones girando a su alrededor (modelo planetario)", "la dispersión de partículas α: casi todas atraviesan la lámina de oro; unas pocas se desvían mucho o rebotan", "estabilidad (un electrón que gira emitiría radiación y caería al núcleo) y los espectros de líneas"],
          ["<b>Bohr</b> (1913)", "electrón en órbitas circulares con energía cuantizada; emite o absorbe un fotón al saltar entre ellas", "los espectros del hidrógeno (series de Lyman, Balmer, Paschen) y la estabilidad del átomo", "átomos con más de un electrón; intensidades y estructura fina de las líneas; la ruptura del principio de incertidumbre (supone órbitas definidas)"],
          ["<b>Cuántico</b> (1926 en adelante)", "el electrón se describe con una función de onda: orbitales (zonas de probabilidad) y cuatro números cuánticos", "todo lo anterior, los átomos polielectrónicos, la forma de los enlaces y la tabla periódica", "no es «incompleto» en Bachillerato; se perfecciona con la relatividad y el espín"]
        ], "q3t") +
        "<h5>El experimento de Rutherford en tres frases</h5>" +
        "<p>Geiger y Marsden bombardearon una lámina finísima de oro con partículas α (núcleos de helio, cargados +2) y observaron: <b>(1)</b> casi todas la atraviesan sin desviarse → el átomo es en su mayor parte <b>espacio vacío</b>; <b>(2)</b> unas pocas se desvían mucho → hay una <b>carga positiva concentrada</b> que las repele; <b>(3)</b> alguna (una de cada ~20 000) rebota hacia atrás → esa carga está en un <b>núcleo muy pequeño y muy masivo</b>. El radio del núcleo es del orden de 10⁻¹⁵ m, 100 000 veces menor que el del átomo (10⁻¹⁰ m).</p>" +
        ejemplo("Ejemplo resuelto: escala del átomo", "Si el núcleo fuese una canica de 1 cm de diámetro, ¿qué diámetro tendría el átomo a esa misma escala? (Núcleo ≈ 10⁻¹⁵ m de radio; átomo ≈ 10⁻¹⁰ m)", [
          "La razón átomo/núcleo = 10⁻¹⁰ / 10⁻¹⁵ = 10⁵ (da lo mismo con radios que con diámetros).",
          "A esa escala, el diámetro del átomo = 1 cm · 10⁵ = 10⁵ cm = <b>1 km</b>.",
          "Conclusión: el átomo es casi todo vacío, con un núcleo del tamaño de una canica en el centro de un campo de 1 km: eso encaja con que casi todas las partículas α atraviesen la lámina."
        ]) +
        "<h5>Cómo se enlazan los modelos con lo que viene</h5>" +
        "<p>La limitación de Rutherford (los espectros de líneas, la estabilidad) <b>empuja</b> a Bohr; la limitación de Bohr (solo vale para un electrón y viola la incertidumbre) <b>empuja</b> al modelo cuántico. Eso es lo que vas a recorrer en las secciones siguientes: primero los <b>espectros</b> (donde Bohr acierta), luego la <b>dualidad</b> (donde la idea de órbita falla) y, por último, los <b>orbitales</b> (el modelo actual, que ya has visto en las secciones 2 a 4).</p>" +
        w("clasificar", "modelos") +
        w("emparejar", "aportaciones") +
        ojo("Rutherford <b>no</b> descubrió el protón ni el electrón: descubrió el <b>núcleo</b>. Y Bohr <b>no</b> «explicó todos los átomos»: su modelo solo funciona para el hidrógeno y los iones con un solo electrón (He⁺, Li²⁺).")
      )
    },
    // ------------------------------------------------------------ 6
    {
      h: "6. Espectros y modelo de Bohr: energía, longitud de onda y frecuencia",
      html: env(
        "<h5>La luz como huella del átomo</h5>" +
        "<p>Un sólido incandescente emite un <b>espectro continuo</b> (todos los colores). Un gas de átomos excitado emite un <b>espectro de emisión de líneas</b>: solo algunas longitudes de onda, siempre las mismas para cada elemento. Si se hace pasar luz blanca por un gas frío, faltan justo esas líneas: es el <b>espectro de absorción</b>. Que haya líneas y no una banda continua significa que <b>la energía del átomo está cuantizada</b>: solo son posibles ciertos valores y el átomo solo puede emitir o absorber la diferencia entre dos de ellos.</p>" +
        "<h5>Los postulados de Bohr (hidrógeno)</h5>" +
        "<p><b>1.</b> El electrón se mueve en órbitas circulares sin emitir energía (órbitas estacionarias). <b>2.</b> Solo son posibles las órbitas cuyo momento angular es múltiplo de h/2π (esto cuantiza la energía). <b>3.</b> Al pasar de una órbita (nivel) a otra, el átomo emite o absorbe un fotón de energía igual a la diferencia:</p>" +
        "<div class='formula-wrap'><div class='formula'>ΔE = E<sub>i</sub> − E<sub>f</sub> = h·ν = " + fr("h·c", "λ") + "</div></div>" +
        "<p>La energía del nivel <i>n</i> del hidrógeno es <b>E<sub>n</sub> = −13,6 eV / n²</b> (= −2,18·10⁻¹⁸ J / n²). Es negativa porque el electrón está <em>ligado</em>: la energía cero corresponde al electrón libre (n → ∞). El nivel fundamental (n = 1) es el más bajo (−13,6 eV) y los niveles se acercan unos a otros cuanto mayor es n.</p>" +
        "<p>Para la longitud de onda se usa la <b>ecuación de Rydberg</b>, que resume todas las series:</p>" +
        "<div class='formula-wrap'><div class='formula'>" + fr("1", "λ") + " = R<sub>H</sub> · ( " + fr("1", "n<sub>f</sub>²") + " − " + fr("1", "n<sub>i</sub>²") + " )  &nbsp;(emisión: n<sub>i</sub> &gt; n<sub>f</sub>) &nbsp;·&nbsp; R<sub>H</sub> = 1,097·10⁷ m⁻¹</div></div>" +
        tabla(["Serie", "Nivel final n<sub>f</sub>", "Región", "Primera línea (λ)", "Límite de la serie (n<sub>i</sub> → ∞)"], [
          ["Lyman", "1", "ultravioleta", "121,5 nm (2 → 1)", "91,2 nm"],
          ["Balmer", "2", "visible (la única)", "656,3 nm (3 → 2), roja", "364,6 nm"],
          ["Paschen", "3", "infrarrojo", "1875 nm (4 → 3)", "820,4 nm"]
        ], "q3t") +
        "<p>Observa el widget: elige los niveles inicial y final, mira el salto en el diagrama de niveles y cómo aparece la línea en el espectro de la serie. Pulsa <em>Animar transición</em> para ver el fotón.</p>" +
        w("q1_bohr") +
        ejemplo("Ejemplo resuelto: una línea de Balmer", "Un electrón de un átomo de hidrógeno pasa del nivel n = 4 al n = 2. Calcula la energía y la longitud de onda del fotón emitido, su frecuencia y la región del espectro. (R<sub>H</sub> = 1,097·10⁷ m⁻¹; h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s)", [
          "Rydberg: 1/λ = 1,097·10⁷ · (1/2² − 1/4²) = 1,097·10⁷ · 0,1875 = 2,057·10⁶ m⁻¹ → <b>λ = 4,862·10⁻⁷ m = 486,2 nm</b> (azul-verdoso, <b>visible</b>).",
          "Frecuencia: ν = c/λ = 3,00·10⁸ / 4,862·10⁻⁷ = <b>6,17·10¹⁴ Hz</b>.",
          "Energía: E = hν = 6,626·10⁻³⁴ · 6,17·10¹⁴ = <b>4,09·10⁻¹⁹ J</b> = 4,09·10⁻¹⁹ / 1,602·10⁻¹⁹ = 2,55 eV.",
          "Comprobación con los niveles: E₄ − E₂ = −13,6/16 − (−13,6/4) = −0,85 + 3,40 = 2,55 eV ✓ (los dos caminos coinciden)."
        ]) +
        ejemplo("Ejemplo resuelto: energía de ionización", "Calcula la energía mínima, en eV y en kJ/mol, necesaria para arrancar el electrón de un átomo de hidrógeno en su estado fundamental, y la longitud de onda máxima de la luz capaz de hacerlo. (N<sub>A</sub> = 6,022·10²³)", [
          "Ionizar es pasar de n = 1 a n = ∞: ΔE = 0 − (−13,6) = <b>13,6 eV</b>.",
          "En julios: 13,6 · 1,602·10⁻¹⁹ = 2,18·10⁻¹⁸ J por átomo. Por mol: 2,18·10⁻¹⁸ · 6,022·10²³ = 1,312·10⁶ J/mol = <b>1312 kJ/mol</b> (el valor tabulado de la 1.ª energía de ionización del H).",
          "λ máxima: λ = hc/E = 6,626·10⁻³⁴ · 3,00·10⁸ / 2,18·10⁻¹⁸ = 9,12·10⁻⁸ m = <b>91,2 nm</b> (ultravioleta, el límite de Lyman). Con luz de mayor λ no se ioniza el átomo en reposo."
        ]) +
        "<h5>Absorción, emisión y cuántos saltos hay</h5>" +
        "<p>Absorber un fotón <b>sube</b> al electrón (n<sub>f</sub> &gt; n<sub>i</sub>); emitirlo lo <b>baja</b>. Un átomo excitado hasta el nivel <i>n</i> puede volver al fundamental por varios caminos (4 → 1, o 4 → 2 → 1, o 4 → 3 → 1…), y cada salto distinto emite una línea distinta. El número de líneas posibles desde el nivel <i>n</i> hasta el fundamental, contando todos los saltos entre cualquier par de niveles, es <b>n(n − 1)/2</b>: con n = 4 salen 6 líneas (4→3, 4→2, 4→1, 3→2, 3→1, 2→1).</p>" +
        "<h5>Iones hidrogenoides</h5>" +
        "<p>Si un ion tiene un solo electrón (He⁺, Li²⁺, Be³⁺), el modelo de Bohr sigue valiendo, pero la atracción es <i>Z</i> veces mayor y la energía se multiplica por <i>Z</i>²: <b>E<sub>n</sub> = −13,6 · Z² / n² eV</b>. Para el He⁺ (Z = 2), la energía de ionización es 13,6 · 4 = 54,4 eV, cuatro veces la del H.</p>" +
        ojo("(1) Usa <b>siempre metros</b> en Rydberg (1,097·10⁷ m⁻¹): da la λ en metros; pasa después a nm (×10⁹). (2) El orden de los niveles en la resta: n<sub>f</sub> es el <b>menor</b> en emisión. Si te sale un 1/λ negativo, has intercambiado los niveles. (3) El espectro de líneas de un átomo es único: se usa para <b>identificar elementos</b> en estrellas y en análisis.")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Efecto fotoeléctrico: la luz como fotones",
      html: env(
        "<h5>Lo que la física clásica no podía explicar</h5>" +
        "<p>Cuando la luz incide sobre una superficie metálica, ésta puede <b>emitir electrones</b> (fotoelectrones). Si la luz fuese una onda clásica, cabría esperar que más intensidad (más energía por segundo) arrancase más electrones y con más energía, y que una luz débil acabase por arrancarlos si se esperaba lo suficiente. El experimento dice lo contrario:</p>" +
        tabla(["Observación experimental", "Predicción clásica", "Explicación de Einstein (1905)"], [
          ["Hay una <b>frecuencia umbral ν₀</b>: por debajo, no se emiten electrones por intensa que sea la luz", "Basta con esperar o con más intensidad", "Un fotón entrega su energía hν a <b>un solo</b> electrón; si hν &lt; W (trabajo de extracción), no basta"],
          ["La emisión es <b>instantánea</b> (&lt; 10⁻⁹ s)", "Habría un retraso mientras se acumula energía", "El fotón actúa de golpe, no hay que acumular nada"],
          ["La <b>energía cinética máxima</b> crece con ν y <b>no depende de la intensidad</b>", "Dependería de la intensidad", "Ec = hν − W: solo depende de la frecuencia y del metal"],
          ["La <b>cantidad</b> de electrones (la corriente) es proporcional a la intensidad", "—", "Más intensidad = más fotones por segundo = más electrones, cada uno con la misma Ec"]
        ], "q3t") +
        "<h5>La ecuación</h5>" +
        "<div class='formula-wrap'><div class='formula'>h·ν = W + E<sub>c</sub> &nbsp; ⟹ &nbsp; E<sub>c</sub> = h·ν − W &nbsp;·&nbsp; W = h·ν₀ = " + fr("h·c", "λ₀") + "</div></div>" +
        "<p><b>W</b> (trabajo de extracción o función de trabajo) es la energía mínima para arrancar un electrón del metal y es una propiedad del metal (se da en eV o en J). <b>ν₀</b> y <b>λ₀</b> son la frecuencia y longitud de onda <b>umbral</b>: la luz con ν &lt; ν₀ (λ &gt; λ₀) no produce efecto. La energía cinética es máxima para los electrones más superficiales; los demás pierden energía extra al salir. Si se aplica una tensión de frenado V₀ que detiene a los más rápidos, e·V₀ = Ec.</p>" +
        "<p>Representa Ec frente a ν: sale <b>una recta de pendiente h</b> que corta el eje horizontal en ν₀ y el eje vertical en −W. Cambiar el metal desplaza la recta sin cambiar su pendiente (h es universal). Pruébalo con el widget: elige el metal y arrastra la longitud de onda; mueve la intensidad y comprueba que Ec no cambia.</p>" +
        w("qq2_fotoel") +
        ejemplo("Ejemplo resuelto: sodio con luz ultravioleta", "Se ilumina sodio (W = 2,3 eV) con luz de 300 nm. Calcula: (a) la energía del fotón; (b) la longitud de onda umbral; (c) la energía cinética máxima de los electrones, en eV y J; (d) su velocidad máxima. (h = 6,626·10⁻³⁴ J·s; c = 3,00·10⁸ m/s; e = 1,602·10⁻¹⁹ C; m<sub>e</sub> = 9,109·10⁻³¹ kg)", [
          "(a) E = hc/λ = 6,626·10⁻³⁴ · 3,00·10⁸ / 300·10⁻⁹ = 6,626·10⁻¹⁹ J = 4,14 eV.",
          "(b) W = 2,3 · 1,602·10⁻¹⁹ = 3,685·10⁻¹⁹ J → λ₀ = hc/W = 1,9878·10⁻²⁵ / 3,685·10⁻¹⁹ = 5,39·10⁻⁷ m = <b>539 nm</b> (luz verde). Como 300 nm &lt; 539 nm, sí hay efecto.",
          "(c) Ec = E − W = 4,14 − 2,3 = <b>1,84 eV</b> = 1,84 · 1,602·10⁻¹⁹ = <b>2,94·10⁻¹⁹ J</b>.",
          "(d) Ec = ½mv² → v = √(2 · 2,94·10⁻¹⁹ / 9,109·10⁻³¹) = <b>8,0·10⁵ m/s</b> (muy por debajo de c: no hay efectos relativistas)."
        ]) +
        ejemplo("Ejemplo resuelto: del experimento al trabajo de extracción", "Al iluminar un metal con luz de frecuencia 1,2·10¹⁵ Hz, los electrones emitidos salen con una energía cinética máxima de 3,1·10⁻¹⁹ J. Calcula el trabajo de extracción (en J y en eV), la frecuencia umbral y la longitud de onda umbral.", [
          "W = hν − Ec = 6,626·10⁻³⁴ · 1,2·10¹⁵ − 3,1·10⁻¹⁹ = 7,951·10⁻¹⁹ − 3,1·10⁻¹⁹ = <b>4,85·10⁻¹⁹ J</b> = 4,85·10⁻¹⁹ / 1,602·10⁻¹⁹ = 3,03 eV.",
          "ν₀ = W/h = 4,85·10⁻¹⁹ / 6,626·10⁻³⁴ = <b>7,32·10¹⁴ Hz</b> (menor que 1,2·10¹⁵ Hz ✓: hay emisión).",
          "λ₀ = c/ν₀ = 3,00·10⁸ / 7,32·10¹⁴ = 4,10·10⁻⁷ m = <b>410 nm</b> (violeta)."
        ]) +
        ejemplo("Ejemplo resuelto: ¿qué metales emiten con luz de 400 nm?", "Un fotón de 400 nm tiene E = 1240,8 / 400 = 3,10 eV (usa hc ≈ 1240,8 eV·nm). Decide qué metales de la tabla emiten y, para el que más electrones libere, calcula la Ec.", [
          "Compara E con W: Cs (2,1 eV) sí; Na (2,3) sí; Ca (2,9) sí; Zn (4,3), Cu (4,7) y Pt (5,6): <b>no</b> (3,10 &lt; W).",
          "Mayor Ec: la del metal con menor W, el cesio: Ec = 3,10 − 2,1 = <b>1,00 eV</b>.",
          "Si se aumenta 10 veces la intensidad, Zn, Cu y Pt <b>siguen sin emitir</b>: más fotones, pero cada uno con 3,10 eV, que no alcanza."
        ]) +
        ojo("(1) La intensidad <b>no</b> cambia la energía cinética, solo el número de electrones. (2) Un fotón da su energía a <b>un</b> electrón, no se reparte. (3) Convierte unidades: 1 eV = 1,602·10⁻¹⁹ J, y los nm a metros. (4) Si Ec sale negativa, no hay emisión: no se «toma» el valor absoluto.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Dualidad onda-corpúsculo y principio de incertidumbre",
      html: env(
        "<h5>De Broglie: si la luz es partícula, la materia es onda</h5>" +
        "<p>El efecto fotoeléctrico mostró que la luz, que se comporta como onda (difracción, interferencias), también se comporta como <b>partícula</b> (fotones de energía hν y cantidad de movimiento p = h/λ). En 1924 De Broglie propuso lo simétrico: <b>toda partícula con cantidad de movimiento p = m·v lleva asociada una onda de longitud</b></p>" +
        "<div class='formula-wrap'><div class='formula'>λ = " + fr("h", "p") + " = " + fr("h", "m · v") + "</div></div>" +
        "<p>Davisson y Germer confirmaron la idea en 1927: un haz de electrones difracta al atravesar un cristal, igual que los rayos X. En el átomo de Bohr, la onda del electrón es <b>estacionaria</b>: la órbita permitida cabe un número entero de longitudes de onda (2πr = nλ). Eso es justo la cuantización de Bohr deducida de otra manera.</p>" +
        "<p>Como m va en el denominador, la λ solo es apreciable para <b>partículas muy ligeras</b>. Mira la gráfica: cada recta es un objeto; sube la velocidad y la λ baja, pero hasta el electrón más rápido apenas llega al tamaño de un átomo, y una pelota o una persona quedan 20 órdenes de magnitud por debajo.</p>" +
        w("qq2_broglie") +
        ejemplo("Ejemplo resuelto: el electrón de Bohr y la pelota de tenis", "(a) Calcula la longitud de onda de un electrón que se mueve a 2,19·10⁶ m/s (la velocidad en la 1.ª órbita de Bohr) y compárala con el perímetro de esa órbita (radio 0,0529 nm). (b) Calcula la λ de una pelota de 57 g a 40 m/s.", [
          "(a) λ = h/(m·v) = 6,626·10⁻³⁴ / (9,109·10⁻³¹ · 2,19·10⁶) = 3,32·10⁻¹⁰ m = 0,332 nm.",
          "Perímetro de la órbita: 2πr = 2π · 0,0529 nm = 0,332 nm. <b>Coincide</b>: en la órbita de n = 1 cabe exactamente una longitud de onda.",
          "(b) λ = 6,626·10⁻³⁴ / (0,057 · 40) = <b>2,9·10⁻³⁴ m</b>, 10²⁴ veces menor que un átomo: es inmensurable, por eso una pelota no muestra comportamiento ondulatorio."
        ]) +
        ejemplo("Ejemplo resuelto: electrones acelerados con 100 V", "Un electrón parte del reposo y se acelera con una diferencia de potencial de 100 V. Calcula su longitud de onda y explica por qué se pueden observar con ellos difracciones en cristales.", [
          "La energía ganada es Ec = e·V = 1,602·10⁻¹⁹ · 100 = 1,602·10⁻¹⁷ J.",
          "Cantidad de movimiento: p = √(2·m·Ec) = √(2 · 9,109·10⁻³¹ · 1,602·10⁻¹⁷) = 5,40·10⁻²⁴ kg·m/s.",
          "λ = h/p = 6,626·10⁻³⁴ / 5,40·10⁻²⁴ = <b>1,23·10⁻¹⁰ m</b> (0,123 nm).",
          "Esa λ es del orden de la distancia entre átomos de un cristal (10⁻¹⁰ m), que actúa como red de difracción: por eso hay difracción de electrones (base del microscopio electrónico)."
        ]) +
        "<h5>Heisenberg: no se puede conocer todo a la vez</h5>" +
        "<p>El <b>principio de incertidumbre</b> dice que no es posible conocer simultáneamente, con precisión arbitraria, la <b>posición</b> y la <b>cantidad de movimiento</b> de una partícula. No es un fallo del instrumento: es una propiedad de la naturaleza ondulatoria de la materia.</p>" +
        "<div class='formula-wrap'><div class='formula'>Δx · Δp ≥ " + fr("h", "4π") + " &nbsp;(con Δp = m·Δv)</div></div>" +
        "<p>Consecuencia clave para el átomo: si se quisiera fijar la posición del electrón con una incertidumbre del tamaño del átomo (Δx ≈ 10⁻¹⁰ m), la incertidumbre en su velocidad sería enorme, y <b>la trayectoria (la órbita) deja de tener sentido</b>. Por eso el modelo de Bohr se sustituye por <b>orbitales</b>: no dicen dónde está el electrón, sino dónde es más probable encontrarlo.</p>" +
        ejemplo("Ejemplo resuelto: incertidumbre de un electrón y de una bala", "(a) Si la posición de un electrón de un átomo se conoce con una incertidumbre de 10⁻¹⁰ m, ¿cuál es la menor incertidumbre posible en su velocidad? Compárala con v = 2,2·10⁶ m/s. (b) Una bala de 10 g va a 300 m/s con Δv = 0,01 % de v: ¿cuál es la mínima Δx?", [
          "(a) Δv ≥ h / (4π · m · Δx) = 6,626·10⁻³⁴ / (4π · 9,109·10⁻³¹ · 10⁻¹⁰) = <b>5,8·10⁵ m/s</b>.",
          "Comparada con 2,2·10⁶ m/s, la incertidumbre es el 26 % de la velocidad: el electrón «no tiene» una velocidad definida a esa escala, y por eso no se puede hablar de órbita.",
          "(b) Δv = 0,01 % · 300 = 0,03 m/s; Δx ≥ h / (4π · m · Δv) = 6,626·10⁻³⁴ / (4π · 0,010 · 0,03) = <b>1,76·10⁻³¹ m</b>: muy inferior al tamaño de un núcleo. Para objetos macroscópicos la incertidumbre es despreciable."
        ]) +
        ojo("(1) En De Broglie la masa va en <b>kg</b> y la velocidad en m/s: una masa en gramos da un resultado 1000 veces mayor. (2) Δx·Δp ≥ h/4π no dice que no se pueda medir bien una sola magnitud, sino que <b>el producto de las dos incertidumbres</b> tiene un mínimo. (3) La dualidad vale para todo, pero λ solo se nota si es comparable al tamaño de los objetos con los que interacciona.")
      )
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Cómo se pregunta en la EvAU y cómo se responde",
      html: env(
        "<h5>Cinco tipos de pregunta que se repiten</h5>" +
        tabla(["Tipo", "Cómo suele venir", "Qué hacer"], [
          ["Números cuánticos", "«Indica razonadamente si son posibles estos conjuntos y a qué orbital corresponden»", "Comprueba l ≤ n − 1, |m<sub>l</sub>| ≤ l y m<sub>s</sub> = ±½; si es válido, nómbralo (n + letra)"],
          ["Configuración e iones", "«Escribe la configuración de X (Z) y de X<sup>n+</sup>; electrones desapareados; grupo y periodo»", "Cuenta electrones (Z − carga), llena por Aufbau con excepciones, dibuja las cajas del último subnivel"],
          ["Bohr y espectros", "«Calcula la λ (o E, ν) de la transición n<sub>i</sub> → n<sub>f</sub> del hidrógeno; ¿en qué región está?»", "Rydberg en metros; E = hc/λ; compara con 380–780 nm"],
          ["Efecto fotoeléctrico", "«Luz de λ sobre un metal de W o λ₀: ¿hay emisión? Ec, v, potencial de frenado»", "Compara E del fotón con W; Ec = E − W; v = √(2Ec/m)"],
          ["De Broglie e incertidumbre", "«λ asociada a un electrón/protón/pelota; ¿es observable?»", "λ = h/(mv) con m en kg; compara con el tamaño del átomo o del objeto"]
        ], "q3t") +
        "<h5>Tres respuestas modelo, completas</h5>" +
        ejemplo("Modelo de respuesta 1: números cuánticos", "Razona si son posibles los conjuntos (n, l, m<sub>l</sub>, m<sub>s</sub>): (a) (3, 2, −1, +½); (b) (2, 2, 0, −½); (c) (4, 1, 2, +½). Para los válidos, indica el orbital.", [
          "(a) l = 2 &lt; n = 3 ✓; −2 ≤ −1 ≤ 2 ✓; +½ ✓ → <b>posible</b>: orbital 3d.",
          "(b) l = 2 pero n = 2: l debe ser ≤ n − 1 = 1 → <b>imposible</b> (no existe el subnivel 2d).",
          "(c) l = 1 ≤ 3 ✓, pero m<sub>l</sub> = 2 &gt; l = 1 (solo −1, 0, +1) → <b>imposible</b>."
        ]) +
        ejemplo("Modelo de respuesta 2: de la configuración a lo que preguntan", "Un elemento tiene la configuración electrónica 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁷. Identifica el elemento, su grupo y periodo, indica los electrones desapareados del átomo neutro y del ion X³⁺.", [
          "Electrones: 2 + 2 + 6 + 2 + 6 + 2 + 7 = 27 → Z = 27: <b>cobalto</b>. Periodo 4 (mayor n); grupo 9 (2 + 7 = 9 electrones sobre el argón).",
          "Neutro: 3d⁷ → ↑↓ ↑↓ ↑ ↑ ↑ → <b>3 desapareados</b> (4s² está apareado).",
          "Co³⁺ (24 e⁻): pierde primero 4s² y luego un 3d → [Ar] 3d⁶ → ↑↓ ↑ ↑ ↑ ↑ → <b>4 desapareados</b>. Es paramagnético."
        ]) +
        ejemplo("Modelo de respuesta 3: combinar Bohr y fotoeléctrico", "La luz emitida por átomos de hidrógeno en la transición n = 3 → n = 1 incide sobre una lámina de cinc (W = 4,3 eV). ¿Se emiten electrones? Si es así, ¿con qué energía cinética máxima?", [
          "Energía del fotón: E = 13,6 · (1 − 1/9) = <b>12,09 eV</b> (λ = 102,6 nm, ultravioleta).",
          "Como 12,09 eV &gt; W = 4,3 eV: <b>sí</b> hay emisión.",
          "Ec = 12,09 − 4,3 = <b>7,79 eV</b> = 7,79 · 1,602·10⁻¹⁹ = 1,25·10⁻¹⁸ J.",
          "Esta mezcla de bloques es típica: el enunciado da la longitud de onda <em>sin decirlo</em>, y el primer paso es calcularla con Rydberg o con los niveles."
        ]) +
        "<h5>Antes de entregar</h5>" +
        "<ul><li>¿Todas las longitudes están en metros y las energías en J (o todas en eV)?</li>" +
        "<li>¿El signo de la energía tiene sentido (E<sub>n</sub> negativa; Ec positiva o no hay emisión)?</li>" +
        "<li>¿La configuración suma Z (o Z − carga) y respeta las excepciones Cr y Cu?</li>" +
        "<li>¿Has justificado en una frase la regla usada (Pauli, Hund, Aufbau, postulado de Bohr)? En la EvAU se puntúa el razonamiento.</li></ul>"
      )
    },
    // ------------------------------------------------------------ 10 y 11
    {
      h: "10. ¿Qué falla aquí? Errores típicos de estructura de la materia",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    {
      h: "11. Autocomprobación del tema",
      html: "<p>Un test de diez preguntas, tarjetas para fijar definiciones y un juego de ordenar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarj") + w("orden", "llenado")
    }
  ];

  B.parte.q2t2b = { nuevas: nuevas };
})(window);
