/* ============================================================
   Química II · ampliaciones · Tema 5: Cinética química
   (parte B: secciones nuevas 6 a 11)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t5/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 6
    {
      h: "6. Determinar los órdenes: el método de las velocidades iniciales",
      html: env(
        "<h5>La idea</h5>" +
        "<p>Los órdenes no se pueden adivinar mirando la ecuación química; se obtienen midiendo. El método estándar consiste en medir la <b>velocidad inicial</b> v₀ (al principio, cuando todavía no se ha gastado casi nada) en varios experimentos con distintas concentraciones iniciales. Después se comparan los experimentos <b>de dos en dos</b>.</p>" +
        "<p>La regla es siempre la misma: si entre dos experimentos <b>solo cambia [A]</b> en un factor f y la velocidad cambia en un factor F, entonces</p>" +
        "<div class='formula-wrap'><div class='formula'>F = f<sup>n</sup>  ⟹  n = log F / log f</div></div>" +
        "<p>Con factores sencillos se resuelve a ojo: si [A] se duplica (f = 2) y v se multiplica por 2 → n = 1; por 4 → n = 2; por 8 → n = 3; no cambia → n = 0. Si [A] se triplica y v se multiplica por 9, n = 2.</p>" +
        "<h5>Receta en cuatro pasos</h5>" +
        "<ol>" +
        "<li><b>Busca un par de experimentos</b> en los que cambie una sola concentración.</li>" +
        "<li>Calcula el cociente de concentraciones f y el cociente de velocidades F; deduce el orden de ese reactivo.</li>" +
        "<li>Repite para cada reactivo con otro par (o con el mismo par si hay un experimento «puente»).</li>" +
        "<li>Escribe v = k[A]<sup>n</sup>[B]<sup>m</sup>, <b>calcula k</b> con cualquiera de los experimentos (con sus unidades) y comprueba el resultado con otro experimento.</li>" +
        "</ol>" +
        ejemplo("Ejemplo resuelto: tres experimentos", "Para 2 NO + Cl₂ → 2 NOCl se midieron las velocidades iniciales: (1) [NO] = 0,10 y [Cl₂] = 0,10 mol/L, v₀ = 1,8·10⁻⁴ mol·L⁻¹·s⁻¹; (2) [NO] = 0,20 y [Cl₂] = 0,10, v₀ = 7,2·10⁻⁴; (3) [NO] = 0,20 y [Cl₂] = 0,30, v₀ = 2,16·10⁻³. Halla la ecuación de velocidad, el orden total y k. Calcula v₀ cuando [NO] = 0,30 y [Cl₂] = 0,20 mol/L.", [
          "Experimentos 1 y 2: [Cl₂] constante y [NO] se duplica (f = 2); v pasa de 1,8·10⁻⁴ a 7,2·10⁻⁴ (F = 4). Entonces 2<sup>n</sup> = 4 → <b>n = 2</b> respecto al NO.",
          "Experimentos 2 y 3: [NO] constante y [Cl₂] se triplica (f = 3); v pasa de 7,2·10⁻⁴ a 2,16·10⁻³ (F = 3). Entonces 3<sup>m</sup> = 3 → <b>m = 1</b> respecto al Cl₂.",
          "Ley: <b>v = k·[NO]²·[Cl₂]</b>; orden total 2 + 1 = <b>3</b>.",
          "Constante (con el experimento 1): k = 1,8·10⁻⁴/(0,10² · 0,10) = 1,8·10⁻⁴/1,0·10⁻³ = <b>0,18 L²·mol⁻²·s⁻¹</b> (unidades de un orden 3).",
          "Predicción: v₀ = 0,18 · 0,30² · 0,20 = 0,18 · 0,090 · 0,20 = <b>3,24·10⁻³ mol·L⁻¹·s⁻¹</b>."
        ]) +
        ejemplo("Ejemplo resuelto: un orden cero y un experimento donde cambian los dos", "Para A + B → productos se obtuvo: (1) [A] = 0,20 y [B] = 0,10 mol/L, v₀ = 1,6·10⁻³ mol·L⁻¹·s⁻¹; (2) [A] = 0,40 y [B] = 0,10, v₀ = 3,2·10⁻³; (3) [A] = 0,40 y [B] = 0,30, v₀ = 3,2·10⁻³; (4) [A] = 0,60 y [B] = 0,20, v₀ = 4,8·10⁻³. Halla la ley y k, y comprueba el experimento 4.", [
          "Experimentos 1 y 2: solo cambia A (×2) y v se duplica (×2) → 2<sup>n</sup> = 2 → <b>n = 1</b>.",
          "Experimentos 2 y 3: solo cambia B (×3) y v <b>no cambia</b> (×1) → 3<sup>m</sup> = 1 → <b>m = 0</b>: B no aparece en la ley aunque sea reactivo.",
          "Ley: <b>v = k·[A]</b>; orden total 1; k = 1,6·10⁻³/0,20 = <b>8,0·10⁻³ s⁻¹</b>.",
          "Comprobación con el experimento 4 (cambian los dos, pero ya conocemos la ley): v = 8,0·10⁻³ · 0,60 = 4,8·10⁻³ ✓. Si el valor no saliera, algo estaría mal en los órdenes."
        ]) +
        w("q5_tabla") +
        "<h5>Otro camino: las gráficas concentración–tiempo</h5>" +
        "<p>Si en vez de velocidades iniciales se tiene la concentración medida a distintos tiempos, se puede probar qué gráfica sale recta ([A] frente a t → orden 0; ln[A] frente a t → orden 1; 1/[A] frente a t → orden 2). Otra pista: en una reacción de primer orden, la concentración baja <b>siempre en la misma proporción</b> en intervalos de tiempo iguales.</p>" +
        ejemplo("Ejemplo resuelto: reconocer un primer orden", "En la descomposición del N₂O₅ se midió [N₂O₅] = 0,800 mol/L (t = 0), 0,560 (t = 50 s) y 0,392 (t = 100 s). ¿Qué orden tiene respecto al N₂O₅? Calcula la constante k de d[N₂O₅]/dt = −k·[N₂O₅] y la vida media.", [
          "Proporciones: 0,560/0,800 = 0,70 y 0,392/0,560 = 0,70. Son iguales en intervalos iguales → <b>primer orden</b>.",
          "ln[N₂O₅]: ln 0,800 = −0,2231; ln 0,560 = −0,5798; ln 0,392 = −0,9365. Baja −0,3567 en cada intervalo: es una recta.",
          "k = pendiente cambiada de signo = 0,3567/50 = <b>7,13·10⁻³ s⁻¹</b>.",
          "Vida media: t½ = ln 2 / k = 0,6931/7,13·10⁻³ = <b>97 s</b> (no depende de la concentración inicial: huella del primer orden)."
        ]) +
        ojo("Para aislar el orden de un reactivo hay que comparar dos experimentos en los que <b>los demás reactivos tengan la misma concentración</b>. Si cambian dos concentraciones a la vez, el cociente de velocidades mezcla los dos efectos y no se puede leer el orden directamente (hay que conocer antes uno de ellos).")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Molecularidad, mecanismos y etapa lenta",
      html: env(
        "<h5>Reacción global y reacciones elementales</h5>" +
        "<p>La ecuación ajustada (<b>reacción global</b>) resume el resultado, pero la mayoría de las reacciones no ocurren en un solo choque: avanzan por una secuencia de <b>etapas elementales</b>, el <b>mecanismo de reacción</b>. Cada etapa elemental es un suceso real de choque (o de ruptura espontánea) entre partículas.</p>" +
        "<p>La <b>molecularidad</b> de una etapa elemental es el <b>número de partículas que intervienen</b> en ella: <b>unimolecular</b> (1), <b>bimolecular</b> (2) y, rarísima vez, <b>trimolecular</b> (3). Los choques de tres cuerpos a la vez son tan improbables que casi nunca se proponen; una global con coeficientes que sumen 3 o más se explica con etapas bimoleculares sucesivas.</p>" +
        tabla(["", "Orden de reacción", "Molecularidad"], [
          ["Se refiere a…", "La reacción global (o una etapa)", "Solo a una <b>etapa elemental</b>"],
          ["Cómo se obtiene", "Experimentalmente", "Del mecanismo propuesto"],
          ["Valores posibles", "0, 1, 2, 3, fraccionarios…", "Enteros: 1, 2 (3 raro)"],
          ["Relación con los coeficientes", "<b>Ninguna</b> en general", "En una etapa elemental, los coeficientes <b>sí</b> son los órdenes"]
        ], "q3t") +
        "<h5>La etapa lenta manda</h5>" +
        "<p>Si un mecanismo tiene varias etapas, la <b>etapa más lenta</b> (la de mayor Eₐ) limita la velocidad global, como el tramo más estrecho de una tubería: no importa lo rápidas que sean las demás. Por eso la <b>ecuación de velocidad experimental coincide con la de la etapa lenta</b>, escrita como si fuera elemental (orden = coeficientes de los reactivos de esa etapa).</p>" +
        "<p>Un mecanismo es <b>aceptable</b> cuando se cumplen dos condiciones: (1) la suma de todas sus etapas da exactamente la reacción global (se cancelan los intermedios), y (2) la ley de velocidad de la etapa lenta coincide con la ley medida. Cumplirlas no prueba que sea el mecanismo verdadero, pero incumplirlas lo descarta.</p>" +
        "<h5>Intermedios y catalizadores</h5>" +
        "<ul>" +
        "<li><b>Intermedio</b>: especie que <i>se forma</i> en una etapa y <i>se consume</i> en otra posterior. No aparece en la global ni en la ley de velocidad. En el perfil de energía es un <b>mínimo</b> entre dos máximos.</li>" +
        "<li><b>Catalizador</b>: especie que <i>se consume</i> en una etapa y <i>se regenera</i> después. Tampoco aparece en la global, pero <i>sí</i> puede aparecer en la ley de velocidad.</li>" +
        "<li><b>Estado de transición</b>: máximo de energía de cada etapa; no es un intermedio (no se puede aislar).</li>" +
        "</ul>" +
        ejemplo("Ejemplo resuelto: de un mecanismo a la ley de velocidad", "La reacción NO₂(g) + CO(g) → NO(g) + CO₂(g) transcurre por el mecanismo: etapa 1 (lenta) NO₂ + NO₂ → NO₃ + NO; etapa 2 (rápida) NO₃ + CO → NO₂ + CO₂. Comprueba que el mecanismo es coherente, identifica el intermedio, escribe la ley de velocidad e indica orden total y molecularidad de cada etapa.", [
          "Suma de etapas: NO₂ + NO₂ + NO₃ + CO → NO₃ + NO + NO₂ + CO₂. Se cancelan NO₃ y un NO₂: queda <b>NO₂ + CO → NO + CO₂</b>, que es la global ✓.",
          "Intermedio: <b>NO₃</b> (se forma en la etapa 1 y se gasta en la 2).",
          "Etapa lenta (1): bimolecular con dos NO₂, así que <b>v = k·[NO₂]²</b>.",
          "Orden total 2 (segundo orden respecto al NO₂ y <b>orden cero respecto al CO</b>: el CO reacciona después de la etapa lenta y no influye en la velocidad). Las dos etapas son <b>bimoleculares</b>.",
          "Obsérvese que la ley no tiene nada que ver con los coeficientes de la global (1 y 1): sería un error escribir v = k[NO₂][CO]."
        ]) +
        ejemplo("Ejemplo resuelto: un catalizador dentro del mecanismo", "La descomposición 2 H₂O₂ → 2 H₂O + O₂ en presencia de I⁻ ocurre así: etapa 1 (lenta) H₂O₂ + I⁻ → H₂O + IO⁻; etapa 2 (rápida) H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Identifica intermedio y catalizador y escribe la ley de velocidad.", [
          "Suma: 2 H₂O₂ + I⁻ + IO⁻ → 2 H₂O + IO⁻ + O₂ + I⁻. Se cancelan I⁻ e IO⁻: <b>2 H₂O₂ → 2 H₂O + O₂</b> ✓.",
          "<b>IO⁻</b> es el intermedio (aparece en la etapa 1 y desaparece en la 2). <b>I⁻</b> es el catalizador (se consume en la 1 y se regenera en la 2).",
          "Ley (etapa lenta): <b>v = k·[H₂O₂]·[I⁻]</b>: orden 1 respecto al H₂O₂, 1 respecto al I⁻, orden total 2. El catalizador aparece en la ley: por eso su concentración modifica la velocidad.",
          "Fíjate: el coeficiente 2 del H₂O₂ en la global no se convierte en orden 2."
        ]) +
        w("q5_mecanismo") +
        ojo("«Si la etapa lenta es la segunda, la ley es la de la segunda etapa.» Cuidado: si esa etapa contiene un intermedio, esa ley no sirve (no se mide la concentración de intermedios) y hay que expresarlo en función de reactivos, con herramientas que van más allá de Bachillerato. En los problemas de la EvAU la etapa lenta casi siempre es la primera, o contiene solo reactivos.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Catalizadores: tipos, efectos y ejemplos",
      html: env(
        "<h5>Tipos de catálisis</h5>" +
        tabla(["Tipo", "Qué es", "Ejemplos"], [
          ["Homogénea", "Catalizador y reactivos en la <b>misma fase</b>", "I⁻(aq) en la descomposición de H₂O₂(aq); NO₂(g) en la fabricación de H₂SO₄ por cámaras de plomo"],
          ["Heterogénea", "Catalizador en <b>fase distinta</b> (normalmente sólido) y la reacción ocurre en su superficie", "Fe en la síntesis de NH₃ (Haber); V₂O₅ en SO₂ → SO₃; Pt/Rh/Pd en el catalizador de los coches"],
          ["Enzimática", "Catalizadores biológicos (proteínas), muy <b>específicos</b> y eficaces a T y pH moderados", "Catalasa (descompone H₂O₂), amilasa de la saliva, enzimas de la digestión"]
        ], "q3t") +
        "<p>En la catálisis heterogénea los reactivos se <b>adsorben</b> en puntos activos de la superficie, donde se debilitan sus enlaces; se transforman y los productos se desorben. Por eso un catalizador finamente dividido (más superficie) es más eficaz, y por eso un <b>veneno</b> que ocupe los puntos activos lo inutiliza (el plomo de las gasolinas antiguas estropeaba los catalizadores de los coches). Un <b>inhibidor</b> es lo contrario de un catalizador: disminuye la velocidad.</p>" +
        "<h5>Qué cambia y qué no: consecuencias cuantitativas</h5>" +
        "<p>Si se supone que A es la misma con y sin catalizador, la ecuación de Arrhenius permite saber cuánto acelera:</p>" +
        "<div class='formula-wrap'><div class='formula'>k<sub>cat</sub>/k = e<sup>(Eₐ − Eₐ,cat)/RT</sup></div></div>" +
        ejemplo("Ejemplo resuelto: cuánto acelera un catalizador", "Un catalizador reduce la energía de activación de una reacción de 80 a 50 kJ/mol. ¿Cuántas veces aumenta la constante de velocidad a 298 K (suponiendo el mismo factor A)? ¿Y a 500 K?", [
          "Diferencia de energías de activación: 80 − 50 = 30 kJ/mol = 30 000 J/mol.",
          "A 298 K: ln(k<sub>cat</sub>/k) = 30 000/(8,314 · 298) = 12,11 → k<sub>cat</sub>/k = e<sup>12,11</sup> = <b>1,8·10⁵</b>: la reacción va unas 180 000 veces más deprisa.",
          "A 500 K: 30 000/(8,314 · 500) = 7,217 → e<sup>7,217</sup> ≈ <b>1,4·10³</b>.",
          "A temperaturas más altas el catalizador es relativamente menos decisivo (la energía térmica ya ayuda a superar la barrera)."
        ]) +
        ejemplo("Ejemplo resuelto: ¿por qué el catalizador no cambia el equilibrio?", "La reacción A ⇌ B tiene Eₐ(directa) = 80 kJ/mol y Eₐ(inversa) = 120 kJ/mol. Un catalizador reduce la barrera en 30 kJ/mol. Calcula ΔH antes y después y razona qué pasa con K.", [
          "ΔH = Eₐ(dir) − Eₐ(inv) = 80 − 120 = <b>−40 kJ/mol</b>.",
          "Con catalizador: Eₐ(dir) = 50 y Eₐ(inv) = 90 (el camino alternativo baja la barrera en los dos sentidos, 30 kJ/mol cada uno). ΔH = 50 − 90 = <b>−40 kJ/mol</b>: no cambia.",
          "Las dos constantes se multiplican por el mismo factor e<sup>30 000/RT</sup>. Como K<sub>c</sub> = k<sub>dir</sub>/k<sub>inv</sub>, el factor se simplifica: <b>K no cambia</b>.",
          "Lo que sí cambia es el tiempo necesario para llegar al equilibrio: ahora es mucho menor."
        ]) +
        "<h5>Ejemplos que conviene conocer</h5>" +
        "<ul>" +
        "<li><b>Convertidor catalítico</b> (Pt, Pd, Rh): transforma CO, hidrocarburos sin quemar y NO<sub>x</sub> de los gases de escape en CO₂, H₂O y N₂.</li>" +
        "<li><b>Síntesis de Haber</b>: N₂ + 3 H₂ ⇌ 2 NH₃ con Fe; el catalizador hace viable a T moderada (400–500 °C) una reacción que sin él sería inabordablemente lenta.</li>" +
        "<li><b>Contacto</b>: 2 SO₂ + O₂ ⇌ 2 SO₃ con V₂O₅ en la fabricación de ácido sulfúrico.</li>" +
        "<li><b>Enzimas</b>: la catalasa acelera la descomposición del H₂O₂ millones de veces; una temperatura demasiado alta las desnaturaliza, así que su actividad tiene un máximo.</li>" +
        "</ul>" +
        ojo("Hay dos formas de acelerar una reacción con Eₐ alta: subir la temperatura (más partículas por encima de Eₐ) o usar un catalizador (baja Eₐ). Una reacción exotérmica reversible, además, se desplaza hacia los reactivos al calentar, así que a veces conviene el catalizador y no la temperatura para no perder rendimiento.")
      )
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Problemas tipo EvAU, paso a paso",
      html: env(
        "<h5>Una estrategia que sirve casi siempre</h5>" +
        "<ol>" +
        "<li><b>Identifica qué te dan</b>: ¿una tabla de velocidades iniciales?, ¿dos constantes a dos temperaturas?, ¿energías de un perfil?, ¿un mecanismo?</li>" +
        "<li><b>Escribe la fórmula que corresponde</b> antes de sustituir: v = k[A]ⁿ[B]ᵐ, ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂), Eₐ(inv) = Eₐ(dir) − ΔH.</li>" +
        "<li><b>Convierte las unidades</b>: K, J/mol, mol/L, s.</li>" +
        "<li><b>Calcula con unidades</b>; las unidades de k te dicen si el orden total que has sacado es el correcto.</li>" +
        "<li><b>Cierra con una frase</b> que responda lo preguntado.</li>" +
        "</ol>" +
        ejemplo("Problema EvAU 1: tabla de velocidades y predicción", "Para la reacción A + 2 B → C se han medido las velocidades iniciales: (1) [A] = 0,10 y [B] = 0,10 mol/L, v₀ = 2,0·10⁻³ mol·L⁻¹·s⁻¹; (2) [A] = 0,20 y [B] = 0,10, v₀ = 4,0·10⁻³; (3) [A] = 0,10 y [B] = 0,30, v₀ = 1,8·10⁻². (a) Órdenes parciales y orden total. (b) Ecuación de velocidad. (c) Constante de velocidad con sus unidades. (d) Velocidad cuando [A] = 0,050 y [B] = 0,20 mol/L. (e) ¿Es razonable que los órdenes coincidan con los coeficientes (1 y 2)?", [
          "(a) Experimentos 1→2: [A] ×2 y v ×2 → 2<sup>n</sup> = 2 → <b>n = 1</b>. Experimentos 1→3: [B] ×3 y v ×9 → 3<sup>m</sup> = 9 → <b>m = 2</b>. Orden total: <b>3</b>.",
          "(b) <b>v = k·[A]·[B]²</b>.",
          "(c) k = v/([A][B]²) = 2,0·10⁻³/(0,10 · 0,10²) = 2,0·10⁻³/1,0·10⁻³ = <b>2,0 L²·mol⁻²·s⁻¹</b>.",
          "(d) v = 2,0 · 0,050 · 0,20² = 2,0 · 0,050 · 0,040 = <b>4,0·10⁻³ mol·L⁻¹·s⁻¹</b>.",
          "(e) Es una coincidencia posible (ocurriría si la reacción fuese elemental), pero no puede afirmarse solo con la ecuación: los órdenes se han <i>medido</i> en la tabla, no deducido de los coeficientes."
        ]) +
        ejemplo("Problema EvAU 2: perfil de energía y catalizador", "La reacción A → B tiene ΔH = −25 kJ/mol y Eₐ = 60 kJ/mol. Con un catalizador, la Eₐ baja a 35 kJ/mol. (a) Calcula Eₐ de la reacción inversa con y sin catalizador. (b) ¿Cuántas veces aumenta k a 298 K con el catalizador (mismo factor A)? (c) ¿Cambian ΔH, la constante de equilibrio o el rendimiento? (d) Dibuja el perfil con ambos caminos.", [
          "(a) Sin catalizador: Eₐ(inv) = 60 − (−25) = <b>85 kJ/mol</b>. Con catalizador: Eₐ(inv) = 35 + 25 = <b>60 kJ/mol</b>.",
          "(b) ΔEₐ = 60 − 35 = 25 kJ/mol. ln(k<sub>cat</sub>/k) = 25 000/(8,314 · 298) = 10,09 → factor e<sup>10,09</sup> = <b>2,4·10⁴</b>.",
          "(c) <b>No cambian</b> ΔH ni K ni el rendimiento en el equilibrio: el catalizador solo reduce Eₐ en ambos sentidos; se llega antes al mismo equilibrio.",
          "(d) Dos curvas desde el mismo nivel de reactivos hasta el mismo nivel de productos (25 kJ más abajo): la sin catalizador con un máximo a 60 kJ, la catalizada con un máximo a 35 kJ. (Puedes comprobarlo en el simulador de la sección 4 con ΔH = −30 y Eₐ = 60.)"
        ]) +
        ejemplo("Problema EvAU 3: Arrhenius y factores", "Una reacción tiene Eₐ = 75 kJ/mol y k = 2,5·10⁻⁴ s⁻¹ a 298 K. (a) Calcula k a 318 K. (b) ¿Cambiaría k si se duplicase la concentración del reactivo? (c) ¿Y la velocidad? Orden de la reacción: 1.", [
          "(a) ln(k₂/k₁) = (75 000/8,314)(1/298 − 1/318) = 9 021 · 2,1105·10⁻⁴ = 1,904 → k₂/k₁ = e<sup>1,904</sup> = 6,71 → k₂ = 6,71 · 2,5·10⁻⁴ = <b>1,7·10⁻³ s⁻¹</b>.",
          "(b) <b>No</b>: k solo depende de la temperatura (y del catalizador), no de la concentración.",
          "(c) <b>Sí</b>: v = k[A] se duplica (orden 1)."
        ]) +
        ejemplo("Problema EvAU 4: mecanismo y ley de velocidad", "Se propone el mecanismo: (1) NO₂ + F₂ → NO₂F + F (lenta); (2) NO₂ + F → NO₂F (rápida). (a) Reacción global. (b) Intermedio. (c) Ley de velocidad y orden total. (d) ¿Qué ocurre con la velocidad si se triplica [F₂] y se duplica [NO₂]?", [
          "(a) Suma: 2 NO₂ + F₂ + F → 2 NO₂F + F → <b>2 NO₂ + F₂ → 2 NO₂F</b>.",
          "(b) El <b>átomo de F</b>: se forma en la etapa 1 y se gasta en la 2.",
          "(c) Etapa lenta: <b>v = k·[NO₂]·[F₂]</b>, orden total <b>2</b> (no 3, como sugerirían los coeficientes 2 y 1 de la global).",
          "(d) Factor 2¹ · 3¹ = <b>×6</b>."
        ])
      )
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. ¿Qué falla aquí?",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 11
    {
      h: "11. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y tres juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1") + w("clasificar", "clas1")
    }
  ];

  B.parte.q2t5b = { nuevas: nuevas };
})(window);
