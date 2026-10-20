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
