/* ============================================================
   Química II · ampliaciones · Tema 7: Ácidos y bases
   (parte B: secciones nuevas 5 a 11)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t7/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5
    {
      h: "5. Mezclas de ácido y base: quién sobra decide el pH",
      html: env(
        "<h5>El método en cuatro pasos</h5>" +
        "<p>Cuando se mezclan un ácido fuerte y una base fuerte, la reacción es completa y <b>solo importa lo que sobra</b>. Siempre en este orden:</p>" +
        "<ol><li><b>Moles</b> de H⁺ y de OH⁻ (concentración × volumen, sin olvidar el nº de H⁺ u OH⁻ por fórmula).</li>" +
        "<li><b>Reacción</b> H⁺ + OH⁻ → H₂O: se restan; el que tenga menos se acaba.</li>" +
        "<li><b>Concentración del exceso</b> = moles que sobran / <b>volumen total</b> (suma de los dos volúmenes).</li>" +
        "<li><b>pH</b>: del exceso de H⁺ (pH = −log) o del de OH⁻ (pOH → pH). Si no sobra nada, pH = 7 (sales de ácido y base fuertes).</li></ol>" +
        ejemplo("Ejemplo resuelto: sobra ácido", "Se mezclan 50 mL de HCl 0,1 mol/L con 50 mL de NaOH 0,06 mol/L. Calcula el pH.", [
          "n(H⁺) = 0,050 · 0,1 = 5,0·10⁻³ mol. n(OH⁻) = 0,050 · 0,06 = 3,0·10⁻³ mol.",
          "Reaccionan 3,0·10⁻³ mol de cada uno. Sobran 5,0·10⁻³ − 3,0·10⁻³ = <b>2,0·10⁻³ mol de H⁺</b>.",
          "Volumen total = 100 mL = 0,100 L → [H⁺] = 2,0·10⁻³ / 0,100 = 0,020 mol/L.",
          "pH = −log 0,020 = <b>1,70</b>."
        ]) +
        ejemplo("Ejemplo resuelto: sobra base", "Se mezclan 30 mL de NaOH 0,1 mol/L con 20 mL de HCl 0,05 mol/L. Calcula el pH.", [
          "n(OH⁻) = 0,030 · 0,1 = 3,0·10⁻³ mol. n(H⁺) = 0,020 · 0,05 = 1,0·10⁻³ mol.",
          "Sobran 3,0·10⁻³ − 1,0·10⁻³ = <b>2,0·10⁻³ mol de OH⁻</b> en 50 mL: [OH⁻] = 2,0·10⁻³ / 0,050 = 0,040 mol/L.",
          "pOH = −log 0,040 = 1,40 → pH = 14 − 1,40 = <b>12,60</b>."
        ]) +
        ejemplo("Ejemplo resuelto: con un hidróxido de dos OH⁻", "Se mezclan 20 mL de Ba(OH)₂ 0,04 mol/L con 30 mL de HCl 0,1 mol/L. Calcula el pH.", [
          "n(OH⁻) = 2 · 0,020 · 0,04 = 1,6·10⁻³ mol (cada Ba(OH)₂ da 2 OH⁻). n(H⁺) = 0,030 · 0,1 = 3,0·10⁻³ mol.",
          "Sobran 3,0·10⁻³ − 1,6·10⁻³ = <b>1,4·10⁻³ mol de H⁺</b> en 50 mL → [H⁺] = 0,028 mol/L.",
          "pH = −log 0,028 = <b>1,55</b>."
        ]) +
        ejemplo("Ejemplo resuelto: dos ácidos fuertes", "Se mezclan 100 mL de HCl 0,1 mol/L con 100 mL de HNO₃ 0,3 mol/L. ¿Qué pH resulta?", [
          "No hay reacción entre ellos, solo se suman los H⁺: n(H⁺) = 0,1 · 0,1 + 0,1 · 0,3 = 0,010 + 0,030 = 0,040 mol.",
          "Volumen total 0,200 L → [H⁺] = 0,040 / 0,200 = 0,20 mol/L → pH = <b>0,70</b>.",
          "Un error frecuente es hacer la <b>media de pH</b> (1,00 y 0,52 → 0,76): con una escala logarítmica los pH no se promedian; se promedian las <b>concentraciones</b> (ponderadas por el volumen)."
        ]) +
        ojo("Divide siempre por el <b>volumen total</b>, no por el de uno solo de los reactivos. Y esta receta es para ácidos y bases <b>fuertes</b>: si uno es débil, lo que queda tras la reacción es una mezcla reguladora (sección 7) o una sal que se hidroliza (sección 6), y el pH se calcula de otra manera.")
      )
    },
    // ------------------------------------------------------------ 6
    {
      h: "6. Hidrólisis de sales: por qué el acetato de sodio es básico",
      html: env(
        "<h5>Las sales no siempre son neutras</h5>" +
        "<p>Una sal es un compuesto iónico: al disolverse se separa por completo en sus iones. La mayoría de las veces se escribe que una neutralización forma «sal + agua» y se da por hecho que la disolución es neutra... pero no siempre lo es. Los iones de una sal pueden reaccionar con el agua, y a eso se le llama <b>hidrólisis</b>. Un ion reacciona con el agua <b>solo si es el conjugado de un ácido o base débil</b>:</p>" +
        "<ul><li>El <b>anión</b> de un <b>ácido débil</b> (CH₃COO⁻, CN⁻, F⁻, CO₃²⁻) es una base: A⁻ + H₂O ⇌ HA + OH⁻ → pH &gt; 7.</li>" +
        "<li>El <b>catión</b> de una <b>base débil</b> (NH₄⁺, CH₃NH₃⁺) es un ácido: BH⁺ + H₂O ⇌ B + H₃O⁺ → pH &lt; 7.</li>" +
        "<li>Los iones de ácidos o bases <b>fuertes</b> (Na⁺, K⁺, Ca²⁺, Cl⁻, NO₃⁻, SO₄²⁻ en 1.ª) son espectadores: <b>no reaccionan</b>.</li></ul>" +
        tabla(["Sal de…", "Ejemplos", "Qué se hidroliza", "pH"], [
          ["ácido fuerte + base fuerte", "NaCl, KNO₃, Na₂SO₄", "nada", "= 7"],
          ["ácido débil + base fuerte", "CH₃COONa, NaCN, NaF", "el anión (da OH⁻)", "&gt; 7"],
          ["ácido fuerte + base débil", "NH₄Cl, NH₄NO₃", "el catión (da H₃O⁺)", "&lt; 7"],
          ["ácido débil + base débil", "CH₃COONH₄, NH₄CN, NH₄F", "los dos: gana el de K mayor", "depende"]
        ], "q3t") +
        "<p>La regla para recordarlo: <b>«el más fuerte gana»</b>. En NaCH₃COO, la base fuerte (NaOH) «gana» al ácido débil (CH₃COOH): la disolución es básica.</p>" +
        "<h5>Cómo se calcula</h5>" +
        "<p>El ion que se hidroliza es un ácido o base débil <b>con su propia constante</b>, que sale de K<sub>a</sub>·K<sub>b</sub> = K<sub>w</sub>: la <b>constante de hidrólisis</b> K<sub>h</sub>. Después es un ácido o base débil normal (sección 3), con x = [H₃O⁺] o [OH⁻] y concentración inicial c = la de la sal.</p>" +
        ejemplo("Ejemplo resuelto: sal de ácido débil (básica)", "Calcula el pH de una disolución de CH₃COONa 0,1 mol/L. K<sub>a</sub>(CH₃COOH) = 1,8·10⁻⁵.", [
          "Disociación completa: CH₃COONa → CH₃COO⁻ + Na⁺, ambos a 0,1 mol/L. El Na⁺ viene de una base fuerte: no reacciona.",
          "Hidrólisis: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, con K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = 10⁻¹⁴/1,8·10⁻⁵ = <b>5,6·10⁻¹⁰</b>.",
          "Tabla: c − x, x, x. K<sub>b</sub> = x²/(0,1 − x) ≈ x²/0,1 → x = √(5,6·10⁻¹⁰ · 0,1) = <b>7,5·10⁻⁶ mol/L</b> = [OH⁻]. (α = 0,007 %: la aproximación vale de sobra.)",
          "pOH = −log(7,5·10⁻⁶) = 5,13 → pH = 14 − 5,13 = <b>8,87</b>: ligeramente básica."
        ]) +
        ejemplo("Ejemplo resuelto: sal de base débil (ácida)", "Calcula el pH de una disolución de NH₄Cl 0,1 mol/L. K<sub>b</sub>(NH₃) = 1,8·10⁻⁵.", [
          "NH₄Cl → NH₄⁺ + Cl⁻. El Cl⁻ viene de un ácido fuerte: no reacciona. El NH₄⁺ es el ácido conjugado del NH₃, una base débil: se hidroliza.",
          "NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, con K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = 10⁻¹⁴/1,8·10⁻⁵ = <b>5,6·10⁻¹⁰</b>.",
          "x = √(K<sub>a</sub>·c) = √(5,6·10⁻¹⁰ · 0,1) = 7,5·10⁻⁶ mol/L = [H⁺].",
          "pH = −log(7,5·10⁻⁶) = <b>5,13</b>: ligeramente ácida. (Fíjate en la simetría con el ejemplo anterior: 5,13 y 8,87 suman 14.)"
        ]) +
        ejemplo("Ejemplo resuelto: cianuro de sodio", "Calcula el pH de NaCN 0,05 mol/L (K<sub>a</sub>(HCN) = 4,9·10⁻¹⁰) y razona si hay que resolver la cuadrática.", [
          "CN⁻ es la base conjugada de un ácido muy débil: K<sub>b</sub> = 10⁻¹⁴/4,9·10⁻¹⁰ = 2,04·10⁻⁵ (¡casi igual que el NH₃!).",
          "x = √(2,04·10⁻⁵ · 0,05) = 1,01·10⁻³ mol/L = [OH⁻]. α = x/c = 2,0 % &lt; 5 %: la aproximación vale.",
          "pOH = 3,00 → pH = <b>11,00</b>. El NaCN 0,05 mol/L es casi tan básico como el NH₃ 0,05 mol/L (pH 10,98), porque K<sub>b</sub>(CN⁻) y K<sub>b</sub>(NH₃) valen prácticamente lo mismo."
        ]) +
        w("q7_sal") +
        "<h5>Cuando los dos iones son débiles</h5>" +
        "<p>En NH₄CH₃COO el catión es un ácido débil (K<sub>a</sub> = 5,6·10⁻¹⁰) y el anión una base débil (K<sub>b</sub> = 5,6·10⁻¹⁰). Se hidrolizan los dos y <b>gana el de constante mayor</b>: aquí son iguales, así que el pH es 7 (aunque no hay un ion «neutro»: simplemente se compensan). En NH₄CN gana la base (2,0·10⁻⁵ frente a 5,6·10⁻¹⁰) y la disolución es básica. Con las dos constantes, y sin importar la concentración, un cálculo aproximado da <b>pH = 7 + ½(pK<sub>a</sub> − pK<sub>b</sub>)</b> (ácido débil de origen del anión, base débil de origen del catión): para NH₄CN, 7 + ½(9,31 − 4,74) = 9,28.</p>" +
        ojo("La hidrólisis <b>no es</b> la disociación de la sal (esa es total): es la reacción de uno de sus <b>iones</b> con el agua, y es pequeña. Y no hidrolices el Na⁺, el K⁺ ni el Cl⁻: «el ion de una base o ácido fuerte no reacciona».")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Disoluciones reguladoras (tampones)",
      html: env(
        "<h5>Qué son y por qué existen</h5>" +
        "<p>Una disolución <b>reguladora</b> (tampón o buffer) es la que mantiene casi constante su pH al añadirle pequeñas cantidades de ácido o de base, o al diluirla. Es la clave de la sangre (pH 7,4 ± 0,05), del interior de las células y de muchos medicamentos y alimentos. La receta es siempre la misma:</p>" +
        "<div class='formula-wrap'><div class='formula'>un ácido débil + su base conjugada &nbsp;&nbsp;(CH₃COOH + CH₃COONa) &nbsp;&nbsp;o&nbsp;&nbsp; una base débil + su ácido conjugado &nbsp;&nbsp;(NH₃ + NH₄Cl)</div></div>" +
        "<p>Funciona por una razón muy sencilla: si entra un ácido fuerte (H⁺), lo neutraliza la <b>base conjugada</b> (A⁻ + H⁺ → HA); si entra una base fuerte (OH⁻), lo neutraliza el <b>ácido débil</b> (HA + OH⁻ → A⁻ + H₂O). Ninguna de las dos reacciones deja H⁺ o OH⁻ libres, solo cambia la proporción [A⁻]/[HA], y el pH depende de ese cociente, no del valor absoluto de las concentraciones.</p>" +
        "<h5>La ecuación de Henderson–Hasselbalch</h5>" +
        "<p>De K<sub>a</sub> = [A⁻][H⁺]/[HA] se despeja [H⁺] = K<sub>a</sub>·[HA]/[A⁻]; tomando −log:</p>" +
        "<div class='formula-wrap'><div class='formula'>pH = pK<sub>a</sub> + log ( [base] / [ácido] )</div></div>" +
        "<p>Se usa con las concentraciones <b>iniciales</b> (en la mezcla), porque el ácido débil se disocia muy poco y la base conjugada procede casi toda de la sal (hay que comprobarlo: es válida si las dos concentraciones son mucho mayores que [H⁺] y que K<sub>a</sub>). Como el cociente se calcula con moles, <b>no depende del volumen</b> ni de la dilución. Consecuencias: con [base] = [ácido], pH = pK<sub>a</sub>; cada factor 10 en el cociente mueve el pH una unidad; la zona útil es <b>pK<sub>a</sub> ± 1</b>.</p>" +
        ejemplo("Ejemplo resuelto: pH de un tampón", "Calcula el pH de una disolución que contiene CH₃COOH 0,1 mol/L y CH₃COONa 0,1 mol/L, y el de otra con CH₃COOH 0,2 mol/L y CH₃COONa 0,1 mol/L. K<sub>a</sub> = 1,8·10⁻⁵.", [
          "pK<sub>a</sub> = −log(1,8·10⁻⁵) = 4,74.",
          "Primera: [base]/[ácido] = 1 → pH = 4,74 + log 1 = <b>4,74</b>.",
          "Segunda: [base]/[ácido] = 0,1/0,2 = 0,5 → pH = 4,74 + log 0,5 = 4,74 − 0,30 = <b>4,44</b>.",
          "Más ácido que base → pH por debajo del pK<sub>a</sub>; más base que ácido → por encima."
        ]) +
        ejemplo("Ejemplo resuelto: ¿cuánto resiste?", "A 100 mL del tampón CH₃COOH 0,1 mol/L / CH₃COONa 0,1 mol/L se añaden 1,0 mmol de HCl (sin cambio de volumen). Calcula el pH y compáralo con el que tendría 100 mL de agua con el mismo HCl.", [
          "Moles iniciales en 100 mL: 10 mmol de CH₃COOH y 10 mmol de CH₃COO⁻.",
          "El HCl (1,0 mmol de H⁺) reacciona con el acetato: CH₃COO⁻ + H⁺ → CH₃COOH. Quedan 10 − 1 = <b>9</b> mmol de acetato y 10 + 1 = <b>11</b> mmol de ácido.",
          "pH = 4,74 + log(9/11) = 4,74 − 0,09 = <b>4,66</b> (cambia solo 0,09 unidades).",
          "En agua pura: [H⁺] = 1,0 mmol/100 mL = 0,010 mol/L → pH = <b>2,00</b>: cae 5 unidades (la [H⁺] se multiplica por 100.000), mientras que en el tampón solo se multiplica por 1,2."
        ]) +
        ejemplo("Ejemplo resuelto: hacer un tampón con una valoración parcial", "A 25 mL de CH₃COOH 0,1 mol/L se añaden 10 mL de NaOH 0,1 mol/L. Calcula el pH.", [
          "n(CH₃COOH) = 0,025 · 0,1 = 2,5 mmol. n(OH⁻) = 0,010 · 0,1 = 1,0 mmol. Reaccionan: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O.",
          "Quedan 2,5 − 1,0 = <b>1,5 mmol de CH₃COOH</b> y se forman <b>1,0 mmol de CH₃COO⁻</b>: es un tampón.",
          "pH = 4,74 + log(1,0/1,5) = 4,74 − 0,18 = <b>4,57</b>.",
          "Cuando se ha añadido <b>la mitad</b> de la base de equivalencia, [ácido] = [base] y <b>pH = pK<sub>a</sub></b>: así se mide experimentalmente el pK<sub>a</sub> de un ácido débil."
        ]) +
        ejemplo("Ejemplo resuelto: el tampón de la sangre", "El principal tampón de la sangre es H₂CO₃/HCO₃⁻ (K<sub>a</sub> = 4,5·10⁻⁷). ¿Qué cociente [HCO₃⁻]/[H₂CO₃] hay a pH 7,4?", [
          "pK<sub>a</sub> = −log(4,5·10⁻⁷) = 6,35.",
          "7,4 = 6,35 + log(cociente) → log(cociente) = 1,05 → cociente = 10<sup>1,05</sup> = <b>11,3</b>.",
          "Hay unas 11 veces más base (bicarbonato) que ácido (CO₂ disuelto): el tampón está pensado para neutralizar más ácido que base, que es lo que produce el metabolismo."
        ]) +
        w("q7_regul") +
        "<h5>Capacidad, intervalo y qué <i>no</i> es un tampón</h5>" +
        "<ul><li><b>Capacidad</b>: cantidad de ácido o base que aguanta antes de «agotarse». Crece con la concentración total (más moles de ácido y base). Cuando se acaba uno de los dos componentes, el pH salta como en el agua.</li>" +
        "<li><b>pH</b>: lo fija el pK<sub>a</sub> y el cociente base/ácido. Se elige el ácido débil con pK<sub>a</sub> cercano al pH que se quiere.</li>" +
        "<li><b>No lo es</b>: un ácido fuerte con su sal (HCl + NaCl), ni una base fuerte con su sal. Tampoco un ácido débil solo: le falta la base conjugada.</li></ul>" +
        ojo("En un tampón, el ácido y la base son <b>del mismo par conjugado</b>: CH₃COOH con CH₃COONa sí; CH₃COOH con NaCl no. Y al aplicar Henderson–Hasselbalch después de añadir un ácido o una base fuertes, hay que <b>reaccionar primero</b> (cambian los moles) y aplicar la ecuación <b>después</b>.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Curvas de valoración e indicadores",
      html: env(
        "<h5>La curva de valoración</h5>" +
        "<p>La curva de valoración representa el pH de la disolución en función del volumen de reactivo añadido. Siempre tiene la misma forma de «S»: cambia despacio al principio, <b>salta bruscamente</b> alrededor del punto de equivalencia y vuelve a cambiar despacio. Ese salto (varias unidades de pH con solo una gota) es lo que permite detectar el final con un indicador. Lo que cambia entre los casos es el pH <b>en el punto de equivalencia</b>, porque depende de la sal que se ha formado:</p>" +
        tabla(["Valoración", "Se forma…", "pH en la equivalencia", "Indicador adecuado"], [
          ["ácido fuerte con base fuerte (HCl + NaOH)", "NaCl (neutra)", "= 7", "azul de bromotimol (6,0–7,6); también fenolftaleína o rojo de metilo"],
          ["ácido débil con base fuerte (CH₃COOH + NaOH)", "CH₃COONa (básica)", "&gt; 7 (≈ 8,7)", "fenolftaleína (8,2–10,0)"],
          ["base débil con ácido fuerte (NH₃ + HCl)", "NH₄Cl (ácida)", "&lt; 7 (≈ 5,3)", "rojo de metilo (4,2–6,3) o naranja de metilo (3,1–4,4)"]
        ], "q3t") +
        w("q7_valora") +
        "<h5>Las cuatro zonas de la curva de un ácido débil</h5>" +
        "<ol><li><b>Inicio</b> (V = 0): solo hay ácido débil → pH de un ácido débil (sección 3).</li>" +
        "<li><b>Antes de la equivalencia</b>: ácido débil + su base conjugada → <b>tampón</b>, Henderson–Hasselbalch (sección 7). Es la parte «plana» inicial.</li>" +
        "<li><b>En la equivalencia</b>: solo la sal → <b>hidrólisis</b> del anión (sección 6) y pH &gt; 7.</li>" +
        "<li><b>Después</b>: sobra base fuerte → pH del exceso de OH⁻ (sección 5); la sal casi no cuenta.</li></ol>" +
        "<p>En medio, <b>en la semiequivalencia</b> (la mitad del volumen de equivalencia) [HA] = [A⁻] y pH = pK<sub>a</sub>.</p>" +
        ejemplo("Ejemplo resuelto: valoración fuerte-fuerte", "25 mL de HCl 0,1 mol/L se valoran con NaOH 0,1 mol/L. Calcula el volumen de equivalencia y el pH en V = 0, 12,5, 25 y 30 mL.", [
          "Equivalencia: C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>b</sub> → V<sub>b</sub> = 0,1·25/0,1 = <b>25 mL</b>.",
          "V = 0: [H⁺] = 0,1 → pH = <b>1,00</b>.",
          "V = 12,5 mL: n(H⁺) sobrante = 2,5 − 1,25 = 1,25 mmol en 37,5 mL → [H⁺] = 0,0333 → pH = <b>1,48</b>.",
          "V = 25 mL: se ha formado NaCl, que no se hidroliza → pH = <b>7,00</b>.",
          "V = 30 mL: n(OH⁻) sobrante = 3,0 − 2,5 = 0,5 mmol en 55 mL → [OH⁻] = 9,09·10⁻³ → pOH = 2,04 → pH = <b>11,96</b>.",
          "El salto es enorme: con solo 0,025 mL (media gota) antes y después de los 25 mL, el pH pasa de 4,30 a 9,70."
        ]) +
        ejemplo("Ejemplo resuelto: ácido débil con base fuerte", "25 mL de CH₃COOH 0,1 mol/L se valoran con NaOH 0,1 mol/L (K<sub>a</sub> = 1,8·10⁻⁵). Calcula el pH en la semiequivalencia y en la equivalencia, y elige un indicador.", [
          "Volumen de equivalencia: 25 mL. Semiequivalencia: V = 12,5 mL, con 1,25 mmol de ácido y 1,25 mmol de acetato → pH = pK<sub>a</sub> = <b>4,74</b>.",
          "Equivalencia: 2,5 mmol de CH₃COO⁻ en 50 mL → c = 0,05 mol/L. K<sub>b</sub> = 5,6·10⁻¹⁰; x = √(5,6·10⁻¹⁰ · 0,05) = 5,3·10⁻⁶ mol/L = [OH⁻].",
          "pOH = 5,28 → pH = <b>8,72</b>.",
          "El indicador debe virar <b>alrededor de 8,7</b>: la <b>fenolftaleína</b> (8,2–10,0). El rojo de metilo (4,2–6,3) viraría cuando solo se ha gastado la mitad: error enorme."
        ]) +
        ejemplo("Ejemplo resuelto: base débil con ácido fuerte", "20 mL de NH₃ 0,2 mol/L se valoran con HCl 0,1 mol/L (K<sub>b</sub> = 1,8·10⁻⁵). Calcula el volumen de equivalencia, el pH en la equivalencia y elige un indicador.", [
          "Equivalencia: C<sub>b</sub>V<sub>b</sub> = C<sub>a</sub>V<sub>a</sub> → V<sub>a</sub> = 0,2·20/0,1 = <b>40 mL</b>.",
          "En la equivalencia hay 4,0 mmol de NH₄⁺ en 60 mL → c = 0,0667 mol/L. K<sub>a</sub>(NH₄⁺) = 5,6·10⁻¹⁰.",
          "x = √(5,6·10⁻¹⁰ · 0,0667) = 6,1·10⁻⁶ mol/L = [H⁺] → pH = <b>5,22</b>.",
          "Indicador: <b>rojo de metilo</b> (4,2–6,3), que incluye 5,22. La fenolftaleína (8,2–10) no sirve: la disolución parte de pH 11 (rosa) y se volvería incolora al pasar de pH 8,2, cuando todavía queda amoníaco sin neutralizar (el final se «detectaría» demasiado pronto)."
        ]) +
        "<h5>Cómo se elige el indicador</h5>" +
        "<p>Un indicador es un ácido o base débil cuya forma ácida y básica tienen distinto color. Cambia de color en un <b>intervalo de viraje</b> de aproximadamente dos unidades de pH, alrededor de su pK<sub>ind</sub>. El criterio: su zona de viraje debe <b>contener el pH del punto de equivalencia</b> (o al menos caer dentro del salto de pH).</p>" +
        tabla(["Indicador", "Intervalo de viraje", "Ácido", "Básico"], [
          ["Naranja de metilo", "3,1 – 4,4", "rojo", "amarillo"],
          ["Rojo de metilo", "4,2 – 6,3", "rojo", "amarillo"],
          ["Azul de bromotimol", "6,0 – 7,6", "amarillo", "azul"],
          ["Fenolftaleína", "8,2 – 10,0", "incoloro", "rosa"]
        ], "q3t") +
        ojo("Para el ácido <b>fuerte</b> con base fuerte el salto es tan grande (de pH 4 a 10 con solo media gota) que sirven casi todos. Para los <b>débiles</b> el salto es más pequeño y queda en la zona básica (ácido débil) o ácida (base débil): ahí <b>sí</b> hay que elegir. Y el pH de la equivalencia solo es 7 si la sal formada <b>no se hidroliza</b>.")
      )
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Cómo se responde en la EvAU",
      html: env(
        "<h5>Primero decide de qué tipo es el problema</h5>" +
        "<p>Casi todos los problemas de este tema caen en cuatro tipos. Si identificas el tipo, ya tienes la mitad:</p>" +
        tabla(["Si el enunciado da…", "Es…", "Camino"], [
          ["un ácido/base fuerte y su concentración", "pH directo", "[H⁺] = c (o [OH⁻] = c·nº OH); pH = −log; ¡dos OH⁻ en Ba(OH)₂!"],
          ["un ácido/base débil, c y K (o pH, o α)", "equilibrio", "tabla ICE → K = x²/(c − x); comprobar α &lt; 5 %"],
          ["dos disoluciones que se mezclan", "neutralización con exceso", "moles → reacción → exceso/V<sub>total</sub> → pH"],
          ["una sal (NaCN, NH₄Cl…)", "hidrólisis", "¿qué ion viene de débil? K<sub>h</sub> = K<sub>w</sub>/K → pH"],
          ["ácido débil + su sal, o pH 'estable'", "tampón", "Henderson–Hasselbalch"],
          ["un volumen gastado en bureta", "valoración", "a·C·V = b·C·V; pH en la equivalencia por hidrólisis"]
        ], "q3t") +
        ejemplo("Problema tipo EvAU 1: ácido débil, grado de disociación y valoración", "El ácido benzoico (C₆H₅COOH, K<sub>a</sub> = 6,5·10⁻⁵) se disuelve hasta una concentración 0,05 mol/L. (a) Calcula el pH y el grado de disociación. (b) ¿Qué volumen de NaOH 0,1 mol/L se necesita para neutralizar 25 mL de esa disolución? (c) ¿Qué pH hay en el punto de equivalencia y qué indicador usarías?", [
          "<b>(a)</b> x = √(6,5·10⁻⁵ · 0,05) = 1,80·10⁻³ mol/L = [H⁺]; α = x/c = 3,6 % &lt; 5 %: la aproximación vale. pH = −log(1,80·10⁻³) = <b>2,74</b> y α = <b>3,6 %</b>.",
          "<b>(b)</b> n(ácido) = 0,025 · 0,05 = 1,25·10⁻³ mol, monoprótico → n(NaOH) igual. V = 1,25·10⁻³ / 0,1 = 0,0125 L = <b>12,5 mL</b>.",
          "<b>(c)</b> En la equivalencia hay benzoato de sodio: 1,25 mmol en 25 + 12,5 = 37,5 mL → c = 0,0333 mol/L. K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = 1,54·10⁻¹⁰.",
          "x = √(1,54·10⁻¹⁰ · 0,0333) = 2,26·10⁻⁶ mol/L = [OH⁻] → pOH = 5,65 → pH = <b>8,35</b> (básico: hidrólisis del anión). Sirve la <b>fenolftaleína</b> (8,2–10,0)."
        ]) +
        ejemplo("Problema tipo EvAU 2: tampón de amoníaco", "Se prepara una disolución con 100 mmol de NH₃ y se añade HCl 1 mol/L hasta obtener pH 9,00. K<sub>b</sub>(NH₃) = 1,8·10⁻⁵. ¿Qué volumen de HCl se ha añadido?", [
          "El HCl convierte parte del NH₃ en NH₄⁺: NH₃ + H⁺ → NH₄⁺. Si se añaden V mmol de HCl, quedan 100 − V de NH₃ y se forman V de NH₄⁺.",
          "Se usa el par NH₄⁺/NH₃: K<sub>a</sub>(NH₄⁺) = K<sub>w</sub>/K<sub>b</sub> = 5,56·10⁻¹⁰ → pK<sub>a</sub> = 9,255.",
          "pH = pK<sub>a</sub> + log([NH₃]/[NH₄⁺]) → 9,00 = 9,255 + log((100 − V)/V) → (100 − V)/V = 10<sup>−0,255</sup> = 0,556.",
          "100 − V = 0,556 V → V = 100 / 1,556 = 64,3 mmol → <b>64,3 mL</b> de HCl 1 mol/L."
        ]) +
        "<h5>Frases y hábitos que suman puntos</h5>" +
        "<ul><li>Escribe la <b>reacción</b> de equilibrio (HA + H₂O ⇌ A⁻ + H₃O⁺) y la <b>constante</b> antes de sustituir.</li>" +
        "<li>Di si el ácido o la base es <b>fuerte o débil</b>, y por qué, antes de elegir fórmula.</li>" +
        "<li>Cuando uses la aproximación, <b>comprueba α &lt; 5 %</b> (o x ≪ c) <i>por escrito</i>.</li>" +
        "<li>En hidrólisis, di <b>qué ion reacciona y cuál no</b>, y justifica «ácida / básica / neutra».</li>" +
        "<li>En valoraciones, justifica el indicador: «el pH de la equivalencia es 8,7, dentro del intervalo de viraje de la fenolftaleína».</li>" +
        "<li>Unidades: mol/L, mL (pasa a litros si calculas moles) y <b>pH sin unidades</b>.</li></ul>"
      )
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. ¿Qué falla aquí? Errores típicos de ácidos y bases",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 11
    {
      h: "11. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y tres juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1") + w("clasificar", "clas1") + w("clasificar", "clas2")
    }
  ];

  B.parte.q2t7b = { nuevas: nuevas };
})(window);
