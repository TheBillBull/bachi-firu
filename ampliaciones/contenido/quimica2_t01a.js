/* ============================================================
   Química II · ampliaciones · Tema 1: La química y sus cálculos
   (parte A: se añade al final de las cuatro secciones originales)

   IDEAS QUE MÁS CUESTAN EN LA EvAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Pasar de % en masa + densidad a molaridad/molalidad/fracción molar → se reutiliza q4_disolucion (barra de masa) y se explica «imagina 1 L».
   2. Del reactivo comercial a la disolución diluida y al procedimiento de laboratorio → q4_dilucion + ejemplo + receta.
   3. Cualquier cantidad → mol → cualquier otra (g, partículas, L de gas, mL de disolución) → NUEVO: qq1_mapa.
   4. R y sus unidades; T en kelvin; masa molar y densidad de un gas → NUEVO: qq1_densidad (barras) + tabla de R.
   5. Presiones parciales (Dalton) → se reutiliza q4_dalton.
   6. Reactivo limitante («no es el que menos gramos hay») → q5_limitante + NUEVO qq1_curvalim (la «V» del limitante, que prepara las valoraciones).
   7. Orden pureza → moles → limitante → proporción → rendimiento → q5_rendimiento + lámina con el orden.
   8. Fórmula empírica y molecular por % o por combustión; hidratos → q4_empirica (ya tiene el modo combustión).
   9. Mezcla de dos sustancias (sistema 2×2) → NUEVO: qq1_mezcla (la recta que da la composición).
   10. Gas con gas y gas con disolución (volúmenes de combinación, PV = nRT) → q5_gases.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t1/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso: el mol
  secciones[0] = env(
    "<h5>El mol es la estación central</h5>" +
    "<p>Una reacción química ocurre <b>átomo a átomo y molécula a molécula</b>, pero en el laboratorio lo que se mide son <b>gramos</b> (balanza), <b>litros de gas</b> (con presión y temperatura) o <b>mililitros de disolución</b> (probeta, pipeta). El mol es el puente: cada una de esas medidas se convierte en moles en <b>un solo paso</b>, y de los moles se sale hacia cualquier otra. Por eso un buen problema de Química II no se resuelve «a trozos»: <b>entras al mol, haces el cálculo químico y sales a la unidad que piden</b>.</p>" +
    w("qq1_mapa") +
    "<p>Prueba el mapa: elige una sustancia, escribe la cantidad que conoces en la casilla azul y mira cómo se rellenan las demás tarjetas. Pulsa <em>otra</em> tarjeta para cambiar el dato (por ejemplo, partir del volumen de gas y llegar a los gramos). Fíjate en que <b>nunca hay una flecha directa entre dos tarjetas de los extremos</b>: de gramos a litros se pasa por los moles.</p>" +
    "<h5>Las equivalencias que tienes que dominar</h5>" +
    tabla(["Quiero pasar…", "Fórmula", "Dato que necesito"], [
      ["gramos → moles", "n = m / M", "masa molar M (g/mol), de la tabla periódica"],
      ["moles → partículas", "N = n · N<sub>A</sub>", "N<sub>A</sub> = 6,022·10²³ partículas/mol"],
      ["moles de gas → litros (CN)", "V = n · 22,4", "solo vale a 0 °C y 1 atm"],
      ["moles de gas → litros (otras condiciones)", "V = nRT / P", "P, T (en kelvin) y R"],
      ["moles → mL de disolución", "V = n / c", "concentración molar c (mol/L)"],
      ["mL de disolución → gramos de disolución", "m = V · d", "densidad d (g/mL)"]
    ], "q3t") +
    "<h5>Moles de moléculas, moles de átomos</h5>" +
    "<p>«1 mol de H₂SO₄» son 6,022·10²³ <b>moléculas</b>; pero cada molécula tiene 2 átomos de H, 1 de S y 4 de O, así que ese mol contiene 2 mol de átomos de H, 1 mol de átomos de S y <b>4 mol de átomos de O</b>. El error clásico es contar moléculas cuando piden átomos (o al revés). La regla: primero los moles de la <b>sustancia</b>, después se multiplica por los átomos que haya <b>en la fórmula</b>.</p>" +
    ejemplo("Ejemplo resuelto: átomos de hidrógeno", "¿Cuántos átomos de hidrógeno hay en 3,4 g de NH₃? (N = 14; H = 1; N<sub>A</sub> = 6,022·10²³)", [
      "Masa molar: M(NH₃) = 14 + 3·1 = 17 g/mol.",
      "Moles: n = m/M = 3,4 / 17 = <b>0,20 mol</b> de NH₃.",
      "Moléculas: N = 0,20 · 6,022·10²³ = 1,204·10²³ moléculas.",
      "Cada molécula lleva 3 átomos de H: 1,204·10²³ · 3 = <b>3,61·10²³ átomos de H</b> (0,60 mol de átomos de H)."
    ]) +
    "<h5>Cuánto pesa una molécula</h5>" +
    "<p>Si 1 mol (N<sub>A</sub> moléculas) pesa M gramos, <b>una</b> molécula pesa M / N<sub>A</sub>. Para el agua: 18 / 6,022·10²³ = <b>2,99·10⁻²³ g</b>. Es un número diminuto, y por eso los químicos no cuentan moléculas sueltas sino moles.</p>" +
    "<h5>Hidratos: el agua también pesa</h5>" +
    "<p>En un hidrato como el CuSO₄·5H₂O, el «·5H₂O» es <b>agua de cristalización</b>: forma parte de la sal sólida y <b>cuenta en la masa molar</b>. Los problemas de hidratos se resuelven con la misma idea: la sal anhidra y el agua se miden cada una en moles.</p>" +
    ejemplo("Ejemplo resuelto: un hidrato", "¿Qué masa de CuSO₄·5H₂O (Cu = 63,5; S = 32; O = 16; H = 1) contiene 0,10 mol de CuSO₄? ¿Cuánta agua lleva?", [
      "M(CuSO₄) = 63,5 + 32 + 4·16 = 159,5 g/mol. M(5 H₂O) = 5 · 18 = 90 g/mol.",
      "M(CuSO₄·5H₂O) = 159,5 + 90 = <b>249,5 g/mol</b>.",
      "Cada mol de hidrato contiene 1 mol de CuSO₄, así que 0,10 mol de CuSO₄ vienen en 0,10 mol de hidrato: m = 0,10 · 249,5 = <b>24,95 g</b>.",
      "De esos 24,95 g, el agua es 0,10 · 90 = <b>9,0 g</b> (el 36 %)."
    ]) +
    ejemplo("Ejemplo resuelto: de litros a todo lo demás", "Un recipiente contiene 5,6 L de CO₂ en condiciones normales. Calcula los moles, los gramos, las moléculas y los átomos de oxígeno. (C = 12; O = 16)", [
      "Moles: n = V/22,4 = 5,6 / 22,4 = <b>0,25 mol</b>.",
      "Gramos: M(CO₂) = 44 g/mol → m = 0,25 · 44 = <b>11 g</b>.",
      "Moléculas: N = 0,25 · 6,022·10²³ = <b>1,51·10²³</b>.",
      "Átomos de O: 2 por molécula → 2 · 1,5055·10²³ = <b>3,01·10²³ átomos de O</b>."
    ]) +
    ojo("Las masas atómicas de los exámenes de Madrid vienen en el enunciado (a menudo redondeadas: Cl = 35,5; Cu = 63,5). Usa <em>siempre</em> las que te dan, aunque en tu tabla aparezcan con más decimales; si no te dicen nada, redondea al entero más próximo salvo Cl (35,5) y Cu (63,5).")
  );

  // ---------------------------------------------------------------- 2. Concentración
  secciones[1] = env(
    "<h5>Siete formas de decir «cuánto soluto hay»</h5>" +
    "<p>Una disolución tiene <b>soluto</b> (lo que se disuelve) y <b>disolvente</b> (en lo que se disuelve, normalmente agua). Hay muchas maneras de expresar la proporción, y los problemas de Selectividad obligan a <b>saltar de una a otra</b>. Lo importante es lo que lleva en el denominador: ¿litros de <em>disolución</em>?, ¿kilogramos de <em>disolvente</em>?, ¿moles <em>totales</em>?</p>" +
    tabla(["Magnitud", "Definición", "Unidades", "¿Cambia con T?"], [
      ["% en masa", "(masa de soluto / masa de disolución) · 100", "%", "no"],
      ["% en volumen (grado alcohólico)", "(volumen de soluto / volumen de disolución) · 100", "% o «º»", "sí, un poco"],
      ["Concentración en masa", "masa de soluto / volumen de disolución", "g/L", "sí"],
      ["Molaridad M", "moles de soluto / <b>litros de disolución</b>", "mol/L (M)", "sí"],
      ["Molalidad m", "moles de soluto / <b>kg de disolvente</b>", "mol/kg", "no"],
      ["Fracción molar x", "moles del componente / moles totales", "sin unidades", "no"],
      ["ppm", "mg de soluto / kg de disolución (≈ mg/L en agua diluida)", "ppm", "no"]
    ], "q3t") +
    "<p>Las que dependen de un <b>volumen</b> cambian al calentar (el líquido se dilata: los mismos moles quedan repartidos en más volumen); las que usan solo <b>masas o moles</b> no. Por eso la molalidad se prefiere cuando la temperatura varía. Cuidado con la letra: la molaridad se escribe <b>M</b> (mayúscula) y la molalidad <b>m</b> (minúscula), y en los apuntes la m también se usa para «masa». En un examen, escribe siempre la unidad (mol/L o mol/kg) y no habrá confusión.</p>" +
    "<h5>La receta universal: imagina una cantidad cómoda</h5>" +
    "<p>Para pasar de una expresión a otra no hace falta ninguna fórmula especial: <b>inventa una cantidad de disolución</b> que te simplifique las cuentas (1 L si te piden molaridad; 100 g si te dan un %), y calcula con ella todo lo demás. La concentración no depende de la cantidad que imagines.</p>" +
    ejemplo("Ejemplo resuelto: HCl comercial", "El ácido clorhídrico comercial tiene una riqueza del 37 % en masa y una densidad de 1,19 g/mL. Calcula su molaridad, su molalidad y la fracción molar de HCl. (H = 1; Cl = 35,5; O = 16)", [
      "Imaginamos <b>1 L = 1000 mL</b> de disolución. Masa: 1000 · 1,19 = 1190 g de disolución.",
      "Masa de HCl puro: 37 % de 1190 = 0,37 · 1190 = 440,3 g. Moles: n = 440,3 / 36,5 = 12,06 mol. Como es en 1 L: <b>M = 12,06 mol/L</b>.",
      "Masa de agua (disolvente): 1190 − 440,3 = 749,7 g = 0,7497 kg. <b>Molalidad = 12,06 / 0,7497 = 16,09 mol/kg</b>.",
      "Moles de agua: 749,7 / 18 = 41,65 mol. <b>x(HCl) = 12,06 / (12,06 + 41,65) = 0,2246</b>.",
      "Atajo para la molaridad: M = " + fr("10 · % · d", "M<sub>soluto</sub>") + " = " + fr("10 · 37 · 1,19", "36,5") + " = 12,06 mol/L (el 10 sale de pasar de «por 100 g» a «por 1000 mL»)."
    ]) +
    w("q4_disolucion") +
    "<p>En el simulador, elige «datos: % en masa y densidad» y observa la barra: la masa de soluto es solo una parte de la masa de la disolución. Y fíjate en cómo la molaridad (con el volumen de <em>disolución</em>) es más pequeña que la molalidad (con la masa de <em>disolvente</em>) cuando la disolución es concentrada.</p>" +
    ejemplo("Ejemplo resuelto: de molalidad a molaridad", "Una disolución de NaOH es 2,00 molal y su densidad es 1,06 g/mL. Calcula su molaridad. (Na = 23; O = 16; H = 1)", [
      "Imaginamos <b>1 kg de disolvente</b> (agua) con 2,00 mol de NaOH: m(NaOH) = 2 · 40 = 80 g.",
      "Masa de la disolución = 1000 + 80 = 1080 g. Volumen = 1080 / 1,06 = 1018,9 mL = 1,0189 L.",
      "<b>M = 2,00 / 1,0189 = 1,96 mol/L</b>. Sale algo menor que la molalidad, porque 1 kg de agua más el soluto ocupa más de 1 L."
    ]) +
    "<h5>Preparar y diluir disoluciones</h5>" +
    "<p>Al diluir se añade disolvente, pero <b>los moles de soluto no cambian</b>: n = M₁V₁ = M₂V₂. Eso vale para cualquier unidad de volumen mientras sea la misma a los dos lados. Si partes de un reactivo comercial, primero necesitas su molaridad (con el % y la densidad) y luego aplicas la dilución.</p>" +
    ejemplo("Ejemplo resuelto: preparar una disolución a partir del reactivo comercial", "Se quieren preparar 250 mL de HCl 0,5 M a partir del HCl comercial anterior (12,06 M). ¿Qué volumen hay que tomar?", [
      "Moles que debe tener la disolución final: n = 0,5 mol/L · 0,250 L = 0,125 mol.",
      "Esos moles salen del comercial: V₁ = n / M₁ = 0,125 / 12,06 = 0,01036 L = <b>10,4 mL</b>.",
      "(O directamente: M₁V₁ = M₂V₂ → V₁ = 0,5 · 250 / 12,06 = 10,4 mL.)"
    ]) +
    "<p><b>Procedimiento de laboratorio</b> (se pregunta con frecuencia): (1) con una <b>pipeta</b> (o una probeta, si no hace falta precisión) se miden 10,4 mL del ácido comercial; (2) se vierten en un <b>matraz aforado</b> de 250 mL que ya contiene algo de agua destilada (<b>el ácido sobre el agua, nunca al revés</b>, porque se calienta); (3) se completa con agua destilada hasta la <b>línea de enrase</b>; (4) se tapa y se agita para homogeneizar.</p>" +
    w("q4_dilucion") +
    ejemplo("Ejemplo resuelto: mezclar dos disoluciones", "Se mezclan 200 mL de NaCl 0,5 M con 300 mL de NaCl 2,0 M. Calcula la molaridad de la mezcla (volúmenes aditivos).", [
      "Moles de la primera: 0,5 · 0,200 = 0,10 mol. Moles de la segunda: 2,0 · 0,300 = 0,60 mol.",
      "Se suman los moles y se suman los volúmenes: n = 0,70 mol; V = 0,500 L.",
      "<b>M = 0,70 / 0,500 = 1,4 mol/L</b>. Cae entre las dos de partida (0,5 y 2,0), más cerca de la que aporta más volumen."
    ]) +
    "<h5>Electrolitos: la concentración de cada ion</h5>" +
    "<p>Las sales y los ácidos y bases fuertes se disocian <b>por completo</b> en agua. La concentración de cada ion es la de la sustancia multiplicada por el número de iones de ese tipo en la fórmula: Al₂(SO₄)₃ 0,20 M → Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻ → <b>[Al³⁺] = 0,40 M</b> y <b>[SO₄²⁻] = 0,60 M</b>. Igual, CaCl₂ 0,10 M da [Ca²⁺] = 0,10 M y [Cl⁻] = <b>0,20 M</b>. Es la base de los cálculos de pH, de precipitación y de equilibrio de los temas siguientes.</p>" +
    "<h5>El grado alcohólico</h5>" +
    "<p>Un vino de 12 º tiene 12 mL de etanol por cada 100 mL de vino (% en <b>volumen</b>). Para pasarlo a molaridad hace falta la densidad del etanol (0,79 g/mL) y su masa molar (46 g/mol): en 1 L de vino hay 120 mL de etanol → 120 · 0,79 = 94,8 g → 94,8 / 46 = <b>2,06 mol</b>, es decir, ≈ 2,06 M.</p>" +
    ojo("(1) Para pasar de % a molaridad necesitas la <b>densidad</b>; si el enunciado no la da, no se puede. (2) No confundas la masa de la <em>disolución</em> con la del <em>disolvente</em>: la molalidad usa solo la del disolvente. (3) Al mezclar o diluir, no se suman las <em>concentraciones</em>, se suman los <em>moles</em> y los <em>volúmenes</em>.")
  );

  // ---------------------------------------------------------------- 3. Gases ideales
  secciones[2] = env(
    "<h5>De dónde sale PV = nRT</h5>" +
    "<p>La ecuación de los gases ideales junta cuatro leyes experimentales: Boyle (P·V constante a T fija), Charles (V/T constante a P fija), Gay-Lussac (P/T constante a V fijo) y Avogadro (a igual P y T, el volumen es proporcional a los moles). Si P, V y T cambian a la vez con la <b>misma cantidad</b> de gas, se usa la ley combinada P₁V₁/T₁ = P₂V₂/T₂. Y si lo que quieres son <b>moles</b> o la <b>masa</b> del gas, <b>PV = nRT</b>.</p>" +
    "<p>El valor de R depende de las unidades. La trampa más frecuente es <b>mezclar la R con las unidades equivocadas</b>: si la presión viene en mmHg o en kPa, o conviertes a atm, o cambias de R.</p>" +
    tabla(["Presión", "Volumen", "R que debes usar"], [
      ["atm", "L", "0,082 atm·L/(mol·K)"],
      ["mmHg", "L", "62,4 mmHg·L/(mol·K)"],
      ["kPa", "L", "8,31 kPa·L/(mol·K)"],
      ["Pa", "m³", "8,31 J/(mol·K) = 8,31 Pa·m³/(mol·K)"]
    ], "q3t") +
    "<p>Equivalencias de presión: <b>1 atm = 760 mmHg = 101 325 Pa ≈ 101,3 kPa ≈ 1,013 bar</b>. Y de volumen: 1 L = 1 dm³ = 10⁻³ m³. La temperatura, <b>siempre en kelvin</b>: K = °C + 273.</p>" +
    ejemplo("Ejemplo resuelto: moles de un gas", "¿Cuántos moles hay en 5,0 L de un gas a 27 °C y 2,0 atm? (R = 0,082 atm·L/(mol·K))", [
      "T = 27 + 273 = 300 K.",
      "n = " + fr("PV", "RT") + " = " + fr("2,0 · 5,0", "0,082 · 300") + " = " + fr("10", "24,6") + " = <b>0,407 mol</b>."
    ]) +
    ejemplo("Ejemplo resuelto: presión en mmHg", "¿Qué volumen ocupan 1,5 mol de gas a 20 °C y 740 mmHg?", [
      "Pasamos la presión a atm: P = 740 / 760 = 0,974 atm. T = 20 + 273 = 293 K.",
      "V = " + fr("nRT", "P") + " = " + fr("1,5 · 0,082 · 293", "0,974") + " = <b>37,0 L</b>.",
      "(Si prefieres no convertir, usa R = 62,4 mmHg·L/(mol·K): V = 1,5 · 62,4 · 293 / 740 = 37,1 L; coincide salvo redondeo.)"
    ]) +
    "<h5>Condiciones normales y condiciones ambientales</h5>" +
    "<p>Las <b>condiciones normales</b> (CN) son 0 °C y 1 atm, y en ellas 1 mol de cualquier gas ideal ocupa <b>22,4 L</b>. Pero ese 22,4 <b>no es universal</b>: a 25 °C y 1 atm, V<sub>m</sub> = RT/P = 0,082 · 298 / 1 = <b>24,4 L/mol</b>. Si el enunciado dice «a 25 °C», usa PV = nRT; el 22,4 L/mol solo se usa cuando dice «en condiciones normales».</p>" +
    "<h5>Masa molar y densidad de un gas</h5>" +
    "<p>Como n = m/M, la ecuación se puede escribir PV = (m/M)·RT. De ahí salen dos fórmulas muy útiles: <b>M = " + fr("m·R·T", "P·V") + "</b> (la masa molar a partir de una medida de masa, volumen, presión y temperatura) y <b>d = " + fr("P·M", "R·T") + "</b> (la densidad de un gas). En condiciones normales, d = M / 22,4.</p>" +
    ejemplo("Ejemplo resuelto: identificar un gas", "1,10 g de un gas ocupan 0,615 L a 27 °C y 1,0 atm. Calcula su masa molar. ¿Puede ser CO₂? (C = 12; O = 16)", [
      "T = 300 K. M = " + fr("m·R·T", "P·V") + " = " + fr("1,10 · 0,082 · 300", "1,0 · 0,615") + " = " + fr("27,06", "0,615") + " = <b>44,0 g/mol</b>.",
      "M(CO₂) = 12 + 32 = 44 g/mol: sí, es compatible con el CO₂."
    ]) +
    w("qq1_densidad") +
    "<p>A la misma presión y temperatura, la densidad solo depende de la masa molar: el CO₂ (44) es más denso que el aire (≈ 29) y «cae»; el helio (4) es mucho menos denso y «flota». A 25 °C y 1 atm, d(CO₂) = 1 · 44 / (0,082 · 298) = <b>1,80 g/L</b>, frente a 1,19 g/L del aire. Y si calientas el aire (T mayor), su densidad baja: así vuela un globo aerostático.</p>" +
    "<h5>Mezclas de gases: Dalton</h5>" +
    "<p>En una mezcla de gases ideales, cada gas se comporta como si estuviera solo en el recipiente. La <b>presión parcial</b> pᵢ de un gas es la que ejercería él solo, y las presiones parciales <b>suman la presión total</b>: P<sub>T</sub> = Σ pᵢ. Además pᵢ = xᵢ · P<sub>T</sub> = nᵢRT/V, donde xᵢ = nᵢ / n<sub>T</sub> es la fracción molar. Como en los gases el volumen es proporcional a los moles, el <b>% en volumen</b> de una mezcla gaseosa coincide con el % en moles (por eso se dice que el aire es un 21 % de O₂ y ese número sirve tanto para volumen como para moles).</p>" +
    ejemplo("Ejemplo resuelto: presiones parciales", "En un recipiente de 10 L, a 27 °C, hay 8,0 g de He y 16 g de O₂. Calcula la presión total y la presión parcial de cada gas. (He = 4; O = 16)", [
      "n(He) = 8,0 / 4 = 2,0 mol. n(O₂) = 16 / 32 = 0,50 mol. n<sub>T</sub> = 2,5 mol. T = 300 K.",
      "P<sub>T</sub> = " + fr("n<sub>T</sub>RT", "V") + " = " + fr("2,5 · 0,082 · 300", "10") + " = <b>6,15 atm</b>.",
      "x(He) = 2,0 / 2,5 = 0,80 → p(He) = 0,80 · 6,15 = <b>4,92 atm</b>. x(O₂) = 0,20 → p(O₂) = 0,20 · 6,15 = <b>1,23 atm</b>.",
      "Comprobación: 4,92 + 1,23 = 6,15 atm ✓."
    ]) +
    w("q4_dalton") +
    "<h5>Gas ideal y gas real</h5>" +
    "<p>El modelo ideal supone partículas sin volumen propio y sin fuerzas entre ellas. Funciona bien con <b>presiones bajas y temperaturas altas</b>, donde las moléculas están lejos unas de otras. A presiones altas o temperaturas próximas a la de licuación, el volumen de las moléculas y las atracciones entre ellas importan, y PV = nRT deja de ser exacta. En Selectividad se supone siempre gas ideal, salvo que el enunciado diga otra cosa.</p>"
  );

  // ---------------------------------------------------------------- 4. Estequiometría con disoluciones y gases
  secciones[3] = env(
    "<h5>La cadena de siempre, con dos entradas y dos salidas</h5>" +
    "<p>El cálculo estequiométrico tiene siempre el mismo esqueleto: <b>dato → moles del dato → moles de la incógnita (con los coeficientes) → incógnita</b>. Lo único que cambia es <em>cómo entras</em> y <em>cómo sales</em> del mol, según el estado de la sustancia:</p>" +
    tabla(["Si el dato (o la incógnita) es…", "Para entrar/salir del mol"], [
      ["una masa de sólido o líquido", "n = m / M"],
      ["un volumen de disolución de concentración conocida", "n = M · V (V en litros)"],
      ["un gas en condiciones normales", "n = V / 22,4"],
      ["un gas a P y T dadas", "n = PV / RT"],
      ["un número de partículas", "n = N / N<sub>A</sub>"]
    ], "q3t") +
    ejemplo("Ejemplo resuelto: de gramos de metal a litros de gas", "El Zn reacciona con HCl: Zn + 2 HCl → ZnCl₂ + H₂. Con 13,08 g de Zn y HCl en exceso, ¿qué volumen de H₂ se recoge a 25 °C y 1 atm? (Zn = 65,4)", [
      "Moles de Zn: n = 13,08 / 65,4 = <b>0,20 mol</b>.",
      "Proporción 1 Zn : 1 H₂ → se forman 0,20 mol de H₂.",
      "Volumen: V = " + fr("nRT", "P") + " = " + fr("0,20 · 0,082 · 298", "1") + " = <b>4,89 L</b> (con 22,4 saldrían 4,48 L: error, porque no son condiciones normales)."
    ]) +
    ejemplo("Ejemplo resuelto: de una disolución a otra", "¿Qué volumen de H₂SO₄ 0,5 M neutraliza 25 mL de NaOH 0,8 M? H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O.", [
      "Moles de NaOH: n = 0,8 · 0,025 = 0,020 mol.",
      "Proporción 1 H₂SO₄ : 2 NaOH → n(H₂SO₄) = 0,020 / 2 = 0,010 mol.",
      "Volumen: V = n / M = 0,010 / 0,5 = 0,020 L = <b>20 mL</b>."
    ]) +
    ejemplo("Ejemplo resuelto: gas desprendido de una disolución, en condiciones no normales", "Se añade CaCO₃ en exceso a 50 mL de HCl 2 M: CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂. Calcula el volumen de CO₂ a 20 °C y 740 mmHg.", [
      "Moles de HCl: n = 2 · 0,050 = 0,10 mol. Proporción 2 HCl : 1 CO₂ → n(CO₂) = 0,050 mol.",
      "P = 740 / 760 = 0,974 atm; T = 293 K.",
      "V = " + fr("0,050 · 0,082 · 293", "0,974") + " = <b>1,23 L</b>."
    ]) +
    "<h5>Gas con gas: volúmenes de combinación</h5>" +
    "<p>Si todos los gases están a la <b>misma presión y temperatura</b>, el volumen es proporcional a los moles (Avogadro), así que los <b>coeficientes de la ecuación sirven directamente como proporción de volúmenes</b>, sin pasar por los moles. Es la ley de Gay-Lussac de los volúmenes de combinación.</p>" +
    ejemplo("Ejemplo resuelto: combustión de un gas", "Se queman 10 L de propano: C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O(l). ¿Qué volumen de O₂ hace falta y qué volumen de CO₂ se forma, a igual P y T?", [
      "Proporción en volumen: 1 C₃H₈ : 5 O₂ : 3 CO₂.",
      "V(O₂) = 10 · 5 = <b>50 L</b>. V(CO₂) = 10 · 3 = <b>30 L</b>.",
      "El agua es líquida: no cuenta como gas. Si saliera como vapor, también contaría (4 · 10 = 40 L)."
    ]) +
    w("q5_gases") +
    ojo("Los coeficientes ajustan <b>moles</b> (y volúmenes de gas a igual P y T), <b>nunca gramos</b>. «2 H₂ + O₂ → 2 H₂O» no significa que 2 g de H₂ reaccionen con 1 g de O₂: son 2 mol de H₂ (4 g) con 1 mol de O₂ (32 g).")
  );

  B.parte.q2t1a = { secciones: secciones };
})(window);
