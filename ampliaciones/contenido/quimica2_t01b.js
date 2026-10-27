/* ============================================================
   Química II · ampliaciones · Tema 1: La química y sus cálculos
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t1/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5
    {
      h: "5. Reactivo limitante, pureza y rendimiento: el orden de las operaciones",
      html: env(
        "<h5>El reactivo limitante</h5>" +
        "<p>Casi nunca se mezclan los reactivos en la proporción exacta de la ecuación. Uno de ellos se <b>agota primero</b>: es el <b>reactivo limitante</b>, y es el que marca cuánto producto se puede formar. El otro queda <b>en exceso</b> y sobra una parte. La regla para encontrarlo es siempre la misma: <b>divide los moles de cada reactivo entre su coeficiente; el menor cociente es el limitante</b>.</p>" +
        "<p>Tres errores que cuestan puntos: (1) pensar que el limitante es el que tiene <b>menos gramos</b> (no, hay que pasar a moles); (2) pensar que es el que tiene <b>menos moles</b> (tampoco: hay que dividir entre el coeficiente); (3) calcular el producto con el reactivo en exceso.</p>" +
        ejemplo("Ejemplo resuelto: 10 g y 10 g", "Se hacen reaccionar 10,0 g de Al con 10,0 g de Cl₂: 2 Al + 3 Cl₂ → 2 AlCl₃. Calcula el reactivo limitante, la masa de AlCl₃ que se forma y la masa de reactivo en exceso que sobra. (Al = 27; Cl = 35,5)", [
          "Moles: n(Al) = 10,0 / 27 = 0,370 mol; n(Cl₂) = 10,0 / 71 = 0,1408 mol.",
          "Divididos entre el coeficiente: Al → 0,370 / 2 = 0,185; Cl₂ → 0,1408 / 3 = 0,0469. El menor es el del Cl₂: <b>el limitante es el Cl₂</b> (aunque las dos masas sean iguales).",
          "Con el limitante: n(AlCl₃) = 0,1408 · 2/3 = 0,0939 mol. M(AlCl₃) = 27 + 3 · 35,5 = 133,5 g/mol → m = 0,0939 · 133,5 = <b>12,5 g de AlCl₃</b>.",
          "Aluminio que reacciona: 0,0939 mol (relación 2 : 2) → 0,0939 · 27 = 2,54 g. <b>Sobran 10,0 − 2,54 = 7,46 g de Al</b>.",
          "Comprobación de masa: 10,0 + 10,0 = 20,0 g = 12,5 g de AlCl₃ + 7,46 g de Al que sobra ✓."
        ]) +
        w("q5_limitante") +
        "<p>La gráfica siguiente muestra lo que pasa cuando se <b>añade poco a poco el reactivo B</b> a una cantidad fija del reactivo A. Mientras B es escaso, B es el limitante: se gasta todo, el producto sube en línea recta y A va quedando cada vez menos. En el punto de <b>proporción exacta</b> se agotan los dos a la vez. A partir de ahí manda A: el producto se queda <b>plano</b> y el exceso de B se va acumulando. Es exactamente la forma de una <b>valoración ácido-base</b> (tema 7): el punto de equivalencia es el punto de proporción exacta.</p>" +
        w("qq1_curvalim") +
        ejemplo("Ejemplo resuelto: limitante con una disolución y un gas", "Se añaden 6,54 g de Zn a 100 mL de HCl 1,0 M: Zn + 2 HCl → ZnCl₂ + H₂. Calcula el volumen de H₂ a 25 °C y 1 atm y la masa de reactivo en exceso. (Zn = 65,4)", [
          "Moles: n(Zn) = 6,54 / 65,4 = 0,100 mol; n(HCl) = 1,0 · 0,100 = 0,100 mol.",
          "Cociente: Zn → 0,100 / 1 = 0,100; HCl → 0,100 / 2 = 0,050. <b>El limitante es el HCl</b>.",
          "n(H₂) = 0,100 · 1/2 = 0,050 mol → V = " + fr("0,050 · 0,082 · 298", "1") + " = <b>1,22 L</b>.",
          "Zn que reacciona: 0,050 mol. Sobra 0,100 − 0,050 = 0,050 mol de Zn → <b>3,27 g</b>."
        ]) +
        "<h5>Pureza: lo que no es reactivo no reacciona</h5>" +
        "<p>Las muestras reales (una caliza, un mineral, un reactivo comercial) llevan <b>impurezas</b> que no intervienen. La <b>riqueza</b> o pureza dice qué porcentaje de la masa es sustancia pura: m<sub>pura</sub> = m<sub>muestra</sub> · (riqueza/100). Se aplica <b>al principio</b>, antes de pasar a moles, y solo a la sustancia que viene impura.</p>" +
        "<h5>Rendimiento: lo que de verdad sale</h5>" +
        "<p>Las reacciones reales no suelen ser completas: se pierde producto, hay reacciones paralelas, etc. El <b>rendimiento</b> compara lo obtenido con lo que predice la estequiometría: η = (cantidad real / cantidad teórica) · 100. Se aplica <b>al final</b>, sobre el producto. El teórico se calcula siempre con el 100 % y es una cota: el rendimiento no puede superar el 100 %.</p>" +
        ejemplo("Ejemplo resuelto: pureza, estequiometría y rendimiento en una sola cadena", "Una caliza tiene un 85 % de CaCO₃. Se hacen reaccionar 200 g con HCl en exceso (CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂) con un rendimiento del 90 %. ¿Qué volumen de CO₂ se obtiene a 25 °C y 1 atm? (Ca = 40; C = 12; O = 16)", [
          "<b>1) Pureza:</b> m(CaCO₃) = 200 · 0,85 = 170 g.",
          "<b>2) Moles:</b> M(CaCO₃) = 100 g/mol → n = 170 / 100 = 1,70 mol.",
          "<b>3) Proporción 1 : 1:</b> n(CO₂) teórico = 1,70 mol (el HCl está en exceso: no limita).",
          "<b>4) Rendimiento:</b> n(CO₂) real = 1,70 · 0,90 = 1,53 mol.",
          "<b>5) Unidad pedida:</b> V = " + fr("nRT", "P") + " = " + fr("1,53 · 0,082 · 298", "1") + " = <b>37,4 L</b>."
        ]) +
        ejemplo("Ejemplo resuelto: calcular el rendimiento", "Se obtienen 8,5 g de NH₃ a partir de 14 g de N₂ y H₂ en exceso: N₂ + 3 H₂ → 2 NH₃. ¿Cuál es el rendimiento? (N = 14; H = 1)", [
          "n(N₂) = 14 / 28 = 0,50 mol → n(NH₃) teórico = 0,50 · 2 = 1,0 mol → m teórica = 1,0 · 17 = 17 g.",
          "Rendimiento = (8,5 / 17) · 100 = <b>50 %</b>."
        ]) +
        w("q5_rendimiento") +
        "<h5>El orden que no puedes alterar</h5>" +
        "<ol><li><b>Ajusta</b> la ecuación.</li><li><b>Pureza</b>: corrige la masa del reactivo impuro.</li><li><b>Pasa todo a moles</b> (masa, disolución, gas).</li><li><b>Limitante</b> (si hay dos datos de reactivos): menor «moles / coeficiente».</li><li><b>Proporción</b> con el limitante hasta la sustancia pedida.</li><li><b>Unidad pedida</b> (gramos, litros de gas, molaridad…).</li><li><b>Rendimiento</b>, al final, sobre el valor teórico.</li></ol>"
      )
    },
    // ------------------------------------------------------------ 6
    {
      h: "6. Fórmula empírica y molecular: de los datos a la fórmula",
      html: env(
        "<h5>Dos fórmulas, dos preguntas distintas</h5>" +
        "<p>La <b>fórmula empírica</b> da la proporción más sencilla (en números enteros) entre los átomos de cada elemento; la <b>fórmula molecular</b> da el número real de átomos de cada tipo en una molécula, y es un múltiplo de la empírica. La glucosa (C₆H₁₂O₆) y el formaldehído (CH₂O) tienen la misma empírica, CH₂O, y por eso <b>los porcentajes en masa solos solo dan la empírica</b>: para la molecular hace falta además la <b>masa molar</b>.</p>" +
        "<h5>Método: de porcentajes (o gramos) a la fórmula</h5>" +
        "<ol><li>Supón <b>100 g</b> de compuesto: los porcentajes pasan a gramos.</li><li>Divide cada masa entre su masa atómica → <b>moles de átomos</b>.</li><li><b>Divide todos entre el menor</b>.</li><li>Si salen decimales, multiplica hasta tener enteros: x,5 → ×2; x,33 o x,67 → ×3; x,25 o x,75 → ×4.</li><li>Molecular: n = M / M(empírica), y se multiplican todos los subíndices por n.</li></ol>" +
        tabla(["Si te sale…", "Multiplica por…", "Ejemplo"], [
          ["x,50", "2", "1 : 1,5 → 2 : 3 (Fe₂O₃)"],
          ["x,33 ó x,67", "3", "1 : 1,33 → 3 : 4 (Fe₃O₄)"],
          ["x,25 ó x,75", "4", "1 : 1,25 → 4 : 5"],
          ["x,20, x,40, x,60 ó x,80", "5", "1 : 1,2 → 5 : 6"]
        ], "q3t") +
        ejemplo("Ejemplo resuelto: de los porcentajes a la molecular", "Un compuesto tiene 40,0 % de C, 6,7 % de H y 53,3 % de O, y su masa molar es 180 g/mol. Halla su fórmula empírica y molecular. (C = 12; H = 1; O = 16)", [
          "En 100 g: 40,0 g de C, 6,7 g de H, 53,3 g de O.",
          "Moles de átomos: C → 40,0 / 12 = 3,33; H → 6,7 / 1 = 6,7; O → 53,3 / 16 = 3,33.",
          "Dividimos entre el menor (3,33): C → 1; H → 2,01 ≈ 2; O → 1,00. <b>Fórmula empírica: CH₂O</b> (masa 30 g/mol).",
          "n = 180 / 30 = 6 → <b>fórmula molecular: C₆H₁₂O₆</b> (la glucosa)."
        ]) +
        "<h5>Análisis por combustión</h5>" +
        "<p>Para un compuesto orgánico se quema una masa conocida con exceso de oxígeno y se recogen los productos: <b>todo el C acaba como CO₂ y todo el H como H₂O</b>. Se pesan el CO₂ y el H₂O, y de ahí se calculan los moles de C y de H. El <b>oxígeno</b> (si lo hay) <b>no se mide directamente</b>: se obtiene <b>por diferencia</b> restando a la masa de la muestra las masas de C y de H.</p>" +
        ejemplo("Ejemplo resuelto: combustión", "Al quemar 1,50 g de un compuesto de C, H y O se obtienen 2,200 g de CO₂ y 0,900 g de H₂O. Su masa molar es 60 g/mol. Halla su fórmula molecular. (C = 12; H = 1; O = 16)", [
          "Moles de C = moles de CO₂ = 2,200 / 44 = 0,0500 mol → m(C) = 0,0500 · 12 = 0,600 g.",
          "Moles de H = 2 · moles de H₂O = 2 · (0,900 / 18) = 0,100 mol → m(H) = 0,100 g. (Cada H₂O aporta <b>2</b> átomos de H.)",
          "Oxígeno por diferencia: m(O) = 1,50 − 0,600 − 0,100 = 0,800 g → n(O) = 0,800 / 16 = 0,0500 mol.",
          "Proporción: C 0,0500 : H 0,100 : O 0,0500 → dividiendo entre 0,0500: 1 : 2 : 1 → <b>empírica CH₂O</b> (30 g/mol).",
          "n = 60 / 30 = 2 → <b>molecular C₂H₄O₂</b> (ácido acético)."
        ]) +
        w("q4_empirica") +
        "<p>En el simulador puedes probarlo con el modo «Análisis por combustión»: escribe la masa de muestra, la de CO₂ y la de H₂O y ve cómo se construye la tabla.</p>" +
        "<h5>Hidratos: cuántas aguas lleva la sal</h5>" +
        ejemplo("Ejemplo resuelto: el valor de x en CuSO₄·xH₂O", "Al calentar 5,00 g de sulfato de cobre(II) hidratado, CuSO₄·xH₂O, quedan 3,19 g de sal anhidra. Calcula x. (Cu = 63,5; S = 32; O = 16; H = 1)", [
          "Masa de agua perdida: 5,00 − 3,19 = 1,81 g → n(H₂O) = 1,81 / 18 = 0,1006 mol.",
          "Moles de sal anhidra: M(CuSO₄) = 159,5 → n = 3,19 / 159,5 = 0,0200 mol.",
          "x = n(H₂O) / n(CuSO₄) = 0,1006 / 0,0200 = 5,03 ≈ <b>5</b>: es CuSO₄·5H₂O."
        ]) +
        ojo("No redondees con prisa: una relación de 1,33 no es 1 (es 4/3 → multiplica por 3); y 1,5 tampoco es 2. Y recuerda que sin la masa molar solo puedes dar la fórmula <b>empírica</b>, aunque el enunciado hable de «la fórmula del compuesto».")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Mezclas de dos sustancias: sistemas de dos ecuaciones",
      html: env(
        "<h5>Dos incógnitas necesitan dos ecuaciones</h5>" +
        "<p>Los problemas de <b>mezclas</b> dan una masa total y una medida de un producto (volumen de gas, masa de un precipitado…) y piden cuánto hay de cada componente. Siempre hay <b>dos ecuaciones</b>: una de <b>masas</b> (x + y = masa de la mezcla) y otra del <b>producto</b> (lo que aporta cada una de las sustancias, sumado, es lo medido). Si hubiera tres componentes, habría que tener tres datos.</p>" +
        ejemplo("Ejemplo resuelto: CaCO₃ y MgCO₃", "10,0 g de una mezcla de CaCO₃ y MgCO₃ se calcinan y se desprenden 2,50 L de CO₂ medidos en CN. Calcula la composición de la mezcla. (Ca = 40; Mg = 24; C = 12; O = 16)", [
          "Cada carbonato se descompone así: CaCO₃ → CaO + CO₂ y MgCO₃ → MgO + CO₂. Un mol de cada uno da <b>un</b> mol de CO₂. M(CaCO₃) = 100 y M(MgCO₃) = 84 g/mol.",
          "Moles de CO₂: n = 2,50 / 22,4 = 0,1116 mol.",
          "Sean x los gramos de CaCO₃ e y los de MgCO₃. <b>Ecuación de masas:</b> x + y = 10,0. <b>Ecuación del CO₂:</b> x/100 + y/84 = 0,1116.",
          "Sustituimos y = 10,0 − x: x/100 + (10,0 − x)/84 = 0,1116. Multiplicamos por 8400: 84x + 100(10,0 − x) = 937,5 → −16x = −62,5 → <b>x = 3,91 g de CaCO₃</b>.",
          "y = 10,0 − 3,91 = <b>6,09 g de MgCO₃</b>. Composición: <b>39,1 % de CaCO₃ y 60,9 % de MgCO₃</b>."
        ]) +
        "<p>Hay una forma de <b>verlo</b>: si la mezcla fuera solo MgCO₃, se desprenderían 2,67 L; si fuera solo CaCO₃, 2,24 L. Cada composición posible da un volumen en la <b>recta</b> que une esos dos extremos, y el valor medido (2,50 L) corta la recta en un punto que indica el porcentaje. Pruébalo moviendo el deslizador de composición.</p>" +
        w("qq1_mezcla") +
        ejemplo("Ejemplo resuelto: una aleación de Zn y Al", "1,50 g de una aleación de Zn y Al reaccionan con HCl en exceso y se recogen 1,446 L de H₂ a 25 °C y 1 atm. Calcula la masa de cada metal. (Zn = 65,4; Al = 27)", [
          "Reacciones: Zn + 2 HCl → ZnCl₂ + H₂ (1 mol de H₂ por mol de Zn) y 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂ (<b>1,5 mol de H₂ por mol de Al</b>).",
          "Moles de H₂: n = PV/RT = 1 · 1,446 / (0,082 · 298) = 0,0592 mol.",
          "Sean x (g de Zn) e y (g de Al): x + y = 1,50 y x/65,4 + 1,5·y/27 = 0,0592.",
          "Sustituyendo y = 1,50 − x: 0,01529·x + 0,05556·(1,50 − x) = 0,0592 → 0,0833 − 0,04027·x = 0,0592 → <b>x = 0,600 g de Zn</b>.",
          "y = 1,50 − 0,600 = <b>0,900 g de Al</b>: la aleación es un 40 % de Zn y un 60 % de Al."
        ]) +
        ejemplo("Ejemplo resuelto: una mezcla de gases", "Se queman 10 L de una mezcla de metano (CH₄) y etano (C₂H₆) y se consumen 26 L de O₂ en las mismas condiciones. Calcula el volumen de cada gas en la mezcla.", [
          "CH₄ + 2 O₂ → CO₂ + 2 H₂O: 1 volumen de CH₄ necesita 2 de O₂. C₂H₆ + 7/2 O₂ → 2 CO₂ + 3 H₂O: 1 volumen de C₂H₆ necesita 3,5 de O₂ (a igual P y T, volumen ∝ moles).",
          "Sean x litros de CH₄ e y litros de C₂H₆: x + y = 10 y 2x + 3,5y = 26.",
          "Sustituyendo x = 10 − y: 20 − 2y + 3,5y = 26 → 1,5y = 6 → <b>y = 4 L de C₂H₆</b> y <b>x = 6 L de CH₄</b> (60 % y 40 %)."
        ]) +
        ojo("Cuidado con mezclar unidades en la misma ecuación: <b>no sumes gramos con moles</b>. En la ecuación de masas todo va en gramos; en la del producto, en moles (o en litros) por gramo. Y comprueba al final que x e y salen <b>positivas</b> y que x + y da la masa de la mezcla.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Estrategia para un problema de cálculos de la EvAU",
      html: env(
        "<p>Los problemas de Selectividad de Madrid suelen encadenar varios de los pasos anteriores, y se puntúan <b>por apartados</b>: plantear bien vale tanto como acertar el número. Una estrategia fija ahorra errores.</p>" +
        "<h5>Qué hacer según lo que veas en el enunciado</h5>" +
        tabla(["Si el enunciado dice…", "Piensa en…"], [
          ["«riqueza», «pureza», «% de …» de un sólido", "Corrige la masa del reactivo impuro antes de pasar a moles"],
          ["«un exceso de …», «en exceso»", "Ese reactivo no limita: el cálculo se hace con el otro dato"],
          ["dos cantidades de reactivos (sin «exceso»)", "Reactivo limitante: menor «moles ÷ coeficiente»"],
          ["«rendimiento del …», «se obtienen … g» (real)", "Rendimiento = real / teórico; se aplica al final"],
          ["«en condiciones normales»", "1 mol de gas = 22,4 L"],
          ["«a … °C y … atm / mmHg»", "PV = nRT (T en K; P en atm con R = 0,082)"],
          ["«disolución … M» y un volumen", "n = M · V, con V en litros"],
          ["«d = … g/mL», «el … % en masa»", "Masa de disolución = V · d; masa de soluto = masa · %"],
          ["«en las mismas condiciones de P y T» (gases)", "Los coeficientes valen como proporción de volúmenes"],
          ["una masa de mezcla y un dato de producto", "Sistema de dos ecuaciones (masas + producto)"],
          ["porcentajes, o masas de CO₂ y H₂O", "Fórmula empírica (÷ el menor) y molecular (÷ M empírica)"]
        ], "q3t") +
        "<h5>Cinco hábitos que dan puntos</h5>" +
        "<ol><li><b>Escribe la reacción ajustada</b> aunque no te la pidan: el tribunal ve que sabes qué ocurre.</li><li><b>Pon unidades en cada línea</b>: si salen mol/L cuando debían salir moles, algo falla.</li><li><b>No redondees a medias</b>: guarda tres o cuatro cifras en los pasos intermedios y redondea el resultado final.</li><li><b>Comprueba el orden de magnitud</b>: ¿puede una masa de producto superar la de los reactivos? ¿un rendimiento ser del 120 %?</li><li><b>Usa los datos del enunciado</b> (masas atómicas, R): son los que corrige el tribunal.</li></ol>" +
        "<p>Este asistente te ayuda a construir el plan de resolución: marca lo que aparece en tu enunciado y te da el orden de pasos.</p>" +
        w("q5_mapa")
      )
    },
    // ------------------------------------------------------------ 9, 10
    {
      h: "9. ¿Qué falla aquí? Errores típicos de cálculos",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    {
      h: "10. Autocomprobación del tema",
      html: "<p>Un test de diez preguntas, tarjetas para fijar definiciones y dos juegos de ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarj") + w("clasificar", "clas1") + w("orden", "ord1")
    }
  ];

  B.parte.q2t1b = { nuevas: nuevas };
})(window);
