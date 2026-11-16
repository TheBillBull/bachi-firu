/* ============================================================
   Biología II · ampliaciones · Tema 1: Bioelementos y biomoléculas inorgánicas
   (parte A: teoría. Parte B, bio2_t01b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t1.js (bio_osmosis, bio_ph).

   ESTILO DE BIOLOGÍA II (lo copiarán los demás temas):
     · secciones originales ampliadas con «<h5>» y listas; secciones nuevas numeradas a continuación;
     · una tabla «propiedad → causa → importancia biológica» o «A frente a B» por cada gran contraste;
     · «ojo(...)» para el error típico de examen; un ejemplo PAU resuelto paso a paso con «ejemplo(...)»;
     · cierre con «Cómo se pregunta en la PAU», test, «encuentra el error» y tarjetas.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Propiedades del agua y su causa (puentes de hidrógeno) con su importancia biológica → sección 3 + emparejar.
   2. Dispersiones: disolución verdadera, coloide (sol/gel), y sustancias hidrófilas/hidrófobas/anfipáticas → sección 3.
   3. Sales minerales: precipitadas, disueltas y asociadas a moléculas, con ejemplos y funciones → sección 4.
   4. Bioelementos y oligoelementos: por qué el carbono, y carencias típicas (bocio, anemia) → secciones 1 y 6.
   5. pH, escala logarítmica y sistemas tampón (bicarbonato de la sangre) → sección nueva 7 + widget bio_ph.
   6. Ósmosis: medios hipo/iso/hipertónicos en células animales y vegetales (hemólisis, crenación, turgencia, plasmólisis) → sección nueva 8 + widget bio_osmosis.
   7. Diferencias entre difusión, ósmosis, diálisis y filtración → sección 8 + clasificar.
   8. Concentraciones (g/L, % p/v, molaridad, osmolaridad) y diluciones → sección 6 con cálculos.
   9. Interpretar un experimento (glóbulos rojos en tubos; patata en sal) → sección 9 (ejemplo PAU resuelto).
   10. Biomolécula frente a bioelemento; inorgánica frente a orgánica → sección 5 + clasificar.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t1/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Los bioelementos
  secciones[0] = env(
    "<h5>Por qué el carbono es el protagonista</h5>" +
    "<p>Casi toda la química de los seres vivos es química del <b>carbono</b>. No es casualidad: el carbono puede formar <b>cuatro enlaces covalentes</b> y, además, enlaces sencillos, dobles y triples. Eso le permite construir <b>cadenas largas, ramificadas y anillos</b> a los que se unen H, O, N, P o S: de ahí salen azúcares, grasas, proteínas y ácidos nucleicos. Sus enlaces C–C y C–H son estables, pero se pueden romper con ayuda de enzimas y sin necesitar temperaturas extremas. Además, el CO<sub>2</sub> es un gas que se disuelve en agua, así que las plantas lo pueden «tomar» del aire y del agua para fabricar materia orgánica.</p>" +
    "<p>Compáralo con el silicio, que también tiene cuatro enlaces: sus enlaces Si–Si son más débiles y su óxido (SiO<sub>2</sub>, la arena) es un sólido que no se disuelve ni circula. Por eso la vida que conocemos es «de carbono».</p>" +
    "<h5>Los tres grupos, con ejemplos que debes saber</h5>" +
    tabla(["Grupo", "Proporción", "Elementos y para qué sirven"], [
      ["<b>Primarios</b>", "≈ 96 % (C, H, O, N)", "C, H, O, N, P, S: forman las biomoléculas orgánicas. El P está en el ATP y en el ADN; el S, en dos aminoácidos (cisteína y metionina)."],
      ["<b>Secundarios</b>", "≈ 3,3 %", "Ca, Na, K, Cl, Mg. El Ca (huesos, contracción muscular, coagulación), Na y K (impulso nervioso), Cl (jugo gástrico), Mg (centro de la clorofila)."],
      ["<b>Oligoelementos</b>", "&lt; 0,1 %", "Fe (hemoglobina), I (hormonas tiroideas), F (esmalte dental), Zn y Cu (enzimas), Mn, Co (vitamina B<sub>12</sub>), Se…"]
    ], "q3t") +
    "<p>Una precisión útil: C, H, O y N juntos suman ≈ 96 %, y con el P y el S se llega a ≈ 97–98 %. Los libros redondean de formas ligeramente distintas; para el examen, quédate con la idea de los tres grupos y con los ejemplos.</p>" +
    ojo("«Oligo» significa «poco», no «poco importante». Un oligoelemento hace falta en cantidades mínimas, pero su ausencia causa enfermedad: sin yodo, la tiroides se hincha (<b>bocio</b>); sin hierro, falta hemoglobina (<b>anemia ferropénica</b>); sin flúor, el esmalte se protege peor frente a las caries.") +
    w("clasificar", "grupos"));

  // ---------------------------------------------------------------- 2. Enlaces
  secciones[1] = env(
    "<h5>Fuerte y débil: por qué importa el tipo de enlace</h5>" +
    "<p>Hay una regla que sirve para todo el curso: <b>los enlaces covalentes forman las moléculas; los enlaces débiles les dan su forma y sus interacciones</b>. Un enlace covalente O–H del agua necesita unos 460 kJ/mol para romperse; un puente de hidrógeno entre dos moléculas de agua, unos 20 kJ/mol, más de veinte veces menos. Pero en un vaso de agua hay billones de ellos, y se rompen y se forman continuamente.</p>" +
    tabla(["Enlace", "Entre qué", "Fuerza", "Ejemplo biológico"], [
      ["Covalente", "átomos que comparten electrones", "fuerte", "los de una glucosa; los de una proteína"],
      ["Iónico", "iones de carga opuesta", "medio (se debilita en agua)", "Na⁺ y Cl⁻ en el plasma, ya disociados"],
      ["Puente de hidrógeno", "un H unido a O o N con un O o N de otra zona", "débil, pero muy numeroso", "entre las moléculas de agua; entre las dos hebras del ADN"]
    ], "q3t") +
    "<p>Fíjate en que el puente de hidrógeno <b>no es un enlace entre dos átomos de la misma molécula, sino una atracción entre moléculas (o entre zonas de una misma molécula grande)</b>. En el agua, el H de una molécula (algo positivo) es atraído por el O (algo negativo) de otra.</p>");

  // ---------------------------------------------------------------- 3. El agua
  secciones[2] = env(
    "<h5>De la polaridad a las propiedades</h5>" +
    "<p>La molécula de agua tiene forma de «V» (ángulo ≈ 104,5°). El oxígeno atrae más a los electrones: queda con una carga parcial negativa (δ⁻) y cada hidrógeno con una parcial positiva (δ⁺). Es un <b>dipolo</b>. Dos moléculas vecinas se unen por <b>puentes de hidrógeno</b>, y cada una puede formar hasta cuatro. Todas las propiedades del agua nacen de ahí. La tabla es una de las cosas que más se pregunta; apréndela como «propiedad → causa → importancia biológica».</p>" +
    tabla(["Propiedad", "Por qué ocurre", "Importancia biológica"], [
      ["<b>Líquida a temperatura ambiente</b> y punto de ebullición alto", "Los puentes de H obligan a gastar mucha energía para separar las moléculas (H<sub>2</sub>S, sin ellos, hierve a −60 °C)", "Medio líquido donde ocurre la vida en un amplio margen de temperaturas"],
      ["<b>Alto calor específico</b> (1 cal/g·°C = 4,18 J/g·°C)", "Parte de la energía se gasta en romper puentes de H antes de que suba la temperatura", "Amortigua cambios de temperatura en células, organismos y en mares y lagos"],
      ["<b>Alto calor de vaporización</b> (≈ 540 cal/g)", "Para evaporar hay que romper todos los puentes de H", "El sudor refrigera: cada gramo que se evapora se lleva mucho calor"],
      ["<b>Cohesión</b> y tensión superficial", "Los puentes de H unen las moléculas entre sí", "Columna de agua en los vasos de las plantas; insectos que caminan sobre el agua"],
      ["<b>Adhesión</b> y capilaridad", "El agua también se pega a paredes polares (celulosa)", "Junto con la cohesión, ayuda a subir la savia bruta por el xilema"],
      ["<b>Densidad máxima a 4 °C</b>; el hielo flota", "En el hielo cada molécula forma 4 puentes de H en una red abierta, más voluminosa", "Lagos y mares se congelan por arriba y el fondo sigue líquido: la vida sobrevive debajo"],
      ["<b>Disolvente</b> de sustancias polares e iónicas", "Los dipolos rodean a los iones (solvatación) y a moléculas polares y los separan", "Medio de reacciones químicas y transporte de sustancias (sangre, savia)"],
      ["<b>Reactivo y producto</b>", "Participa en reacciones químicas", "Hidrólisis (digestión), fotosíntesis (el agua se rompe), respiración celular (se forma)"]
    ], "q3t") +
    w("emparejar", "agua") +
    "<h5>Tres números para recordar</h5>" +
    "<p>El agua es entre el <b>60 y el 70 %</b> del peso de un adulto (≈ 90 % en el embrión, ≈ 20 % en el hueso, ≈ 95 % en una medusa). Como el calor de vaporización es de ≈ 540 cal/g, evaporar 50 g de sudor retira ≈ 27 000 cal (27 kcal) del cuerpo. Y 1 L de agua que se congela pasa a ocupar ≈ 1,09 L: por eso estallan las tuberías y se rompen las células de un alimento congelado mal.</p>" +
    "<h5>Disoluciones, coloides y suspensiones</h5>" +
    "<p>Cómo se reparte una sustancia en el agua depende del tamaño de sus partículas:</p>" +
    tabla(["Tipo", "Tamaño de partícula", "Aspecto y ejemplo"], [
      ["<b>Disolución verdadera</b>", "muy pequeño (iones y moléculas pequeñas, &lt; 1 nm)", "transparente y estable: sal o glucosa en agua, plasma"],
      ["<b>Dispersión coloidal</b>", "intermedio (de ≈ 1 a ≈ 200 nm, según el libro)", "aspecto turbio que dispersa la luz (efecto Tyndall); proteínas y almidón; el citoplasma"],
      ["<b>Suspensión</b>", "grande, visible al microscopio", "se sedimenta si se deja reposar: células en la sangre"]
    ], "q3t") +
    "<p>Los coloides pueden estar en dos estados: <b>sol</b> (más fluido, mucha agua entre las partículas) y <b>gel</b> (más rígido, con una red que atrapa el agua, como la gelatina). El citoplasma pasa de sol a gel y vuelve, y eso interviene en el movimiento de las células. La clara de huevo es un coloide: al cocinarla, las proteínas cambian y pasa de sol a un gel que ya no se deshace.</p>" +
    "<h5>Quién se lleva bien con el agua</h5>" +
    tabla(["Tipo de sustancia", "Se mezcla con agua", "Ejemplo"], [
      ["<b>Hidrófila</b> (polar o iónica)", "sí", "sales, glucosa, aminoácidos"],
      ["<b>Hidrófoba</b> (apolar)", "no", "grasas, aceite, colesterol"],
      ["<b>Anfipática</b> (una parte hidrófila y otra hidrófoba)", "se ordena en la interfase o forma micelas y membranas", "fosfolípidos, jabones"]
    ], "q3t") +
    ojo("Es muy frecuente escribir que «el agua es un disolvente universal». Es una exageración útil para recordar, pero el agua <b>no</b> disuelve las sustancias apolares como las grasas. Por eso se dice «gran disolvente de sustancias polares e iónicas»."));

  // ---------------------------------------------------------------- 4. Sales minerales
  secciones[3] = env(
    "<h5>Tres formas de estar en el organismo</h5>" +
    tabla(["Forma", "Qué son", "Ejemplos y funciones"], [
      ["<b>Precipitadas</b> (sólidas)", "sales insolubles que forman estructuras", "fosfato cálcico (hidroxiapatito) de huesos y dientes; carbonato cálcico de conchas y cáscaras de huevo; sílice de diatomeas y de gramíneas. Función: <b>esqueleto y protección</b>"],
      ["<b>Disueltas</b> (iones libres)", "disociadas en cationes y aniones", "Na⁺, K⁺, Ca²⁺, Mg²⁺, Cl⁻, HCO₃⁻, HPO₄²⁻. Funciones: presión osmótica, tampón, impulso nervioso, contracción muscular, coagulación"],
      ["<b>Asociadas a moléculas orgánicas</b>", "el ion forma parte de otra biomolécula", "Fe²⁺ en la hemoglobina; Mg²⁺ en la clorofila; fosfato en el ATP y en el ADN; I en la tiroxina"]
    ], "q3t") +
    "<h5>Qué hacen los iones disueltos, uno por uno</h5>" +
    "<ul><li><b>Regulan la presión osmótica</b> (sección 8): si el medio tiene más o menos sales que la célula, el agua entra o sale.</li>" +
    "<li><b>Impulso nervioso:</b> la bomba de Na⁺/K⁺ saca 3 Na⁺ y mete 2 K⁺ en cada ciclo, y esa diferencia de iones hace posible el impulso.</li>" +
    "<li><b>Contracción muscular:</b> el Ca²⁺ es el que «dispara» la contracción; también interviene en la coagulación de la sangre.</li>" +
    "<li><b>Tampón:</b> HCO₃⁻ y fosfatos mantienen el pH (sección 7).</li></ul>" +
    ojo("«Precipitada» no es «poco importante» ni «disuelta sin más»: una sal precipitada está en estado <b>sólido</b>. Los huesos no son «sal disuelta»; el sodio del plasma no está «precipitado»."));

  // ---------------------------------------------------------------- 5. Clasificación
  secciones[4] = env(
    "<h5>Un mapa para no confundirse</h5>" +
    "<p>Una <b>biomolécula</b> es una molécula presente en los seres vivos; un <b>bioelemento</b> es un elemento (átomo) presente en ellos. «Calcio» es un bioelemento; «fosfato cálcico» es una sal mineral, que es una biomolécula inorgánica. Las biomoléculas orgánicas tienen esqueleto de carbono; las inorgánicas no (aunque contengan carbono, como el CO<sub>2</sub>, los carbonatos o el bicarbonato, que se consideran inorgánicos). El <b>agua</b> es, con diferencia, la biomolécula más abundante de la célula (≈ 70 %).</p>" +
    w("clasificar", "biomol"));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Concentraciones y diluciones: los cálculos del tema", html: env(
    "<p>Para hablar de ósmosis y de pH hay que saber medir cuánto soluto hay en una disolución. Estas son las formas que se usan en Biología:</p>" +
    tabla(["Magnitud", "Qué mide", "Fórmula"], [
      ["<b>g/L</b>", "gramos de soluto por litro de disolución", "m (g) / V (L)"],
      ["<b>% p/v</b>", "gramos de soluto por cada 100 mL de disolución", "m (g) · 100 / V (mL)"],
      ["<b>Molaridad</b> (M)", "moles de soluto por litro", "M = n / V, con n = m / M<sub>r</sub>"],
      ["<b>Osmolaridad</b> (Osm/L)", "moles de <b>partículas</b> por litro", "molaridad · número de partículas por unidad (NaCl: 2; glucosa: 1)"]
    ], "q3t") +
    ejemplo("Suero fisiológico (NaCl al 0,9 % p/v)", "Calcula su concentración en g/L, su molaridad y su osmolaridad. M<sub>r</sub>(NaCl) = 58,44.", [
      "<b>g/L:</b> 0,9 g en 100 mL son 9 g en 1000 mL → <b>9 g/L</b>.",
      "<b>Molaridad:</b> n = 9 / 58,44 = 0,154 mol → <b>0,154 M</b>.",
      "<b>Osmolaridad:</b> cada unidad de NaCl da dos partículas (Na⁺ y Cl⁻): 0,154 · 2 = 0,308 Osm/L = <b>308 mOsm/L</b>.",
      "<b>Lectura:</b> el interior de nuestras células tiene ≈ 300 mOsm/L, así que el suero 0,9 % es isotónico con ellas."
    ]) +
    ejemplo("Diluir: de una disolución al 10 % a otra al 2 %", "¿Qué volumen de la disolución al 10 % necesitas para preparar 100 mL al 2 %?", [
      "Se conserva la cantidad de soluto: C<sub>1</sub>·V<sub>1</sub> = C<sub>2</sub>·V<sub>2</sub>.",
      "10 · V<sub>1</sub> = 2 · 100 → V<sub>1</sub> = 20 mL.",
      "Se miden 20 mL y se añade agua hasta 100 mL (<b>no</b> 20 mL + 100 mL)."
    ]) +
    ojo("Una disolución de glucosa al 5 % p/v tiene 277 mOsm/L (≈ isotónica); una de NaCl al 0,9 % tiene 308 mOsm/L. Tienen <b>distinta masa de soluto</b> pero casi la misma osmolaridad, porque la glucosa pesa más y no se separa en iones. Lo que importa para la ósmosis es el número de <b>partículas</b>, no los gramos.")) });

  nuevas.push({ h: "7. pH y sistemas tampón", html: env(
    "<h5>La definición, sin miedo al logaritmo</h5>" +
    "<p>Una disolución de agua tiene siempre un poquito de iones: H<sup>+</sup> (en realidad H<sub>3</sub>O<sup>+</sup>) y OH<sup>−</sup>. En agua pura, a 25 °C, ambos valen 10<sup>−7</sup> mol/L y su producto es siempre <b>10<sup>−14</sup></b>. El <b>pH</b> es una forma cómoda de expresar [H<sup>+</sup>]:</p>" +
    "<div class='formula-wrap'><div class='formula'>pH = −log [H<sup>+</sup>] &nbsp;&nbsp;&nbsp; pH + pOH = 14</div></div>" +
    "<p>Dos ideas bastan: <b>(1)</b> pH &lt; 7 es ácido, 7 neutro y &gt; 7 básico; <b>(2)</b> la escala es <b>logarítmica</b>: bajar una unidad de pH es tener <b>10 veces más</b> H<sup>+</sup>; bajar dos, 100 veces; bajar tres, 1000. Una cosa de pH 3 es mil veces más ácida que otra de pH 6, no «el doble».</p>" +
    w("bio_ph") +
    "<h5>Por qué la vida necesita un pH estable</h5>" +
    "<p>Las proteínas y las enzimas funcionan bien solo en un margen de pH estrecho. La sangre debe mantenerse en <b>7,35–7,45</b> (valor normal 7,40): por debajo de 7,35 hay <b>acidosis</b> y por encima de 7,45, <b>alcalosis</b>; fuera de ≈ 6,8–7,8 la vida no es posible. Eso es tan delicado que el organismo tiene <b>sistemas tampón</b>.</p>" +
    "<h5>Cómo funciona un tampón</h5>" +
    "<p>Un <b>sistema tampón</b> (o amortiguador) es una mezcla de un ácido débil y su base conjugada que <b>resiste los cambios de pH</b> cuando se añaden pequeñas cantidades de ácido o de base. Si entran H<sup>+</sup>, la parte básica los capta; si entra una base, la parte ácida cede H<sup>+</sup>.</p>" +
    tabla(["Tampón", "Dónde", "Pareja ácido / base"], [
      ["<b>Bicarbonato</b>", "plasma sanguíneo, líquidos extracelulares", "H<sub>2</sub>CO<sub>3</sub> (del CO<sub>2</sub> + H<sub>2</sub>O) / HCO<sub>3</sub><sup>−</sup>"],
      ["<b>Fosfato</b>", "interior de las células", "H<sub>2</sub>PO<sub>4</sub><sup>−</sup> / HPO<sub>4</sub><sup>2−</sup>"],
      ["<b>Proteínas</b> (y hemoglobina)", "células y sangre", "grupos ácido y amino de los aminoácidos"]
    ], "q3t") +
    "<div class='formula-wrap'><div class='formula'>CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>−</sup></div></div>" +
    "<p>Si sobran H<sup>+</sup>, el equilibrio se desplaza hacia la izquierda (se forma CO<sub>2</sub>, que se exhala por los pulmones). Si faltan, se desplaza hacia la derecha. Por eso respirar más deprisa sube el pH sanguíneo y respirar más despacio lo baja.</p>" +
    "<p>Con la ecuación de Henderson–Hasselbalch del bicarbonato: <b>pH = 6,1 + log([HCO<sub>3</sub><sup>−</sup>] / [CO<sub>2</sub> disuelto])</b>. Con 24 mmol/L de bicarbonato y 1,2 mmol/L de CO<sub>2</sub> disuelto, el cociente es 20 y el pH es 6,1 + 1,30 = <b>7,40</b>. (Esta fórmula es de ampliación; en la PAU basta con explicar con palabras cómo amortigua.)</p>" +
    ojo("Un tampón <b>no impide</b> que cambie el pH: lo hace cambiar <b>mucho menos</b>. Y tiene un límite: si entra demasiado ácido, se agota.")) });

  nuevas.push({ h: "8. Difusión, ósmosis y diálisis", html: env(
    "<h5>Tres formas de moverse sin gastar energía</h5>" +
    "<p>Las sales y el agua del medio interno no se quedan quietas. Los movimientos a favor de un gradiente de concentración no gastan energía de la célula (transporte pasivo):</p>" +
    tabla(["Proceso", "Qué se mueve", "A través de qué", "Hacia dónde"], [
      ["<b>Difusión simple</b>", "moléculas pequeñas disueltas (O<sub>2</sub>, CO<sub>2</sub>)", "membrana o medio libre", "de más a menos concentración de soluto"],
      ["<b>Ósmosis</b>", "<b>solo el disolvente</b> (agua)", "membrana semipermeable", "del medio con menos soluto (hipotónico) al de más soluto (hipertónico)"],
      ["<b>Diálisis</b>", "solutos pequeños; los grandes (proteínas) se quedan", "membrana semipermeable", "los solutos pequeños, de más a menos concentración"],
      ["<b>Filtración</b>", "agua y solutos pequeños", "membrana porosa, con presión", "de mayor a menor presión (riñón, capilares)"]
    ], "q3t") +
    "<p>La <b>presión osmótica</b> es la presión que habría que aplicar para evitar la entrada de agua; cuanto más concentrada es una disolución, más presión osmótica tiene. Tres palabras que se pierden con mucha frecuencia: se dice que el <b>medio</b> es:</p>" +
    "<ul><li><b>hipotónico</b> si tiene <b>menos</b> solutos que la célula (el agua entra en la célula);</li>" +
    "<li><b>isotónico</b> si tiene <b>la misma</b> concentración (no hay flujo neto de agua);</li>" +
    "<li><b>hipertónico</b> si tiene <b>más</b> solutos que la célula (el agua sale de la célula).</li></ul>" +
    "<p>Truco: <em>hipo</em> = «por debajo», <em>hiper</em> = «por encima», y se compara el <b>medio</b> con la <b>célula</b>. El agua va hacia donde hay <b>más</b> soluto.</p>" +
    w("bio_osmosis") +
    "<h5>Qué le pasa a cada célula</h5>" +
    tabla(["", "Medio hipotónico (agua destilada)", "Medio isotónico", "Medio hipertónico (agua salada)"], [
      ["<b>Célula animal</b> (hematíe)", "entra agua; se hincha y <b>estalla</b> (hemólisis)", "conserva forma y volumen", "sale agua; se arruga (<b>crenación</b>)"],
      ["<b>Célula vegetal</b>", "entra agua; <b>turgencia</b> (la pared celular evita que estalle)", "célula flácida", "sale agua; <b>plasmólisis</b> (la membrana se despega de la pared)"]
    ], "q3t") +
    ojo("Una célula vegetal en agua destilada <b>no estalla</b> porque tiene pared celular (de celulosa); un glóbulo rojo sí, porque solo tiene membrana. Y cuidado con el sentido: el hematíe en agua salada <b>no</b> se hincha; se arruga.") +
    "<h5>Aplicaciones cotidianas</h5>" +
    "<p>Conservar jamón o bacalao con sal: el medio muy hipertónico saca el agua de las bacterias y no pueden vivir. Echar sal a un caracol o una babosa le hace perder agua. Una lechuga mustia recupera la firmeza en agua (se vuelve turgente). El suero fisiológico (0,9 %) se inyecta porque es isotónico. Beber agua de mar deshidrata: es hipertónica y tus células perderían agua.</p>" +
    w("clasificar", "medios") + w("orden", "ordenhemolisis")) });

  nuevas.push({ h: "9. Ejemplo PAU resuelto: interpretar un experimento", html: env(
    ejemplo("Hematíes en tres tubos", "En el laboratorio se ponen glóbulos rojos en tres tubos: A) agua destilada, B) NaCl al 0,9 %, C) NaCl al 3 %. Al cabo de unos minutos se observan al microscopio. (a) Describe lo que verás en cada tubo y explica por qué. (b) Si los glóbulos de A se han roto, ¿cómo se llama el fenómeno? (c) Calcula la osmolaridad del tubo C (M<sub>r</sub> NaCl = 58,44).", [
      "<b>Tubo A (agua destilada):</b> el medio no tiene solutos, es hipotónico. El agua entra por ósmosis; los hematíes se hinchan y se rompen (<b>hemólisis</b>), porque la membrana no resiste.",
      "<b>Tubo B (0,9 %):</b> medio isotónico (≈ 308 mOsm/L, igual que el interior). No hay flujo neto de agua; los hematíes conservan su forma de disco.",
      "<b>Tubo C (3 %):</b> el medio es hipertónico; el agua sale, los hematíes se arrugan (<b>crenación</b>).",
      "<b>(c)</b> 3 g en 100 mL son 30 g/L; n = 30 / 58,44 = 0,513 mol/L; ×2 partículas = 1,027 Osm/L ≈ <b>1027 mOsm/L</b>, unas 3,3 veces la del interior (308).",
      "<b>Conclusión que puntúa:</b> la dirección del agua depende de la concentración de solutos del medio <b>comparada con la de la célula</b>, no del tipo de sal."
    ]) +
    ejemplo("Cilindros de patata en disoluciones de sacarosa", "Se cortan cilindros de patata de 10,0 g y se dejan una hora en disoluciones de sacarosa. Variación de masa: 0,0 M: +15 %; 0,1 M: +6 %; 0,2 M: −2 %; 0,3 M: −9 %; 0,4 M: −15 %. (a) Explica las variaciones. (b) Estima la concentración isotónica con la patata. (c) ¿Cuántos gramos pesa el cilindro tras la hora en 0,4 M?", [
      "<b>(a)</b> Con 0,0 M y 0,1 M el medio es hipotónico: entra agua y la masa sube. Con 0,3 M y 0,4 M el medio es hipertónico: sale agua y la masa baja.",
      "<b>(b)</b> El punto isotónico es aquel en que la masa no cambia: está entre 0,1 M (+6 %) y 0,2 M (−2 %). Interpolación lineal: 0,1 + 0,1 · 6 / 8 = <b>0,175 M</b>.",
      "<b>(c)</b> −15 % de 10,0 g son 1,5 g: la masa final es <b>8,5 g</b>.",
      "<b>Detalle de examen:</b> para ser un buen experimento hace falta repetir cada concentración y secar los cilindros antes de pesarlos."
    ]) +
    "<p>Ahora tú: en los ejercicios hay una gráfica descrita para interpretar, con la misma lógica.</p>") });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>En Biología el orden de una buena respuesta es: <b>definir → explicar con el mecanismo → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema, con una respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Cita tres propiedades del agua y su importancia biológica", "Respuesta modelo:", [
      "<b>Alto calor específico:</b> el agua absorbe mucho calor sin calentarse mucho, por los puentes de H; amortigua los cambios de temperatura.",
      "<b>Alto calor de vaporización:</b> evaporar agua gasta mucha energía; el sudor refrigera el cuerpo.",
      "<b>Disolvente por su polaridad:</b> disuelve sustancias iónicas y polares; es el medio de las reacciones y del transporte.",
      "Terminar uniendo todo al hecho de que la molécula es polar y forma puentes de hidrógeno."
    ]) +
    ejemplo("Pregunta 2. Funciones de las sales minerales", "Respuesta modelo:", [
      "<b>Precipitadas:</b> estructurales (fosfato cálcico de los huesos, carbonato cálcico de las conchas).",
      "<b>Disueltas:</b> mantienen la presión osmótica, el pH (tampón) y permiten el impulso nervioso (Na⁺, K⁺) y la contracción (Ca²⁺).",
      "<b>Asociadas a moléculas:</b> Fe en la hemoglobina, Mg en la clorofila."
    ]) +
    ejemplo("Pregunta 3. Define ósmosis y explica qué le ocurre a una célula vegetal en un medio hipertónico", "Respuesta modelo:", [
      "<b>Definición:</b> paso de agua a través de una membrana semipermeable desde el medio con menos soluto al de más soluto.",
      "<b>En un medio hipertónico:</b> sale agua de la célula, la vacuola se contrae y el protoplasto se separa de la pared: plasmólisis.",
      "<b>Contraste:</b> en un medio hipotónico entraría agua y habría turgencia, sin rotura gracias a la pared celular."
    ]) +
    ejemplo("Pregunta 4. ¿Qué es un sistema tampón? Pon un ejemplo", "Respuesta modelo:", [
      "<b>Definición:</b> mezcla de un ácido débil y su base conjugada que amortigua los cambios de pH.",
      "<b>Ejemplo:</b> bicarbonato de la sangre: CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>−</sup>.",
      "<b>Mecanismo:</b> si aumentan los H<sup>+</sup>, el HCO<sub>3</sub><sup>−</sup> los capta; si disminuyen, el H<sub>2</sub>CO<sub>3</sub> los libera. Mantiene la sangre en pH 7,4."
    ]) +
    "<p>Los ejercicios del final de este tema incluyen preguntas abiertas con rúbrica, para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio1a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
