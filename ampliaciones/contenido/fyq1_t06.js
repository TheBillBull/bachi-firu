/* ============================================================
   Física y Química I · ampliaciones · Tema 6: Termoquímica
   Lo original de pagina.html no se toca: aquí sólo se añade teoría al final
   de cada sección, secciones nuevas, actividades, ejercicios y lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t6/" + ref); }

  var resumen = [
    "<b>Primer principio</b>: ΔU = Q + W. Convenio: lo que <b>entra</b> en el sistema es positivo (Q &gt; 0 si recibe calor; W &gt; 0 si se hace trabajo sobre él). A presión constante, <b>ΔH = Q<sub>p</sub></b>.",
    "<b>Exotérmica</b>: ΔH &lt; 0, libera calor. <b>Endotérmica</b>: ΔH &gt; 0, absorbe calor. La ecuación termoquímica lleva estados físicos y ΔH «por mol de reacción»: si se invierte, ΔH cambia de signo; si se multiplica, ΔH se multiplica.",
    "<b>Calor</b>: Q = m·c·ΔT (sin cambio de estado) y Q = m·L (cambio de estado). En un sistema aislado, el calor que cede un cuerpo lo gana el otro.",
    "<b>Ley de Hess</b>: la entalpía es función de estado, así que ΔH total = suma de los ΔH de las etapas. <b>ΔH° = ΣΔH°<sub>f</sub>(productos) − ΣΔH°<sub>f</sub>(reactivos)</b>, con ΔH°<sub>f</sub> = 0 en los elementos.",
    "<b>Enlaces</b>: ΔH ≈ ΣE(enlaces rotos) − ΣE(enlaces formados). <b>Espontaneidad</b>: ΔG = ΔH − T·ΔS; espontánea si ΔG &lt; 0. Combustibles: energía por gramo y CO₂ emitido."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Sistema, entorno y energía interna
  secciones[0] =
    "<h5>Tres tipos de sistema según lo que intercambia</h5>" +
    "<p>Antes de hablar de energía hay que decidir <b>qué parte del universo estudias</b> y qué puede entrar o salir de ella. Según el intercambio con el entorno, los sistemas se clasifican así:</p>" +
    tabla(["Tipo de sistema", "Materia", "Energía", "Ejemplo"], [
      ["Abierto", "sí", "sí", "una olla sin tapa con agua hirviendo; un ser vivo; una vela encendida"],
      ["Cerrado", "no", "sí (calor y trabajo)", "un matraz tapado sobre una placa calefactora; una bolsa de frío instantáneo sin abrir"],
      ["Aislado", "no", "no", "un termo ideal bien cerrado (en la práctica sólo es aproximado); el universo entero"]
    ]) +
    "<p>En termoquímica casi siempre se trabaja con <b>sistemas cerrados</b>: los reactivos y los productos están dentro del recipiente (la masa total no cambia) y lo único que puede atravesar la pared es energía, en forma de calor o de trabajo.</p>" +
    "<h5>Variables de estado, funciones de estado y funciones de camino</h5>" +
    "<p>El <b>estado</b> de un sistema se describe con unas pocas magnitudes medibles: presión p, volumen V, temperatura T y cantidad de sustancia n. Una magnitud es una <b>función de estado</b> si su valor depende <i>sólo</i> del estado en que está el sistema y no de cómo llegó hasta él. La energía interna U y la entalpía H son funciones de estado; el calor Q y el trabajo W <b>no lo son</b>: dependen del camino seguido.</p>" +
    "<p>La analogía clásica es un viaje en coche de Madrid a Barcelona. La <b>altitud</b> a la que acabas (Barcelona está a unos 12 m sobre el mar) no depende de la ruta que elijas: es una función de estado. En cambio los <b>kilómetros recorridos</b> y la gasolina gastada sí dependen de si vas por la autovía o por carreteras secundarias: son funciones de camino, como Q y W. Cuando un gas pasa de un estado a otro, ΔU es siempre el mismo, pero Q y W pueden repartirse de muchas maneras distintas (sólo su suma está fijada).</p>" +
    "<h5>El convenio de signos: lo que entra es positivo</h5>" +
    "<p>Para que todos los resultados sean comparables hace falta un acuerdo sobre los signos. El que se usa en este curso (convenio de la IUPAC, el mismo con el que está escrito ΔU = Q + W) se mira siempre <b>desde el sistema</b>: es como una cuenta bancaria, en la que lo que ingresas es positivo y lo que retiras es negativo.</p>" +
    tabla(["Magnitud", "Signo positivo (+)", "Signo negativo (−)"], [
      ["Calor Q", "el sistema <b>recibe</b> calor del entorno", "el sistema <b>cede</b> calor al entorno"],
      ["Trabajo W", "el entorno realiza trabajo <b>sobre</b> el sistema (compresión)", "el sistema <b>realiza</b> trabajo sobre el entorno (expansión)"],
      ["Energía interna ΔU", "la energía interna aumenta (el sistema «gana» energía)", "la energía interna disminuye"]
    ]) +
    ejemplo("Aplicar el primer principio", "Un gas encerrado en un cilindro con émbolo absorbe 250 J de calor de una llama y, al expandirse, realiza 80 J de trabajo sobre el entorno. Calcula la variación de su energía interna.", [
      "Calor: el sistema <b>recibe</b> calor, luego Q = +250 J.",
      "Trabajo: el sistema <b>realiza</b> trabajo, luego W = −80 J (sale energía del sistema).",
      "Primer principio: ΔU = Q + W = 250 + (−80) = <b>+170 J</b>.",
      "Interpretación: entran 250 J, salen 80 J en forma de trabajo y los 170 J restantes quedan almacenados como mayor energía interna (el gas se calienta)."
    ]) +
    ejemplo("Compresión con pérdida de calor", "Se comprime un gas haciendo sobre él un trabajo de 500 J, y durante el proceso cede 200 J de calor al entorno. ¿Cuánto vale ΔU?", [
      "Se hace trabajo sobre el sistema: W = +500 J. El sistema cede calor: Q = −200 J.",
      "ΔU = Q + W = −200 + 500 = <b>+300 J</b>.",
      "La energía interna <b>aumenta</b> aunque el gas haya perdido calor: el trabajo de compresión aportó más energía de la que se escapó."
    ]) +
    "<h5>Trabajo de expansión a presión constante</h5>" +
    "<p>En química el único trabajo relevante suele ser el que hace (o recibe) un gas al cambiar de volumen. A presión externa constante vale:</p>" +
    H.formula("W = −p · ΔV") +
    "<p>El signo menos asegura que si el gas se <b>expande</b> (ΔV &gt; 0) el trabajo sea negativo (el sistema pierde energía al empujar) y que si se <b>comprime</b> (ΔV &lt; 0) sea positivo. Si el volumen no cambia (recipiente rígido), W = 0 y todo el calor aumenta la energía interna: ΔU = Q<sub>v</sub>.</p>" +
    "<p>Una unidad muy cómoda es la atmósfera por litro: <b>1 atm·L = 101,325 J</b> (porque 1 atm = 101 325 Pa y 1 L = 10⁻³ m³).</p>" +
    ejemplo("Trabajo de expansión", "Un gas se expande de 3 L a 8 L frente a una presión externa constante de 2 atm. Calcula el trabajo en julios.", [
      "ΔV = 8 − 3 = 5 L (expansión).",
      "W = −p·ΔV = −2 atm · 5 L = −10 atm·L.",
      "Conversión: −10 · 101,325 = <b>−1 013 J</b> (aprox. −1,01 kJ).",
      "El signo negativo indica que es el sistema quien realiza el trabajo sobre el entorno."
    ]) +
    w("q6_primer") +
    "<h5>Qué es la energía interna</h5>" +
    "<p>La energía interna U es la suma de dos tipos de energía de las partículas: la <b>cinética</b> (traslación, rotación y vibración de moléculas, relacionada con la temperatura) y la <b>potencial</b> (atracciones entre moléculas y, sobre todo, la energía almacenada en los enlaces químicos). No se puede medir su valor absoluto, pero sí sus <b>variaciones</b> ΔU, que es lo único que interesa. En un gas ideal U sólo depende de la temperatura; en una reacción química, ΔU refleja principalmente el balance entre romper unos enlaces y formar otros. En un <b>sistema aislado</b> Q = 0 y W = 0, por lo que ΔU = 0: la energía interna total se conserva.</p>" +
    "<h5>Calor y temperatura no son lo mismo</h5>" +
    "<ul><li><b>Temperatura</b> es una medida del grado de agitación media de las partículas (energía cinética media). Se mide en kelvin (K) o en °C.</li>" +
    "<li><b>Calor</b> es energía que se <b>transfiere</b> entre dos cuerpos que están a distinta temperatura, siempre del más caliente al más frío, hasta que se igualan. No «se tiene»: se intercambia. Un cuerpo no «contiene» calor, contiene energía interna.</li></ul>" +
    "<p>Dos conversiones imprescindibles: <b>T(K) = T(°C) + 273,15</b> (y los incrementos son iguales: una variación de 1 °C es una variación de 1 K), y <b>1 cal = 4,184 J</b> (la caloría es una unidad antigua que todavía aparece en las etiquetas de los alimentos en forma de kcal: 1 kcal = 4,184 kJ).</p>" +
    ejemplo("Cambio de unidades", "Una barrita energética aporta 250 kcal. ¿Cuántos kJ son? ¿Y cuántos kWh?", [
      "250 kcal · 4,184 kJ/kcal = <b>1 046 kJ</b>.",
      "1 kWh = 3 600 kJ, luego 1 046/3 600 = <b>0,29 kWh</b> (menos de la energía que consume una bombilla de 60 W en 5 horas).",
      "Recuerda: la «caloría» de las dietas es en realidad la kilocaloría."
    ]);

  // ---------------------------------------------------------------- 2. Exotérmicas y endotérmicas
  secciones[1] =
    "<h5>Por qué se usa la entalpía</h5>" +
    "<p>Si una reacción ocurre en un recipiente abierto a la atmósfera (presión constante), el volumen puede cambiar (si se desprende un gas, el gas empuja al aire) y parte de la energía se va en trabajo. Para no tener que contabilizar ese trabajo cada vez se define una función de estado nueva, la <b>entalpía</b>:</p>" +
    H.formula("H = U + p·V") +
    "<p>Si sumas y restas, a presión constante resulta ΔH = ΔU + p·ΔV. Como el primer principio dice ΔU = Q + W y W = −p·ΔV, al sustituir queda <b>ΔH = Q<sub>p</sub></b>: la variación de entalpía <b>es</b> el calor intercambiado a presión constante. Por eso en el laboratorio, midiendo el calor que absorbe o desprende una reacción abierta, se obtiene directamente ΔH. (Si el recipiente es rígido, el calor medido es ΔU.)</p>" +
    "<h5>Qué significa el signo de ΔH</h5>" +
    tabla(["", "Exotérmica (ΔH &lt; 0)", "Endotérmica (ΔH &gt; 0)"], [
      ["Calor", "se <b>libera</b> al entorno", "se <b>absorbe</b> del entorno"],
      ["Entalpía de los productos", "menor que la de los reactivos", "mayor que la de los reactivos"],
      ["Efecto en el entorno", "se calienta", "se enfría"],
      ["Estabilidad", "los productos son más estables (menos energía almacenada)", "los productos son menos estables (más energía almacenada)"],
      ["Ejemplos", "combustiones, neutralización, respiración celular, oxidación del hierro", "fotosíntesis, descomposición térmica del CaCO₃, fusión y evaporación, disolución del NH₄NO₃"]
    ]) +
    w("q6_diagrama") +
    "<h5>La energía de activación: por qué una reacción exotérmica no arranca sola</h5>" +
    "<p>Un papel arde desprendiendo mucho calor (ΔH &lt; 0), pero a temperatura ambiente no se quema espontáneamente: hay que acercarle una llama. Las moléculas de reactivo necesitan una energía mínima para romper los primeros enlaces y «subir» a un estado intermedio inestable llamado <b>complejo activado</b>; esa «cuesta» se llama <b>energía de activación</b>, E<sub>a</sub>. Es un concepto de <b>cinética</b> (cuánta energía hace falta para empezar y, por tanto, lo rápida que va la reacción) y no cambia el balance final de energía, que es el ΔH.</p>" +
    "<ul><li>ΔH depende sólo de los niveles de reactivos y productos (termodinámica); E<sub>a</sub> depende del «puerto de montaña» entre ambos (cinética).</li>" +
    "<li>Un <b>catalizador</b> ofrece un camino alternativo con menor E<sub>a</sub>: la reacción es más rápida, pero ΔH no cambia.</li>" +
    "<li>Para la reacción inversa: E<sub>a</sub>(inversa) = E<sub>a</sub>(directa) − ΔH.</li></ul>" +
    ejemplo("Leer un diagrama entálpico", "Una reacción tiene E<sub>a</sub> = 80 kJ/mol y ΔH = −120 kJ/mol. Calcula la energía de activación de la reacción inversa y clasifica ambas reacciones.", [
      "Reacción directa: ΔH = −120 kJ/mol &lt; 0, <b>exotérmica</b>, con E<sub>a</sub> = 80 kJ/mol.",
      "Reacción inversa: ΔH′ = +120 kJ/mol, <b>endotérmica</b>.",
      "E<sub>a</sub>(inversa) = E<sub>a</sub>(directa) − ΔH = 80 − (−120) = <b>200 kJ/mol</b>: los productos están más abajo, y hay que subir más para volver atrás.",
      "Si un catalizador reduce E<sub>a</sub>(directa) a 50 kJ/mol, E<sub>a</sub>(inversa) pasa a 170 kJ/mol; ΔH sigue siendo −120 kJ/mol."
    ]) +
    "<h5>Ejemplos de la vida diaria</h5>" +
    tabla(["Proceso", "Tipo", "Qué se nota"], [
      ["Combustión de gas, madera o gasolina", "exotérmica", "calor y luz; es la fuente de energía más usada"],
      ["Respiración celular: C₆H₁₂O₆ + 6 O₂ ⟶ 6 CO₂ + 6 H₂O", "exotérmica", "la energía liberada mantiene la temperatura corporal"],
      ["Fotosíntesis", "endotérmica", "absorbe energía de la luz solar para fabricar glucosa"],
      ["Disolver NH₄NO₃ en agua (bolsa de frío instantáneo)", "endotérmica", "la bolsa se enfría al activarla"],
      ["Disolver CaCl₂ en agua (bolsa de calor)", "exotérmica", "la bolsa se calienta"],
      ["Neutralización ácido-base fuerte (HCl + NaOH)", "exotérmica", "se desprenden unos 57 kJ por mol de agua formada"],
      ["Descomponer caliza: CaCO₃ ⟶ CaO + CO₂", "endotérmica", "hay que calentar el horno de cal a unos 900 °C"],
      ["Oxidación del hierro (óxido)", "exotérmica", "tan lenta que no se nota; en los calentadores de manos se acelera"],
      ["Evaporación del sudor", "endotérmica", "absorbe calor de la piel: por eso refresca"]
    ]) +
    ojo("tres ideas falsas muy extendidas: (1) «exotérmica = rápida o espontánea» (ΔH no dice nada de la velocidad ni, por sí solo, de la espontaneidad); (2) «endotérmica = hay que calentar siempre» (el NH₄NO₃ se disuelve solo aunque absorba calor); (3) «ΔH es la energía de activación» (son cosas distintas: ΔH es el balance, E<sub>a</sub> es la barrera).") +
    "<h5>ΔH es una magnitud extensiva</h5>" +
    "<p>La cantidad de calor intercambiada es proporcional a la cantidad de sustancia que reacciona: quemar el doble de metano libera el doble de calor. Por eso ΔH se da <b>por mol de reacción</b> (kJ/mol), es decir, para las cantidades que indican los coeficientes de la ecuación tal como está escrita, como verás a continuación.</p>";

  // ---------------------------------------------------------------- 3. Ecuaciones termoquímicas
  secciones[2] =
    "<h5>Cómo se escribe una ecuación termoquímica</h5>" +
    "<p>Una ecuación termoquímica es una ecuación química <b>ajustada</b> con tres detalles añadidos: (1) el <b>estado físico</b> de cada sustancia, (2) el valor de ΔH y (3) la referencia de que se trata de las condiciones que se indiquen (las estándar, si aparece el símbolo °). Es imprescindible indicar el estado porque la entalpía depende de él: no es lo mismo formar agua líquida que vapor de agua.</p>" +
    tabla(["Ecuación termoquímica", "ΔH (kJ)"], [
      ["H₂(g) + ½ O₂(g) ⟶ H₂O(l)", "−285,8"],
      ["H₂(g) + ½ O₂(g) ⟶ H₂O(g)", "−241,8"],
      ["2 H₂(g) + O₂(g) ⟶ 2 H₂O(l)", "−571,6"],
      ["H₂O(l) ⟶ H₂O(g)", "+44,0"]
    ]) +
    "<p>Las dos primeras ecuaciones sólo se diferencian en el estado del producto, y la diferencia es de 44 kJ: justo el calor necesario para evaporar un mol de agua (18 g). La tercera es la primera multiplicada por 2, y su ΔH también (−285,8 · 2 = −571,6).</p>" +
    "<h5>Reglas para manipular ecuaciones</h5>" +
    tabla(["Operación", "Qué le ocurre a ΔH", "Ejemplo"], [
      ["Multiplicar los coeficientes por n", "se multiplica por n", "2 H₂ + O₂ ⟶ 2 H₂O: 2·(−285,8) = −571,6 kJ"],
      ["Invertir la ecuación", "cambia de signo", "H₂O(l) ⟶ H₂ + ½ O₂: +285,8 kJ"],
      ["Sumar dos ecuaciones", "se suman los ΔH", "ver ley de Hess"],
      ["Cambiar el estado de una sustancia", "cambia ΔH (diferencia = calor de cambio de estado)", "H₂O(g) en vez de H₂O(l): −241,8 en vez de −285,8"]
    ]) +
    "<h5>Condiciones estándar</h5>" +
    "<p>Para poder comparar valores medidos en laboratorios distintos se definen unas <b>condiciones estándar</b>: presión de 1 bar (≈ 1 atm), temperatura habitual de 298 K (25 °C) y, para las sustancias en disolución, concentración 1 M. Se indican con el símbolo °: ΔH°. Los datos de las tablas son valores estándar. Además, cada sustancia debe estar en su <b>estado de referencia</b> (el más estable en esas condiciones): O₂ gas, H₂ gas, carbono como grafito, mercurio y bromo como líquidos, el resto de metales como sólidos.</p>" +
    "<h5>Calor intercambiado con una cantidad cualquiera de reactivo</h5>" +
    "<p>La entalpía de reacción se refiere a los moles indicados por los coeficientes. Para otra cantidad se plantea una proporción (como en cualquier problema de estequiometría): <b>Q = (n / coeficiente) · ΔH</b>, donde n son los moles de la sustancia elegida y «coeficiente» es el que tiene en la ecuación.</p>" +
    ejemplo("Calor de combustión de una masa dada", "La combustión del metano es CH₄(g) + 2 O₂(g) ⟶ CO₂(g) + 2 H₂O(l), ΔH = −890 kJ. Calcula el calor que se desprende al quemar 10 g de metano (M = 16 g/mol).", [
      "Moles de metano: n = 10 g / 16 g·mol⁻¹ = 0,625 mol.",
      "La ecuación usa 1 mol de CH₄ (coeficiente 1) para liberar 890 kJ, luego: Q = 0,625 · (−890) = <b>−556 kJ</b>.",
      "Se desprenden unos 556 kJ (el signo negativo indica que el sistema pierde energía)."
    ]) +
    ejemplo("Masa necesaria para obtener un calor dado", "¿Qué masa de propano (M = 44 g/mol) hay que quemar para obtener 1 000 kJ si C₃H₈(g) + 5 O₂(g) ⟶ 3 CO₂(g) + 4 H₂O(l), ΔH = −2 220 kJ?", [
      "Calor por mol de propano: 2 220 kJ.",
      "Moles necesarios: n = 1 000/2 220 = 0,4505 mol.",
      "Masa: m = n·M = 0,4505 · 44 = <b>19,8 g de propano</b>."
    ]) +
    ejemplo("Ecuación con coeficiente distinto de 1", "En la síntesis del amoniaco, N₂(g) + 3 H₂(g) ⟶ 2 NH₃(g), ΔH = −92,2 kJ. ¿Cuánto calor se desprende al formarse 34 g de NH₃? (M = 17 g/mol)", [
      "Moles de NH₃: 34/17 = 2,0 mol.",
      "La ecuación forma 2 mol de NH₃ por cada −92,2 kJ. Como n/coef = 2/2 = 1: Q = 1 · (−92,2) = <b>−92,2 kJ</b>.",
      "Si en cambio se formaran 17 g (1 mol), saldría la mitad: −46,1 kJ (que es precisamente la entalpía de formación del NH₃)."
    ]) +
    ejemplo("Neutralización medida en un calorímetro", "Se mezclan 50 mL de HCl 1,0 M con 50 mL de NaOH 1,0 M. La reacción HCl + NaOH ⟶ NaCl + H₂O tiene ΔH = −57,1 kJ/mol. Suponiendo que la mezcla (100 g, c = 4,18 J·g⁻¹·K⁻¹) absorbe todo el calor, ¿cuánto sube la temperatura?", [
      "Moles de cada reactivo: 0,050 L · 1,0 mol/L = 0,050 mol (proporción exacta 1 : 1).",
      "Calor desprendido: Q = 0,050 · 57,1 = 2,855 kJ = 2 855 J.",
      "Esa energía calienta la mezcla: ΔT = Q/(m·c) = 2 855/(100 · 4,18) = <b>6,8 K</b>.",
      "Así es como se determina experimentalmente una entalpía de reacción: se mide ΔT y se calcula Q."
    ]) +
    ojo("el ΔH de una ecuación sólo vale para esa ecuación escrita así. Si el enunciado da ΔH = −571,6 kJ para 2 H₂ + O₂ ⟶ 2 H₂O y te piden el calor para 1 mol de H₂O, divide entre el coeficiente 2: −285,8 kJ.");

  // ---------------------------------------------------------------- 4. Ley de Hess
  secciones[3] =
    "<h5>La idea: no importa el camino</h5>" +
    "<p>Imagina que quieres subir de la planta baja de un edificio al tercer piso. Da igual que lo hagas por las escaleras de la izquierda, por las de la derecha o en ascensor con parada intermedia: la <b>diferencia de altura</b> entre el punto de partida y el de llegada es siempre la misma. Con la entalpía ocurre exactamente igual: es una función de estado, así que ΔH sólo depende de los reactivos del principio y de los productos del final, no de las reacciones intermedias que se hayan producido por el camino.</p>" +
    "<p>Esa es la <b>ley de Hess</b> (1840): si una reacción puede expresarse como suma de otras, su ΔH es la suma de los ΔH de esas otras. Hess la formuló antes del primer principio, midiendo calores de reacción con un calorímetro.</p>" +
    "<h5>Para qué sirve</h5>" +
    "<p>Muchas reacciones son difíciles o imposibles de medir directamente: pueden ser lentas, tener productos secundarios o ser peligrosas. Un ejemplo célebre es la formación de monóxido de carbono a partir de carbono y oxígeno, C + ½ O₂ ⟶ CO: es imposible conseguir que el carbono se queme y se detenga justo en CO sin que parte llegue a CO₂. Sin embargo, sí se pueden medir con precisión la combustión del carbono hasta CO₂ y la del CO hasta CO₂, y combinándolas se obtiene el dato que faltaba.</p>" +
    ejemplo("Hess con dos ecuaciones", "Calcula el ΔH de C(s) + ½ O₂(g) ⟶ CO(g) a partir de: (1) C(s) + O₂(g) ⟶ CO₂(g), ΔH₁ = −393,5 kJ; (2) CO(g) + ½ O₂(g) ⟶ CO₂(g), ΔH₂ = −283,0 kJ.", [
      "Objetivo: el CO debe aparecer como <b>producto</b>. En (2) aparece como reactivo: hay que <b>invertir</b> (2): CO₂(g) ⟶ CO(g) + ½ O₂(g), ΔH = +283,0 kJ.",
      "(1) se deja igual: tiene C(s) como reactivo, como en el objetivo.",
      "Suma: C + O₂ + CO₂ ⟶ CO₂ + CO + ½ O₂. Se cancela el CO₂ y queda un ½ O₂ en el lado de los reactivos (O₂ − ½ O₂): <b>C + ½ O₂ ⟶ CO</b> ✓.",
      "ΔH = −393,5 + 283,0 = <b>−110,5 kJ</b>."
    ]) +
    "<h5>Método en cuatro pasos</h5>" +
    "<ol>" +
    "<li><b>Escribe la ecuación objetivo</b> y localiza en las ecuaciones de datos las sustancias que sólo aparecen en una de ellas.</li>" +
    "<li><b>Orienta cada ecuación</b>: si una sustancia del objetivo está en el lado contrario, invierte la ecuación (cambia el signo de su ΔH).</li>" +
    "<li><b>Multiplica</b> cada ecuación por el factor que iguale su coeficiente al del objetivo (multiplica también ΔH).</li>" +
    "<li><b>Suma</b> las ecuaciones, <b>cancela</b> lo que aparezca a ambos lados, comprueba que coincide con el objetivo y suma los ΔH.</li>" +
    "</ol>" +
    ejemplo("Hess con tres ecuaciones (la combustión del metano)", "Calcula ΔH de CH₄(g) + 2 O₂(g) ⟶ CO₂(g) + 2 H₂O(l) con: (1) C(s) + O₂(g) ⟶ CO₂(g), −393,5 kJ; (2) H₂(g) + ½ O₂(g) ⟶ H₂O(l), −285,8 kJ; (3) C(s) + 2 H₂(g) ⟶ CH₄(g), −74,8 kJ.", [
      "CO₂ es producto en el objetivo y en (1): (1) se deja igual. ΔH = −393,5.",
      "H₂O(l) es producto con coeficiente 2: (2) se multiplica por 2: 2 H₂ + O₂ ⟶ 2 H₂O. ΔH = 2·(−285,8) = −571,6.",
      "CH₄ es reactivo en el objetivo y producto en (3): (3) se invierte: CH₄ ⟶ C + 2 H₂. ΔH = +74,8.",
      "Suma: C + O₂ + 2 H₂ + O₂ + CH₄ ⟶ CO₂ + 2 H₂O + C + 2 H₂. Se cancelan C y 2 H₂ y quedan CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O ✓.",
      "ΔH = −393,5 − 571,6 + 74,8 = <b>−890,3 kJ</b>."
    ]) +
    w("q6_hess") +
    ejemplo("Obtener la entalpía de formación a partir de combustiones", "Calcula ΔH°<sub>f</sub> del etano, 2 C(s) + 3 H₂(g) ⟶ C₂H₆(g), sabiendo que: (1) C₂H₆(g) + 7/2 O₂(g) ⟶ 2 CO₂(g) + 3 H₂O(l), ΔH = −1 560 kJ; (2) C(s) + O₂(g) ⟶ CO₂(g), ΔH = −393,5 kJ; (3) H₂(g) + ½ O₂(g) ⟶ H₂O(l), ΔH = −285,8 kJ.", [
      "El C₂H₆ debe quedar como producto: se invierte (1): 2 CO₂ + 3 H₂O ⟶ C₂H₆ + 7/2 O₂, ΔH = +1 560.",
      "2 C(s) como reactivo: (2) × 2: 2 C + 2 O₂ ⟶ 2 CO₂, ΔH = −787,0.",
      "3 H₂ como reactivo: (3) × 3: 3 H₂ + 3/2 O₂ ⟶ 3 H₂O, ΔH = −857,4.",
      "Suma: se cancelan 2 CO₂, 3 H₂O, y el oxígeno (2 + 3/2 = 7/2 a la izquierda frente a 7/2 a la derecha). Queda 2 C + 3 H₂ ⟶ C₂H₆ ✓.",
      "ΔH = 1 560 − 787,0 − 857,4 = <b>−84,4 kJ</b> (el valor tabulado es −84,7 kJ/mol: la diferencia viene de los redondeos)."
    ]) +
    ejemplo("Hess con una transformación alotrópica", "Calcula el ΔH de C(diamante) ⟶ C(grafito) sabiendo que las combustiones C(grafito) + O₂ ⟶ CO₂ y C(diamante) + O₂ ⟶ CO₂ desprenden 393,5 y 395,4 kJ/mol, respectivamente.", [
      "Se parte del diamante: se deja la combustión del diamante: C(diamante) + O₂ ⟶ CO₂, ΔH = −395,4.",
      "El grafito debe quedar como producto: se invierte la otra: CO₂ ⟶ C(grafito) + O₂, ΔH = +393,5.",
      "Suma: C(diamante) ⟶ C(grafito). ΔH = −395,4 + 393,5 = <b>−1,9 kJ</b>.",
      "El grafito es ligeramente más estable que el diamante (por eso los diamantes «no son para siempre», aunque tardarían una eternidad en convertirse)."
    ]) +
    ejemplo("Un óxido de nitrógeno en dos pasos", "Calcula ΔH de N₂(g) + 2 O₂(g) ⟶ 2 NO₂(g) a partir de: (1) N₂(g) + O₂(g) ⟶ 2 NO(g), ΔH = +180,5 kJ; (2) 2 NO(g) + O₂(g) ⟶ 2 NO₂(g), ΔH = −114,1 kJ.", [
      "Sumando directamente (1) + (2): N₂ + O₂ + 2 NO + O₂ ⟶ 2 NO + 2 NO₂. Se cancela 2 NO y queda <b>N₂ + 2 O₂ ⟶ 2 NO₂</b> ✓.",
      "ΔH = +180,5 + (−114,1) = <b>+66,4 kJ</b> (endotérmica: por eso el N₂ y el O₂ del aire no reaccionan solos a temperatura ambiente; sí en los motores o en los rayos)."
    ]) +
    ojo("tres errores clásicos con Hess: (1) invertir una ecuación y <b>olvidar cambiar el signo</b> del ΔH; (2) multiplicar la ecuación pero no el ΔH; (3) no distinguir H₂O(l) de H₂O(g), que tienen entalpías distintas, de modo que no se cancelan.");

  // ---------------------------------------------------------------- 5. Entalpías de formación
  secciones[4] =
    "<h5>Qué es (y qué no es) una ecuación de formación</h5>" +
    "<p>La entalpía de formación estándar ΔH°<sub>f</sub> se refiere a una reacción muy concreta: <b>un mol</b> del compuesto, <b>a partir de sus elementos</b> en estado de referencia. Esto suele provocar errores, así que conviene fijarse en lo que sí y en lo que no es:</p>" +
    tabla(["Sustancia", "Ecuación de formación (correcta)", "Por qué es así"], [
      ["H₂O(l)", "H₂(g) + ½ O₂(g) ⟶ H₂O(l)", "un mol de producto; elementos en su forma estable; hace falta ½ O₂"],
      ["CO₂(g)", "C(grafito) + O₂(g) ⟶ CO₂(g)", "el carbono es grafito, no diamante ni gas"],
      ["NH₃(g)", "½ N₂(g) + 3/2 H₂(g) ⟶ NH₃(g)", "un solo mol de NH₃: por eso los coeficientes son fraccionarios"],
      ["C₂H₅OH(l)", "2 C(grafito) + 3 H₂(g) + ½ O₂(g) ⟶ C₂H₅OH(l)", "se parte de los elementos, no del etanol ni de otros compuestos"]
    ]) +
    "<p>Notas importantes: (a) <b>un elemento en su forma estable vale 0</b> (por definición, formar O₂ a partir de O₂ no cuesta nada); (b) una ecuación de combustión <b>no</b> es una ecuación de formación (la del CO₂ sí coincide porque parte de C y O₂); (c) con ΔH°<sub>f</sub> <b>muy negativa</b> el compuesto es energéticamente muy estable respecto a sus elementos (CO₂, H₂O, Al₂O₃) y con ΔH°<sub>f</sub> positiva es inestable (C₂H₂, NO, O₃: de ahí su reactividad).</p>" +
    "<h5>Tabla de entalpías de formación estándar (kJ/mol)</h5>" +
    tabla(["Sustancia", "ΔH°<sub>f</sub>", "Sustancia", "ΔH°<sub>f</sub>", "Sustancia", "ΔH°<sub>f</sub>"], [
      ["CH₄(g)", "−74,8", "CO(g)", "−110,5", "CaO(s)", "−635"],
      ["C₂H₆(g)", "−84,7", "CO₂(g)", "−393,5", "CaCO₃(s)", "−1 207"],
      ["C₃H₈(g)", "−103,8", "H₂O(l)", "−285,8", "Fe₂O₃(s)", "−824,2"],
      ["C₂H₄(g)", "+52,3", "H₂O(g)", "−241,8", "Al₂O₃(s)", "−1 675,7"],
      ["C₂H₂(g)", "+226,7", "NH₃(g)", "−46,1", "C₂H₅OH(l)", "−277,7"],
      ["NO(g)", "+90,3", "SO₂(g)", "−296,8", "C₆H₁₂O₆(s)", "−1 273"],
      ["NO₂(g)", "+33,2", "SO₃(g)", "−395,7", "NaCl(s)", "−411,2"]
    ]) +
    "<h5>La fórmula y por qué funciona</h5>" +
    H.formula("ΔH°<sub>reacción</sub> = Σ n·ΔH°<sub>f</sub>(productos) − Σ n·ΔH°<sub>f</sub>(reactivos)") +
    "<p>Se explica con un ciclo de Hess: cualquier reacción se puede ver como «descomponer los reactivos en sus elementos» (que es invertir sus ecuaciones de formación, por tanto el signo cambia: −ΔH°<sub>f</sub>) y luego «formar los productos desde los elementos» (+ΔH°<sub>f</sub>). Los elementos son el «punto intermedio» común, y por eso salen los productos con signo positivo y los reactivos con negativo. Cada valor se multiplica por su coeficiente en la ecuación ajustada.</p>" +
    ejemplo("Combustión del etanol", "Calcula el ΔH° de C₂H₅OH(l) + 3 O₂(g) ⟶ 2 CO₂(g) + 3 H₂O(l) con los datos de la tabla.", [
      "Productos: 2·(−393,5) + 3·(−285,8) = −787,0 − 857,4 = −1 644,4 kJ.",
      "Reactivos: 1·(−277,7) + 3·0 = −277,7 kJ (el O₂ es un elemento: vale 0).",
      "ΔH° = −1 644,4 − (−277,7) = <b>−1 366,7 kJ</b>.",
      "Por gramo: 1 366,7 kJ/46,07 g = 29,7 kJ/g (menos que la gasolina, 47,9 kJ/g, porque el etanol ya lleva oxígeno en la molécula)."
    ]) +
    ejemplo("Reacción de la termita", "La termita es Fe₂O₃(s) + 2 Al(s) ⟶ Al₂O₃(s) + 2 Fe(s). Calcula ΔH° y el calor liberado por 100 g de aluminio.", [
      "Productos: ΔH°<sub>f</sub>(Al₂O₃) + 2·0 = −1 675,7 kJ (el Fe es un elemento).",
      "Reactivos: ΔH°<sub>f</sub>(Fe₂O₃) + 2·0 = −824,2 kJ.",
      "ΔH° = −1 675,7 + 824,2 = <b>−851,5 kJ</b> (muy exotérmica: el hierro sale fundido, más de 2 000 °C).",
      "100 g de Al = 100/26,98 = 3,706 mol. La ecuación gasta 2 mol de Al por −851,5 kJ: Q = 3,706/2 · (−851,5) = <b>−1 578 kJ</b>."
    ]) +
    ejemplo("Despejar una entalpía de formación desconocida", "La combustión completa del acetileno, C₂H₂(g) + 5/2 O₂(g) ⟶ 2 CO₂(g) + H₂O(l), desprende 1 299,5 kJ/mol. Calcula ΔH°<sub>f</sub> del acetileno.", [
      "Planteamos: ΔH°<sub>comb</sub> = [2·(−393,5) + (−285,8)] − [ΔH°<sub>f</sub>(C₂H₂) + 0] = −1 299,5.",
      "−787,0 − 285,8 − ΔH°<sub>f</sub> = −1 299,5 ⟹ −1 072,8 − ΔH°<sub>f</sub> = −1 299,5.",
      "ΔH°<sub>f</sub>(C₂H₂) = −1 072,8 + 1 299,5 = <b>+226,7 kJ/mol</b>.",
      "Es positiva: el acetileno almacena mucha energía y por eso arde a temperaturas altísimas (soldadura oxiacetilénica)."
    ]) +
    w("q6_formacion") +
    "<h5>Entalpía de combustión</h5>" +
    "<p>La <b>entalpía de combustión</b> ΔH°<sub>c</sub> es el calor desprendido al quemar completamente un mol de sustancia en oxígeno (productos CO₂ y H₂O líquida, si la sustancia sólo tiene C, H y O). Siempre es negativa. Se mide con una <b>bomba calorimétrica</b> y se tabula para los combustibles. A partir de ΔH°<sub>c</sub> y de las ΔH°<sub>f</sub> de los productos de la combustión se puede obtener la entalpía de formación de cualquier compuesto orgánico, como hemos hecho con el etano y el acetileno.</p>";

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Calor, temperatura y calorimetría",
      html:
        "<h5>Calor específico y capacidad calorífica</h5>" +
        "<p>Cuando un cuerpo recibe calor sin cambiar de estado, su temperatura sube. Pero no todas las sustancias se calientan con la misma facilidad: un gramo de agua necesita 4,18 J para subir 1 K, mientras que un gramo de hierro sólo necesita 0,449 J. Esa propiedad es el <b>calor específico</b> c: la energía necesaria para elevar 1 K la temperatura de 1 g (o de 1 kg) de sustancia. Con él se calcula el calor intercambiado:</p>" +
        H.formula("Q = m · c · ΔT      con  ΔT = T<sub>final</sub> − T<sub>inicial</sub>") +
        "<p>Si ΔT &gt; 0, Q &gt; 0 (el cuerpo absorbe calor y se calienta). Si ΔT &lt; 0, Q &lt; 0 (el cuerpo cede calor y se enfría). Cuando se multiplican masa y calor específico se obtiene la <b>capacidad calorífica</b> C = m·c (en J/K), que es la energía necesaria para subir 1 K a <i>ese cuerpo concreto</i>.</p>" +
        tabla(["Sustancia", "c (J·g⁻¹·K⁻¹)", "Sustancia", "c (J·g⁻¹·K⁻¹)"], [
          ["Agua líquida", "4,18", "Aluminio", "0,897"],
          ["Etanol", "2,44", "Hierro", "0,449"],
          ["Hielo", "2,09", "Cobre", "0,385"],
          ["Vapor de agua", "2,01", "Plomo", "0,129"],
          ["Aire (a p constante)", "1,005", "Vidrio", "0,84"]
        ]) +
        "<p>El <b>agua tiene un calor específico muy alto</b>, y eso explica muchos fenómenos: el mar tarda mucho en calentarse y en enfriarse (clima suave en la costa), el agua es un excelente refrigerante en un motor y un buen almacén de calor en una calefacción, y el cuerpo humano (60 % agua) mantiene su temperatura estable. Los metales, en cambio, se calientan y se enfrían enseguida.</p>" +
        w("q6_calor") +
        ejemplo("Calentar agua", "¿Qué calor hay que suministrar a 250 g de agua para que pasen de 20 °C a 70 °C?", [
          "ΔT = 70 − 20 = 50 K.",
          "Q = m·c·ΔT = 250 g · 4,18 J·g⁻¹·K⁻¹ · 50 K = <b>52 250 J = 52,25 kJ</b>.",
          "En calorías: 52 250/4,184 = 12 489 cal ≈ 12,5 kcal."
        ]) +
        ejemplo("Enfriar un metal", "Una pieza de aluminio de 500 g se enfría de 80 °C a 30 °C. ¿Cuánto calor cede?", [
          "ΔT = 30 − 80 = −50 K.",
          "Q = 500 g · 0,897 J·g⁻¹·K⁻¹ · (−50 K) = −22 425 J ≈ <b>−22,4 kJ</b>.",
          "El signo negativo indica que el aluminio <b>cede</b> calor: 22,4 kJ pasan al entorno."
        ]) +
        ejemplo("Misma energía, distinta sustancia", "A 500 g de agua y a 500 g de hierro se les suministran 10 kJ a cada uno. Compara el aumento de temperatura.", [
          "Agua: ΔT = Q/(m·c) = 10 000/(500 · 4,18) = <b>4,8 K</b>.",
          "Hierro: ΔT = 10 000/(500 · 0,449) = <b>44,5 K</b>.",
          "El hierro se calienta casi 10 veces más: su calor específico es casi 10 veces menor (4,18/0,449 = 9,3)."
        ]) +
        ejemplo("Un calentador eléctrico", "Un hervidor de 2 000 W calienta 1,5 L de agua de 15 °C a 100 °C. ¿Cuánto tarda, suponiendo que no hay pérdidas? (densidad del agua 1 g/mL)", [
          "m = 1 500 g. Q = 1 500 · 4,18 · 85 = 532 950 J.",
          "Potencia = energía/tiempo ⟹ t = Q/P = 532 950 J / 2 000 J/s = <b>266 s ≈ 4,4 min</b>.",
          "En la práctica es algo más porque hay pérdidas y hay que calentar también el hervidor."
        ]) +
        "<h5>Equilibrio térmico: el calor cedido es el calor ganado</h5>" +
        "<p>Cuando se ponen en contacto dos cuerpos a distinta temperatura dentro de un sistema aislado, el caliente cede calor y el frío lo gana hasta que se igualan (temperatura de equilibrio T<sub>e</sub>). Como no se pierde energía:</p>" +
        H.formula("Q<sub>cedido</sub> + Q<sub>ganado</sub> = 0   ⟹   m₁c₁(T<sub>e</sub> − T₁) + m₂c₂(T<sub>e</sub> − T₂) = 0") +
        "<p>De ahí se despeja la temperatura de equilibrio: <b>T<sub>e</sub> = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂)</b>. Es una media de las temperaturas ponderada por las capacidades caloríficas: queda más cerca de la temperatura del cuerpo que tiene mayor m·c.</p>" +
        ejemplo("Mezclar agua caliente y fría", "Se mezclan 200 g de agua a 80 °C con 300 g de agua a 20 °C. ¿Cuál es la temperatura final?", [
          "Con la misma sustancia, c se cancela: T<sub>e</sub> = (200·80 + 300·20)/(200 + 300) = (16 000 + 6 000)/500 = <b>44 °C</b>.",
          "Comprobación: el agua caliente cede 200·4,18·(80 − 44) = 30 096 J y la fría gana 300·4,18·(44 − 20) = 30 096 J ✓."
        ]) +
        ejemplo("Un metal en agua", "Se sumergen 100 g de cobre a 100 °C en 200 g de agua a 20 °C (c<sub>Cu</sub> = 0,385 J·g⁻¹·K⁻¹). ¿Qué temperatura alcanza el conjunto?", [
          "Capacidades caloríficas: cobre 100 · 0,385 = 38,5 J/K; agua 200 · 4,18 = 836 J/K.",
          "T<sub>e</sub> = (38,5·100 + 836·20)/(38,5 + 836) = (3 850 + 16 720)/874,5 = <b>23,5 °C</b>.",
          "La temperatura final queda muy cerca de la del agua: tiene una capacidad calorífica 22 veces mayor que la del cobre."
        ]) +
        w("q6_mezcla") +
        "<h5>El calorímetro</h5>" +
        "<p>Un <b>calorímetro</b> es un recipiente aislado en el que se hace ocurrir un proceso para medir el calor que desprende o absorbe. Se mide la variación de temperatura del agua y del propio recipiente, que también se calienta. Su capacidad calorífica C<sub>cal</sub> (o su «equivalente en agua») se determina previamente con un experimento de calibrado, y entonces: Q<sub>proceso</sub> = −(m<sub>agua</sub>·c<sub>agua</sub> + C<sub>cal</sub>)·ΔT.</p>" +
        ejemplo("Calor específico de un metal", "En un calorímetro de capacidad calorífica 150 J/K hay 200 g de agua a 20,0 °C. Se introduce una pieza de 50,0 g de un metal desconocido a 100 °C y el conjunto alcanza 23,0 °C. Halla el calor específico del metal.", [
          "Calor ganado por agua y calorímetro: (200·4,18 + 150)·(23,0 − 20,0) = 986 J/K · 3,0 K = 2 958 J.",
          "Calor cedido por el metal: 50,0 · c · (100 − 23,0) = 3 850·c (en J, con c en J·g⁻¹·K⁻¹).",
          "Igualando: 3 850 c = 2 958 ⟹ c = <b>0,77 J·g⁻¹·K⁻¹</b>, un valor típico de un metal de transición."
        ]) +
        ojo("el calor específico que da el enunciado en cal/(g·°C) se convierte con 1 cal = 4,184 J: el agua tiene c = 1,00 cal·g⁻¹·°C⁻¹ = 4,184 J·g⁻¹·K⁻¹.")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Cambios de estado y calores latentes",
      html:
        "<p>Mientras una sustancia cambia de estado (fusión, vaporización…) recibe calor <b>sin que su temperatura cambie</b>. La energía no se emplea en agitar más las partículas sino en vencer las <b>fuerzas intermoleculares</b> (Tema 2) que las mantienen unidas. El calor necesario por unidad de masa se llama <b>calor latente</b> L:</p>" +
        H.formula("Q = m · L") +
        tabla(["Sustancia", "L fusión (J/g)", "L vaporización (J/g)", "Punto de fusión / ebullición (°C)"], [
          ["Agua", "334", "2 260", "0 / 100"],
          ["Etanol", "108", "838", "−114 / 78"],
          ["Aluminio", "397", "—", "660 / 2 470"],
          ["Hierro", "247", "—", "1 538 / 2 862"],
          ["Plomo", "23", "—", "327 / 1 749"]
        ]) +
        "<p>Observa lo «caro» que resulta vaporizar: pasar un gramo de agua líquida a vapor a 100 °C necesita 2 260 J, casi siete veces más que fundir un gramo de hielo y más de cinco veces lo que cuesta calentar ese mismo gramo desde 0 °C hasta 100 °C (418 J). Y al revés, cuando el vapor se condensa devuelve toda esa energía: Q<sub>condensación</sub> = −m·L<sub>v</sub>.</p>" +
        "<h5>La curva de calentamiento</h5>" +
        "<p>Si se aporta calor de forma continua a hielo a −30 °C, la gráfica temperatura-calor tiene cinco tramos: tres «cuestas» (calentamiento de cada fase) y dos «mesetas» (fusión y ebullición). Juega con la masa y con la energía aportada para ver en qué estado está el agua en cada momento:</p>" +
        w("q6_cambio") +
        ejemplo("Fundir hielo", "¿Cuánto calor se necesita para fundir 200 g de hielo que ya está a 0 °C?", [
          "Q = m·L<sub>f</sub> = 200 g · 334 J/g = 66 800 J = <b>66,8 kJ</b>.",
          "La temperatura no cambia durante la fusión: el hielo y el agua resultante están a 0 °C."
        ]) +
        ejemplo("Vaporizar agua", "¿Cuánto calor absorbe la evaporación de 90 g de agua en ebullición (100 °C)?", [
          "Q = 90 g · 2 260 J/g = 203 400 J = <b>203 kJ</b>.",
          "Eso equivale a 90/18 = 5 mol de agua: 203,4/5 = 40,7 kJ/mol, la entalpía de vaporización del agua a 100 °C."
        ]) +
        ejemplo("De hielo a agua tibia", "Calcula el calor para convertir 50 g de hielo a −10 °C en agua líquida a 20 °C.", [
          "Calentar el hielo hasta 0 °C: 50 · 2,09 · 10 = 1 045 J.",
          "Fundirlo: 50 · 334 = 16 700 J.",
          "Calentar el agua de 0 °C a 20 °C: 50 · 4,18 · 20 = 4 180 J.",
          "Total: 1 045 + 16 700 + 4 180 = 21 925 J = <b>21,9 kJ</b>. Observa que casi tres cuartas partes (76 %) se gastan en la fusión."
        ]) +
        ejemplo("Hielo en una bebida", "Se añaden 50 g de hielo a 0 °C a 300 g de agua a 25 °C. ¿Qué temperatura final se alcanza?", [
          "Calor necesario para fundir todo el hielo: 50 · 334 = 16 700 J.",
          "Calor que cede el agua al enfriarse hasta 0 °C: 300 · 4,18 · 25 = 31 350 J. Es mayor que 16 700 J, así que <b>se funde todo el hielo</b>.",
          "Sobran 31 350 − 16 700 = 14 650 J, que calientan los 350 g de agua resultantes (50 + 300) desde 0 °C: ΔT = 14 650/(350 · 4,18) = 10,0 K.",
          "Temperatura final: <b>10,0 °C</b>."
        ]) +
        ejemplo("Por qué el vapor quema tanto", "Compara el calor que cederían a la piel 10 g de vapor a 100 °C y 10 g de agua a 100 °C al enfriarse ambos hasta 37 °C.", [
          "Agua líquida: 10 · 4,18 · 63 = 2 633 J.",
          "Vapor: primero se condensa, 10 · 2 260 = 22 600 J, y después se enfría el agua resultante, 2 633 J: total 25 233 J.",
          "El vapor cede casi <b>10 veces más energía</b> (25,2 kJ frente a 2,6 kJ): por eso una quemadura con vapor es mucho más grave."
        ]) +
        "<p>La sudoración funciona con el mismo principio: al evaporarse, 1 g de sudor absorbe unos 2,4 kJ de la piel (a 35 °C el calor de vaporización es ligeramente mayor que a 100 °C), y la refrigera.</p>" +
        ojo("durante un cambio de estado <b>no uses Q = m·c·ΔT</b> (ΔT = 0 y saldría Q = 0, absurdo). Usa Q = m·L. Y si el problema cruza varios tramos, suma tramo a tramo, como en el ejemplo del hielo.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Entalpía y energía interna: ΔH = ΔU + Δn·RT (ampliación)",
      html:
        "<p>Ya sabes que a presión constante ΔH = ΔU + p·ΔV. Si en la reacción intervienen gases que se comportan como ideales, p·V = n·R·T, y como sólo los gases cambian de volumen de forma apreciable (los sólidos y líquidos ocupan muy poco), resulta una fórmula muy cómoda:</p>" +
        H.formula("ΔH = ΔU + Δn<sub>gas</sub> · R · T") +
        "<p>donde Δn<sub>gas</sub> = (moles de gas de los productos) − (moles de gas de los reactivos) y R = 8,314 J·mol⁻¹·K⁻¹. La interpretación es clara: si la reacción <b>produce</b> gas (Δn &gt; 0), el sistema se expande y empuja a la atmósfera, de modo que ΔH &gt; ΔU (parte de la energía se invierte en trabajo); si <b>consume</b> gas (Δn &lt; 0), el entorno comprime el sistema y ΔH &lt; ΔU. Si Δn = 0, ΔH = ΔU.</p>" +
        ejemplo("Formación de agua líquida", "Para H₂(g) + ½ O₂(g) ⟶ H₂O(l), ΔH = −285,8 kJ a 298 K. Calcula ΔU.", [
          "Δn<sub>gas</sub> = 0 − (1 + ½) = −1,5 (el producto es líquido y no cuenta).",
          "Δn·R·T = −1,5 · 8,314·10⁻³ kJ·mol⁻¹·K⁻¹ · 298 K = −3,72 kJ.",
          "ΔU = ΔH − Δn·R·T = −285,8 − (−3,72) = <b>−282,1 kJ</b>.",
          "ΔU es menos negativo: parte de la energía liberada la recupera el sistema como trabajo que el entorno hace al comprimirlo."
        ]) +
        ejemplo("Descomposición de la caliza", "Para CaCO₃(s) ⟶ CaO(s) + CO₂(g), ΔH = +178,5 kJ a 298 K. Calcula ΔU.", [
          "Δn<sub>gas</sub> = 1 − 0 = +1.",
          "Δn·R·T = 8,314·10⁻³ · 298 = 2,48 kJ.",
          "ΔU = 178,5 − 2,48 = <b>176,0 kJ</b>. Parte del calor absorbido se invierte en empujar al CO₂ que se forma."
        ]) +
        ejemplo("Síntesis del amoniaco", "N₂(g) + 3 H₂(g) ⟶ 2 NH₃(g), ΔH = −92,2 kJ a 298 K. Calcula ΔU.", [
          "Δn<sub>gas</sub> = 2 − (1 + 3) = −2. Δn·R·T = −2 · 2,478 = −4,96 kJ.",
          "ΔU = −92,2 − (−4,96) = <b>−87,2 kJ</b>."
        ])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Entalpías de enlace",
      html:
        "<h5>Reacción química = romper enlaces y formar enlaces</h5>" +
        "<p>Cuando ocurre una reacción, los enlaces de los reactivos se rompen (y eso <b>cuesta energía</b>) y se forman los enlaces de los productos (y eso <b>libera energía</b>). La <b>entalpía de enlace</b> E es la energía necesaria para romper un mol de enlaces de un determinado tipo en estado gaseoso. Es siempre positiva (hay que aportarla) y es un valor <b>medio</b>, porque la fuerza de un enlace C–H, por ejemplo, depende algo de la molécula en que está.</p>" +
        tabla(["Enlace", "E (kJ/mol)", "Enlace", "E (kJ/mol)", "Enlace", "E (kJ/mol)"], [
          ["H–H", "436", "C–H", "413", "O–H", "463"],
          ["C–C", "348", "C=C", "614", "C≡C", "839"],
          ["O=O", "498", "C=O (en CO₂)", "799", "C–O", "358"],
          ["N≡N", "945", "N–H", "391", "C–Cl", "328"],
          ["H–Cl", "431", "Cl–Cl", "243", "", ""]
        ]) +
        "<p>Orden de magnitud: los enlaces triples son los más fuertes y los simples, los más débiles (C–C &lt; C=C &lt; C≡C). El N≡N (945 kJ/mol) es tan fuerte que el nitrógeno del aire es casi inerte.</p>" +
        H.formula("ΔH<sub>reacción</sub> ≈ Σ E(enlaces rotos) − Σ E(enlaces formados)") +
        "<p>Obsérvese el orden y los signos: aquí van <b>primero</b> los enlaces rotos con signo positivo (energía aportada) y <b>restan</b> los formados (energía liberada). Es lo contrario que en la fórmula con ΔH°<sub>f</sub> (productos − reactivos).</p>" +
        ejemplo("Formación del cloruro de hidrógeno", "Estima ΔH de H₂(g) + Cl₂(g) ⟶ 2 HCl(g).", [
          "Enlaces rotos: 1 H–H (436) + 1 Cl–Cl (243) = 679 kJ.",
          "Enlaces formados: 2 H–Cl = 2 · 431 = 862 kJ.",
          "ΔH ≈ 679 − 862 = <b>−183 kJ</b> (valor «real»: 2·(−92,3) = −184,6 kJ)."
        ]) +
        ejemplo("Combustión del metano", "Estima ΔH de CH₄(g) + 2 O₂(g) ⟶ CO₂(g) + 2 H₂O(g).", [
          "Rotos: 4 C–H (4·413 = 1 652) + 2 O=O (2·498 = 996) = 2 648 kJ.",
          "Formados: 2 C=O (2·799 = 1 598) + 4 O–H (4·463 = 1 852) = 3 450 kJ.",
          "ΔH ≈ 2 648 − 3 450 = <b>−802 kJ</b>, valor que coincide muy bien con el real con agua gaseosa (−802,3 kJ)."
        ]) +
        w("q6_enlaces") +
        ejemplo("Calcular una energía de enlace", "Sabiendo que ΔH = −92 kJ para N₂ + 3 H₂ ⟶ 2 NH₃, y que E(N≡N) = 945 y E(H–H) = 436 kJ/mol, calcula E(N–H).", [
          "Rotos: 945 + 3·436 = 945 + 1 308 = 2 253 kJ.",
          "Formados: 6 N–H = 6·E (hay 3 enlaces N–H en cada una de las 2 moléculas de NH₃).",
          "−92 = 2 253 − 6E ⟹ E = 2 345/6 = <b>390,8 kJ/mol</b> (≈ 391, el valor de la tabla)."
        ]) +
        "<h5>Cuándo fiarse de este método</h5>" +
        "<ul><li>Es una <b>estimación</b>: usa valores medios, así que el resultado puede diferir unos pocos tantos por ciento (o bastante más si los enlaces de la molécula son poco habituales).</li>" +
        "<li>Todas las sustancias deben estar en <b>fase gas</b>; si hay líquidos o sólidos hay que añadir las entalpías de cambio de estado.</li>" +
        "<li>Es útil para <b>entender</b> por qué una reacción es exotérmica: se forman enlaces más fuertes de los que se rompen (como pasa en las combustiones: C=O y O–H son muy fuertes).</li></ul>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Entropía y espontaneidad: ΔG = ΔH − T·ΔS",
      html:
        "<h5>¿Basta con que sea exotérmica?</h5>" +
        "<p>Durante mucho tiempo se creyó que sólo ocurrían espontáneamente las reacciones exotérmicas. Pero un cubito de hielo se funde solo en un vaso de agua tibia (endotérmico) y el nitrato de amonio se disuelve solo aunque enfríe el agua. Hay un segundo factor además de la energía: la <b>entropía</b> S, que mide el grado de <b>desorden</b> (más exactamente, el número de formas de distribuir la energía entre las partículas). Los sistemas tienden espontáneamente al mayor desorden posible.</p>" +
        "<p>Reglas cualitativas para estimar el signo de ΔS de una reacción (a igualdad de otros factores):</p>" +
        tabla(["Si…", "ΔS", "Ejemplo"], [
          ["aumenta el número de moles de <b>gas</b>", "&gt; 0", "CaCO₃(s) ⟶ CaO(s) + CO₂(g)"],
          ["disminuye el número de moles de gas", "&lt; 0", "N₂ + 3 H₂ ⟶ 2 NH₃ (4 mol ⟶ 2 mol)"],
          ["un sólido se funde o se disuelve", "&gt; 0", "hielo ⟶ agua; NH₄NO₃(s) ⟶ iones en disolución"],
          ["un líquido se evapora", "&gt; 0", "H₂O(l) ⟶ H₂O(g)"],
          ["un gas se condensa o se congela", "&lt; 0", "H₂O(g) ⟶ H₂O(l)"],
          ["se calienta una sustancia", "aumenta S", "—"]
        ]) +
        "<p>La entropía se mide en <b>J/(mol·K)</b> (¡julios, no kilojulios!, un error de unidades muy frecuente al combinarla con ΔH).</p>" +
        "<h5>La energía libre de Gibbs</h5>" +
        "<p>La función que reúne los dos factores, energía (ΔH) y desorden (ΔS), a una temperatura dada es la <b>energía libre de Gibbs</b>:</p>" +
        H.formula("ΔG = ΔH − T · ΔS") +
        "<ul><li><b>ΔG &lt; 0</b> ⟹ proceso <b>espontáneo</b> (a esa temperatura y presión).</li><li><b>ΔG &gt; 0</b> ⟹ no espontáneo (sí lo sería el proceso inverso).</li><li><b>ΔG = 0</b> ⟹ sistema en equilibrio.</li></ul>" +
        "<p>«Espontáneo» significa que <i>puede</i> ocurrir sin aporte continuo de energía externa, no que ocurra rápido: una reacción puede ser espontánea y lentísima (el diamante se convierte en grafito de forma espontánea, y tarda millones de años).</p>" +
        "<p>Combinando los signos de ΔH y ΔS salen cuatro casos:</p>" +
        tabla(["ΔH", "ΔS", "ΔG = ΔH − TΔS", "Conclusión"], [
          ["−", "+", "siempre negativo", "espontánea a <b>cualquier</b> temperatura"],
          ["+", "−", "siempre positivo", "<b>nunca</b> espontánea"],
          ["−", "−", "negativo sólo si T es baja", "espontánea a <b>baja</b> temperatura (T &lt; ΔH/ΔS)"],
          ["+", "+", "negativo sólo si T es alta", "espontánea a <b>alta</b> temperatura (T &gt; ΔH/ΔS)"]
        ]) +
        w("q6_espontaneidad") +
        ejemplo("Descomposición de la caliza", "Para CaCO₃(s) ⟶ CaO(s) + CO₂(g): ΔH = +178,3 kJ y ΔS = +160,5 J/K. ¿A partir de qué temperatura es espontánea?", [
          "ΔH &gt; 0 y ΔS &gt; 0: espontánea sólo a temperatura alta. El límite es ΔG = 0 ⟹ T = ΔH/ΔS.",
          "Unidades: ΔH = 178 300 J. T = 178 300/160,5 = <b>1 111 K ≈ 838 °C</b>.",
          "A 298 K: ΔG = 178,3 − 298·0,1605 = +130,5 kJ (no espontánea). A 1 300 K: 178,3 − 1 300·0,1605 ≈ −30 kJ (espontánea). Por eso la cal se fabrica en hornos muy calientes."
        ]) +
        ejemplo("Síntesis del amoniaco", "N₂ + 3 H₂ ⟶ 2 NH₃: ΔH = −92,2 kJ, ΔS = −198,7 J/K. Calcula ΔG a 298 K y la temperatura de equilibrio.", [
          "ΔG<sub>298</sub> = −92,2 − 298·(−0,1987) = −92,2 + 59,2 = <b>−33,0 kJ</b> (espontánea a temperatura ambiente).",
          "ΔG = 0 ⟹ T = ΔH/ΔS = (−92 200)/(−198,7) = <b>464 K</b> (191 °C). Por encima de esa temperatura deja de ser espontánea.",
          "Es el dilema del proceso Haber: a baja temperatura el equilibrio favorece el NH₃ pero la reacción es lentísima; a alta temperatura va deprisa pero se forma menos NH₃. Se trabaja a 400-500 °C con catalizador y alta presión como compromiso."
        ]) +
        ejemplo("Fusión del hielo", "Para H₂O(s) ⟶ H₂O(l): ΔH = +6,01 kJ/mol y ΔS = +22,0 J/(mol·K). Halla la temperatura de equilibrio y decide si es espontánea a 283 K y a 263 K.", [
          "T<sub>eq</sub> = 6 010/22,0 = <b>273 K = 0 °C</b>: el punto de fusión del hielo.",
          "A 283 K: ΔG = 6 010 − 283·22,0 = −216 J/mol &lt; 0: el hielo se funde.",
          "A 263 K: ΔG = 6 010 − 263·22,0 = +224 J/mol &gt; 0: no se funde (más bien se congela el agua)."
        ]) +
        ejemplo("Disolución endotérmica espontánea", "La disolución del NH₄NO₃ en agua tiene ΔH = +25,7 kJ/mol y ΔS = +108,7 J/(mol·K). ¿Es espontánea a 298 K?", [
          "ΔG = 25,7 − 298·0,1087 = 25,7 − 32,4 = <b>−6,7 kJ/mol</b> &lt; 0.",
          "Sí: es endotérmica pero el aumento de desorden (los iones se dispersan en el agua) compensa con creces."
        ]) +
        "<h5>Para ir más allá: ΔG y constante de equilibrio</h5>" +
        "<p>La energía libre estándar se relaciona con la constante de equilibrio mediante <b>ΔG° = −R·T·ln K</b>. Si ΔG° &lt; 0, K &gt; 1 (predominan los productos); si ΔG° &gt; 0, K &lt; 1. Por ejemplo, con ΔG° = −33,0 kJ/mol a 298 K: ln K = 33 000/(8,314·298) = 13,3 ⟹ K ≈ 6,1·10⁵. Lo verás con detalle en Química de 2.º de Bachillerato (equilibrio).</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Combustibles, energía y medio ambiente",
      html:
        "<p>Casi toda la energía que mueve el mundo procede de reacciones de combustión: quemamos <b>combustibles</b> (carbón, petróleo y sus derivados, gas natural, biomasa) para obtener calor. Con lo que has aprendido puedes comparar combustibles de forma cuantitativa. Dos preguntas importan: <b>¿cuánta energía da cada gramo?</b> y <b>¿cuánto CO₂ se emite por cada unidad de energía?</b></p>" +
        w("q6_combustibles") +
        ejemplo("Energía por gramo y CO₂ emitido", "Calcula para el propano, C₃H₈ (ΔH<sub>c</sub> = −2 220 kJ/mol, M = 44,1 g/mol), la energía por gramo y los gramos de CO₂ por megajulio.", [
          "Energía por gramo: 2 220/44,1 = <b>50,3 kJ/g</b>.",
          "Cada mol libera 2 220 kJ y produce 3 mol de CO₂ = 3·44,01 = 132,0 g.",
          "CO₂ por MJ: 132,0 g / 2,220 MJ = <b>59,5 g de CO₂ por MJ</b> (el metano da 49,4 y el carbón 111,8)."
        ]) +
        ejemplo("Gasolina en un coche", "Un coche gasta 6,0 L de gasolina cada 100 km. Suponiendo que la gasolina es octano (C₈H₁₈, densidad 0,74 kg/L, 47,9 kJ/g) calcula la energía consumida y el CO₂ emitido por cada 100 km.", [
          "Masa: 6,0 L · 0,74 kg/L = 4,44 kg = 4 440 g.",
          "Energía: 4 440 g · 47,9 kJ/g = 212 700 kJ ≈ <b>213 MJ</b> por 100 km (unos 59 kWh).",
          "C₈H₁₈ + 25/2 O₂ ⟶ 8 CO₂ + 9 H₂O: cada mol (114,23 g) produce 8·44,01 = 352,1 g de CO₂, es decir 3,08 g de CO₂ por gramo de octano.",
          "CO₂: 4 440 · 3,08 = 13 690 g ≈ <b>13,7 kg de CO₂ por cada 100 km</b>."
        ]) +
        ejemplo("Calentar agua con butano", "¿Qué masa de butano (ΔH<sub>c</sub> = −2 877 kJ/mol, M = 58,12 g/mol) se necesita para calentar 100 L de agua de 15 °C a 60 °C si la caldera aprovecha el 80 % del calor?", [
          "Calor útil: Q = 100 000 g · 4,18 J/(g·K) · 45 K = 18 810 000 J = 18 810 kJ.",
          "Calor a producir: 18 810/0,80 = 23 512 kJ.",
          "Moles de butano: 23 512/2 877 = 8,17 mol. Masa: 8,17 · 58,12 = <b>475 g</b> (casi medio kilo de butano).",
          "CO₂ emitido: 4·8,17 = 32,7 mol ⟶ 32,7·44,01 = 1,44 kg."
        ]) +
        "<h5>Energía de los alimentos</h5>" +
        "<p>El cuerpo «quema» los nutrientes mediante la respiración celular: C₆H₁₂O₆ + 6 O₂ ⟶ 6 CO₂ + 6 H₂O, ΔH° = −2 803 kJ/mol (15,6 kJ/g, unas 3,7 kcal/g, el valor típico de los hidratos de carbono). Las grasas dan unos 9 kcal/g (37 kJ/g, más del doble, porque tienen menos oxígeno en la molécula) y las proteínas unos 4 kcal/g.</p>" +
        "<h5>Impacto ambiental y alternativas</h5>" +
        "<ul><li>La combustión completa de cualquier combustible de carbono libera <b>CO₂</b>, un gas de efecto invernadero. La concentración atmosférica ha pasado de unas 280 ppm antes de la revolución industrial a más de 420 ppm.</li>" +
        "<li>La combustión incompleta produce <b>CO</b> (tóxico, se une a la hemoglobina) y hollín.</li>" +
        "<li>Los combustibles con azufre producen <b>SO₂</b>, responsable de la lluvia ácida, y la combustión a alta temperatura en los motores forma <b>NO<sub>x</sub></b>.</li>" +
        "<li><b>Hidrógeno</b>: 142 kJ/g (el triple que la gasolina) y su combustión sólo produce agua, pero hay que fabricarlo (si se obtiene del gas natural se emite CO₂; si se obtiene del agua con electricidad renovable es «verde»), y es difícil de almacenar.</li>" +
        "<li><b>Biocombustibles</b> (etanol, biodiésel): el CO₂ que emiten lo captó antes la planta, por lo que el balance puede ser más favorable, pero deben considerarse el cultivo, el transporte y el uso del suelo.</li></ul>"
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Cómo resolver un problema de termoquímica",
      html:
        "<h5>Método general</h5>" +
        "<ol>" +
        "<li><b>Identifica qué se pide</b>: ¿un ΔH?, ¿una masa o un volumen?, ¿una temperatura final?, ¿la espontaneidad?</li>" +
        "<li><b>Escribe y ajusta la ecuación</b> con los estados físicos. Anota qué datos tienes: ΔH, ΔH°<sub>f</sub>, calores específicos, masas, volúmenes de gas…</li>" +
        "<li><b>Elige la herramienta</b>: Hess (si te dan ecuaciones intermedias), fórmula con ΔH°<sub>f</sub> (si te dan tabla de formación), energías de enlace (si te dan una tabla de enlaces), Q = m·c·ΔT o Q = m·L (calorimetría y cambios de estado), ΔG = ΔH − TΔS (espontaneidad).</li>" +
        "<li><b>Calcula con unidades</b> y atención a los signos; pasa todo a kJ o a J (¡nunca mezclar!), y las temperaturas a K si la fórmula lo exige (ΔT es igual en °C y en K, pero T no).</li>" +
        "<li><b>Interpreta y comprueba</b>: ¿el signo tiene sentido (combustión negativa)? ¿el orden de magnitud es razonable? Responde con una frase y con unidades.</li>" +
        "</ol>" +
        ejemplo("Problema integrador 1 (combustión del butano)", "Con las entalpías de formación C₄H₁₀(g) = −125,7; CO₂(g) = −393,5 y H₂O(l) = −285,8 kJ/mol, calcula: a) ΔH° de la combustión del butano; b) la energía por gramo; c) la masa de butano necesaria para calentar 5 L de agua de 20 °C a 100 °C; d) el volumen de CO₂ producido (en condiciones normales).", [
          "<b>a)</b> C₄H₁₀(g) + 13/2 O₂(g) ⟶ 4 CO₂(g) + 5 H₂O(l). ΔH° = [4·(−393,5) + 5·(−285,8)] − [−125,7 + 0] = (−1 574,0 − 1 429,0) + 125,7 = <b>−2 877,3 kJ/mol</b>.",
          "<b>b)</b> M(C₄H₁₀) = 58,12 g/mol: 2 877,3/58,12 = <b>49,5 kJ/g</b>.",
          "<b>c)</b> Q = 5 000 g · 4,18 · 80 K = 1 672 000 J = 1 672 kJ. Moles: 1 672/2 877,3 = 0,581 mol. Masa: 0,581 · 58,12 = <b>33,8 g</b>.",
          "<b>d)</b> 4 mol de CO₂ por mol de butano: 4·0,581 = 2,324 mol. En c.n.: 2,324 · 22,4 = <b>52,1 L</b>."
        ]) +
        ejemplo("Problema integrador 2 (Hess y estequiometría)", "La combustión del metanol líquido, CH₃OH(l) + 3/2 O₂(g) ⟶ CO₂(g) + 2 H₂O(l), tiene ΔH = −726 kJ/mol. Con ΔH°<sub>f</sub>(CO₂) = −393,5 y ΔH°<sub>f</sub>(H₂O(l)) = −285,8 kJ/mol calcula la entalpía de formación del metanol y la masa de metanol (M = 32,04 g/mol) necesaria para obtener 5 000 kJ.", [
          "ΔH°<sub>comb</sub> = [−393,5 + 2·(−285,8)] − ΔH°<sub>f</sub>(CH₃OH) = −965,1 − ΔH°<sub>f</sub> = −726.",
          "ΔH°<sub>f</sub>(CH₃OH) = −965,1 + 726 = <b>−239,1 kJ/mol</b> (valor tabulado −238,7).",
          "Para 5 000 kJ: n = 5 000/726 = 6,887 mol. Masa: 6,887 · 32,04 = <b>220,7 g</b>."
        ]) +
        ejemplo("Problema integrador 3 (calorimetría)", "Al disolver 8,00 g de NaOH(s) (M = 40,0 g/mol) en 200 g de agua a 20,0 °C se desprenden 44,5 kJ por mol de NaOH. Suponiendo que todo el calor lo absorbe la disolución (208 g, c = 4,18 J·g⁻¹·K⁻¹), ¿qué temperatura final se alcanza?", [
          "Moles: 8,00/40,0 = 0,200 mol. Calor desprendido: 0,200 · 44,5 = 8,90 kJ = 8 900 J.",
          "ΔT = Q/(m·c) = 8 900/(208 · 4,18) = 10,2 K.",
          "T final = 20,0 + 10,2 = <b>30,2 °C</b>."
        ])
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test, parejas de conceptos, una clasificación de procesos, tarjetas con las fórmulas y un ejercicio de ordenar los pasos de un problema con la ley de Hess.</p>" +
        w("quiz", "quiz1") + w("emparejar", "magnitudes") + w("clasificar", "procesos") + w("tarjetas", "tj1") + w("orden", "hess")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    magnitudes: {
      titulo: "Cada magnitud con su significado",
      consigna: "Une cada símbolo con lo que representa.",
      pares: [
        ["Q", "Calor intercambiado, en J o kJ"],
        ["c", "Calor específico, en J/(g·K)"],
        ["L", "Calor latente de cambio de estado, en J/g"],
        ["ΔH", "Calor a presión constante, en kJ/mol"],
        ["ΔH°f", "Entalpía de formación de 1 mol desde los elementos"],
        ["E(enlace)", "Energía para romper 1 mol de enlaces en gas"],
        ["ΔS", "Variación del desorden, en J/(mol·K)"],
        ["ΔG", "Criterio de espontaneidad, en kJ/mol"]
      ]
    },
    procesos: {
      titulo: "¿Exotérmico o endotérmico?",
      consigna: "Toca un proceso y después su tipo.",
      categorias: ["Exotérmico (ΔH < 0)", "Endotérmico (ΔH > 0)"],
      items: [
        { t: "Combustión del butano", c: 0 }, { t: "Neutralización HCl + NaOH", c: 0 }, { t: "Respiración celular", c: 0 }, { t: "Condensación del vapor de agua", c: 0 },
        { t: "Congelación del agua", c: 0 }, { t: "Oxidación del hierro", c: 0 }, { t: "Disolución del CaCl₂ (bolsa de calor)", c: 0 },
        { t: "Fusión del hielo", c: 1 }, { t: "Evaporación del agua", c: 1 }, { t: "Fotosíntesis", c: 1 }, { t: "Descomposición térmica del CaCO₃", c: 1 },
        { t: "Disolución del NH₄NO₃ (bolsa de frío)", c: 1 }, { t: "Sublimación del hielo seco (CO₂ sólido)", c: 1 }
      ]
    },
    hess: {
      titulo: "Calcular ΔH con la ley de Hess",
      consigna: "Ordena los pasos para hallar ΔH de C(s) + ½ O₂(g) ⟶ CO(g) con las ecuaciones (1) C + O₂ ⟶ CO₂ (−393,5 kJ) y (2) CO + ½ O₂ ⟶ CO₂ (−283,0 kJ).",
      items: [
        { t: "Escribir la ecuación objetivo: C(s) + ½ O₂(g) ⟶ CO(g)", nota: "Siempre se empieza por saber a dónde hay que llegar." },
        { t: "Ver que el CO es producto en el objetivo y reactivo en (2): hay que invertir (2)", nota: "Se orienta cada ecuación mirando las sustancias que sólo aparecen en una de ellas." },
        { t: "Al invertir (2) se cambia el signo de su ΔH: CO₂ ⟶ CO + ½ O₂, ΔH = +283,0 kJ", nota: "Es el error más frecuente: olvidar el cambio de signo." },
        { t: "Dejar (1) tal cual (C aparece como reactivo y su coeficiente es 1)", nota: "No hace falta multiplicar nada." },
        { t: "Sumar las ecuaciones y cancelar el CO₂ y parte del O₂: queda C + ½ O₂ ⟶ CO", nota: "Comprobar que la suma coincide con el objetivo." },
        { t: "Sumar las entalpías: ΔH = −393,5 + 283,0 = −110,5 kJ", nota: "Valor tabulado: ΔH°f del CO = −110,5 kJ/mol." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un gas absorbe 100 J de calor y realiza 40 J de trabajo. Un alumno escribe ΔU = 100 + 40 = 140 J. ¿Qué falla?",
          op: ["Nada", "El trabajo lo realiza el sistema, así que W = −40 J y ΔU = 100 − 40 = 60 J", "Debía restar el calor", "ΔU = 100 · 40"], ok: 1,
          porque: "Con el convenio ΔU = Q + W, lo que sale del sistema es negativo. Si el sistema realiza trabajo, W &lt; 0." },
        { q: "«ΔH = +91 kJ, luego la reacción desprende 91 kJ de calor.» ¿Qué falla?",
          op: ["Nada", "ΔH &gt; 0 es endotérmica: <b>absorbe</b> 91 kJ", "Debería ser −91 kJ siempre", "ΔH no es calor"], ok: 1,
          porque: "ΔH positivo = el sistema gana energía = la reacción absorbe calor del entorno (endotérmica)." },
        { q: "Dada 2 H₂ + O₂ ⟶ 2 H₂O(l), ΔH = −571,6 kJ, un alumno escribe para H₂O(l) ⟶ H₂ + ½ O₂ el valor −285,8 kJ. ¿Qué falla?",
          op: ["Nada", "Al invertir cambia el signo (+) y al dividir entre 2 queda +285,8 kJ", "Debió quedar −571,6", "Debió quedar +571,6"], ok: 1,
          porque: "Invertir cambia el signo; dividir la ecuación entre 2 divide ΔH entre 2: +571,6/2 = +285,8 kJ." },
        { q: "Un alumno dice que la entalpía de formación del O₂(g) es +498 kJ/mol «porque el enlace O=O cuesta romperlo». ¿Qué falla?",
          op: ["Nada", "ΔH°f de un elemento en su forma estable es 0; 498 es una entalpía de <b>enlace</b>", "Debería ser −498", "Debería ser +249"], ok: 1,
          porque: "Entalpía de formación y de enlace son magnitudes distintas. Un elemento en estado de referencia vale 0 por definición." },
        { q: "Para vaporizar 10 g de agua a 100 °C un alumno calcula Q = m·c·ΔT = 10·4,18·0 = 0 J. ¿Qué falla?",
          op: ["Nada", "En un cambio de estado hay que usar Q = m·L (22,6 kJ); no hay ΔT pero sí energía", "Debió usar 4,18 · 100", "Debió usar L = 334 J/g"], ok: 1,
          porque: "Durante el cambio de estado la temperatura no varía pero se absorbe energía: Q = m·L<sub>v</sub> = 10 · 2 260 = 22 600 J." },
        { q: "Un alumno calcula ΔH° = Σ ΔH°f(reactivos) − Σ ΔH°f(productos). ¿Qué falla?",
          op: ["Nada", "Está invertida: es productos − reactivos", "Falta dividir entre el número de moles", "Debe sumarse todo"], ok: 1,
          porque: "ΔH° = Σ n·ΔH°f(productos) − Σ n·ΔH°f(reactivos). Si la invierte, el signo del resultado sale cambiado." },
        { q: "Al calcular ΔG = ΔH − TΔS con ΔH = −92,2 kJ y ΔS = −198,7 J/K a 298 K, un alumno escribe −92,2 − 298·(−198,7). ¿Qué falla?",
          op: ["Nada", "Mezcla kJ con J: hay que usar ΔS = −0,1987 kJ/K (o ΔH en J)", "Debió usar T en °C", "Debió cambiar el signo de ΔH"], ok: 1,
          porque: "ΔS está en J/K y ΔH en kJ: hay que pasar a la misma unidad. Con ΔS = −0,1987 kJ/K: ΔG = −92,2 + 59,2 = −33,0 kJ." },
        { q: "«Si una reacción es exotérmica, es siempre espontánea.» ¿Qué falla?",
          op: ["Nada", "También cuenta el término −TΔS: una exotérmica con ΔS &lt; 0 no es espontánea a temperatura alta", "Las exotérmicas nunca son espontáneas", "La espontaneidad depende sólo de la velocidad"], ok: 1,
          porque: "ΔG = ΔH − TΔS. Si ΔH &lt; 0 pero ΔS &lt; 0, a T suficientemente alta ΔG se hace positivo (p. ej. síntesis del NH₃ por encima de 464 K)." },
        { q: "En un calorímetro el agua se calienta 5 °C al producirse una reacción. Un alumno dice que ΔH de la reacción es positivo porque «la temperatura sube». ¿Qué falla?",
          op: ["Nada", "El calor lo desprende la reacción y lo gana el agua: Q<sub>reacción</sub> = −Q<sub>agua</sub> &lt; 0, es exotérmica", "ΔH no se puede obtener así", "Debía enfriarse"], ok: 1,
          porque: "Si el entorno (agua) se calienta es porque la reacción ha cedido calor: ΔH &lt; 0." },
        { q: "Un alumno suma una temperatura de 25 °C en la fórmula ΔG = ΔH − TΔS. ¿Qué falla?",
          op: ["Nada", "T debe estar en kelvin (298 K)", "Debe ser T = 25 K", "T debe ser 0"], ok: 1,
          porque: "En ΔG = ΔH − TΔS, T es la temperatura absoluta: T(K) = 25 + 273 = 298 K." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Un sistema cede 50 J de calor y sobre él se realizan 120 J de trabajo. ΔU vale…",
          op: ["+70 J", "−170 J", "+170 J", "−70 J"], ok: 0,
          porque: "Q = −50 J (cede), W = +120 J (se hace sobre él): ΔU = −50 + 120 = +70 J." },
        { q: "Una reacción con ΔH = −890 kJ/mol es…",
          op: ["exotérmica: libera calor", "endotérmica: absorbe calor", "imposible", "isoterma"], ok: 0,
          porque: "ΔH &lt; 0 significa que se libera calor al entorno." },
        { q: "El calor específico del agua es 4,18 J/(g·K). Calentar 100 g de agua 10 K exige…",
          op: ["4 180 J", "418 J", "41,8 J", "418 000 J"], ok: 0,
          porque: "Q = 100 · 4,18 · 10 = 4 180 J." },
        { q: "Al invertir una ecuación termoquímica, su ΔH…",
          op: ["cambia de signo", "se duplica", "no cambia", "se hace cero"], ok: 0,
          porque: "Si ir de A a B cuesta +x, volver de B a A libera −x." },
        { q: "¿Cuál de estas sustancias tiene ΔH°f = 0?",
          op: ["Cl₂(g)", "HCl(g)", "H₂O(l)", "CO₂(g)"], ok: 0,
          porque: "Un elemento en su forma estable (Cl₂ gas) tiene entalpía de formación nula por convenio." },
        { q: "Fundir 100 g de hielo a 0 °C (L<sub>f</sub> = 334 J/g) requiere…",
          op: ["33,4 kJ", "334 kJ", "3,34 kJ", "418 kJ"], ok: 0,
          porque: "Q = 100 g · 334 J/g = 33 400 J = 33,4 kJ." },
        { q: "Una reacción con ΔH &lt; 0 y ΔS &lt; 0 es espontánea…",
          op: ["a temperaturas bajas", "a cualquier temperatura", "a temperaturas altas", "nunca"], ok: 0,
          porque: "ΔG = ΔH − TΔS: el término −TΔS es positivo y crece con T; sólo a T baja gana ΔH." },
        { q: "Con entalpías de enlace, ΔH ≈ …",
          op: ["Σ E(rotos) − Σ E(formados)", "Σ E(formados) − Σ E(rotos)", "Σ E(rotos) + Σ E(formados)", "Σ E(productos) − Σ E(reactivos) de formación"], ok: 0,
          porque: "Romper cuesta energía (+) y formar la libera (−): ΔH = ΣE(rotos) − ΣE(formados)." },
        { q: "Se mezclan 100 g de agua a 10 °C con 100 g de agua a 50 °C. La temperatura final es…",
          op: ["30 °C", "60 °C", "20 °C", "40 °C"], ok: 0,
          porque: "Masas iguales y misma sustancia: la media, (10 + 50)/2 = 30 °C." },
        { q: "Un catalizador…",
          op: ["reduce la energía de activación sin cambiar ΔH", "aumenta el calor desprendido", "cambia el signo de ΔH", "aumenta la energía de los productos"], ok: 0,
          porque: "Ofrece un camino con menor E<sub>a</sub>; los niveles inicial y final no cambian, luego ΔH tampoco." },
        { q: "Si Q &lt; 0 para un cuerpo, entonces…",
          op: ["cede calor al entorno", "absorbe calor del entorno", "no cambia su temperatura", "realiza trabajo"], ok: 0,
          porque: "Con el convenio de signos, Q &lt; 0 es calor que sale del sistema." },
        { q: "Con ΔH°f(CO₂) = −393,5 kJ/mol, la reacción C(grafito) + O₂ ⟶ CO₂ tiene ΔH°…",
          op: ["−393,5 kJ", "+393,5 kJ", "0 kJ", "−787 kJ"], ok: 0,
          porque: "Es justo la ecuación de formación del CO₂: ΔH° = ΔH°f(CO₂)." }
      ]
    },
    tj1: {
      titulo: "Termoquímica",
      cartas: [
        { a: "Primer principio y convenio", b: "ΔU = Q + W. Lo que entra al sistema es positivo. Q &gt; 0 recibe calor; W &gt; 0 se hace trabajo sobre él. W de expansión = −p·ΔV." },
        { a: "Entalpía", b: "H = U + pV. A presión constante, ΔH = Q<sub>p</sub>. ΔH &lt; 0 exotérmica; ΔH &gt; 0 endotérmica." },
        { a: "Energía de activación", b: "Barrera para que arranque la reacción (cinética). No cambia ΔH. El catalizador la reduce." },
        { a: "Ecuación termoquímica", b: "Ecuación ajustada con estados físicos y ΔH «por mol de reacción». Invertir: cambia el signo. Multiplicar: se multiplica ΔH." },
        { a: "Calor sensible", b: "Q = m·c·ΔT. Agua: c = 4,18 J·g⁻¹·K⁻¹. Q &gt; 0 si se calienta, Q &lt; 0 si se enfría." },
        { a: "Equilibrio térmico", b: "m₁c₁(T<sub>e</sub> − T₁) + m₂c₂(T<sub>e</sub> − T₂) = 0 en un sistema aislado." },
        { a: "Calor latente", b: "Q = m·L durante el cambio de estado (T constante). Agua: L<sub>f</sub> = 334 J/g, L<sub>v</sub> = 2 260 J/g." },
        { a: "Ley de Hess", b: "ΔH total = Σ ΔH de las etapas. Es consecuencia de que H es función de estado." },
        { a: "Pasos de Hess", b: "Orientar (invertir), escalar (multiplicar), sumar, cancelar y comprobar que sale la ecuación objetivo." },
        { a: "Entalpía de formación", b: "ΔH°f: formar 1 mol de compuesto a partir de sus elementos en estado de referencia. Los elementos valen 0." },
        { a: "ΔH° con ΔH°f", b: "ΔH° = Σ n·ΔH°f(productos) − Σ n·ΔH°f(reactivos)." },
        { a: "Entalpías de enlace", b: "ΔH ≈ Σ E(enlaces rotos) − Σ E(enlaces formados). Valores medios, sustancias en fase gas." },
        { a: "ΔH y ΔU", b: "ΔH = ΔU + Δn<sub>gas</sub>·R·T (con R = 8,314 J·mol⁻¹·K⁻¹)." },
        { a: "Entropía", b: "S mide el desorden, en J/(mol·K). Aumenta al pasar de sólido a líquido a gas y si aumenta el número de moles de gas." },
        { a: "Energía libre de Gibbs", b: "ΔG = ΔH − T·ΔS. ΔG &lt; 0 espontáneo; ΔG &gt; 0 no espontáneo; ΔG = 0 equilibrio. T en kelvin." },
        { a: "Combustibles", b: "−ΔH<sub>c</sub> da la energía por mol; dividiendo entre M sale kJ/g. Comparar también g de CO₂ por MJ." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "k1", nivel: 1,
      enunciado: "La reacción de neutralización HCl + NaOH ⟶ NaCl + H₂O tiene ΔH = −57,1 kJ/mol. ¿Es exotérmica o endotérmica?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["Exotérmica", "Endotérmica"], ok: 0 },
      pistas: ["Mira el signo de ΔH."],
      pasos: ["ΔH &lt; 0: el sistema libera calor al entorno: exotérmica."],
      resultado: "Exotérmica" },
    { id: "k2", nivel: 1,
      enunciado: "Un gas absorbe 250 J de calor y realiza 80 J de trabajo sobre el entorno. Calcula ΔU (en J).",
      check: { tipo: "num", etiqueta: "ΔU (J) =", valor: 170 },
      pistas: ["Si el sistema realiza trabajo, W es negativo."],
      pasos: ["Q = +250 J; W = −80 J.", "ΔU = Q + W = 250 − 80 = 170 J."],
      resultado: "ΔU = +170 J" },
    { id: "k3", nivel: 1,
      enunciado: "Un gas se expande de 3 L a 8 L contra una presión constante de 2 atm. Calcula el trabajo en julios (1 atm·L = 101,3 J).",
      check: { tipo: "num", etiqueta: "W (J) =", valor: -1013.25 },
      pistas: ["W = −p·ΔV."],
      pasos: ["ΔV = 5 L; W = −2 · 5 = −10 atm·L.", "−10 · 101,325 = −1 013 J."],
      resultado: "W = −1 013 J (lo realiza el sistema)" },
    { id: "k4", nivel: 1,
      enunciado: "¿Cuántos kJ hay que suministrar a 250 g de agua para pasarlos de 20 °C a 70 °C? (c = 4,18 J·g⁻¹·K⁻¹)",
      check: { tipo: "num", etiqueta: "Q (kJ) =", valor: 52.25 },
      pistas: ["Q = m·c·ΔT, con ΔT = 50 K."],
      pasos: ["Q = 250 · 4,18 · 50 = 52 250 J = 52,25 kJ."],
      resultado: "52,25 kJ" },
    { id: "k5", nivel: 1,
      enunciado: "Una pieza de aluminio de 500 g (c = 0,897 J·g⁻¹·K⁻¹) se enfría de 80 °C a 30 °C. ¿Cuántos kJ cede al entorno?",
      check: { tipo: "num", etiqueta: "Calor cedido (kJ) =", valor: 22.425 },
      pistas: ["Q = m·c·ΔT sale negativo; el calor cedido es su valor absoluto."],
      pasos: ["Q = 500 · 0,897 · (−50) = −22 425 J.", "Cede 22,4 kJ."],
      resultado: "22,4 kJ" },
    { id: "k6", nivel: 1,
      enunciado: "CH₄(g) + 2 O₂(g) ⟶ CO₂(g) + 2 H₂O(l), ΔH = −890 kJ. ¿Cuántos kJ se desprenden al quemar 0,5 mol de CH₄?",
      check: { tipo: "num", etiqueta: "Calor desprendido (kJ) =", valor: 445 },
      pistas: ["La ecuación gasta 1 mol de CH₄ por 890 kJ."],
      pasos: ["Q = 0,5 · 890 = 445 kJ desprendidos."],
      resultado: "445 kJ" },
    { id: "k7", nivel: 1,
      enunciado: "Sabiendo que 2 H₂(g) + O₂(g) ⟶ 2 H₂O(l) tiene ΔH = −571,6 kJ, calcula ΔH de 2 H₂O(l) ⟶ 2 H₂(g) + O₂(g).",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: 571.6 },
      pistas: ["Es la reacción inversa."],
      pasos: ["Al invertir la ecuación cambia el signo de ΔH: +571,6 kJ."],
      resultado: "+571,6 kJ" },
    { id: "k8", nivel: 1,
      enunciado: "H₂(g) + ½ O₂(g) ⟶ H₂O(l) tiene ΔH = −285,8 kJ. ¿Cuánto vale ΔH al formarse 3 mol de H₂O(l)?",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: -857.4 },
      pistas: ["Multiplica la ecuación (y ΔH) por 3."],
      pasos: ["3 · (−285,8) = −857,4 kJ."],
      resultado: "−857,4 kJ" },
    { id: "k9", nivel: 1,
      enunciado: "¿Cuál de estas sustancias tiene entalpía de formación estándar igual a cero?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["O₂(g)", "CO₂(g)", "H₂O(l)", "CH₄(g)"], ok: 0 },
      pistas: ["Piensa en los elementos en su forma estable."],
      pasos: ["El O₂(g) es un elemento en su estado de referencia: ΔH°f = 0. Los demás son compuestos."],
      resultado: "O₂(g)" },
    { id: "k10", nivel: 1,
      enunciado: "Con ΔH°f(NH₃) = −46,1 kJ/mol, calcula ΔH° de N₂(g) + 3 H₂(g) ⟶ 2 NH₃(g).",
      check: { tipo: "num", etiqueta: "ΔH° (kJ) =", valor: -92.2 },
      pistas: ["Los elementos N₂ y H₂ valen 0; multiplica por el coeficiente 2."],
      pasos: ["ΔH° = 2·(−46,1) − (0 + 3·0) = −92,2 kJ."],
      resultado: "−92,2 kJ" },
    { id: "k11", nivel: 1,
      enunciado: "Un alimento aporta 250 kcal. ¿Cuántos kJ son? (1 cal = 4,184 J)",
      check: { tipo: "num", etiqueta: "Energía (kJ) =", valor: 1046 },
      pistas: ["1 kcal = 4,184 kJ."],
      pasos: ["250 · 4,184 = 1 046 kJ."],
      resultado: "1 046 kJ" },
    { id: "k12", nivel: 1,
      enunciado: "¿Cuántos kJ se necesitan para fundir 200 g de hielo a 0 °C? (L<sub>f</sub> = 334 J/g)",
      check: { tipo: "num", etiqueta: "Q (kJ) =", valor: 66.8 },
      pistas: ["En un cambio de estado, Q = m·L."],
      pasos: ["Q = 200 · 334 = 66 800 J = 66,8 kJ."],
      resultado: "66,8 kJ" },

    // ================= ★★ medio =================
    { id: "k13", nivel: 2,
      enunciado: "Con CH₄(g) + 2 O₂(g) ⟶ CO₂(g) + 2 H₂O(l), ΔH = −890 kJ, calcula el calor que se desprende al quemar 10 g de metano (M = 16 g/mol).",
      check: { tipo: "num", etiqueta: "Calor (kJ) =", valor: 556.25 },
      pistas: ["Primero los moles: n = m/M."],
      pasos: ["n = 10/16 = 0,625 mol.", "Q = 0,625 · 890 = 556 kJ desprendidos."],
      resultado: "556 kJ" },
    { id: "k14", nivel: 2,
      enunciado: "C₃H₈(g) + 5 O₂(g) ⟶ 3 CO₂(g) + 4 H₂O(l), ΔH = −2 220 kJ. ¿Qué masa de propano (M = 44 g/mol) hay que quemar para obtener 1 000 kJ?",
      check: { tipo: "num", etiqueta: "Masa (g) =", valor: 19.82 },
      pistas: ["n = 1 000/2 220; después m = n·M."],
      pasos: ["n = 1 000/2 220 = 0,4505 mol.", "m = 0,4505 · 44 = 19,8 g."],
      resultado: "19,8 g" },
    { id: "k15", nivel: 2,
      enunciado: "Se mezclan 50 mL de HCl 1,0 M y 50 mL de NaOH 1,0 M (ΔH = −57,1 kJ/mol). Si el calor lo absorben 100 g de disolución con c = 4,18 J·g⁻¹·K⁻¹, ¿cuánto sube la temperatura (K)?",
      check: { tipo: "num", etiqueta: "ΔT (K) =", valor: 6.83 },
      pistas: ["Moles de H₂O formada: 0,050 mol. Después Q = n·|ΔH| y ΔT = Q/(m·c)."],
      pasos: ["n = 0,050 mol. Q = 0,050 · 57,1 = 2,855 kJ = 2 855 J.", "ΔT = 2 855/(100 · 4,18) = 6,83 K."],
      resultado: "6,83 K" },
    { id: "k16", nivel: 2,
      enunciado: "Se mezclan 200 g de agua a 80 °C con 300 g de agua a 20 °C. ¿Qué temperatura final alcanzan (°C)?",
      check: { tipo: "num", etiqueta: "T<sub>e</sub> (°C) =", valor: 44 },
      pistas: ["Misma sustancia: c se cancela."],
      pasos: ["T<sub>e</sub> = (200·80 + 300·20)/500 = 22 000/500 = 44 °C."],
      resultado: "44 °C" },
    { id: "k17", nivel: 2,
      enunciado: "Se sumergen 100 g de cobre a 100 °C (c = 0,385 J·g⁻¹·K⁻¹) en 200 g de agua a 20 °C. Calcula la temperatura de equilibrio (°C).",
      check: { tipo: "num", etiqueta: "T<sub>e</sub> (°C) =", valor: 23.52 },
      pistas: ["Plantea m₁c₁(T<sub>e</sub> − T₁) + m₂c₂(T<sub>e</sub> − T₂) = 0."],
      pasos: ["T<sub>e</sub> = (100·0,385·100 + 200·4,18·20)/(100·0,385 + 200·4,18) = (3 850 + 16 720)/874,5 = 23,5 °C."],
      resultado: "23,5 °C" },
    { id: "k18", nivel: 2,
      enunciado: "Con (1) C(s) + O₂(g) ⟶ CO₂(g), ΔH = −393,5 kJ y (2) CO(g) + ½ O₂(g) ⟶ CO₂(g), ΔH = −283,0 kJ, calcula ΔH de C(s) + ½ O₂(g) ⟶ CO(g).",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: -110.5 },
      pistas: ["Deja (1) e invierte (2)."],
      pasos: ["(1) + (2 invertida): ΔH = −393,5 + 283,0 = −110,5 kJ."],
      resultado: "−110,5 kJ" },
    { id: "k19", nivel: 2,
      enunciado: "Calcula ΔH° de C₂H₅OH(l) + 3 O₂(g) ⟶ 2 CO₂(g) + 3 H₂O(l) con ΔH°f: C₂H₅OH(l) = −277,7; CO₂ = −393,5; H₂O(l) = −285,8 kJ/mol.",
      check: { tipo: "num", etiqueta: "ΔH° (kJ) =", valor: -1366.7 },
      pistas: ["Productos − reactivos, con sus coeficientes. El O₂ vale 0."],
      pasos: ["Productos: 2(−393,5) + 3(−285,8) = −1 644,4.", "Reactivos: −277,7.", "ΔH° = −1 644,4 + 277,7 = −1 366,7 kJ."],
      resultado: "−1 366,7 kJ" },
    { id: "k20", nivel: 2,
      enunciado: "La combustión del acetileno, C₂H₂(g) + 5/2 O₂(g) ⟶ 2 CO₂(g) + H₂O(l), tiene ΔH° = −1 299,5 kJ. Con ΔH°f(CO₂) = −393,5 y ΔH°f(H₂O(l)) = −285,8 kJ/mol, halla ΔH°f del acetileno.",
      check: { tipo: "num", etiqueta: "ΔH°f (kJ/mol) =", valor: 226.7 },
      pistas: ["Despeja en ΔH° = ΣΔH°f(prod) − ΣΔH°f(react)."],
      pasos: ["−1 299,5 = [2(−393,5) + (−285,8)] − ΔH°f = −1 072,8 − ΔH°f.", "ΔH°f = −1 072,8 + 1 299,5 = +226,7 kJ/mol."],
      resultado: "+226,7 kJ/mol" },
    { id: "k21", nivel: 2,
      enunciado: "Una combustión de metano (ΔH = −890 kJ por mol de CH₄) ha liberado 4 450 kJ. ¿Qué volumen de CO₂ se ha formado, medido en condiciones normales (22,4 L/mol)?",
      check: { tipo: "num", etiqueta: "V (L) =", valor: 112 },
      pistas: ["1 mol de CO₂ por mol de CH₄."],
      pasos: ["n(CH₄) = 4 450/890 = 5,0 mol ⟶ 5,0 mol de CO₂.", "V = 5,0 · 22,4 = 112 L."],
      resultado: "112 L" },
    { id: "k22", nivel: 2,
      enunciado: "Para H₂(g) + ½ O₂(g) ⟶ H₂O(l), ΔH = −285,8 kJ a 298 K. Calcula ΔU en kJ (R = 8,314 J·mol⁻¹·K⁻¹).",
      check: { tipo: "num", etiqueta: "ΔU (kJ) =", valor: -282.08 },
      pistas: ["Δn de gases = 0 − 1,5. ΔU = ΔH − Δn·R·T."],
      pasos: ["Δn·R·T = −1,5 · 8,314·10⁻³ · 298 = −3,72 kJ.", "ΔU = −285,8 + 3,72 = −282,1 kJ."],
      resultado: "ΔU = −282,1 kJ" },
    { id: "k23", nivel: 2,
      enunciado: "Estima ΔH de H₂(g) + Cl₂(g) ⟶ 2 HCl(g) con E(H–H) = 436, E(Cl–Cl) = 243 y E(H–Cl) = 431 kJ/mol.",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: -183 },
      pistas: ["ΔH = Σ E(rotos) − Σ E(formados)."],
      pasos: ["Rotos: 436 + 243 = 679. Formados: 2·431 = 862.", "ΔH = 679 − 862 = −183 kJ."],
      resultado: "−183 kJ" },
    { id: "k24", nivel: 2,
      enunciado: "Para una reacción, ΔH = +178 kJ y ΔS = +160 J/K. ¿A partir de qué temperatura (en K) es espontánea?",
      check: { tipo: "num", etiqueta: "T (K) =", valor: 1112.5 },
      pistas: ["ΔG = 0 ⟹ T = ΔH/ΔS. ¡Unifica las unidades!"],
      pasos: ["T = 178 000 J / 160 J/K = 1 112 K (839 °C)."],
      resultado: "T ≈ 1 112 K" },
    { id: "k25", nivel: 2,
      enunciado: "Calcula ΔG (en kJ) a 298 K de N₂ + 3 H₂ ⟶ 2 NH₃, con ΔH = −92,2 kJ y ΔS = −198,7 J/K.",
      check: { tipo: "num", etiqueta: "ΔG (kJ) =", valor: -32.99 },
      pistas: ["ΔS = −0,1987 kJ/K."],
      pasos: ["ΔG = −92,2 − 298·(−0,1987) = −92,2 + 59,2 = −33,0 kJ."],
      resultado: "ΔG = −33,0 kJ (espontánea)" },
    { id: "k26", nivel: 2,
      enunciado: "Calcula el calor (en kJ) necesario para convertir 50 g de hielo a −10 °C en agua líquida a 20 °C. (c<sub>hielo</sub> = 2,09; c<sub>agua</sub> = 4,18 J·g⁻¹·K⁻¹; L<sub>f</sub> = 334 J/g)",
      check: { tipo: "num", etiqueta: "Q (kJ) =", valor: 21.925 },
      pistas: ["Tres tramos: calentar el hielo, fundirlo, calentar el agua."],
      pasos: ["50·2,09·10 = 1 045 J. 50·334 = 16 700 J. 50·4,18·20 = 4 180 J.", "Total 21 925 J = 21,9 kJ."],
      resultado: "21,9 kJ" },
    { id: "k27", nivel: 2,
      enunciado: "¿Cuánto calor (en kJ) absorbe la evaporación de 90 g de agua a 100 °C? (L<sub>v</sub> = 2 260 J/g)",
      check: { tipo: "num", etiqueta: "Q (kJ) =", valor: 203.4 },
      pistas: ["Cambio de estado: Q = m·L."],
      pasos: ["Q = 90 · 2 260 = 203 400 J = 203,4 kJ."],
      resultado: "203 kJ" },

    // ================= ★★★ avanzado =================
    { id: "k28", nivel: 3,
      enunciado: "Calcula ΔH°f del etano, 2 C(s) + 3 H₂(g) ⟶ C₂H₆(g), con: C₂H₆(g) + 7/2 O₂ ⟶ 2 CO₂ + 3 H₂O(l), ΔH = −1 560 kJ; C(s) + O₂ ⟶ CO₂, ΔH = −393,5 kJ; H₂ + ½ O₂ ⟶ H₂O(l), ΔH = −285,8 kJ.",
      check: { tipo: "num", etiqueta: "ΔH°f (kJ/mol) =", valor: -84.4 },
      pistas: ["Invierte la primera, multiplica la segunda por 2 y la tercera por 3."],
      pasos: ["+1 560 + 2(−393,5) + 3(−285,8) = 1 560 − 787,0 − 857,4 = −84,4 kJ."],
      resultado: "−84,4 kJ/mol" },
    { id: "k29", nivel: 3,
      enunciado: "Con (1) N₂(g) + O₂(g) ⟶ 2 NO(g), ΔH = +180,5 kJ y (2) 2 NO(g) + O₂(g) ⟶ 2 NO₂(g), ΔH = −114,1 kJ, calcula ΔH de N₂(g) + 2 O₂(g) ⟶ 2 NO₂(g).",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: 66.4 },
      pistas: ["Basta con sumar las dos ecuaciones."],
      pasos: ["(1) + (2): N₂ + 2 O₂ ⟶ 2 NO₂, ΔH = 180,5 − 114,1 = +66,4 kJ."],
      resultado: "+66,4 kJ" },
    { id: "k30", nivel: 3,
      enunciado: "Con ΔH°f(Fe₂O₃) = −824,2 y ΔH°f(Al₂O₃) = −1 675,7 kJ/mol, calcula el calor (en kJ) que desprende la reacción Fe₂O₃ + 2 Al ⟶ Al₂O₃ + 2 Fe al consumirse 100 g de aluminio (M = 26,98 g/mol).",
      check: { tipo: "num", etiqueta: "Calor desprendido (kJ) =", valor: 1578 },
      pistas: ["Primero ΔH°; después n(Al) = 100/26,98 y proporción con el coeficiente 2."],
      pasos: ["ΔH° = −1 675,7 + 824,2 = −851,5 kJ por 2 mol de Al.", "n(Al) = 3,706 mol ⟹ Q = 3,706/2 · 851,5 = 1 578 kJ."],
      resultado: "≈ 1 578 kJ" },
    { id: "k31", nivel: 3,
      enunciado: "Se mezclan 8,0 g de CH₄ (M = 16,0) con 24 g de O₂ (M = 32,0) y se produce la combustión completa (ΔH = −890 kJ por mol de CH₄ según CH₄ + 2 O₂ ⟶ …). ¿Cuántos kJ se desprenden?",
      check: { tipo: "num", etiqueta: "Calor (kJ) =", valor: 333.75 },
      pistas: ["Halla cuál es el reactivo limitante: 0,50 mol CH₄ necesitan 1,00 mol O₂, y hay 0,75 mol."],
      pasos: ["n(CH₄) = 0,50; n(O₂) = 0,75. Para el CH₄ harían falta 1,00 mol de O₂: el oxígeno es el limitante.", "El O₂ alcanza para 0,75/2 = 0,375 mol de CH₄.", "Q = 0,375 · 890 = 333,75 kJ."],
      resultado: "≈ 334 kJ" },
    { id: "k32", nivel: 3,
      enunciado: "En una bomba calorimétrica se quema 1,00 g de glucosa (ΔH<sub>c</sub> = −2 803 kJ/mol, M = 180,16 g/mol) y todo el calor lo absorben 1 000 g de agua (c = 4,18 J·g⁻¹·K⁻¹). ¿Cuánto sube la temperatura (K)?",
      check: { tipo: "num", etiqueta: "ΔT (K) =", valor: 3.72 },
      pistas: ["Calor por gramo: 2 803/180,16 kJ."],
      pasos: ["Q = 2 803/180,16 = 15,56 kJ = 15 560 J.", "ΔT = 15 560/(1 000 · 4,18) = 3,72 K."],
      resultado: "3,72 K" },
    { id: "k33", nivel: 3,
      enunciado: "¿Qué masa de butano (ΔH<sub>c</sub> = −2 877 kJ/mol, M = 58,12 g/mol) se necesita para calentar 2 L de agua de 15 °C a 100 °C si sólo se aprovecha el 60 % del calor? (c = 4,18 J·g⁻¹·K⁻¹)",
      check: { tipo: "num", etiqueta: "Masa (g) =", valor: 23.93 },
      pistas: ["Calor útil = m·c·ΔT; calor total = útil/0,60."],
      pasos: ["Q útil = 2 000 · 4,18 · 85 = 710 600 J = 710,6 kJ.", "Q total = 710,6/0,60 = 1 184,3 kJ.", "n = 1 184,3/2 877 = 0,4117 mol ⟹ m = 0,4117 · 58,12 = 23,9 g."],
      resultado: "≈ 23,9 g" },
    { id: "k34", nivel: 3,
      enunciado: "Estima ΔH de C₃H₈(g) + 5 O₂(g) ⟶ 3 CO₂(g) + 4 H₂O(g) con E(C–C) = 348, E(C–H) = 413, E(O=O) = 498, E(C=O) = 799 y E(O–H) = 463 kJ/mol.",
      check: { tipo: "num", etiqueta: "ΔH (kJ) =", valor: -2008 },
      pistas: ["El propano tiene 2 enlaces C–C y 8 C–H; cada CO₂ tiene 2 C=O; cada H₂O, 2 O–H."],
      pasos: ["Rotos: 2·348 + 8·413 + 5·498 = 696 + 3 304 + 2 490 = 6 490.", "Formados: 6·799 + 8·463 = 4 794 + 3 704 = 8 498.", "ΔH = 6 490 − 8 498 = −2 008 kJ."],
      resultado: "−2 008 kJ" },
    { id: "k35", nivel: 3,
      enunciado: "Para N₂ + 3 H₂ ⟶ 2 NH₃ se sabe que ΔH = −92 kJ, E(N≡N) = 945 y E(H–H) = 436 kJ/mol. Calcula la energía media del enlace N–H (kJ/mol).",
      check: { tipo: "num", etiqueta: "E(N–H) =", valor: 390.83 },
      pistas: ["Hay 6 enlaces N–H en 2 NH₃."],
      pasos: ["Rotos: 945 + 3·436 = 2 253.", "−92 = 2 253 − 6E ⟹ E = 2 345/6 = 390,8 kJ/mol."],
      resultado: "≈ 391 kJ/mol" },
    { id: "k36", nivel: 3,
      enunciado: "Para la fusión del hielo, ΔH = +6,01 kJ/mol y ΔS = +22,0 J/(mol·K). Calcula la temperatura de equilibrio (en K).",
      check: { tipo: "num", etiqueta: "T<sub>eq</sub> (K) =", valor: 273.2 },
      pistas: ["ΔG = 0."],
      pasos: ["T = ΔH/ΔS = 6 010/22,0 = 273,2 K = 0,0 °C."],
      resultado: "273 K" },
    { id: "k37", nivel: 3,
      enunciado: "¿En cuál de estos procesos esperas que ΔS sea positiva?",
      check: { tipo: "opcion", etiqueta: "ΔS &gt; 0 en", opciones: ["N₂(g) + 3 H₂(g) ⟶ 2 NH₃(g)", "CaCO₃(s) ⟶ CaO(s) + CO₂(g)", "H₂O(g) ⟶ H₂O(l)", "2 NO₂(g) ⟶ N₂O₄(g)"], ok: 1 },
      pistas: ["Mira cómo cambia el número de moles de gas."],
      pasos: ["La descomposición del CaCO₃ pasa de 0 a 1 mol de gas: aumenta el desorden (ΔS &gt; 0).", "Las otras tres reducen el número de moles de gas o condensan: ΔS &lt; 0."],
      resultado: "CaCO₃(s) ⟶ CaO(s) + CO₂(g)" },
    { id: "k38", nivel: 3,
      enunciado: "Explica por qué se puede calcular el ΔH de una reacción sumando los de otras (ley de Hess) y qué ocurre con el signo y el valor de ΔH al invertir o multiplicar una ecuación.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Dice que la entalpía es una función de estado (sólo depende de los estados inicial y final)", p: 0.5 },
        { t: "Concluye que ΔH no depende del camino: vale lo mismo en una etapa que sumando etapas intermedias", p: 0.5 },
        { t: "Explica que al invertir la ecuación, ΔH cambia de signo", p: 0.5 },
        { t: "Explica que al multiplicar la ecuación por n, ΔH se multiplica por n (magnitud extensiva)", p: 0.5 }
      ] },
      pasos: ["H es función de estado: ΔH = H<sub>final</sub> − H<sub>inicial</sub> no depende de las etapas intermedias.", "Por eso ΔH(total) = ΣΔH(etapas).", "Invertir intercambia estado inicial y final: ΔH cambia de signo. Multiplicar por n las cantidades que reaccionan multiplica por n el calor."],
      resultado: "ΔH es función de estado ⟹ aditiva; invertir cambia el signo; multiplicar escala ΔH." },
    { id: "k39", nivel: 3,
      enunciado: "Calcula cuántos gramos de CO₂ se emiten por cada megajulio de energía obtenida al quemar propano (ΔH<sub>c</sub> = −2 220 kJ/mol, M(CO₂) = 44,01 g/mol).",
      check: { tipo: "num", etiqueta: "g de CO₂ por MJ =", valor: 59.47 },
      pistas: ["3 mol de CO₂ por cada 2 220 kJ."],
      pasos: ["3 · 44,01 = 132,03 g de CO₂ por 2,220 MJ.", "132,03/2,220 = 59,5 g/MJ."],
      resultado: "59,5 g de CO₂ por MJ" },
    { id: "k40", nivel: 3,
      enunciado: "¿Qué masa de etanol (ΔH<sub>c</sub> = −1 366,7 kJ/mol, M = 46,07 g/mol) hay que quemar para calentar 1,00 kg de agua de 20 °C a 100 °C si no hay pérdidas? (c = 4,18 J·g⁻¹·K⁻¹)",
      check: { tipo: "num", etiqueta: "Masa (g) =", valor: 11.27 },
      pistas: ["Q = 1 000 · 4,18 · 80 J."],
      pasos: ["Q = 334 400 J = 334,4 kJ.", "n = 334,4/1 366,7 = 0,2447 mol. m = 0,2447 · 46,07 = 11,3 g."],
      resultado: "≈ 11,3 g" },
    { id: "k41", nivel: 3,
      enunciado: "En un calorímetro de capacidad calorífica 150 J/K hay 200 g de agua a 20,0 °C. Se disuelven 5,0 g de NH₄NO₃ (M = 80,04 g/mol; ΔH<sub>disolución</sub> = +25,7 kJ/mol). ¿Qué temperatura final (°C) se alcanza? (c = 4,18 J·g⁻¹·K⁻¹)",
      check: { tipo: "num", etiqueta: "T final (°C) =", valor: 18.37 },
      pistas: ["La disolución absorbe calor: enfría el agua y el calorímetro."],
      pasos: ["n = 5,0/80,04 = 0,0625 mol. Q absorbido = 0,0625 · 25,7 = 1,606 kJ.", "C total = 200·4,18 + 150 = 986 J/K ⟹ ΔT = −1 606/986 = −1,63 K.", "T final = 20,0 − 1,63 = 18,4 °C."],
      resultado: "≈ 18,4 °C" },
    { id: "k42", nivel: 3,
      enunciado: "Describe con tus palabras cómo calcularías ΔH de una reacción a partir de entalpías de formación y justifica la fórmula con un ciclo de Hess (reactivos ⟶ elementos ⟶ productos).",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Escribe ΔH° = Σ n·ΔH°f(productos) − Σ n·ΔH°f(reactivos), con los coeficientes de la ecuación ajustada", p: 0.5 },
        { t: "Explica el camino alternativo: descomponer los reactivos en sus elementos y formar los productos desde ellos", p: 0.5 },
        { t: "Justifica el signo: descomponer es lo inverso de formar, por eso los reactivos restan", p: 0.5 },
        { t: "Aclara que los elementos en su estado de referencia tienen ΔH°f = 0 y no contribuyen", p: 0.5 }
      ] },
      pasos: ["Camino A: reactivos ⟶ elementos (−ΣnΔH°f de reactivos) y elementos ⟶ productos (+ΣnΔH°f de productos).", "Por Hess, ese camino y la reacción directa tienen el mismo ΔH: ΔH° = ΣnΔH°f(prod) − ΣnΔH°f(react).", "Los elementos valen 0 por convenio."],
      resultado: "ΔH° = ΣnΔH°f(productos) − ΣnΔH°f(reactivos)" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Primer principio y signos",
      items: [
        { label: "Primer principio", formula: "ΔU = Q + W", cuando: "Lo que entra al sistema es +.", ejemplo: "Q = +250 J, W = −80 J → ΔU = +170 J" },
        { label: "Trabajo de expansión", formula: "W = −p·ΔV", cuando: "1 atm·L = 101,3 J", ojo: "Expansión ⟹ W &lt; 0." },
        { label: "Entalpía", formula: "H = U + pV · ΔH = Q<sub>p</sub>", cuando: "Reacciones a presión constante." },
        { label: "ΔH y ΔU", formula: "ΔH = ΔU + Δn<sub>gas</sub>·R·T", ejemplo: "R = 8,314 J·mol⁻¹·K⁻¹" }
      ] },
    { titulo: "Exotérmica y endotérmica", ancha: true,
      tabla: { cab: ["", "Exotérmica", "Endotérmica"], filas: [
        ["ΔH", "&lt; 0", "&gt; 0"], ["Calor", "se libera", "se absorbe"], ["Productos", "más estables", "menos estables"], ["Ejemplos", "combustión, neutralización, respiración", "fotosíntesis, fusión, evaporación, CaCO₃ → CaO + CO₂"]
      ] },
      nota: "El catalizador baja E<sub>a</sub> y no cambia ΔH. E<sub>a</sub>(inversa) = E<sub>a</sub>(directa) − ΔH." },
    { titulo: "Calor y calorimetría",
      items: [
        { label: "Calor sensible", formula: "Q = m·c·ΔT", cuando: "Sin cambio de estado.", ejemplo: "250 g agua, 20 → 70 °C: 52,25 kJ" },
        { label: "Equilibrio térmico", formula: "T<sub>e</sub> = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂)", cuando: "Sistema aislado." },
        { label: "Calorímetro", formula: "Q<sub>reacción</sub> = −(m·c + C<sub>cal</sub>)·ΔT", ojo: "ΔT es igual en °C y en K." },
        { label: "Unidades", formula: "1 cal = 4,184 J · 1 kcal = 4,184 kJ" }
      ] },
    { titulo: "Cambios de estado", ancha: true,
      tabla: { cab: ["Agua", "Valor"], filas: [["c (líquida)", "4,18 J·g⁻¹·K⁻¹"], ["c (hielo)", "2,09 J·g⁻¹·K⁻¹"], ["c (vapor)", "2,01 J·g⁻¹·K⁻¹"], ["L fusión", "334 J/g (6,01 kJ/mol)"], ["L vaporización", "2 260 J/g (40,7 kJ/mol)"]] },
      nota: "En un cambio de estado: Q = m·L y T constante. Varios tramos: sumar tramo a tramo." },
    { titulo: "Ecuaciones termoquímicas y Hess",
      pasos: ["Escribe la ecuación objetivo.", "Invierte las ecuaciones que lo necesiten (cambia el signo de ΔH).", "Multiplica por el factor adecuado (también ΔH).", "Suma, cancela y comprueba que sale el objetivo.", "Suma los ΔH."],
      nota: "No olvides distinguir H₂O(l) de H₂O(g)." },
    { titulo: "Entalpías de formación y de enlace", ancha: true,
      items: [
        { label: "Con ΔH°f", formula: "ΔH° = Σ n·ΔH°f(prod) − Σ n·ΔH°f(react)", cuando: "Los elementos valen 0.", ejemplo: "CH₄ + 2 O₂ → CO₂ + 2 H₂O(l): −890,3 kJ" },
        { label: "Con energías de enlace", formula: "ΔH ≈ Σ E(rotos) − Σ E(formados)", cuando: "Gases, valores medios.", ejemplo: "CH₄ + 2 O₂ → CO₂ + 2 H₂O(g): ≈ −802 kJ" }
      ],
      nota: "Fórmulas con signos contrarios: con formación, productos − reactivos; con enlaces, rotos − formados." },
    { titulo: "Espontaneidad",
      tabla: { cab: ["ΔH", "ΔS", "Resultado"], filas: [["−", "+", "siempre espontánea"], ["+", "−", "nunca"], ["−", "−", "a T baja"], ["+", "+", "a T alta"]] },
      items: [{ label: "Energía libre", formula: "ΔG = ΔH − T·ΔS", cuando: "ΔG &lt; 0 espontáneo. T en K.", ojo: "ΔS está en J/K: pásala a kJ/K." }],
      nota: "T<sub>eq</sub> = ΔH/ΔS cuando ΔG = 0." },
    { titulo: "Combustibles", ancha: true,
      tabla: { cab: ["Combustible", "−ΔH<sub>c</sub> (kJ/mol)", "kJ/g", "g CO₂/MJ"], filas: [["H₂", "285,8", "141,8", "0"], ["CH₄", "890,3", "55,5", "49,4"], ["C₃H₈", "2 220", "50,3", "59,5"], ["C₄H₁₀", "2 877", "49,5", "61,2"], ["C₈H₁₈", "5 470", "47,9", "64,4"], ["Etanol", "1 367", "29,7", "64,4"], ["C (carbón)", "393,5", "32,8", "111,8"]] },
      nota: "El H₂ da más energía por gramo y no emite CO₂, pero es difícil de almacenar." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "ΔU = Q + W con W = +40 si el gas se expande", bien: "W = −40 J (lo realiza el sistema)", por: "Lo que sale del sistema es negativo." },
        { mal: "Invertir una ecuación sin cambiar el signo de ΔH", bien: "ΔH cambia de signo", por: "Hess." },
        { mal: "Q = m·c·ΔT en un cambio de estado", bien: "Q = m·L", por: "ΔT = 0 pero se absorbe energía." },
        { mal: "ΔH° = Σ reactivos − Σ productos", bien: "Productos − reactivos (con ΔH°f)", por: "Con enlaces es al revés: rotos − formados." },
        { mal: "ΔG = ΔH − TΔS con ΔS en J/K y ΔH en kJ", bien: "Misma unidad: ΔS en kJ/K", por: "Evita el factor 1 000." },
        { mal: "Exotérmica ⟹ espontánea", bien: "Mirar ΔG = ΔH − TΔS", por: "El desorden también cuenta." }
      ] }
  ];

  B.registrar("fyq1", "t6", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
