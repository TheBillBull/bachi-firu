/* ============================================================
   Química II · ampliaciones · Tema 7: Ácidos y bases
   (parte A: se añade al final de las secciones originales 1 a 4)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t7/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Teorías ácido-base
  secciones[0] = env(
    "<h5>Por qué hizo falta una segunda teoría</h5>" +
    "<p>La teoría de Arrhenius (1887) funciona bien con HCl y NaOH, pero tiene dos límites: <b>exige agua</b> como disolvente y <b>exige un OH⁻ en la fórmula</b> de la base. No explica por qué el NH₃ (sin OH⁻) vuelve rosa la fenolftaleína, ni por qué una disolución de acetato de sodio es básica. La teoría de Brønsted y Lowry (1923) lo resuelve cambiando la pregunta: ya no importa qué <i>contiene</i> la sustancia, sino qué <b>hace con los protones</b>.</p>" +
    tabla(["", "Arrhenius", "Brønsted–Lowry"], [
      ["Ácido", "libera H⁺ en agua", "<b>cede</b> un protón (H⁺)"],
      ["Base", "libera OH⁻ en agua", "<b>acepta</b> un protón"],
      ["Reacción ácido-base", "H⁺ + OH⁻ → H₂O", "transferencia de un protón entre dos especies"],
      ["Limitaciones", "solo en agua; la base debe tener OH⁻", "ninguna en agua; el disolvente también participa"]
    ]) +
    "<h5>Pares ácido-base conjugados</h5>" +
    "<p>Si un ácido cede un protón, lo que queda puede volver a aceptarlo: es su <b>base conjugada</b>. Al revés, una base que acepta un protón se convierte en su <b>ácido conjugado</b>. Toda reacción ácido-base de Brønsted tiene <b>dos pares conjugados</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>ácido₁ + base₂ ⇌ base₁ + ácido₂</div></div>" +
    ejemplo("Ejemplo resuelto: identificar los pares conjugados", "Indica los pares ácido-base conjugados en (a) NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ y (b) HNO₃ + H₂O → NO₃⁻ + H₃O⁺.", [
      "<b>(a)</b> El NH₃ <b>acepta</b> un H⁺: es la base, y su ácido conjugado es NH₄⁺ (par NH₄⁺/NH₃). El H₂O <b>cede</b> un H⁺: es el ácido, y su base conjugada es OH⁻ (par H₂O/OH⁻).",
      "<b>(b)</b> El HNO₃ cede el H⁺: es el ácido y su base conjugada es NO₃⁻ (par HNO₃/NO₃⁻). El H₂O lo acepta: es la base, y su ácido conjugado es H₃O⁺ (par H₃O⁺/H₂O).",
      "Fíjate en que <b>el agua hace de base en (b) y de ácido en (a)</b>: se llama <b>anfótera</b> o anfiprótica."
    ]) +
    "<p>Una receta para no equivocarte: para el conjugado de un <b>ácido</b>, <b>quita</b> un H⁺ (y baja la carga en 1); para el de una <b>base</b>, <b>añade</b> un H⁺ (y sube la carga en 1).</p>" +
    tabla(["Ácido", "Base conjugada", "Base", "Ácido conjugado"], [
      ["HCl", "Cl⁻", "NH₃", "NH₄⁺"],
      ["CH₃COOH", "CH₃COO⁻", "CH₃COO⁻", "CH₃COOH"],
      ["H₂O", "OH⁻", "OH⁻", "H₂O"],
      ["H₃O⁺", "H₂O", "H₂O", "H₃O⁺"],
      ["H₂CO₃", "HCO₃⁻", "CO₃²⁻", "HCO₃⁻"],
      ["NH₄⁺", "NH₃", "F⁻", "HF"]
    ], "q3t") +
    "<h5>Sustancias anfóteras</h5>" +
    "<p>Algunas especies pueden comportarse como ácido o como base según con quién se encuentren. El agua es la más conocida, pero también lo son los iones con un H que aún puede soltarse y un par que aún puede aceptar otro: <b>HCO₃⁻</b> (cede un H⁺ y da CO₃²⁻; o acepta uno y da H₂CO₃), <b>HSO₄⁻</b> y <b>H₂PO₄⁻</b>.</p>" +
    ojo("Una sustancia <b>no es ácida ni básica «en sí»</b>: lo es respecto a otra. El agua es base frente al HCl y ácido frente al NH₃. Y no confundas «anfótero» con «neutro»: un anfótero reacciona con ambos.") +
    "<h5>Un vistazo a la teoría de Lewis</h5>" +
    "<p>Existe una definición todavía más amplia: <b>ácido</b> es lo que <b>acepta un par de electrones</b> y <b>base</b> lo que lo <b>aporta</b> (BF₃ + :NH₃ → F₃B←NH₃, un enlace covalente coordinado como el del tema 4). No se pide cálculo con ella, pero explica por qué el BF₃ o el Al³⁺ se comportan como ácidos sin tener ningún H."
  );

  // ---------------------------------------------------------------- 2. El pH
  secciones[1] = env(
    "<h5>El agua también se ioniza: Kw</h5>" +
    "<p>Hasta el agua más pura conduce un poquito la electricidad: unas pocas moléculas reaccionan entre sí (una hace de ácido y otra de base):</p>" +
    "<div class='formula-wrap'><div class='formula'>2 H₂O ⇌ H₃O⁺ + OH⁻ &nbsp;&nbsp;&nbsp; K<sub>w</sub> = [H₃O⁺]·[OH⁻] = 1,0·10⁻¹⁴ (a 25 °C)</div></div>" +
    "<p>En agua pura salen iones iguales: [H⁺] = [OH⁻] = √K<sub>w</sub> = 10⁻⁷ mol/L, es decir, pH = 7. Pero <b>K<sub>w</sub> es una constante de equilibrio</b> y, como todas, <b>depende de la temperatura</b>: la autoionización absorbe calor, así que al calentar K<sub>w</sub> aumenta. A 50 °C vale ≈ 5,5·10⁻¹⁴ y el agua pura tiene [H⁺] = √(5,5·10⁻¹⁴) = 2,3·10⁻⁷ mol/L, o sea <b>pH = 6,63</b>. Sigue siendo neutra (porque [H⁺] = [OH⁻]), aunque su pH no sea 7. En los problemas, salvo que se diga otra cosa, se trabaja a 25 °C.</p>" +
    "<p>La relación K<sub>w</sub> = [H⁺][OH⁻] vale <b>en cualquier disolución acuosa</b>, ácida, básica o neutra: si sube [H⁺], baja [OH⁻] y al revés. Por eso en una disolución ácida sigue habiendo OH⁻ (muy pocos), y en una básica sigue habiendo H⁺.</p>" +
    w("q7_escala") +
    ejemplo("Ejemplo resuelto: pasar de pH a concentraciones", "El pH de la sangre es 7,4. Calcula [H⁺], pOH y [OH⁻].", [
      "[H⁺] = 10<sup>−pH</sup> = 10<sup>−7,4</sup> = <b>3,98·10⁻⁸ mol/L</b>.",
      "pOH = 14 − pH = 14 − 7,4 = <b>6,6</b>.",
      "[OH⁻] = 10<sup>−6,6</sup> = <b>2,51·10⁻⁷ mol/L</b> (comprueba: 3,98·10⁻⁸ · 2,51·10⁻⁷ = 1,0·10⁻¹⁴).",
      "La sangre es <b>ligeramente básica</b>: [OH⁻] &gt; [H⁺]. Un cambio de solo 0,3 unidades de pH ya es peligroso, porque supone multiplicar o dividir [H⁺] por 2."
    ]) +
    ejemplo("Ejemplo resuelto: ácido y base fuertes", "Calcula el pH de (a) HNO₃ 0,02 mol/L y (b) Ba(OH)₂ 0,001 mol/L.", [
      "<b>(a)</b> Ácido fuerte monoprótico: [H⁺] = 0,02 mol/L → pH = −log 0,02 = <b>1,70</b>.",
      "<b>(b)</b> El Ba(OH)₂ es una base fuerte que libera <b>dos</b> OH⁻ por fórmula: Ba(OH)₂ → Ba²⁺ + 2 OH⁻. [OH⁻] = 2 · 0,001 = 2·10⁻³ mol/L.",
      "pOH = −log(2·10⁻³) = 2,70, así que pH = 14 − 2,70 = <b>11,30</b>.",
      "El fallo típico es olvidar el factor 2 (daría pH 11,00)."
    ]) +
    ejemplo("Ejemplo resuelto: diluir un ácido fuerte", "Se toman 25 mL de HCl 0,2 mol/L y se llevan con agua hasta 500 mL. ¿Qué pH tiene la disolución final?", [
      "Los moles no cambian al diluir: n = 0,025 L · 0,2 mol/L = 5·10⁻³ mol.",
      "Concentración final: 5·10⁻³ mol / 0,5 L = 0,01 mol/L → pH = <b>2,00</b>.",
      "Diluir 20 veces (de 0,2 a 0,01) subió el pH de 0,70 a 2,00. Cada dilución ×10 de un ácido fuerte sube el pH una unidad."
    ]) +
    "<h5>Un caso engañoso: el ácido fuerte muy diluido</h5>" +
    "<p>Si disuelves HCl 10⁻⁸ mol/L, no puede salir pH = 8 (¡un ácido no vuelve básica el agua!). El motivo es que a esa concentración el agua aporta <b>más</b> H⁺ (10⁻⁷ mol/L) que el ácido. Contando los dos orígenes se resuelve [H⁺] = 10⁻⁸ + [OH⁻] con [H⁺][OH⁻] = 10⁻¹⁴ y sale [H⁺] = 1,05·10⁻⁷ mol/L, o sea <b>pH = 6,98</b>: casi neutro. Regla práctica: la aproximación [H⁺] = c solo vale si c ≳ 10⁻⁶ mol/L.</p>" +
    ojo("El pH es una escala <b>logarítmica</b>: pasar de pH 3 a pH 5 no es «un poco menos ácido», es 100 veces menos [H⁺]. Y al calcular, no confundas −log[H⁺] con log[H⁺] (el pH de un ácido concentrado sería negativo y sale positivo solo con el signo menos)."
  ));

  // ---------------------------------------------------------------- 3. Fuertes y débiles
  secciones[2] = env(
    "<h5>La fuerza de un ácido es una constante de equilibrio</h5>" +
    "<p>«Fuerte» y «débil» describen <b>cuánto se disocia</b> en agua, no cuánto corroe ni qué concentración tiene. Un ácido débil, HA, alcanza un equilibrio (tema 6) con constante <b>K<sub>a</sub></b>; una base débil, B, con constante <b>K<sub>b</sub></b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>HA + H₂O ⇌ A⁻ + H₃O⁺ &nbsp;&nbsp; K<sub>a</sub> = [A⁻][H₃O⁺] / [HA] &nbsp;&nbsp;&nbsp;&nbsp; B + H₂O ⇌ BH⁺ + OH⁻ &nbsp;&nbsp; K<sub>b</sub> = [BH⁺][OH⁻] / [B]</div></div>" +
    "<p>El agua no aparece en la constante: es el disolvente y su concentración es prácticamente constante. A mayor K<sub>a</sub> (o menor pK<sub>a</sub> = −log K<sub>a</sub>), más fuerte es el ácido. Se usan además dos medidas de «cuánto se disocia»:</p>" +
    "<ul><li><b>Grado de disociación α</b> = (mol disociados)/(mol iniciales) = x/c. Se da en tanto por uno o por ciento. Un ácido fuerte tiene α ≈ 1.</li>" +
    "<li><b>pK<sub>a</sub></b> = −log K<sub>a</sub>: cuanto menor, más fuerte. Ácido acético: K<sub>a</sub> = 1,8·10⁻⁵ → pK<sub>a</sub> = 4,74.</li></ul>" +
    tabla(["Ácido", "K<sub>a</sub>", "pK<sub>a</sub>", "Base conjugada"], [
      ["HCl, HNO₃", "muy grande (fuertes)", "&lt; 0", "Cl⁻, NO₃⁻ (no reaccionan con el agua)"],
      ["HF", "6,8·10⁻⁴", "3,17", "F⁻"],
      ["HNO₂", "4,5·10⁻⁴", "3,35", "NO₂⁻"],
      ["C₆H₅COOH (benzoico)", "6,5·10⁻⁵", "4,19", "C₆H₅COO⁻"],
      ["CH₃COOH", "1,8·10⁻⁵", "4,74", "CH₃COO⁻"],
      ["HClO", "3,0·10⁻⁸", "7,52", "ClO⁻"],
      ["HCN", "4,9·10⁻¹⁰", "9,31", "CN⁻"]
    ], "q3t") +
    "<p>Bases débiles de uso frecuente: NH₃ (K<sub>b</sub> = 1,8·10⁻⁵) y metilamina CH₃NH₂ (K<sub>b</sub> = 4,4·10⁻⁴).</p>" +
    "<h5>Ácidos fuertes de memoria (y bases fuertes)</h5>" +
    "<p><b>Ácidos fuertes</b> que se piden: HCl, HBr, HI, HNO₃, HClO₄ y H₂SO₄ (solo en su <i>primera</i> ionización). <b>Bases fuertes</b>: hidróxidos de los alcalinos (LiOH, NaOH, KOH) y de Ca, Sr, Ba. Todo lo demás con aspecto de ácido o base (CH₃COOH, HF, HCN, NH₃, aminas…) se trata como <b>débil</b>.</p>" +
    "<h5>Pares conjugados: K<sub>a</sub> · K<sub>b</sub> = K<sub>w</sub></h5>" +
    "<p>Un ácido y su base conjugada están ligados: cuanto más fuerte es el ácido, más débil es su base conjugada. Multiplicando las dos constantes se cancelan las concentraciones del par y queda el producto iónico del agua:</p>" +
    "<div class='formula-wrap'><div class='formula'>K<sub>a</sub>(HA) · K<sub>b</sub>(A⁻) = K<sub>w</sub> &nbsp;&nbsp;⟹&nbsp;&nbsp; pK<sub>a</sub> + pK<sub>b</sub> = 14</div></div>" +
    ejemplo("Ejemplo resuelto: de K<sub>a</sub> a K<sub>b</sub> del conjugado", "Calcula K<sub>b</sub> del ion acetato y K<sub>a</sub> del ion amonio, sabiendo K<sub>a</sub>(CH₃COOH) = 1,8·10⁻⁵ y K<sub>b</sub>(NH₃) = 1,8·10⁻⁵.", [
      "Acetato: K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = 10⁻¹⁴ / 1,8·10⁻⁵ = <b>5,6·10⁻¹⁰</b> (pK<sub>b</sub> = 9,26).",
      "Amonio: K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = 10⁻¹⁴ / 1,8·10⁻⁵ = <b>5,6·10⁻¹⁰</b> (pK<sub>a</sub> = 9,26).",
      "Los dos son muy pequeños: el acetato es una base <b>muy débil</b> y el amonio un ácido <b>muy débil</b>. Esto es lo que hace falta en la hidrólisis de sales (sección 6)."
    ]) +
    "<h5>Calcular el pH de un ácido o una base débiles</h5>" +
    "<p>Es una tabla ICE del tema 6, con x = [H⁺] (o [OH⁻]). Para HA de concentración inicial c:</p>" +
    tabla(["", "HA", "A⁻", "H₃O⁺"], [["inicial", "c", "0", "0"], ["cambio", "−x", "+x", "+x"], ["equilibrio", "c − x", "x", "x"]], "q3t") +
    "<div class='formula-wrap'><div class='formula'>K<sub>a</sub> = x² / (c − x)</div></div>" +
    "<p>Tienes dos caminos:</p>" +
    "<ol><li><b>Aproximado</b>: si x es mucho menor que c, c − x ≈ c y x = √(K<sub>a</sub>·c). Se acepta cuando <b>α = x/c &lt; 5 %</b>; ese 5 % es lo que se comprueba <i>después</i> de calcular.</li>" +
    "<li><b>Exacto</b>: x² + K<sub>a</sub>·x − K<sub>a</sub>·c = 0, con x = (−K<sub>a</sub> + √(K<sub>a</sub>² + 4K<sub>a</sub>c)) / 2. Siempre vale.</li></ol>" +
    "<p>La calculadora de abajo te enseña los pasos con los datos que elijas, calcula las dos versiones y avisa cuándo la aproximación falla; en el gráfico «α según c» ves cuándo ocurre.</p>" +
    w("q7_calc") +
    ejemplo("Ejemplo resuelto: ácido débil, aproximación válida", "Calcula el pH y el grado de disociación de CH₃COOH 0,1 mol/L (K<sub>a</sub> = 1,8·10⁻⁵).", [
      "Equilibrio: CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺. Tabla: c − x, x, x.",
      "K<sub>a</sub> = x²/(0,1 − x) ≈ x²/0,1 → x = √(1,8·10⁻⁵ · 0,1) = <b>1,34·10⁻³ mol/L</b>.",
      "Comprobación: α = x/c = 1,34·10⁻³/0,1 = 1,3 % &lt; 5 %: la aproximación es válida.",
      "pH = −log(1,34·10⁻³) = <b>2,87</b> y α = <b>1,3 %</b>. (Resolviendo la cuadrática sale 2,88: la diferencia es despreciable.)"
    ]) +
    ejemplo("Ejemplo resuelto: base débil", "Calcula el pH de NH₃ 0,2 mol/L (K<sub>b</sub> = 1,8·10⁻⁵) y su grado de ionización.", [
      "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Con x = [OH⁻]: K<sub>b</sub> = x²/(0,2 − x) ≈ x²/0,2.",
      "x = √(1,8·10⁻⁵ · 0,2) = <b>1,90·10⁻³ mol/L</b> = [OH⁻]. α = x/c = 0,95 % &lt; 5 %: vale.",
      "pOH = −log(1,90·10⁻³) = 2,72, luego pH = 14 − 2,72 = <b>11,28</b>.",
      "Una disolución de base débil y concentración 0,2 mol/L tiene un pH <b>menor</b> que una de NaOH de igual concentración (13,30)."
    ]) +
    ejemplo("Ejemplo resuelto: hallar K<sub>a</sub> a partir del pH", "Una disolución 0,2 mol/L de un ácido monoprótico HA tiene pH 2,85. Calcula K<sub>a</sub> y α.", [
      "[H⁺] = 10<sup>−2,85</sup> = 1,41·10⁻³ mol/L = x.",
      "[A⁻] = x = 1,41·10⁻³ y [HA] = 0,2 − 0,00141 = 0,1986 mol/L.",
      "K<sub>a</sub> = x²/(c − x) = (1,41·10⁻³)² / 0,1986 = <b>1,0·10⁻⁵</b>.",
      "α = x/c = 1,41·10⁻³/0,2 = <b>0,71 %</b> (ácido débil; pK<sub>a</sub> = 5,0)."
    ]) +
    ejemplo("Ejemplo resuelto: cuando la aproximación NO vale", "Calcula el pH de HF 0,1 mol/L (K<sub>a</sub> = 6,8·10⁻⁴).", [
      "Aproximado: x = √(6,8·10⁻⁴ · 0,1) = 8,25·10⁻³ mol/L → α = 8,25 % <b>&gt; 5 %</b>. La aproximación <b>no vale</b>: x ya no es despreciable frente a 0,1.",
      "Exacto: x² + 6,8·10⁻⁴·x − 6,8·10⁻⁵ = 0 → x = (−6,8·10⁻⁴ + √((6,8·10⁻⁴)² + 4 · 6,8·10⁻⁵)) / 2 = <b>7,91·10⁻³ mol/L</b>.",
      "pH = −log(7,91·10⁻³) = <b>2,10</b> y α = 7,9 %. (Con la aproximación habría salido 2,08: el error es pequeño en pH, pero el α que se pide no es válido.)",
      "Regla: se acepta la aproximación si α &lt; 5 %, y esto pasa cuando c/K<sub>a</sub> es mayor que unas 400."
    ]) +
    ejemplo("Ejemplo resuelto: diluir un ácido débil", "¿Qué le pasa al grado de disociación del CH₃COOH al diluirlo de 0,1 a 0,001 mol/L?", [
      "Con 0,1 mol/L: α = 1,3 % (ejemplo anterior). Con 0,001 mol/L la aproximación falla (√(K<sub>a</sub>/c) = 13 %), así que se resuelve la cuadrática: x = <b>1,25·10⁻⁴ mol/L</b>, α = <b>12,5 %</b> y pH = 3,90.",
      "Al diluir 100 veces, <b>α sube</b> (de 1,3 % a 12,5 %: ley de dilución de Ostwald), pero [H⁺] <b>baja</b> y el pH <b>sube</b> (de 2,88 a 3,90).",
      "Interpretación con el principio de Le Châtelier: al diluir, el equilibrio se desplaza hacia el lado con más partículas (más iones) para contrarrestar el cambio."
    ]) +
    "<h5>Quién predomina a cada pH: distribución de especies</h5>" +
    "<p>La fracción de ácido sin disociar y de base conjugada depende del <b>pH de la disolución</b>, no solo de c. De K<sub>a</sub> = [A⁻][H⁺]/[HA] sale [A⁻]/[HA] = K<sub>a</sub>/[H⁺] = 10<sup>pH − pK<sub>a</sub></sup>. Por eso, <b>a pH = pK<sub>a</sub> están al 50 %</b>; con pH una unidad por debajo domina el ácido (91 % : 9 %) y una por encima, la base. Mueve el pH y mira cómo se reparten:</p>" +
    w("q7_distrib") +
    "<h5>Ácidos polipróticos</h5>" +
    "<p>Los ácidos con más de un H ácido se ionizan por etapas, cada una con su constante y cada vez más débil: H₂CO₃ (K<sub>a1</sub> = 4,5·10⁻⁷; K<sub>a2</sub> = 4,7·10⁻¹¹), H₃PO₄ (7,1·10⁻³; 6,3·10⁻⁸; 4,2·10⁻¹³). El H₂SO₄ es fuerte en la primera ionización y casi fuerte en la segunda (K<sub>a2</sub> = 1,2·10⁻²). Para el pH de la disolución, casi siempre basta la <b>primera</b> etapa (K<sub>a1</sub> ≫ K<sub>a2</sub>).</p>" +
    ojo("«Fuerte» y «débil» hablan de <b>cuánto se disocia</b>, no de cuánto hay: HCl 10⁻³ mol/L (fuerte y diluido) tiene pH 3, mientras que CH₃COOH 5 mol/L (débil y concentrado) tiene pH 2,0. Y no confundas <b>K<sub>a</sub></b> (depende de la sustancia y de la temperatura) con <b>α</b> (depende además de la concentración)."
  ));

  // ---------------------------------------------------------------- 4. Neutralización y valoraciones
  secciones[3] = env(
    "<h5>La estequiometría cuenta H⁺ y OH⁻, no «moles de ácido»</h5>" +
    "<p>La neutralización es H⁺ + OH⁻ → H₂O. Por eso, el punto de equivalencia no es «moles de ácido = moles de base» sino <b>moles de H⁺ = moles de OH⁻</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>a · C<sub>a</sub> · V<sub>a</sub> = b · C<sub>b</sub> · V<sub>b</sub></div></div>" +
    "<p>donde a es el número de H⁺ que cede cada fórmula de ácido (HCl: 1, H₂SO₄: 2, H₃PO₄: 3) y b el de OH⁻ de cada base (NaOH: 1, Ba(OH)₂: 2). La fórmula Cₐ·Vₐ = C<sub>b</sub>·V<sub>b</sub> del enunciado original es el caso a = b = 1.</p>" +
    ejemplo("Ejemplo resuelto: ácido diprótico", "Para neutralizar 20 mL de H₂SO₄ se gastan 30 mL de NaOH 0,2 mol/L. ¿Qué concentración tiene el ácido?", [
      "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O. El ácido cede 2 H⁺ por fórmula (a = 2); la base, 1 OH⁻ (b = 1).",
      "n(NaOH) = 0,030 L · 0,2 mol/L = 6,0·10⁻³ mol de OH⁻ → hacen falta 6,0·10⁻³ mol de H⁺ = 3,0·10⁻³ mol de H₂SO₄.",
      "C(H₂SO₄) = 3,0·10⁻³ mol / 0,020 L = <b>0,15 mol/L</b>. (Si hubieras usado C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>b</sub> saldría 0,30: el error del factor 2.)"
    ]) +
    "<h5>Cómo se hace una valoración en el laboratorio</h5>" +
    "<ol><li>Con una <b>pipeta</b> se mide un volumen exacto de la muestra y se pasa a un <b>matraz erlenmeyer</b>.</li>" +
    "<li>Se añaden 2 o 3 gotas de <b>indicador</b> (una sustancia que cambia de color según el pH, sección 8).</li>" +
    "<li>La <b>bureta</b> se llena con el reactivo de concentración conocida, se enrasa en cero y se deja caer poco a poco, agitando.</li>" +
    "<li>Al notar el <b>viraje</b> (el color que persiste unos 30 s) se cierra y se lee el volumen gastado: es el volumen de equivalencia.</li></ol>" +
    "<p>Una disolución de NaOH <b>no sirve como patrón</b>, porque el NaOH absorbe agua y CO₂ del aire y su concentración exacta no se conoce al pesarlo. Primero se «valora» (se estandariza) con un <b>patrón primario</b>, sólido estable, puro y que se pesa con precisión, como el ftalato ácido de potasio (KHP, un ácido monoprótico, M = 204,22 g/mol).</p>" +
    ejemplo("Ejemplo resuelto: estandarizar la base", "Se disuelven 0,5105 g de KHP y se valoran con una disolución de NaOH, gastándose 24,8 mL. ¿Qué concentración tiene el NaOH?", [
      "n(KHP) = 0,5105 g / 204,22 g/mol = 2,500·10⁻³ mol. El KHP es monoprótico: n(NaOH) = 2,500·10⁻³ mol.",
      "C(NaOH) = 2,500·10⁻³ mol / 0,0248 L = <b>0,1008 mol/L</b>."
    ]) +
    ejemplo("Ejemplo resuelto: ácido acético del vinagre", "Se diluyen 10 mL de vinagre hasta 100 mL; 20 mL de esa disolución gastan 15,4 mL de NaOH 0,100 mol/L. ¿Cuál es la concentración del vinagre en mol/L y en g/L? (M(CH₃COOH) = 60,05 g/mol)", [
      "n(NaOH) = 0,0154 L · 0,100 mol/L = 1,54·10⁻³ mol = n(CH₃COOH) en los 20 mL.",
      "Concentración de la disolución diluida: 1,54·10⁻³ / 0,020 = 0,077 mol/L.",
      "El vinagre original estaba diluido 10 veces: 0,077 · 10 = <b>0,77 mol/L</b>, y en gramos: 0,77 · 60,05 = <b>46,2 g/L</b> (≈ 4,6 % en masa/volumen, un valor normal en vinagres comerciales)."
    ]) +
    ojo("La valoración se interpreta en el <b>punto de equivalencia</b> (reaccionó todo), pero lo que se observa es el <b>punto final</b> (cambia el color). Un buen indicador hace que coincidan; si no, hay error. Y el pH en la equivalencia <b>no es siempre 7</b> (sección 8).")
  );

  B.parte.q2t7a = { secciones: secciones };
})(window);
