/* ============================================================
   Física y Química I · ampliaciones · Tema 4
   (parte B: secciones nuevas: gases, mezclas y disoluciones)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t4/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 7
    {
      h: "7. Las leyes volumétricas y la hipótesis de Avogadro",
      html:
        "<h5>Gay-Lussac: los gases reaccionan en volúmenes sencillos</h5>" +
        "<p>En 1808 Gay-Lussac midió los <b>volúmenes</b> de gases que intervienen en las reacciones y encontró otra regularidad: <b>a igual presión y temperatura, los volúmenes de los gases que reaccionan y de los que se forman guardan relaciones de números enteros sencillos</b>.</p>" +
        tabla(["Reacción", "Volúmenes (misma P y T)", "Relación"], [
          ["hidrógeno + oxígeno → vapor de agua", "2 L de H₂ + 1 L de O₂ → 2 L de H₂O (vapor)", "2 : 1 : 2"],
          ["hidrógeno + cloro → cloruro de hidrógeno", "1 L de H₂ + 1 L de Cl₂ → 2 L de HCl", "1 : 1 : 2"],
          ["nitrógeno + hidrógeno → amoníaco", "1 L de N₂ + 3 L de H₂ → 2 L de NH₃", "1 : 3 : 2"],
          ["metano + oxígeno → CO₂ + vapor de agua", "1 L de CH₄ + 2 L de O₂ → 1 L de CO₂ + 2 L de H₂O", "1 : 2 : 1 : 2"]
        ]) +
        "<p>Observa que esas relaciones <b>coinciden con los coeficientes de la ecuación ajustada</b>: 2 H₂ + O₂ → 2 H₂O. Ese fue un gran enigma: ¿por qué los volúmenes guardaban una proporción tan sencilla?</p>" +
        "<h5>Avogadro: la explicación (1811)</h5>" +
        "<p>Amedeo Avogadro propuso la solución: <b>volúmenes iguales de gases distintos, en las mismas condiciones de presión y temperatura, contienen el mismo número de moléculas</b>. Con esa hipótesis, la relación de volúmenes es una relación de moléculas, es decir, la relación de los coeficientes. Además, obligaba a admitir que los gases elementales como el H₂, O₂ o Cl₂ son <b>moléculas diatómicas</b> (si el oxígeno fuera O, 1 L de oxígeno daría 1 L de vapor de agua, y no 2 L). La propuesta tardó casi 50 años en ser aceptada (Cannizzaro, 1860).</p>" +
        "<h5>El volumen molar</h5>" +
        "<p>De la hipótesis de Avogadro se deduce que <b>un mol de cualquier gas ocupa el mismo volumen</b> (si P y T son iguales). En <b>condiciones normales</b> (CN: 0 °C = 273 K y 1 atm) ese <b>volumen molar</b> es <b>22,4 L/mol</b>. En otras condiciones el volumen molar cambia (a 25 °C y 1 atm son 24,5 L/mol). El volumen molar permite pasar de moles a litros sin más que una multiplicación:</p>" +
        H.formula("V (CN) = n · 22,4 L/mol") +
        ejemplo("Del volumen a los moles y a la masa", "¿Cuántos moles y cuántos gramos de oxígeno hay en 5,6 L de O₂ medidos en condiciones normales? (O = 16)", [
          "n = V/22,4 = 5,6/22,4 = <b>0,25 mol</b>.",
          "M(O₂) = 32 g/mol → m = 0,25 · 32 = <b>8 g</b>.",
          "(Si 1 mol ocupa 22,4 L, ¼ de mol ocupa ¼ de 22,4 L = 5,6 L ✓.)"
        ]) +
        ejemplo("¿Cuántas moléculas hay en un litro de aire?", "Calcula el número de moléculas contenidas en 1 L de un gas en condiciones normales.", [
          "n = 1/22,4 = 0,04464 mol.",
          "N = 0,04464 · 6,022·10²³ = <b>2,69·10²² moléculas</b> (el llamado número de Loschmidt por litro)."
        ]) +
        ojo("el valor 22,4 L/mol <b>sólo vale en condiciones normales</b> (1 atm y 0 °C). Si el enunciado da otra presión u otra temperatura (por ejemplo 25 °C), hay que usar PV = nRT. Y sólo se aplica a <b>gases</b>: un mol de agua líquida ocupa 18 mL, no 22,4 L.")
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Los gases: presión, volumen y temperatura",
      html:
        "<h5>Qué caracteriza a un gas</h5>" +
        "<p>Un gas no tiene forma ni volumen propios: se expande hasta llenar el recipiente que lo contiene. Para describir un gas en un instante se necesitan <b>cuatro magnitudes</b>: la cantidad de sustancia <b>n</b>, la presión <b>P</b>, el volumen <b>V</b> y la temperatura <b>T</b>. Se llaman <b>variables de estado</b>.</p>" +
        "<h5>Qué es la presión de un gas</h5>" +
        "<p>Según la <b>teoría cinética</b>, un gas es un enjambre de partículas muy separadas que se mueven al azar y chocan sin parar con las paredes del recipiente. La <b>presión</b> es el efecto de esos choques: P = fuerza que ejercen sobre las paredes / superficie. Más partículas, o más rápidas, o en menos espacio → más choques por segundo → <b>más presión</b>. La <b>temperatura</b> mide la energía cinética media de las partículas: al calentar, se mueven más deprisa. Pruébalo en este simulador: cambia n, T y V y observa los efectos.</p>" +
        w("q4_gas") +
        "<h5>Unidades y conversiones que hay que saber de memoria</h5>" +
        tabla(["Magnitud", "Unidad SI", "Otras unidades habituales", "Equivalencias"], [
          ["Presión", "pascal (Pa)", "atmósfera (atm), mmHg (torr), bar, kPa", "1 atm = 760 mmHg = 101 325 Pa = 1,013 bar"],
          ["Volumen", "metro cúbico (m³)", "litro (L = dm³), mililitro (mL = cm³)", "1 m³ = 1000 L · 1 L = 1000 mL"],
          ["Temperatura", "kelvin (K)", "grado Celsius (°C)", "T (K) = t (°C) + 273 (o 273,15)"],
          ["Cantidad de sustancia", "mol", "—", "1 mol = 6,022·10²³ partículas"]
        ]) +
        ejemplo("Conversiones típicas", "Expresa 2,5 atm en mmHg y en Pa, y 27 °C y −73 °C en kelvin.", [
          "2,5 atm · 760 mmHg/atm = <b>1900 mmHg</b>; 2,5 · 101 325 = <b>253 313 Pa</b> (≈ 253 kPa).",
          "27 °C → 27 + 273 = <b>300 K</b>; −73 °C → −73 + 273 = <b>200 K</b>."
        ]) +
        ojo("en cualquier fórmula de gases, la <b>temperatura va siempre en kelvin</b>. Si se usan grados Celsius, las leyes dan resultados absurdos (por ejemplo, un volumen que se anula a 0 °C). Es el error número uno en los ejercicios de gases.") +
        "<h5>Gas ideal y gases reales</h5>" +
        "<p>Un <b>gas ideal</b> es un modelo: sus partículas son puntuales, no se atraen ni se repelen y sólo interaccionan al chocar. Los gases reales se comportan muy aproximadamente como ideales a <b>presiones bajas y temperaturas altas</b>, cuando las partículas están muy separadas y se mueven deprisa. En 1.º de Bachillerato se trabaja siempre con el modelo ideal.</p>"
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Las leyes de los gases: Boyle, Charles, Gay-Lussac y la ley combinada",
      html:
        "<p>Las leyes de los gases relacionan dos variables manteniendo constantes las otras (y el número de moles). Cada una se obtuvo experimentalmente en los siglos XVII–XIX.</p>" +
        tabla(["Ley", "Se mantiene constante", "Enunciado", "Fórmula", "Gráfica"], [
          ["Boyle–Mariotte (1662)", "T y n", "la presión es inversamente proporcional al volumen", "P₁V₁ = P₂V₂", "hipérbola P–V"],
          ["Charles (1787)", "P y n", "el volumen es directamente proporcional a la temperatura absoluta", "V₁/T₁ = V₂/T₂", "recta V–T que parte del cero absoluto"],
          ["Gay-Lussac (1802)", "V y n", "la presión es directamente proporcional a la temperatura absoluta", "P₁/T₁ = P₂/T₂", "recta P–T"],
          ["Avogadro (1811)", "P y T", "el volumen es proporcional al número de moles", "V₁/n₁ = V₂/n₂", "recta V–n"],
          ["Combinada", "n", "reúne las tres anteriores", "P₁V₁/T₁ = P₂V₂/T₂", "—"]
        ]) +
        "<h5>Ley de Boyle: la jeringuilla</h5>" +
        "<p>Tapa con el dedo una jeringuilla y empuja el émbolo: cuanto menos espacio, más difícil es seguir empujando. Las partículas chocan más veces por segundo contra las paredes y la presión sube en la misma proporción en que baja el volumen.</p>" +
        ejemplo("Boyle", "Una jeringuilla contiene 60 mL de aire a 1 atm. Se comprime hasta 20 mL sin cambiar la temperatura. ¿Qué presión tiene el aire?", [
          "P₁V₁ = P₂V₂ → P₂ = P₁V₁/V₂ = 1 · 60/20 = <b>3 atm</b>.",
          "El volumen se ha dividido entre 3 y la presión se ha multiplicado por 3 ✓."
        ]) +
        "<h5>Ley de Charles: el globo en el congelador</h5>" +
        ejemplo("Charles", "Un globo con 2,0 L de aire a 20 °C se mete en un congelador a −18 °C. Calcula su volumen final, suponiendo presión constante.", [
          "Pasa a kelvin: T₁ = 20 + 273 = 293 K · T₂ = −18 + 273 = 255 K.",
          "V₁/T₁ = V₂/T₂ → V₂ = V₁·T₂/T₁ = 2,0 · 255/293 = <b>1,74 L</b>.",
          "(Con la temperatura en °C el resultado sería absurdo: −18/20 daría un volumen negativo.)"
        ]) +
        "<p>Si se prolonga la recta V–T, el volumen se anula en −273,15 °C: es el <b>cero absoluto</b>, la temperatura más baja posible (no se puede alcanzar). Por eso se define la escala Kelvin con el cero en ese punto.</p>" +
        "<h5>Ley de Gay-Lussac (presión–temperatura)</h5>" +
        ejemplo("Gay-Lussac", "Un bote de spray cerrado contiene gas a 3,0 atm y 20 °C. Se calienta hasta 100 °C (peligroso: no lo hagas). ¿Qué presión alcanza?", [
          "T₁ = 293 K, T₂ = 373 K (el volumen del bote no cambia).",
          "P₂ = P₁·T₂/T₁ = 3,0 · 373/293 = <b>3,82 atm</b>.",
          "Por eso los botes llevan la advertencia de no exponerlos al calor."
        ]) +
        "<h5>Ley combinada: cuando cambian las tres variables</h5>" +
        ejemplo("Combinada", "Un gas ocupa 10 L a 1 atm y 27 °C. ¿Qué volumen ocupará a 5 atm y 127 °C?", [
          "T₁ = 300 K · T₂ = 400 K.",
          "P₁V₁/T₁ = P₂V₂/T₂ → V₂ = P₁V₁T₂/(T₁P₂) = 1 · 10 · 400/(300 · 5) = <b>2,67 L</b>.",
          "Lo comprimimos (efecto: V baja) y lo calentamos (efecto: V sube): gana la compresión."
        ]) +
        w("q4_leyesgas") +
        "<h5>Cómo reconocer qué ley hay que usar</h5>" +
        "<p>Pregúntate qué variable <b>no cambia</b>: si es T → Boyle; si es P → Charles; si es V → Gay-Lussac; si cambian las tres → combinada. Y recuerda: T siempre en kelvin y las dos presiones (y los dos volúmenes) en las <b>mismas unidades</b> (la unidad se cancela en el cociente).</p>"
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. La ecuación de los gases ideales: PV = nRT",
      html:
        "<h5>De las leyes a una sola fórmula</h5>" +
        "<p>Si se reúnen las leyes de Boyle, Charles, Gay-Lussac y Avogadro, el volumen resulta proporcional a n·T/P. Introduciendo una constante <b>R</b> (constante de los gases) queda la ecuación de estado:</p>" +
        H.formula("P · V = n · R · T") +
        tabla(["Magnitud", "Símbolo", "Unidad que debe usarse", "Si te dan otra…"], [
          ["Presión", "P", "atm", "mmHg ÷ 760 · kPa ÷ 101,3"],
          ["Volumen", "V", "L", "mL ÷ 1000 · m³ · 1000"],
          ["Cantidad de sustancia", "n", "mol", "g ÷ M"],
          ["Temperatura", "T", "K", "°C + 273"],
          ["Constante de los gases", "R", "0,082 atm·L/(mol·K)", "= 8,314 J/(mol·K) = 62,4 mmHg·L/(mol·K)"]
        ]) +
        "<p>El valor de R sale del volumen molar: en CN, R = PV/(nT) = 1 · 22,4/(1 · 273) = 0,082 atm·L/(mol·K). <b>Las unidades de R mandan</b>: con R = 0,082, la presión tiene que estar en atm y el volumen en litros.</p>" +
        ejemplo("Calcular los moles", "¿Cuántos moles de gas hay en un recipiente de 5 L a 2 atm y 27 °C?", [
          "T = 300 K. n = PV/(RT) = 2 · 5/(0,082 · 300) = 10/24,6 = <b>0,407 mol</b>."
        ]) +
        ejemplo("Calcular la presión", "Se introducen 8 g de O₂ en un recipiente de 10 L a 27 °C. ¿Qué presión ejercen? (O = 16)", [
          "n = 8/32 = 0,25 mol. T = 300 K.",
          "P = nRT/V = 0,25 · 0,082 · 300/10 = <b>0,615 atm</b>."
        ]) +
        ejemplo("Volumen en otras condiciones", "¿Qué volumen ocupan 2 mol de gas a 25 °C y 1 atm? Compáralo con el volumen en CN.", [
          "T = 298 K. V = nRT/P = 2 · 0,082 · 298/1 = <b>48,9 L</b>.",
          "En CN serían 2 · 22,4 = 44,8 L. A 25 °C el gas está más caliente y ocupa más (24,5 L/mol)."
        ]) +
        "<h5>Masa molar y densidad de un gas</h5>" +
        "<p>Como n = m/M, la ecuación se puede escribir PV = (m/M)RT. De ahí salen dos fórmulas muy útiles:</p>" +
        H.formula("M = m·R·T / (P·V)          d = m/V = P·M / (R·T)") +
        ejemplo("Masa molar de un gas desconocido", "Una muestra de 1,60 g de un gas ocupa 1,00 L a 1 atm y 27 °C. Calcula su masa molar e indica de qué gas puede tratarse.", [
          "M = mRT/(PV) = 1,60 · 0,082 · 300/(1 · 1,00) = <b>39,4 g/mol</b>.",
          "Es compatible con el argón (M = 40 g/mol)."
        ]) +
        ejemplo("Densidad de un gas", "Calcula la densidad del CO₂ a 27 °C y 1 atm, y compárala con la del aire (M ≈ 29 g/mol). (C = 12, O = 16)", [
          "d(CO₂) = PM/(RT) = 1 · 44/(0,082 · 300) = <b>1,79 g/L</b>.",
          "d(aire) = 29/(0,082 · 300) = 1,18 g/L. El CO₂ es más denso que el aire y por eso se acumula en el fondo de bodegas y pozos (es peligroso)."
        ]) +
        ejemplo("¿Por qué flota un globo de helio?", "Calcula la fuerza ascensional aproximada de un globo de 10 L lleno de helio a 20 °C y 1 atm. (He = 4; masa media del aire 29 g/mol; desprecia la goma.)", [
          "d(He) = 1 · 4/(0,082 · 293) = 0,166 g/L · d(aire) = 29/(0,082 · 293) = 1,207 g/L.",
          "Diferencia: 1,207 − 0,166 = 1,04 g por litro. En 10 L: <b>≈ 10,4 g</b> de «empuje neto» hacia arriba."
        ]) +
        "<h5>Estrategia para un problema de gases</h5>" +
        "<ol><li>Anota los datos y <b>conviértelos</b> a atm, L, mol y K.</li><li>Decide: ¿es PV = nRT, una ley de dos variables o la combinada?</li><li>Despeja la incógnita <b>antes</b> de sustituir.</li><li>Calcula y comprueba unidades y orden de magnitud (¿tiene sentido que sea mayor/menor?).</li></ol>"
    },
    // ------------------------------------------------------------ 11
    {
      h: "11. Mezclas de gases: la ley de Dalton de las presiones parciales",
      html:
        "<p>En una mezcla de gases que no reaccionan entre sí, cada gas se comporta como si estuviera solo en el recipiente (las partículas están tan separadas que casi no se afectan). De ahí la <b>ley de Dalton (1801)</b>: <b>la presión total es la suma de las presiones parciales</b> de los gases de la mezcla.</p>" +
        H.formula("P<sub>T</sub> = p₁ + p₂ + p₃ + …        pᵢ = xᵢ · P<sub>T</sub>        xᵢ = nᵢ / n<sub>T</sub>") +
        "<p>La <b>presión parcial</b> pᵢ es la que ejercería el gas i si ocupara él solo todo el recipiente: pᵢ = nᵢRT/V. La <b>fracción molar</b> xᵢ = nᵢ/n<sub>T</sub> es la proporción de moles de ese gas (siempre entre 0 y 1; todas suman 1). En los gases, la fracción molar coincide con la fracción en volumen y con el tanto por uno en moles.</p>" +
        ejemplo("Una mezcla de nitrógeno y oxígeno", "En un recipiente de 10 L a 27 °C hay 2 mol de N₂ y 1 mol de O₂. Calcula la presión total, las fracciones molares y las presiones parciales.", [
          "n<sub>T</sub> = 3 mol. P<sub>T</sub> = 3 · 0,082 · 300/10 = <b>7,38 atm</b>.",
          "x(N₂) = 2/3 = 0,667 · x(O₂) = 1/3 = 0,333.",
          "p(N₂) = 0,667 · 7,38 = <b>4,92 atm</b> · p(O₂) = 0,333 · 7,38 = <b>2,46 atm</b>. Suma: 7,38 atm ✓."
        ]) +
        "<h5>El aire</h5>" +
        "<p>El aire seco tiene, en volumen (= en moles): 78,08 % de N₂, 20,95 % de O₂, 0,93 % de Ar y 0,04 % de CO₂. A nivel del mar (1 atm) las presiones parciales son p(N₂) ≈ 0,78 atm y p(O₂) ≈ 0,21 atm. Cuanto más alto subes, menor es la presión total y menor la presión parcial del oxígeno: por eso falta el aliento en las montañas.</p>" +
        ejemplo("Buceo con aire", "A 30 m de profundidad la presión es de unas 4 atm. Calcula la presión parcial del oxígeno en el aire que respira un buceador y la profundidad máxima si la presión parcial del O₂ no debe pasar de 1,4 atm (por encima es tóxico).", [
          "p(O₂) = 0,21 · 4 = <b>0,84 atm</b> a 30 m (y p(N₂) = 3,12 atm: ese nitrógeno provoca la «borrachera de las profundidades»).",
          "P<sub>T</sub> máxima = 1,4/0,21 = 6,67 atm. La presión aumenta 1 atm cada 10 m de agua: profundidad = (6,67 − 1)·10 = <b>≈ 57 m</b>."
        ]) +
        "<h5>Gas recogido sobre agua</h5>" +
        "<p>Cuando un gas poco soluble (H₂, O₂…) se recoge burbujeando a través del agua, el gas arrastra <b>vapor de agua</b>, y la presión dentro del recipiente es P<sub>T</sub> = p(gas seco) + p(vapor de agua). La presión de vapor del agua sólo depende de la temperatura: 12,8 mmHg a 15 °C, 17,5 a 20 °C, 23,8 a 25 °C, 31,8 a 30 °C, 42,2 a 35 °C.</p>" +
        ejemplo("Hidrógeno sobre agua", "Se recogen 150 mL de gas sobre agua a 25 °C y una presión total de 740 mmHg. ¿Cuántos moles de gas seco hay?", [
          "p(H₂O) a 25 °C = 23,8 mmHg → p(gas) = 740 − 23,8 = <b>716,2 mmHg</b> = 716,2/760 = 0,942 atm.",
          "n = PV/(RT) = 0,942 · 0,150/(0,082 · 298) = <b>5,79·10⁻³ mol</b>."
        ]) +
        w("q4_dalton")
    },
    // ------------------------------------------------------------ 12
    {
      h: "12. Formas de expresar la concentración de una disolución",
      html:
        "<p>La molaridad es la más usada en química, pero no la única. Cada una responde a una necesidad distinta: la farmacia usa porcentajes, la cocina g/L, el análisis de aguas ppm y la fisicoquímica molalidad y fracción molar.</p>" +
        tabla(["Expresión", "Símbolo y fórmula", "Unidades", "Ejemplo de uso"], [
          ["Porcentaje en masa", "% m/m = (m soluto / m disolución)·100", "%", "lejía al 5 %"],
          ["Porcentaje en volumen", "% v/v = (V soluto / V disolución)·100", "%", "vino de 12° = 12 % de alcohol"],
          ["Concentración en masa", "c = m soluto / V disolución", "g/L", "suero: 9 g/L de NaCl"],
          ["Molaridad", "M = n soluto / V disolución", "mol/L", "HCl 12 M comercial"],
          ["Molalidad", "m = n soluto / m disolvente (kg)", "mol/kg", "crioscopia, tema de propiedades coligativas"],
          ["Fracción molar", "x = n soluto / (n soluto + n disolvente)", "(sin unidades)", "presiones de vapor"],
          ["Partes por millón", "ppm = (m soluto / m disolución)·10⁶ ≈ mg/L (en agua)", "ppm", "contaminantes, flúor en agua"]
        ]) +
        "<p>Conviene distinguir bien entre <b>disolución</b> (soluto + disolvente) y <b>disolvente</b>: el % en masa, la concentración en masa y la molaridad se refieren a la <b>disolución</b>; la molalidad, al <b>disolvente</b>.</p>" +
        "<h5>Ejemplos resueltos de cada expresión</h5>" +
        ejemplo("Porcentaje en masa", "Se disuelven 5 g de NaCl en 95 g de agua. ¿Cuál es el % en masa?", [
          "m disolución = 5 + 95 = 100 g → % = 5/100 · 100 = <b>5 %</b>."
        ]) +
        ejemplo("Porcentaje en volumen", "Una botella de 750 mL de vino contiene 12 % en volumen de alcohol. ¿Cuántos mL de etanol hay?", [
          "V(etanol) = 0,12 · 750 = <b>90 mL</b>."
        ]) +
        ejemplo("Molalidad", "Se disuelven 20 g de NaCl en 250 g de agua. Calcula la molalidad. (Na = 23, Cl = 35,5)", [
          "n = 20/58,5 = 0,342 mol. Masa de disolvente = 0,250 kg.",
          "m = 0,342/0,250 = <b>1,37 mol/kg</b>."
        ]) +
        ejemplo("Fracción molar", "Se disuelven 18 g de glucosa (M = 180) en 90 g de agua (M = 18). Calcula las fracciones molares.", [
          "n(glucosa) = 18/180 = 0,10 mol · n(agua) = 90/18 = 5,0 mol · n<sub>T</sub> = 5,10 mol.",
          "x(glucosa) = 0,10/5,10 = <b>0,0196</b> · x(agua) = 5,0/5,10 = <b>0,980</b>. Suman 1 ✓."
        ]) +
        ejemplo("Partes por millón", "Un agua contiene 0,8 mg de fluoruro en 1 L. Exprésalo en ppm (densidad del agua 1 kg/L).", [
          "1 L de agua pesa 1 kg = 10⁶ mg → 0,8 mg/10⁶ mg·10⁶ = <b>0,8 ppm</b> (en agua, 1 ppm = 1 mg/L)."
        ]) +
        "<h5>El paso más importante: de % en masa y densidad a molaridad</h5>" +
        "<p>Los reactivos comerciales (ácidos, bases, amoníaco…) se venden con su <b>% en masa</b> y su <b>densidad</b>. Para saber la molaridad se razona sobre <b>1 litro de disolución</b>:</p>" +
        H.formula("M = (% · d · 10) / M<sub>soluto</sub>      (d en g/mL)") +
        ejemplo("Ácido clorhídrico comercial", "El HCl comercial tiene un 37 % en masa y una densidad de 1,19 g/mL. Calcula su molaridad, su molalidad y la fracción molar del HCl. (H = 1, Cl = 35,5)", [
          "En 1000 mL hay 1190 g de disolución; de ellos 37 % es HCl: 0,37 · 1190 = 440,3 g de HCl → n = 440,3/36,5 = 12,06 mol.",
          "<b>Molaridad = 12,06 mol/L</b> (con la fórmula: 37 · 1,19 · 10/36,5 = 12,06 ✓).",
          "En 100 g de disolución: 37 g de HCl (1,014 mol) y 63 g de agua (0,063 kg; 3,5 mol). <b>Molalidad = 1,014/0,063 = 16,1 mol/kg</b>.",
          "<b>x(HCl) = 1,014/(1,014 + 3,5) = 0,225</b>."
        ]) +
        ejemplo("Del suero fisiológico", "El suero fisiológico es una disolución al 0,9 % en masa de NaCl, con densidad ≈ 1,005 g/mL. Calcula su molaridad y su concentración en g/L.", [
          "En 1 L hay 1005 g de disolución y 0,009 · 1005 = 9,05 g de NaCl.",
          "<b>c = 9,05 g/L</b> y n = 9,05/58,5 = 0,155 mol → <b>M = 0,155 mol/L</b>."
        ]) +
        "<h5>Solubilidad y disoluciones saturadas</h5>" +
        "<p>La solubilidad es la máxima cantidad de soluto que se disuelve en una cantidad de disolvente a una temperatura dada. La del NaCl es ≈ 36 g por 100 g de agua a 20 °C. Si se añaden 50 g de NaCl a 100 g de agua, <b>se disuelven 36 g y los 14 g restantes quedan en el fondo</b>: la disolución está saturada. En general, la solubilidad de los sólidos aumenta con la temperatura, y la de los gases disminuye (por eso un refresco caliente «pierde el gas»).</p>" +
        w("q4_disolucion")
    },
    // ------------------------------------------------------------ 13
    {
      h: "13. Preparar, diluir y mezclar disoluciones en el laboratorio",
      html:
        "<h5>Preparar una disolución a partir de un sólido</h5>" +
        "<ol><li><b>Calcula</b> los moles: n = M·V (con V en litros) y la masa: m = n·M.</li><li><b>Pesa</b> el soluto en una balanza (con vidrio de reloj o pesasustancias).</li><li><b>Disuelve</b> en un vaso con algo de agua destilada.</li><li><b>Trasvasa</b> a un <b>matraz aforado</b> del volumen final (lavando el vaso).</li><li><b>Enrasa</b> con agua hasta la marca, tapa y agita.</li></ol>" +
        ejemplo("Un hidrato", "¿Qué masa de CuSO₄·5H₂O hay que pesar para preparar 250 mL de disolución 0,10 M de CuSO₄? (M del hidrato = 249,5 g/mol)", [
          "n = 0,10 · 0,250 = 0,025 mol de CuSO₄. Cada mol de hidrato aporta 1 mol de CuSO₄.",
          "m = 0,025 · 249,5 = <b>6,24 g de CuSO₄·5H₂O</b> (el agua de cristalización cuenta en la masa que se pesa)."
        ]) +
        "<h5>Diluir: M₁·V₁ = M₂·V₂</h5>" +
        "<p>Al añadir disolvente a una disolución, <b>los moles de soluto no cambian</b>; sólo aumenta el volumen. Por tanto n₁ = n₂, es decir, <b>M₁V₁ = M₂V₂</b>. La fórmula no necesita pasar los volúmenes a litros mientras V₁ y V₂ se expresen en la misma unidad.</p>" +
        ejemplo("Desde un ácido concentrado", "Se dispone de ácido sulfúrico comercial del 98 % en masa y d = 1,84 g/mL. ¿Qué volumen hay que tomar para preparar 250 mL de disolución 0,5 M? (M = 98 g/mol)", [
          "Molaridad del comercial: M₁ = 98 · 1,84 · 10/98 = <b>18,4 M</b>.",
          "V₁ = M₂V₂/M₁ = 0,5 · 250/18,4 = <b>6,79 mL</b>; se completan con agua hasta 250 mL (¡siempre el ácido sobre el agua, nunca al revés!).",
          "Factor de dilución: 18,4/0,5 = 36,8 veces."
        ]) +
        ejemplo("Dilución sencilla", "¿Cuántos mL de HCl 12 M hacen falta para preparar 1 L de HCl 0,1 M?", [
          "V₁ = 0,1 · 1000/12 = <b>8,33 mL</b>."
        ]) +
        "<h5>Mezclar disoluciones del mismo soluto</h5>" +
        "<p>Se <b>suman los moles</b> y se <b>suman los volúmenes</b> (suponiendo que los volúmenes son aditivos): M = (M₁V₁ + M₂V₂)/(V₁ + V₂).</p>" +
        ejemplo("Mezcla", "Se mezclan 200 mL de NaCl 0,5 M con 300 mL de NaCl 1,0 M. ¿Qué molaridad tiene la mezcla?", [
          "n₁ = 0,5 · 0,200 = 0,10 mol · n₂ = 1,0 · 0,300 = 0,30 mol.",
          "V = 500 mL = 0,500 L → M = 0,40/0,500 = <b>0,80 M</b>.",
          "Está entre 0,5 y 1,0 y más cerca de 1,0 porque hay más volumen de la más concentrada ✓."
        ]) +
        w("q4_dilucion") +
        "<h5>Material de laboratorio y seguridad</h5>" +
        tabla(["Instrumento", "Para qué sirve", "Precisión"], [
          ["Matraz aforado", "preparar un volumen exacto de disolución", "alta (±0,1 mL en 250 mL)"],
          ["Pipeta aforada", "medir un volumen exacto pequeño (por ejemplo 10 mL)", "alta"],
          ["Probeta", "medir volúmenes aproximados", "media"],
          ["Vaso de precipitados", "disolver, calentar, mezclar", "baja (sólo orientativa)"],
          ["Balanza", "pesar el soluto", "±0,01 g (de precisión)"]
        ]) +
        "<p>Seguridad: gafas y bata; los ácidos concentrados siempre se diluyen <b>añadiéndolos lentamente al agua</b> (el calor desprendido podría hacer saltar el agua si se hace al revés); nunca se pipetea con la boca.</p>"
    },
    // ------------------------------------------------------------ 14
    {
      h: "14. Método general para problemas de este tema",
      html:
        "<h5>Los cuatro pasos de cualquier problema de química cuantitativa</h5>" +
        "<ol><li><b>Datos y esquema</b>: escribe cada dato con su unidad y subraya la incógnita.</li><li><b>Pasa todo a moles</b>: moles es la «moneda común». m → n con M; V gas → n con 22,4 (CN) o PV = nRT; V disolución → n con la molaridad; N → n con N<sub>A</sub>.</li><li><b>Calcula</b> la incógnita en moles y <b>conviértela</b> a la unidad pedida.</li><li><b>Comprueba</b>: unidades, orden de magnitud, cifras significativas.</li></ol>" +
        tabla(["Quiero pasar de…", "…a…", "Se usa"], [
          ["masa (g)", "moles", "n = m / M"],
          ["moles", "partículas", "N = n · N<sub>A</sub>"],
          ["volumen de gas en CN (L)", "moles", "n = V / 22,4"],
          ["gas en otras condiciones (P, V, T)", "moles", "n = PV / RT"],
          ["volumen de disolución (L)", "moles", "n = M · V"],
          ["% en masa y densidad", "molaridad", "M = % · d · 10 / M<sub>soluto</sub>"]
        ]) +
        "<h5>Análisis dimensional: factores de conversión</h5>" +
        "<p>Para no equivocarse, escribe la conversión como una cadena de fracciones en las que se cancelan las unidades. Por ejemplo, ¿cuántas moléculas hay en 36 g de agua?</p>" +
        H.formula("36 g · (1 mol / 18 g) · (6,022·10²³ moléculas / 1 mol) = 1,20·10²⁴ moléculas") +
        "<h5>Cifras significativas y redondeo</h5>" +
        "<p>El resultado no puede tener más cifras significativas que el dato con menos cifras. Si te dan «2,5 g» (dos cifras), no escribas 0,0462857 mol: escribe 0,046 mol. En los cálculos intermedios conserva una cifra de más y <b>redondea sólo al final</b>. En los exámenes de bachillerato suele bastar con 3 cifras significativas.</p>" +
        "<p>Ahora practica con problemas nuevos cada vez. El generador crea problemas de moles, partículas, molaridad, gases, composición centesimal y dilución con números aleatorios:</p>" +
        w("q4_practica")
    },
    // ------------------------------------------------------------ 15
    {
      h: "15. Las leyes de la química, en la historia",
      html:
        "<p>Las leyes de este tema se descubrieron en apenas cuarenta años, entre 1774 y 1811, y condujeron a la teoría atómica. Recorre la línea del tiempo y toca cada hecho:</p>" +
        w("linea", "historia") +
        "<p>Hay un hilo conductor: primero se <b>pesó</b> (Lavoisier, Proust, Dalton), luego se <b>midieron volúmenes de gases</b> (Gay-Lussac) y, para explicar todo, apareció la idea de que la materia son <b>átomos y moléculas</b> (Dalton, Avogadro). La determinación experimental del número de Avogadro llegó mucho después: Jean Perrin lo midió hacia 1909 estudiando el movimiento browniano (Nobel de Física, 1926).</p>"
    },
    // ------------------------------------------------------------ 16
    {
      h: "16. Aplicaciones en la vida real",
      html:
        ejemplo("Un neumático en verano", "Un neumático se infla a 2,2 atm (presión absoluta) a 20 °C. Tras un viaje se calienta a 50 °C. ¿Qué presión tiene, suponiendo volumen constante?", [
          "T₁ = 293 K · T₂ = 323 K. P₂ = P₁·T₂/T₁ = 2,2 · 323/293 = <b>2,43 atm</b>.",
          "Por eso se revisa la presión con los neumáticos fríos."
        ]) +
        ejemplo("La botella de buceo", "Una botella de buceo de 12 L está cargada a 200 atm. ¿Qué volumen de aire a 1 atm contiene y cuánto dura a 30 m de profundidad (4 atm) si se respiran 20 L/min a presión ambiente?", [
          "Boyle (T constante): V₂ = P₁V₁/P₂ = 200 · 12/1 = <b>2400 L</b> de aire a 1 atm.",
          "A 30 m se respira el aire a 4 atm: el aire consumido por minuto, en términos del aire de la botella a 1 atm, es 20 · 4 = 80 L/min. Duración = 2400/80 = <b>30 min</b> (a poca profundidad, 120 min)."
        ]) +
        ejemplo("Suero para un paciente", "Un médico prescribe 1,5 L de suero glucosado al 5 % en masa (d = 1,02 g/mL). ¿Cuántos gramos de glucosa recibe el paciente? ¿Y cuál es la molaridad? (M = 180 g/mol)", [
          "Masa de disolución = 1500 mL · 1,02 g/mL = 1530 g → glucosa = 0,05 · 1530 = <b>76,5 g</b>.",
          "n = 76,5/180 = 0,425 mol en 1,5 L → M = <b>0,283 mol/L</b>."
        ]) +
        ejemplo("Soluciones de limpieza", "La lejía comercial contiene unos 50 g/L de NaClO. ¿Qué molaridad tiene y cuántos mL hay que tomar para preparar 1 L de disolución 0,05 M? (Na = 23, Cl = 35,5, O = 16)", [
          "M(NaClO) = 74,5 g/mol → M = 50/74,5 = <b>0,671 mol/L</b>.",
          "V₁ = 0,05 · 1000/0,671 = <b>74,5 mL</b>."
        ]) +
        "<p>Lo mismo se aplica en la industria (preparación de reactivos), la alimentación (etiquetado de bebidas: % vol de alcohol, mg/L de sodio) y el medio ambiente (límites en ppm de contaminantes del aire y del agua).</p>"
    },
    // ------------------------------------------------------------ 17
    {
      h: "17. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 18
    {
      h: "18. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, un juego de parejas, una clasificación por leyes, tarjetas de repaso y un ejercicio para ordenar los pasos de un problema.</p>" +
        w("quiz", "quiz1") + w("emparejar", "magnitudes") + w("clasificar", "leyes") + w("tarjetas", "tj1") + w("orden", "molaridad")
    }
  ];

  B.parte.t4b = { nuevas: nuevas };
})(window);
