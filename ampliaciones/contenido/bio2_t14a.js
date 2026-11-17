/* ============================================================
   Biología II · ampliaciones · Tema 14: Microbiología
   (parte A: teoría. Parte B, bio2_t14b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t14.js (bio_crecimiento, bio_ciclo_viral).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Qué es (y qué no es) un microorganismo; acelulares, procariotas y eucariotas; los virus no son células → secciones 1 y 2 + clasificar.
   2. Estructura de un virus (ácido nucleico, cápsida, envoltura) y de un bacteriófago → sección 2.
   3. Ciclo lítico frente a ciclo lisogénico, con el esquema de cada etapa → sección 2 + widget bio_ciclo_viral + ordenar.
   4. Retrovirus: transcriptasa inversa, provirus, ciclo del VIH; viroides y priones frente a virus → sección 9.
   5. Estructura de la bacteria dibujada y rotulada; pared (peptidoglucano) y tinción de Gram → sección 3.
   6. Tipos de nutrición bacteriana (fuente de energía y de carbono) con ejemplos → sección 6.
   7. Reproducción y variabilidad: bipartición, conjugación, transformación y transducción → sección 7.
   8. Curva de crecimiento (cuatro fases) y problemas de generaciones N = N0·2^n y recuento de colonias → sección 8 + widget bio_crecimiento.
   9. Enfermedades, esterilización/desinfección/pasteurización, antibióticos y antibiograma, vacunas frente a sueros → sección 10.
   10. Ciclo del nitrógeno y microorganismos en la industria y el medio ambiente (yogur, vino, insulina, depuración) → secciones 5 y 11.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t14/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es un microorganismo
  secciones[0] = env(
    "<h5>Un grupo definido por el tamaño, no por la familia</h5>" +
    "<p>«Microorganismo» no es un grupo natural como «mamíferos»: es una etiqueta práctica para todo lo que necesita un <b>microscopio</b> para verse. Dentro caben cosas tan distintas como un virus (que ni siquiera tiene células), una bacteria (célula sin núcleo) y una levadura (célula con núcleo, como la tuya). Lo que tienen en común es el tamaño y que la mayoría vive en cualquier rincón del planeta: suelo, agua, aire, piel e intestino.</p>" +
    "<p>La microbiología nació cuando se pudo mirar: en <b>1676</b> Antoni van Leeuwenhoek describió con sus lentes los «animálculos» (bacterias y protozoos) del agua y del sarro dental. Dos siglos después, <b>Pasteur</b> (matraces de cuello de cisne, hacia 1860) demostró que los microbios no aparecen por generación espontánea, sino que vienen de otros microbios; y <b>Koch</b> (1876–1884) demostró que cada enfermedad infecciosa la causa un microbio concreto.</p>" +
    "<h5>Tres bloques y los tamaños que debes tener en la cabeza</h5>" +
    tabla(["Bloque", "Qué son", "Ejemplos", "Tamaño típico"], [
      ["<b>Acelulares</b>", "sin célula: ácido nucleico + proteína (+ a veces lípidos)", "virus, viroides, priones", "virus: 20–300 nm; viroides y priones, menores"],
      ["<b>Procariotas</b>", "células sin núcleo ni orgánulos con membrana", "bacterias y arqueas", "0,5–5 µm (E. coli: ≈ 2 µm de largo)"],
      ["<b>Eucariotas microscópicos</b>", "células con núcleo y orgánulos", "protozoos, algas microscópicas, hongos unicelulares y mohos", "5–100 µm (levadura ≈ 5–10 µm)"]
    ], "q3t") +
    "<p>Una referencia útil: <b>1 µm = 1000 nm</b>. Un virus de 100 nm es unas <b>20 veces más pequeño</b> que una bacteria de 2 µm, que a su vez cabe unas 5 veces en una levadura. Por eso el virus solo se ve con <b>microscopio electrónico</b>, mientras que bacterias, levaduras y protozoos se ven con el óptico (hasta 1000–1500 aumentos).</p>" +
    "<h5>Los tres dominios de la vida</h5>" +
    "<p>Según la comparación del ARN ribosómico (Carl Woese, 1977–1990), los seres celulares se reparten en tres <b>dominios</b>: <b>Bacteria</b>, <b>Archaea</b> (arqueas) y <b>Eukarya</b> (eucariotas). Las arqueas parecen bacterias al microscopio, pero su pared carece de peptidoglucano, sus lípidos de membrana son distintos y muchas viven en condiciones extremas (aguas hirvientes, salinas, medios muy ácidos): son los <b>extremófilos</b>. Los virus no están en ningún dominio: no son células.</p>" +
    ojo("«Microorganismo» no significa «bacteria» ni «germen que produce enfermedad». Los virus no son bacterias muy pequeñas (no tienen células), y la inmensa mayoría de los microorganismos <b>no causa enfermedad</b>. Fíjate también en que las <b>algas microscópicas</b> y los <b>hongos</b> son eucariotas, aunque a veces se los agrupe con «bichos» en el lenguaje cotidiano.") +
    w("clasificar", "clasif"));

  // ---------------------------------------------------------------- 2. Virus
  secciones[1] = env(
    "<h5>Cómo es un virus por dentro</h5>" +
    "<p>Un virus (la partícula completa se llama <b>virión</b>) tiene solo dos o tres componentes: <b>ácido nucleico</b> (el genoma), <b>cápsida</b> y, en algunos, <b>envoltura</b>. No tiene citoplasma, ribosomas ni metabolismo propio. Esa es la razón de que sea un <b>parásito intracelular obligado</b>: fuera de una célula huésped es una partícula inerte, que puede cristalizar y guardarse en un cajón, y solo «cobra vida» cuando entra en una célula.</p>" +
    tabla(["Componente", "Qué es", "Función"], [
      ["<b>Ácido nucleico</b>", "ADN o ARN (nunca los dos en el mismo virus), monocatenario o bicatenario, lineal o circular", "contiene la información para fabricar nuevos virus"],
      ["<b>Cápsida</b>", "cubierta de proteína formada por muchas subunidades iguales, los <b>capsómeros</b>", "protege el genoma y ayuda a reconocer la célula"],
      ["<b>Envoltura</b> (solo algunos)", "bicapa lipídica robada de la membrana del huésped, con glucoproteínas víricas (espículas)", "facilita la entrada; los virus con envoltura son frágiles (el jabón los destruye)"]
    ], "q3t") +
    "<p>La cápsida adopta formas regulares: <b>helicoidal</b> (un tubo en espiral, como el virus del mosaico del tabaco), <b>icosaédrica</b> (20 caras triangulares, como el adenovirus o el de la polio) o <b>compleja</b>, como la del <b>bacteriófago T4</b>, que tiene una cabeza icosaédrica con el ADN, una cola helicoidal con vaina contráctil, una placa basal y fibras que reconocen a la bacteria. Los virus <b>con envoltura</b> más conocidos son los de la gripe, el VIH, el herpes y el coronavirus SARS-CoV-2.</p>" +
    "<h5>¿Es un virus un ser vivo?</h5>" +
    "<p>Es una pregunta abierta y de examen. A favor de que sí: tiene material genético, se reproduce y evoluciona (muta y se selecciona). En contra: no tiene células, no tiene metabolismo propio y no se reproduce por sí mismo, sino que la célula fabrica sus copias. Por eso se dice que son «<b>entidades biológicas acelulares</b>» y se estudian en microbiología aunque sean un caso límite. En el examen, da la respuesta y justifícala con estos argumentos.</p>" +
    "<p>Se descubrieron en el tabaco: Ivanovsky (1892) comprobó que el jugo de hojas enfermas seguía infectando aunque se pasara por filtros que retenían las bacterias; Beijerinck (1898) lo llamó «virus filtrable», y Stanley (1935) cristalizó el virus del mosaico del tabaco, una prueba de que era una partícula química y no una célula.</p>" +
    "<h5>Los dos ciclos de los bacteriófagos, etapa a etapa</h5>" +
    "<p>Los virus que infectan bacterias son los <b>bacteriófagos</b> («fagos»). Son el modelo para estudiar los ciclos, y los experimentos de <b>Hershey y Chase (1952)</b> con fagos demostraron que lo que entra en la bacteria es el <b>ADN</b>, no la proteína.</p>" +
    "<p><b>Ciclo lítico</b> (el virus mata la célula enseguida). Cinco etapas que debes saber ordenar y explicar:</p>" +
    "<ol>" +
    "<li><b>Adsorción:</b> las fibras de la cola se unen a receptores específicos de la pared bacteriana (por eso cada fago infecta solo a ciertas bacterias).</li>" +
    "<li><b>Penetración:</b> la cola perfora la pared y la vaina se contrae e <b>inyecta el ADN</b>; la cápsida vacía queda fuera.</li>" +
    "<li><b>Síntesis</b> (también llamada eclipse): el ADN del fago bloquea el funcionamiento de la bacteria, destruye su ADN y la obliga a replicar el genoma vírico y a fabricar proteínas víricas.</li>" +
    "<li><b>Ensamblaje o maduración:</b> los genomas se meten en cápsidas y se arman los fagos completos.</li>" +
    "<li><b>Lisis y liberación:</b> una enzima del fago rompe la pared (lisozima o endolisina), la bacteria estalla y salen decenas o cientos de fagos nuevos (el T4 produce unos cien en media hora).</li>" +
    "</ol>" +
    "<p><b>Ciclo lisogénico</b> (el virus se esconde). Las dos primeras etapas son iguales; después el ADN del fago se <b>integra en el cromosoma</b> de la bacteria y pasa a llamarse <b>profago</b>. La bacteria, ahora <b>lisogénica</b>, sigue viva y, cada vez que se divide, copia el profago junto con su propio ADN, de modo que todas sus descendientes lo llevan sin que se fabriquen virus. Pero el profago puede <b>inducirse</b>: un estrés (radiación ultravioleta, productos tóxicos) lo separa del cromosoma (<b>escisión</b>) y entra en un ciclo lítico.</p>" +
    tabla(["", "Ciclo lítico", "Ciclo lisogénico"], [
      ["¿Qué hace el ADN del virus?", "se replica de inmediato y dirige la síntesis de virus", "se integra en el ADN bacteriano (profago)"],
      ["¿Se fabrican virus enseguida?", "sí", "no (hasta la inducción)"],
      ["¿Qué pasa con la célula?", "muere por lisis", "sigue viva y se divide"],
      ["¿Se transmite a las células hijas?", "no: no hay descendencia de la célula", "sí, con el ADN de la bacteria"],
      ["Tipo de virus", "virulento", "atemperado o templado"]
    ], "q3t") +
    "<p>El ciclo lisogénico no es inofensivo. Algunos profagos llevan <b>genes de toxinas</b> que la bacteria no tendría si no estuviera infectada: la toxina de la <b>difteria</b> y la del <b>cólera</b> las producen bacterias lisogénicas (<b>conversión lisogénica</b>). Y los fagos pueden mover genes de una bacteria a otra (transducción, sección 7).</p>" +
    ojo("En el ciclo lisogénico <b>no hay replicación del virus como tal</b> mientras está integrado: se replica el ADN de la bacteria y, con él, el profago. Tampoco es el ciclo de «los virus buenos»: es solo una estrategia distinta. Y no mezcles: la <b>lisis</b> es del ciclo lítico (o de la inducción del lisogénico).") +
    w("bio_ciclo_viral") + w("orden", "ordenlitico"));

  // ---------------------------------------------------------------- 3. Célula bacteriana
  secciones[2] = env(
    "<h5>Estructura de una bacteria (el esquema que hay que saber rotular)</h5>" +
    "<p>La célula procariota es más sencilla que la eucariota (Tema 6), pero no «primitiva» ni simple: es capaz de hacer casi todo con una sola célula. Se rotula de fuera hacia dentro:</p>" +
    tabla(["Estructura", "Qué es", "Función"], [
      ["<b>Cápsula</b> (no siempre)", "capa de polisacáridos pegajosa", "protege de la desecación y de los fagocitos; permite adherirse"],
      ["<b>Pared celular</b>", "red de <b>peptidoglucano</b> (mureína): cadenas de azúcares unidas por péptidos", "da forma y resiste la presión osmótica (impide la lisis)"],
      ["<b>Membrana plasmática</b>", "bicapa lipídica con proteínas", "transporte, y en ella están las enzimas de la respiración (no hay mitocondrias)"],
      ["<b>Citoplasma</b>", "con <b>ribosomas 70S</b>, inclusiones de reserva", "síntesis de proteínas y metabolismo"],
      ["<b>Nucleoide</b>", "un cromosoma circular de ADN bicatenario sin envoltura, unido a proteínas", "información genética (≈ 4,6 millones de pares de bases en E. coli)"],
      ["<b>Plásmidos</b> (no siempre)", "pequeños ADN circulares extra que se replican solos", "genes accesorios: resistencia a antibióticos, toxinas, conjugación"],
      ["<b>Flagelos</b> (algunos)", "filamento helicoidal de flagelina que gira como una hélice", "movimiento"],
      ["<b>Fimbrias y pili</b>", "filamentos cortos de proteína", "adhesión; el <b>pilus sexual</b> es el de la conjugación"]
    ], "q3t") +
    "<p>Fíjate en lo que <b>no</b> tiene: ni núcleo, ni mitocondrias, ni cloroplastos, ni retículo, ni aparato de Golgi. Sus ribosomas (70S) son más pequeños que los eucariotas (80S), lo que permite que muchos antibióticos actúen sobre los ribosomas bacterianos sin dañar los nuestros. Algunas bacterias (<i>Bacillus</i>, <i>Clostridium</i>) forman <b>endosporas</b>: estructuras de resistencia extrema al calor, la sequía y los desinfectantes. No son una forma de reproducción (de una bacteria sale una espora, no varias): son una forma de <b>sobrevivir</b>.</p>" +
    "<h5>Formas y agrupaciones</h5>" +
    tabla(["Forma", "Nombre", "Ejemplo"], [
      ["esférica", "<b>coco</b> (diplococos, estreptococos en cadena, estafilococos en racimo)", "<i>Staphylococcus aureus</i>, <i>Streptococcus pyogenes</i>"],
      ["alargada (cilindro)", "<b>bacilo</b>", "<i>Escherichia coli</i>, <i>Bacillus anthracis</i>"],
      ["curvada en coma", "<b>vibrio</b>", "<i>Vibrio cholerae</i> (cólera)"],
      ["en hélice", "<b>espirilo</b> / espiroqueta", "<i>Treponema pallidum</i> (sífilis)"]
    ], "q3t") +
    "<h5>La tinción de Gram: qué ocurre y por qué importa</h5>" +
    "<p>Hans Christian Gram (1884) ideó una tinción que sigue usándose cada día en los hospitales para clasificar bacterias. Se tiñe con <b>cristal violeta</b>, se fija con <b>lugol</b> (yodo), se lava con <b>alcohol-acetona</b> y se contrasta con <b>safranina</b> (rosa). El resultado depende de la pared:</p>" +
    tabla(["", "Gram positiva (violeta)", "Gram negativa (rosa)"], [
      ["Pared", "<b>capa gruesa</b> de peptidoglucano (con ácidos teicoicos)", "capa <b>fina</b> de peptidoglucano + <b>membrana externa</b> con lipopolisacárido (LPS)"],
      ["Con el alcohol", "la pared se deshidrata y atrapa el colorante: <b>se queda violeta</b>", "el alcohol disuelve la membrana externa y el colorante sale: se tiñe luego de <b>rosa</b>"],
      ["Ejemplos", "<i>Staphylococcus</i>, <i>Streptococcus</i>, <i>Bacillus</i>, <i>Clostridium</i>", "<i>E. coli</i>, <i>Salmonella</i>, <i>Vibrio</i>, <i>Pseudomonas</i>"],
      ["Antibióticos", "más sensibles a la <b>penicilina</b> (que impide formar el peptidoglucano)", "más resistentes (la membrana externa frena la entrada); el LPS es una <b>endotoxina</b> que causa fiebre"]
    ], "q3t") +
    "<p>La <b>penicilina</b> (Fleming, 1928) no deja que se formen los enlaces del peptidoglucano: la bacteria que se divide queda con la pared incompleta y revienta por ósmosis (lo que viste en el Tema 1 con la hemólisis). Por eso solo actúa sobre bacterias en crecimiento y no daña células humanas, que <b>no tienen pared</b>. La <b>lisozima</b>, una enzima que hay en las lágrimas, la saliva y la clara de huevo, rompe el peptidoglucano: es una defensa natural.</p>" +
    ojo("La pared bacteriana <b>no es de celulosa</b> (es de peptidoglucano), y las arqueas ni siquiera tienen peptidoglucano. Y «Gram negativa» no significa «sin pared»: tiene una pared <b>más fina</b> pero protegida por una membrana externa extra.") +
    w("emparejar", "estructuras"));

  // ---------------------------------------------------------------- 4. Hongos, algas y protozoos
  secciones[3] = env(
    "<h5>Hongos microscópicos: levaduras y mohos</h5>" +
    "<p>Los hongos son <b>eucariotas heterótrofos por absorción</b>: segregan enzimas digestivas al exterior (digestión extracelular) y absorben los nutrientes ya digeridos. Su pared es de <b>quitina</b> (el mismo polisacárido que el exoesqueleto de los insectos) y almacenan <b>glucógeno</b>, igual que los animales. Los microscópicos son de dos tipos:</p>" +
    tabla(["", "Levaduras", "Mohos"], [
      ["Organización", "<b>unicelulares</b> ovaladas", "<b>pluricelulares</b> filamentosos: hifas que forman un micelio"],
      ["Reproducción", "<b>gemación</b> (una yema crece y se separa) y esporas", "esporas (asexuales y sexuales) que se dispersan por el aire"],
      ["Ejemplos", "<i>Saccharomyces cerevisiae</i> (pan, vino, cerveza); <i>Candida albicans</i> (candidiasis)", "<i>Penicillium</i> (penicilina, queso azul), <i>Aspergillus</i>, <i>Rhizopus</i> (moho del pan)"],
      ["Importancia", "fermentación alcohólica; algunas, patógenas", "antibióticos, quesos, descomposición; algunos producen <b>toxinas</b> (aflatoxinas en cereales)"]
    ], "q3t") +
    "<p>Las infecciones por hongos se llaman <b>micosis</b>: pie de atleta (<i>Trichophyton</i>), candidiasis (<i>Candida</i>)… Cuestan de tratar porque, al ser eucariotas, sus células se parecen a las nuestras y hay pocos fármacos que los ataquen sin dañarnos. Los <b>líquenes</b> son una simbiosis entre un hongo y un alga o una cianobacteria: el hongo protege y absorbe agua; el alga fabrica alimento por fotosíntesis.</p>" +
    "<h5>Algas microscópicas</h5>" +
    "<p>Forman gran parte del <b>fitoplancton</b>. Son autótrofas fotosintéticas (Tema 9) y producen, aproximadamente, la mitad del oxígeno que respiramos y la base de casi todas las cadenas tróficas marinas. Ejemplos: <b>diatomeas</b> (caparazón de sílice, el «frústulo»), <b>dinoflagelados</b> (algunos producen las «mareas rojas» con toxinas) y <b>euglenas</b>, que son a la vez fotosintéticas y capaces de comer.</p>" +
    "<h5>Protozoos: los «animales» unicelulares</h5>" +
    "<p>Son eucariotas <b>unicelulares heterótrofos</b>, normalmente por ingestión (fagocitosis) y con orgánulos propios, como la <b>vacuola pulsátil</b> que expulsa el exceso de agua (el Tema 1 ya te dio la razón: viven en medios hipotónicos). Se clasifican por cómo se mueven:</p>" +
    tabla(["Grupo", "Cómo se mueve", "Ejemplos y enfermedades"], [
      ["<b>Rizópodos</b>", "pseudópodos", "<i>Amoeba</i>; <i>Entamoeba histolytica</i> (disentería amebiana)"],
      ["<b>Flagelados</b>", "uno o más flagelos", "<i>Trypanosoma</i> (enfermedad del sueño y de Chagas), <i>Giardia</i>, <i>Leishmania</i>"],
      ["<b>Ciliados</b>", "cilios", "<i>Paramecium</i> (con dos núcleos); casi ninguno es patógeno"],
      ["<b>Esporozoos</b>", "no se mueven en la fase adulta; forman esporas", "<i>Plasmodium</i> (paludismo o malaria, transmitido por el mosquito <i>Anopheles</i>), <i>Toxoplasma</i>"]
    ], "q3t") +
    "<p>El paludismo (malaria) es la gran enfermedad por protozoos: lo transmite la hembra del mosquito <i>Anopheles</i> y causa más de medio millón de muertes al año. Es una enfermedad <b>de vector</b>: el parásito necesita dos huéspedes, el humano y el mosquito.</p>" +
    ojo("Los protozoos <b>no son bacterias</b> ni «animales pequeños»: son células eucariotas. Y las <b>algas microscópicas no se confunden con las plantas</b>: no tienen raíces, tallos ni hojas. Para el examen, la clave es cómo se alimenta cada grupo: hongos = absorción, algas = fotosíntesis, protozoos = ingestión.") +
    w("clasificar", "euca"));

  // ---------------------------------------------------------------- 5. Importancia ecológica
  secciones[4] = env(
    "<h5>Papel ecológico: sin microbios no hay ecosistemas</h5>" +
    "<p>Los microorganismos son los motores silenciosos de la biosfera. Hacen tres cosas que ningún otro grupo puede hacer a su escala: <b>reciclar</b> la materia muerta, <b>transformar</b> los elementos (sobre todo el nitrógeno) y <b>vivir juntos</b> con otros seres en simbiosis.</p>" +
    "<p><b>Descomponedores.</b> Bacterias y hongos degradan cadáveres, hojarasca y excrementos y devuelven C, N, P y otros elementos al suelo y al aire en forma inorgánica. Sin ellos, la materia se acumularía y los productores se quedarían sin nutrientes.</p>" +
    "<p><b>El ciclo del nitrógeno.</b> Las plantas necesitan nitrógeno como <b>nitrato</b> (NO<sub>3</sub><sup>−</sup>) o amonio (NH<sub>4</sub><sup>+</sup>), pero el 78 % del aire es N<sub>2</sub>, un gas inerte que ellas no pueden usar. Cuatro grupos de bacterias lo hacen circular:</p>" +
    tabla(["Proceso", "Qué ocurre", "Bacterias (ejemplos)"], [
      ["<b>Fijación</b>", "N<sub>2</sub> → NH<sub>3</sub>/NH<sub>4</sub><sup>+</sup>", "<i>Rhizobium</i> (en nódulos de leguminosas: lentejas, alfalfa, soja), <i>Azotobacter</i> y cianobacterias"],
      ["<b>Amonificación</b>", "materia orgánica → NH<sub>4</sub><sup>+</sup>", "bacterias y hongos descomponedores"],
      ["<b>Nitrificación</b>", "NH<sub>4</sub><sup>+</sup> → NO<sub>2</sub><sup>−</sup> → NO<sub>3</sub><sup>−</sup>", "<i>Nitrosomonas</i> (a nitrito) y <i>Nitrobacter</i> (a nitrato): quimioautótrofas"],
      ["<b>Desnitrificación</b>", "NO<sub>3</sub><sup>−</sup> → N<sub>2</sub> (vuelve al aire)", "<i>Pseudomonas denitrificans</i>, en suelos sin oxígeno"]
    ], "q3t") +
    "<p>Por eso los agricultores han rotado cultivos con leguminosas desde la antigüedad: el <i>Rhizobium</i> de sus raíces deja nitrógeno en el suelo.</p>" +
    "<p><b>Simbiosis.</b> En tu intestino viven unos 40 billones de bacterias (microbiota): ayudan a digerir, fabrican vitamina K y compiten con los patógenos. Los rumiantes digieren la celulosa gracias a los microorganismos de su rumen. Las <b>micorrizas</b> son simbiosis de hongos y raíces de plantas: el hongo capta agua y fosfato y la planta le da azúcares. Y los <b>líquenes</b> (hongo + alga) colonizan rocas desnudas.</p>" +
    "<p><b>Productores y pioneros.</b> Las cianobacterias inventaron la fotosíntesis oxigénica hace más de 2400 millones de años y cambiaron la atmósfera; hoy el fitoplancton sigue siendo esencial. Los <b>extremófilos</b> viven donde nada más puede: de una bacteria de fuentes termales (<i>Thermus aquaticus</i>) procede la <b>Taq polimerasa</b> de la PCR, una enzima que resiste las altas temperaturas de cada ciclo (Tema 13).</p>" +
    ojo("«Fijar nitrógeno» no es «absorberlo»: es <b>convertir el N<sub>2</sub> del aire en amonio</b>, y solo lo hacen algunos procariotas. Las plantas no fijan nitrógeno: lo absorben del suelo ya fijado. Y la <b>desnitrificación</b> pierde nitrógeno del suelo hacia la atmósfera, no lo añade.") +
    w("orden", "ordennitro"));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  // ---- 6. Nutrición
  nuevas.push({ h: "6. Nutrición y condiciones de vida de las bacterias", html: env(
    "<h5>Cuatro preguntas para clasificar cualquier nutrición</h5>" +
    "<p>Las bacterias son los organismos metabólicamente más variados de la Tierra. Para no perderte, pregúntate dos cosas: <b>¿de dónde saca la energía?</b> (luz: <i>foto-</i>; reacciones químicas: <i>quimio-</i>) y <b>¿de dónde saca el carbono?</b> (del CO<sub>2</sub>: <i>autótrofa</i>; de moléculas orgánicas ya hechas: <i>heterótrofa</i>). Combinándolas salen cuatro tipos:</p>" +
    tabla(["Tipo", "Energía", "Carbono", "Ejemplos"], [
      ["<b>Fotoautótrofas</b>", "luz", "CO<sub>2</sub>", "<b>cianobacterias</b> (fotosíntesis con H<sub>2</sub>O que libera O<sub>2</sub>); bacterias purpúreas y verdes del azufre (usan H<sub>2</sub>S y no liberan O<sub>2</sub>)"],
      ["<b>Fotoheterótrofas</b>", "luz", "moléculas orgánicas", "bacterias purpúreas no sulfúreas"],
      ["<b>Quimioautótrofas</b> (quimiolitótrofas)", "oxidar sustancias inorgánicas (NH<sub>4</sub><sup>+</sup>, NO<sub>2</sub><sup>−</sup>, H<sub>2</sub>S, Fe<sup>2+</sup>)", "CO<sub>2</sub>", "<i>Nitrosomonas</i> y <i>Nitrobacter</i> (nitrificantes), bacterias del azufre y del hierro"],
      ["<b>Quimioheterótrofas</b> (quimioorganótrofas)", "oxidar moléculas orgánicas", "moléculas orgánicas", "la <b>mayoría</b>: <i>E. coli</i>, <i>Lactobacillus</i>, <i>Bacillus</i>…"]
    ], "q3t") +
    "<p>Las quimioheterótrofas se subdividen según de dónde toman la materia orgánica: <b>saprófitas</b> (de organismos muertos: descomponedoras), <b>parásitas</b> (de un huésped al que perjudican: patógenas) y <b>simbiontes</b> (conviven con beneficio mutuo, como las del intestino). Las <b>quimioautótrofas</b> son las únicas que obtienen energía de lo inorgánico sin luz: de ellas dependen ecosistemas enteros en el fondo del mar, junto a las chimeneas hidrotermales, donde nunca llega la luz.</p>" +
    "<h5>Con oxígeno, sin oxígeno o las dos cosas</h5>" +
    tabla(["Grupo", "Relación con el O<sub>2</sub>", "Ejemplos"], [
      ["<b>Aerobias estrictas</b>", "necesitan O<sub>2</sub> (respiración aerobia)", "<i>Mycobacterium tuberculosis</i>, <i>Pseudomonas</i>"],
      ["<b>Anaerobias estrictas</b>", "el O<sub>2</sub> les es <b>tóxico</b>; obtienen energía por fermentación o respiración anaerobia", "<i>Clostridium tetani</i> (tétanos), <i>C. botulinum</i> (botulismo), metanógenas"],
      ["<b>Anaerobias facultativas</b>", "usan O<sub>2</sub> si hay, y si no, fermentan", "<i>E. coli</i>, levaduras, <i>Staphylococcus</i>"],
      ["<b>Microaerófilas</b>", "necesitan O<sub>2</sub>, pero poco", "<i>Helicobacter pylori</i> (úlcera de estómago)"]
    ], "q3t") +
    "<p>Por eso el <b>botulismo</b> aparece en conservas caseras mal esterilizadas: dentro de un bote cerrado no hay oxígeno y las esporas de <i>C. botulinum</i> germinan y producen una toxina muy potente. Y el tétanos se da en heridas profundas y sucias, sin oxígeno.</p>" +
    "<h5>La temperatura manda</h5>" +
    tabla(["Grupo", "Temperatura óptima", "Ejemplos"], [
      ["Psicrófilas", "por debajo de ≈ 20 °C", "bacterias de los glaciares y del frigorífico (<i>Listeria</i> crece incluso a 4 °C)"],
      ["<b>Mesófilas</b>", "20–45 °C", "<i>E. coli</i> (37 °C) y casi todos los patógenos humanos"],
      ["Termófilas", "45–80 °C", "<i>Thermus aquaticus</i> (≈ 70 °C)"],
      ["Hipertermófilas", "más de 80 °C", "arqueas de fuentes hidrotermales"]
    ], "q3t") +
    "<p>De ahí la conservación de alimentos: el <b>frío</b> frena el crecimiento (no mata), el <b>calor</b> lo destruye, la <b>sal y el azúcar</b> deshidratan a las bacterias por ósmosis (medio hipertónico, Tema 1) y los <b>ácidos</b> (vinagre) bajan el pH. Los alimentos en conserva son todas variaciones de ese principio.</p>" +
    ojo("«Anaerobio» no significa «que vive solo de la fermentación»: hay anaerobios que respiran con nitrato o sulfato en vez de O<sub>2</sub>. Y «autótrofa» no significa «fotosintética»: las quimioautótrofas no usan luz.") +
    w("clasificar", "nutricion")) });

  // ---- 7. Reproducción y variabilidad
  nuevas.push({ h: "7. Reproducción y variabilidad genética en bacterias", html: env(
    "<h5>Bipartición: copiar, alargar y dividir</h5>" +
    "<p>Las bacterias se reproducen por <b>bipartición</b> (fisión binaria), un proceso asexual:</p>" +
    "<ol><li>El cromosoma circular se <b>replica</b> a partir de un único origen y las dos copias se separan hacia los extremos.</li>" +
    "<li>La célula se <b>alarga</b>.</li>" +
    "<li>Se forma un tabique (<b>septo</b>) de membrana y pared en el centro.</li>" +
    "<li>El septo separa la célula en <b>dos células hijas</b> genéticamente idénticas: un clon.</li></ol>" +
    "<p>El tiempo que tarda una población en duplicarse se llama <b>tiempo de generación (g)</b>. Varía muchísimo: ≈ 20 minutos en <i>E. coli</i> en condiciones óptimas; ≈ 15–20 horas en <i>Mycobacterium tuberculosis</i> (por eso el tratamiento de la tuberculosis dura meses). Con una división binaria sin límite de alimento, de una bacteria saldrían 2<sup>72</sup> ≈ 4,7 · 10<sup>21</sup> en un día (72 generaciones de 20 min): es una cifra teórica, porque el alimento se acaba mucho antes.</p>" +
    "<h5>Si se clonan, ¿de dónde sale la variabilidad?</h5>" +
    "<p>De dos fuentes: las <b>mutaciones</b> (errores al copiar el ADN: raras en una célula, pero con millones de células surgen constantemente) y la <b>parasexualidad</b>: formas de <b>intercambiar ADN</b> entre bacterias <b>sin que aumente el número de células</b>. Por eso no son reproducción: no crea individuos nuevos, solo recombina genes. Son tres:</p>" +
    tabla(["Mecanismo", "Cómo ocurre", "Qué se transfiere", "Experimento histórico"], [
      ["<b>Conjugación</b>", "contacto directo entre dos bacterias por un <b>pilus sexual</b>", "una copia de un <b>plásmido</b> (el F, o los de resistencia); si el F está integrado en el cromosoma (Hfr), también parte del cromosoma", "Lederberg y Tatum, 1946 (<i>E. coli</i>)"],
      ["<b>Transformación</b>", "la bacteria <b>capta ADN desnudo</b> del medio (de bacterias muertas)", "fragmentos de ADN libre", "Griffith, 1928 (neumococos); Avery, 1944 (era ADN)"],
      ["<b>Transducción</b>", "un <b>bacteriófago</b> pasa ADN bacteriano de una a otra", "un trozo del cromosoma de la bacteria anterior, empaquetado por error en una cápsida", "Zinder y Lederberg, 1952 (<i>Salmonella</i>)"]
    ], "q3t") +
    "<p><b>Griffith, 1928</b> (el experimento clásico): los neumococos de cepa <b>S</b> (con cápsula) matan a los ratones; los de cepa <b>R</b> (sin cápsula) no. Las S muertas por calor tampoco. Pero <b>S muertas + R vivas</b> sí mataban al ratón, y de su sangre se aislaban bacterias S vivas: las R habían incorporado algo de las S muertas y se habían transformado. Años después, Avery demostró que ese «principio transformante» era <b>ADN</b>.</p>" +
    "<p>Importancia práctica: los <b>plásmidos R</b> llevan genes de <b>resistencia a antibióticos</b> y pasan por conjugación entre bacterias incluso de especies distintas. Así se extienden las resistencias: es una transferencia <b>horizontal</b> (entre individuos de la misma generación), no vertical (de padres a hijos).</p>" +
    ojo("Conjugación, transformación y transducción <b>no son reproducción</b>: antes y después hay las mismas bacterias, solo que con genes distintos. En la <b>conjugación</b> no se transfiere un cromosoma entero ni se fusionan las células; pasa un plásmido (o parte del cromosoma) por el pilus.") +
    w("emparejar", "parasex")) });

  // ---- 8. Crecimiento y cálculos
  nuevas.push({ h: "8. Curva de crecimiento y problemas de generaciones", html: env(
    "<h5>Las cuatro fases de un cultivo cerrado</h5>" +
    "<p>Si siembras unas pocas bacterias en un medio líquido con nutrientes y no añades nada más (un <b>cultivo cerrado</b>), la población sigue una curva con cuatro fases. Se dibuja casi siempre con el <b>logaritmo</b> del número de células en el eje vertical, porque así la fase exponencial se ve como una recta.</p>" +
    tabla(["Fase", "Qué ocurre", "Por qué", "En la gráfica (log N)"], [
      ["<b>1. Latencia</b>", "no aumenta el número de células, pero sí su tamaño y su actividad", "la bacteria se <b>adapta</b> al medio nuevo: sintetiza enzimas y ribosomas", "horizontal"],
      ["<b>2. Exponencial</b>", "la población se duplica cada generación (g constante)", "hay <b>nutrientes en abundancia</b> y pocos residuos", "<b>recta ascendente</b>, la de mayor pendiente"],
      ["<b>3. Estacionaria</b>", "el número de células vivas es constante", "se agotan los nutrientes y se acumulan residuos tóxicos: <b>nacen tantas como mueren</b>", "horizontal (máximo)"],
      ["<b>4. Declive (muerte)</b>", "el número de células vivas baja", "mueren más de las que nacen (sin alimento, tóxicos)", "descendente"]
    ], "q3t") +
    "<p>Dos detalles que suelen caer: (1) en la fase estacionaria las bacterias fabrican <b>metabolitos secundarios</b>, como los <b>antibióticos</b>, y forman <b>esporas</b>; (2) en un <b>cultivo continuo</b> (quimiostato) se añade medio fresco y se retira el viejo, de modo que se puede mantener la fase exponencial mucho tiempo.</p>" +
    w("bio_crecimiento") +
    "<h5>Las fórmulas del tema (en la fase exponencial)</h5>" +
    "<div class='formula-wrap'><div class='formula'>n = t / g &nbsp;&nbsp;·&nbsp;&nbsp; N = N<sub>0</sub> · 2<sup>n</sup> &nbsp;&nbsp;·&nbsp;&nbsp; n = (log N − log N<sub>0</sub>) / log 2 ≈ 3,32 · (log N − log N<sub>0</sub>)</div></div>" +
    "<p><b>n</b> es el número de generaciones (divisiones), <b>t</b> el tiempo de crecimiento <b>exponencial</b> (sin contar la latencia), <b>g</b> el tiempo de generación, <b>N<sub>0</sub></b> el número inicial y <b>N</b> el final. Cada generación multiplica por 2; n generaciones, por 2<sup>n</sup>.</p>" +
    ejemplo("Cuántas bacterias hay después de un rato", "Una bacteria <i>E. coli</i> con g = 20 min crece sin límite durante 3 horas. ¿Cuántas habrá?", [
      "t = 3 h = 180 min; n = t / g = 180 / 20 = <b>9 generaciones</b>.",
      "N = N<sub>0</sub> · 2<sup>n</sup> = 1 · 2<sup>9</sup> = <b>512 bacterias</b>.",
      "Comprueba por duplicaciones: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 (nueve duplicaciones)."
    ]) +
    ejemplo("Cuánto tiempo tarda en alcanzar una cifra", "Un cultivo en fase exponencial tiene 10<sup>3</sup> bacterias/mL y g = 30 min. ¿Cuánto tarda en llegar a 10<sup>9</sup> bacterias/mL?", [
      "n = (log 10<sup>9</sup> − log 10<sup>3</sup>) / log 2 = (9 − 3) / 0,301 = <b>19,9 generaciones</b> (≈ 20).",
      "t = n · g = 19,9 · 30 min ≈ 598 min ≈ <b>10 horas</b>.",
      "Si el enunciado dice «tras la fase de latencia», no sumes ni restes nada; si da la latencia, suma esas horas."
    ]) +
    ejemplo("Calcular el tiempo de generación", "Un cultivo pasa de 5 · 10<sup>3</sup> a 3,2 · 10<sup>5</sup> bacterias/mL en 3 horas de crecimiento exponencial. Calcula g.", [
      "Cociente N / N<sub>0</sub> = 3,2 · 10<sup>5</sup> / 5 · 10<sup>3</sup> = 64 = 2<sup>6</sup> → <b>n = 6</b>.",
      "g = t / n = 180 min / 6 = <b>30 min</b>."
    ]) +
    "<h5>Cómo se cuentan las bacterias</h5>" +
    "<p>Un <b>recuento total</b> (cámara de Neubauer al microscopio) cuenta vivas y muertas. Un <b>recuento de viables</b> cuenta solo las que se dividen: se hacen <b>diluciones seriadas</b> (1 mL en 9 mL de agua estéril: cada paso divide por 10), se siembra una cantidad en una placa y cada célula viva forma una <b>colonia</b>. Se miden en <b>UFC</b> (unidades formadoras de colonia) por mL. Solo valen las placas con <b>30–300 colonias</b>: menos es poco fiable y más, imposibles de contar. También se mide la <b>turbidez</b> (absorbancia): cuanto más turbio, más bacterias (pero cuenta vivas y muertas).</p>" +
    ejemplo("Recuento por colonias", "Se siembran 0,1 mL de una dilución 10<sup>−5</sup> y salen 45 colonias. ¿Cuántas UFC/mL tenía el cultivo original?", [
      "45 colonias en 0,1 mL → 450 UFC/mL en la dilución.",
      "Se deshace la dilución: 450 · 10<sup>5</sup> = <b>4,5 · 10<sup>7</sup> UFC/mL</b>.",
      "Se cuentan colonias porque cada una procede de <b>una sola bacteria viva</b>."
    ]) +
    ojo("La fórmula N = N<sub>0</sub> · 2<sup>n</sup> solo vale en la <b>fase exponencial</b>. Y la <b>latencia</b> no cuenta como tiempo de crecimiento. No confundas «número de generaciones» (n, adimensional) con «tiempo de generación» (g, minutos).") +
    w("emparejar", "fases")) });

  // ---- 9. Retrovirus, viroides y priones
  nuevas.push({ h: "9. Retrovirus, viroides y priones", html: env(
    "<h5>Retrovirus: el ARN que se copia en ADN</h5>" +
    "<p>Los <b>retrovirus</b> (el más importante, el <b>VIH</b>) rompen la regla de que la información va de ADN a ARN (Tema 12): su genoma es <b>ARN monocatenario</b> (dos copias) y llevan una enzima, la <b>transcriptasa inversa</b>, que fabrica ADN a partir de ARN (Temin y Baltimore, 1970). El ciclo del VIH se resume en seis pasos:</p>" +
    "<ol><li><b>Adsorción y fusión:</b> las glucoproteínas de la envoltura (<b>gp120</b>) se unen a la proteína <b>CD4</b> de los <b>linfocitos T auxiliares</b>; la envoltura se funde con la membrana.</li>" +
    "<li><b>Entrada y decapsidación:</b> la cápsida libera el ARN y las enzimas.</li>" +
    "<li><b>Transcripción inversa:</b> ARN → ADN bicatenario.</li>" +
    "<li><b>Integración:</b> la <b>integrasa</b> mete el ADN vírico en el cromosoma de la célula: es el <b>provirus</b>, que ya nunca se va.</li>" +
    "<li><b>Transcripción y traducción:</b> la célula copia el provirus a ARN (genomas nuevos y ARNm) y fabrica las proteínas víricas.</li>" +
    "<li><b>Ensamblaje y gemación:</b> los virus se arman y salen brotando, con un trozo de membrana por envoltura.</li></ol>" +
    "<p>El VIH destruye los linfocitos T auxiliares, que coordinan la defensa del organismo, y deja a la persona sin defensas frente a infecciones oportunistas: es el <b>SIDA</b> (síndrome de inmunodeficiencia adquirida). Se transmite por sangre, por vía sexual y de madre a hijo; <b>no</b> por abrazos, besos o picaduras de mosquito. Los fármacos antirretrovirales actúan sobre sus enzimas propias (inhibidores de la transcriptasa inversa, de la integrasa y de la proteasa) y por eso afectan poco a las células humanas: se combinan en «terapia triple». No hay vacuna eficaz porque el virus <b>muta muchísimo</b> (la transcriptasa inversa comete muchos errores) y porque queda escondido como provirus.</p>" +
    ojo("Un retrovirus no es «un virus de ADN»: su genoma es ARN, y el paso a ADN lo hace la <b>transcriptasa inversa</b>. El provirus se parece al profago (ADN vírico integrado), pero el provirus está en una célula humana y el profago, en una bacteria.") +
    "<h5>Viroides y priones: más simples que un virus</h5>" +
    "<p><b>Viroides</b> (Diener, 1971; descubiertos en la patata): una molécula de <b>ARN circular monocatenario muy pequeña</b> (unos 250–400 nucleótidos), <b>sin cápsida</b> y que <b>no codifica ninguna proteína</b>. Solo infectan <b>plantas</b> (patata, tomate, cocotero: «cadang-cadang») y alteran su regulación génica usando las enzimas de la célula.</p>" +
    "<p><b>Priones</b> (Prusiner, 1982; Nobel 1997): agente infeccioso formado <b>solo por proteína</b>, sin ácido nucleico. Es una forma mal plegada de una proteína normal de las neuronas: la <b>PrP<sup>C</sup></b> (celular, con hélices α) se convierte en <b>PrP<sup>Sc</sup></b> (de <i>scrapie</i>, rica en láminas β), que agrega y a su vez <b>obliga a las normales a plegarse mal</b> (efecto dominó). Las neuronas mueren y el cerebro queda como una esponja: son las <b>encefalopatías espongiformes</b>: la tembladera o <i>scrapie</i> (ovejas), la <b>«enfermedad de las vacas locas»</b> (EEB, Reino Unido, 1986), la <b>enfermedad de Creutzfeldt-Jakob</b> y el <b>kuru</b> de Papúa Nueva Guinea (por canibalismo ritual). Resisten el calor, la radiación y los desinfectantes habituales, y no existe tratamiento.</p>" +
    tabla(["", "Virus", "Viroide", "Prión"], [
      ["Material genético", "ADN o ARN", "ARN circular desnudo", "<b>ninguno</b>"],
      ["Proteína", "cápsida (y enzimas)", "<b>ninguna</b>", "es la propia proteína mal plegada"],
      ["Huésped", "bacterias, animales, plantas…", "solo plantas", "mamíferos"],
      ["Ejemplo", "gripe, VIH, fagos", "viroide de la patata", "vacas locas, Creutzfeldt-Jakob"]
    ], "q3t") +
    w("clasificar", "acelulares")) });

  // ---- 10. Enfermedades y control
  nuevas.push({ h: "10. Enfermedades infecciosas y su control", html: env(
    "<h5>Infección, enfermedad y virulencia</h5>" +
    "<p>Un <b>patógeno</b> es un microorganismo capaz de producir enfermedad. <b>Infección</b> es la entrada y multiplicación del patógeno; <b>enfermedad</b> es el daño que causa (puede haber infección sin enfermedad: los <b>portadores asintomáticos</b>). La <b>virulencia</b> es la capacidad de causar daño. Los patógenos dañan por invasión de tejidos o por <b>toxinas</b>:</p>" +
    tabla(["", "Exotoxinas", "Endotoxinas"], [
      ["Qué son", "<b>proteínas</b> que la bacteria secreta", "<b>lipopolisacárido</b> (LPS) de la membrana externa de las Gram negativas"],
      ["Cuándo se liberan", "mientras la bacteria vive", "al romperse la bacteria"],
      ["Potencia", "muy potentes y específicas", "menos específicas (fiebre, shock)"],
      ["Ejemplos", "tétanos, botulismo, difteria, cólera", "<i>Salmonella</i>, <i>E. coli</i>"]
    ], "q3t") +
    "<h5>Quién produce qué: ejemplos que deben sonarte</h5>" +
    tabla(["Agente", "Enfermedad (microorganismo)", "Cómo se transmite"], [
      ["<b>Bacterias</b>", "tuberculosis (<i>M. tuberculosis</i>); cólera (<i>V. cholerae</i>); tétanos (<i>C. tetani</i>); salmonelosis (<i>Salmonella</i>); sífilis (<i>T. pallidum</i>); caries; neumonía", "aire, agua y alimentos, heridas, contacto sexual"],
      ["<b>Virus</b>", "gripe; sarampión; varicela; hepatitis; rabia; sida (VIH); covid-19 (SARS-CoV-2); VPH", "aire, sangre, contacto, vectores"],
      ["<b>Hongos</b>", "pie de atleta; candidiasis; tiña; aspergilosis", "contacto, esporas del aire"],
      ["<b>Protozoos</b>", "paludismo (<i>Plasmodium</i>); enfermedad del sueño; disentería amebiana", "<b>vectores</b> (mosquito, mosca tse-tsé), agua"],
      ["<b>Priones</b>", "Creutzfeldt-Jakob, vacas locas", "alimentos o trasplantes contaminados"]
    ], "q3t") +
    "<p>Cuando una enfermedad aparece en una zona de forma estable se dice <b>endémica</b>; un aumento brusco de casos en una región es una <b>epidemia</b>; y si cruza continentes, <b>pandemia</b>. Un <b>vector</b> (el mosquito en el paludismo) transmite el patógeno entre huéspedes; un <b>reservorio</b> es donde el patógeno vive entre brotes.</p>" +
    "<h5>Los postulados de Koch</h5>" +
    "<p>Robert Koch (1884) estableció cuatro condiciones para demostrar que un microbio causa una enfermedad: (1) el microorganismo está presente en <b>todos</b> los enfermos y no en los sanos; (2) se <b>aísla</b> y se cultiva en cultivo puro; (3) el cultivo puro <b>provoca la enfermedad</b> al inocularlo en un animal sano; (4) del animal enfermo se <b>vuelve a aislar</b> el mismo microorganismo. Tienen límites: los virus no crecen en medios inertes y los portadores asintomáticos incumplen el primero.</p>" +
    "<h5>Cómo se combate a los microbios</h5>" +
    tabla(["Técnica", "Qué consigue", "Sobre qué se usa", "Ejemplos"], [
      ["<b>Esterilización</b>", "elimina <b>toda</b> forma de vida, incluidas las esporas", "material de laboratorio y quirúrgico", "autoclave (121 °C, 15–20 min, vapor a presión), calor seco (160–180 °C), filtración, radiación"],
      ["<b>Desinfección</b>", "elimina o inactiva patógenos de <b>objetos y superficies</b>, pero no siempre las esporas", "suelos, mesas, utensilios", "lejía, alcohol"],
      ["<b>Antisepsia</b>", "desinfección de <b>tejidos vivos</b>", "piel, heridas", "povidona yodada, agua oxigenada, alcohol"],
      ["<b>Pasteurización</b>", "reduce los microorganismos y destruye patógenos <b>sin esterilizar</b>", "leche y zumos", "63 °C durante 30 min, o 72 °C durante 15 s; UHT: 135–150 °C unos segundos"]
    ], "q3t") +
    "<p>Los <b>antibióticos</b> son sustancias (naturales, producidas por hongos y bacterias, o sintéticas) que matan bacterias (<b>bactericidas</b>) o frenan su crecimiento (<b>bacteriostáticos</b>). Actúan sobre dianas que las células humanas <b>no tienen o tienen distintas</b> (toxicidad selectiva):</p>" +
    tabla(["Diana", "Antibiótico", "Efecto"], [
      ["pared de peptidoglucano", "<b>penicilina</b>, cefalosporinas", "bacteria reventada por ósmosis"],
      ["ribosomas 70S", "tetraciclina, estreptomicina, eritromicina", "no se fabrican proteínas"],
      ["replicación del ADN", "quinolonas", "no se copia el ADN"],
      ["membrana", "polimixinas", "se pierde el contenido"]
    ], "q3t") +
    "<p><b>Los antibióticos no sirven contra los virus</b>: no tienen pared, ni ribosomas propios, ni metabolismo; para ellos hay vacunas y antivirales. La <b>resistencia</b> aparece porque, en una población enorme, alguna bacteria tiene por azar una mutación (o un plásmido R) que la hace resistente; el antibiótico elimina a las sensibles, la resistente se multiplica y pasa a dominar: <b>selección natural</b> en directo. Cuanto más (y peor) se usan los antibióticos, más se seleccionan las resistentes. Por eso hay que tomar solo los recetados y <b>acabar el tratamiento</b>.</p>" +
    "<p>Para saber qué antibiótico usar se hace un <b>antibiograma</b>: se extiende la bacteria sobre una placa, se colocan discos con distintos antibióticos y se mide el <b>halo de inhibición</b> (la zona sin crecimiento alrededor del disco). <b>Halo grande = bacteria sensible</b>; sin halo = resistente.</p>" +
    "<h5>Vacunas y sueros</h5>" +
    "<p>Edward Jenner (1796) vacunó contra la viruela con virus de la viruela vacuna y Pasteur (1885) vacunó contra la rabia. Una <b>vacuna</b> contiene el antígeno (microbios muertos o atenuados, o fragmentos suyos) y hace que el cuerpo fabrique <b>anticuerpos y células de memoria</b>: inmunidad <b>activa</b>, lenta pero <b>duradera</b>. Un <b>suero</b> contiene <b>anticuerpos ya fabricados</b> (por ejemplo, el del tétanos o el antiofídico): inmunidad <b>pasiva</b>, inmediata pero <b>temporal</b>. Los detalles de la respuesta inmune están en el tema siguiente.</p>" +
    ojo("Esterilizar, desinfectar y pasteurizar <b>no son sinónimos</b>: solo la esterilización mata todo, esporas incluidas. La pasteurización de la leche <b>no la esteriliza</b> (por eso hay que refrigerarla). Y la vacuna no cura: <b>previene</b>; el suero sí actúa ya, pero dura poco.") +
    w("clasificar", "control")) });

  // ---- 11. Biotecnología e industria
  nuevas.push({ h: "11. Microorganismos en la biotecnología y en la industria", html: env(
    "<h5>Fermentaciones: la biotecnología más antigua</h5>" +
    "<p>La <b>biotecnología</b> usa organismos o partes de ellos para fabricar productos o resolver problemas. Lo hacemos desde hace miles de años con las <b>fermentaciones</b> (Tema 8), que son rutas anaerobias de obtener ATP:</p>" +
    tabla(["Fermentación", "Microorganismo", "Reacción resumida", "Productos"], [
      ["<b>Alcohólica</b>", "levaduras (<i>Saccharomyces</i>)", "glucosa → 2 etanol + 2 CO<sub>2</sub>", "vino, cerveza, sidra; el CO<sub>2</sub> hace subir la masa del pan"],
      ["<b>Láctica</b>", "bacterias lácticas (<i>Lactobacillus</i>, <i>Streptococcus thermophilus</i>)", "glucosa → 2 ácido láctico", "yogur, queso, chucrut, encurtidos"],
      ["<b>Acética</b>", "<i>Acetobacter</i> (aerobia)", "etanol + O<sub>2</sub> → ácido acético + H<sub>2</sub>O", "vinagre"]
    ], "q3t") +
    "<p>En el yogur, la leche pasteurizada se siembra con <i>Lactobacillus bulgaricus</i> y <i>Streptococcus thermophilus</i>: fermentan la lactosa a ácido láctico, el pH baja, las proteínas de la leche (caseínas) coagulan y las bacterias patógenas no pueden crecer. Los quesos azules llevan el moho <i>Penicillium roqueforti</i>. (La «fermentación» acética necesita oxígeno, así que en sentido estricto es una oxidación.)</p>" +
    "<h5>Del laboratorio a la industria</h5>" +
    "<p>En la industria se cultivan microorganismos en <b>biorreactores</b> (fermentadores) de miles de litros, donde se controlan la <b>esterilidad</b>, la temperatura, el pH, el oxígeno y la agitación. Un proceso típico: <b>cepa seleccionada</b> (o mejorada genéticamente) → inóculo → fermentador con el medio → producción → <b>recuperación y purificación</b> del producto. Se distinguen los <b>metabolitos primarios</b> (se producen en la fase exponencial: alcohol, ácido láctico) y los <b>secundarios</b> (en la estacionaria: antibióticos).</p>" +
    tabla(["Sector", "Aplicación", "Microorganismo"], [
      ["<b>Alimentación</b>", "pan, vino, cerveza, yogur, queso, vinagre, embutidos curados", "levaduras, bacterias lácticas, mohos"],
      ["<b>Salud</b>", "antibióticos; vacunas; vitaminas (B<sub>12</sub>); <b>insulina humana recombinante</b> (en E. coli, 1982: la primera proteína humana comercial fabricada así); hormona del crecimiento; vacuna de la hepatitis B (levadura)", "<i>Penicillium</i>, <i>Streptomyces</i>, <i>E. coli</i> y levaduras modificadas (Tema 13)"],
      ["<b>Medio ambiente</b>", "<b>depuración de aguas</b> (lodos activos y digestión anaerobia que produce <b>biogás</b>, rico en metano), <b>biorremediación</b> de vertidos de petróleo y metales, compostaje", "bacterias heterótrofas, arqueas metanógenas, <i>Pseudomonas</i>"],
      ["<b>Industria y minería</b>", "ácido cítrico, enzimas para detergentes, <b>bioplásticos</b>, <b>biolixiviación</b> del cobre", "<i>Aspergillus niger</i>, <i>Bacillus</i>, <i>Acidithiobacillus ferrooxidans</i>"],
      ["<b>Energía y agricultura</b>", "bioetanol y biodiésel, biofertilizantes (<i>Rhizobium</i>), biopesticidas (<i>Bacillus thuringiensis</i>, la proteína Bt)", "levaduras, bacterias, cianobacterias"]
    ], "q3t") +
    "<p>También hay riesgos y dilemas: resistencia a antibióticos, bioseguridad de laboratorios, escape de microorganismos modificados y uso militar (armas biológicas). La biotecnología moderna obliga a pensar en su <b>bioética</b>.</p>" +
    ojo("La fermentación <b>láctica</b> y la <b>alcohólica</b> las hacen microorganismos distintos y dan productos distintos; en las dos <b>se obtiene poca energía</b> (2 ATP por glucosa) y no hace falta oxígeno. La <b>levadura del pan</b> hace fermentación alcohólica: el pan no «sabe a alcohol» porque el etanol se evapora al hornear.") +
    w("emparejar", "industria")) });

  // ---- 12. Ejemplos PAU resueltos
  nuevas.push({ h: "12. Ejemplos PAU resueltos: interpretar gráficas y experimentos", html: env(
    ejemplo("Curva de crecimiento de un cultivo", "Un cultivo de bacterias se ha seguido durante 12 horas: t (h) / N (bacterias por mL): 0 h / 1000; 2 h / 1000; 4 h / 4000; 6 h / 16 000; 8 h / 16 000; 10 h / 16 000; 12 h / 4000. a) Identifica las fases. b) Calcula el tiempo de generación en la fase exponencial. c) Si el crecimiento exponencial hubiera continuado hasta las 12 h, ¿cuántas bacterias habría? ¿Por qué no ocurre?", [
      "<b>a)</b> 0–2 h: latencia (no aumenta N). 2–6 h: exponencial (N se multiplica por 4 en cada 2 h). 6–10 h: estacionaria (N constante). 10–12 h: declive (N baja).",
      "<b>b)</b> De 2 a 6 h: de 1000 a 16 000: cociente 16 = 2<sup>4</sup> → n = 4 generaciones en 4 h → g = 4 h / 4 = <b>1 h</b> (60 min). Comprobación: a las 4 h hay 2 generaciones: 1000 · 2<sup>2</sup> = 4000 ✓.",
      "<b>c)</b> De 2 h a 12 h son 10 h → n = 10 → N = 1000 · 2<sup>10</sup> = 1 024 000 ≈ <b>1 · 10<sup>6</sup></b>. No ocurre porque a partir de las 6 h se agotan los nutrientes y se acumulan residuos tóxicos: pasa a fase estacionaria y luego a declive."
    ]) +
    ejemplo("Hershey y Chase: ¿es el ADN o la proteína el material genético?", "Se cultivan fagos T2 en dos medios: unos con <sup>35</sup>S (que marca solo las proteínas, porque el ADN no tiene azufre) y otros con <sup>32</sup>P (que marca solo el ADN, porque las proteínas casi no tienen fósforo). Con cada tipo se infecta un cultivo de <i>E. coli</i>, se agita en una batidora para soltar lo que haya quedado fuera de las bacterias y se centrifuga (las bacterias quedan en el precipitado y los restos de los fagos en el sobrenadante). Resultado: con <sup>35</sup>S, la radiactividad está en el <b>sobrenadante</b>; con <sup>32</sup>P, en el <b>precipitado</b> (dentro de las bacterias). Interpreta.", [
      "El azufre marca la <b>proteína</b>; el fósforo marca el <b>ADN</b>.",
      "La radiactividad del <sup>35</sup>S queda fuera: la <b>proteína de la cápsida no entra</b> en la bacteria (son las cápsidas vacías).",
      "La del <sup>32</sup>P está dentro: lo que entra en la bacteria es el <b>ADN</b>, y con él se fabrican nuevos fagos con su proteína.",
      "Conclusión: el <b>ADN es el material genético</b> del fago (1952). Relaciona con la fase de <b>penetración</b> del ciclo lítico."
    ]) +
    ejemplo("Antibiograma", "Sobre una placa sembrada con una bacteria se colocan cuatro discos con antibióticos A, B, C y D. Tras 24 h, los halos de inhibición miden: A, 25 mm; B, 0 mm; C, 12 mm; D, 20 mm. a) ¿Qué antibiótico es más eficaz? b) ¿A cuál es resistente? c) ¿Por qué debe extenderse la bacteria de forma uniforme y por qué los discos deben tener la misma dosis?", [
      "<b>a)</b> El de <b>mayor halo</b>: A (25 mm), seguido de D (20 mm) y C (12 mm).",
      "<b>b)</b> Resistente a B: no hay halo, la bacteria crece pegada al disco.",
      "<b>c)</b> Para que los halos sean <b>comparables</b>: el único factor que cambia debe ser el antibiótico. Con distinta dosis o un césped irregular, un halo mayor podría deberse a otra causa."
    ])) });

  // ---- 13. Cómo se pregunta en la PAU
  nuevas.push({ h: "13. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Estas son las preguntas más habituales de este tema, con el tipo de respuesta que suma puntos: <b>definición exacta, esquema o lista ordenada, y un ejemplo</b>.</p>" +
    ejemplo("Pregunta 1. Explica el ciclo lítico de un bacteriófago", "Respuesta modelo:", [
      "Un <b>bacteriófago</b> es un virus que infecta bacterias. El <b>ciclo lítico</b> tiene cinco etapas.",
      "<b>Adsorción</b> (se une a receptores de la pared); <b>penetración</b> (inyecta su ADN y la cápsida vacía queda fuera); <b>síntesis</b> (el ADN vírico se replica y se fabrican proteínas con la maquinaria de la bacteria); <b>ensamblaje</b> de nuevos fagos; <b>lisis</b>: la bacteria estalla y libera los fagos.",
      "Resultado: la bacteria <b>muere</b> y salen decenas o cientos de virus nuevos."
    ]) +
    ejemplo("Pregunta 2. Diferencias entre ciclo lítico y lisogénico", "Respuesta modelo:", [
      "En el <b>lítico</b>, el ADN del virus se replica de inmediato, se forman virus y la célula muere por lisis.",
      "En el <b>lisogénico</b>, el ADN del virus se <b>integra</b> en el cromosoma (profago), la bacteria sigue viva y lo transmite a sus descendientes; no se fabrican virus hasta la <b>inducción</b> (UV, estrés), que lo pasa al ciclo lítico."
    ]) +
    ejemplo("Pregunta 3. Estructura de una bacteria y tinción de Gram", "Respuesta modelo:", [
      "Dibujo rotulado: <b>cápsula, pared celular (peptidoglucano), membrana plasmática, citoplasma con ribosomas 70S, nucleoide (cromosoma circular), plásmidos, flagelo y fimbrias</b>.",
      "Gram: las <b>positivas</b> tienen una pared gruesa de peptidoglucano que retiene el cristal violeta (se ven violeta); las <b>negativas</b> tienen pared fina y membrana externa, pierden el violeta con el alcohol y se ven rosadas con la safranina."
    ]) +
    ejemplo("Pregunta 4. ¿Qué es la parasexualidad en bacterias?", "Respuesta modelo:", [
      "Son procesos en los que una bacteria <b>recibe ADN de otra</b> sin que aumente el número de células: <b>conjugación</b> (por pilus, pasa un plásmido), <b>transformación</b> (capta ADN libre del medio) y <b>transducción</b> (lo transporta un fago).",
      "Aumentan la variabilidad y explican, por ejemplo, la propagación de la <b>resistencia a antibióticos</b>."
    ]) +
    ejemplo("Pregunta 5. Compara virus, viroides y priones", "Respuesta modelo:", [
      "<b>Virus:</b> ácido nucleico (ADN o ARN) dentro de una cápsida de proteína; parásito intracelular obligado.",
      "<b>Viroide:</b> solo un pequeño ARN circular, sin cápsida ni proteínas; infecta plantas.",
      "<b>Prión:</b> solo una proteína mal plegada, sin ácido nucleico; causa encefalopatías espongiformes (vacas locas)."
    ]) +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz14") + w("quiz", "errores") + w("tarjetas", "tarjetas14")) });

  B.parte.bio14a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
