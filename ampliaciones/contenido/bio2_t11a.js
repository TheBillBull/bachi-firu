/* ============================================================
   Biología II · ampliaciones · Tema 11: Base molecular de la herencia
   (parte A: teoría. Parte B, bio2_t11b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t11.js (bio_meselson, bio_horquilla, bio_telomeros).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Experimentos de Griffith, Avery y Hershey-Chase: qué se hizo, qué se observó y qué se concluyó → sección 1.
   2. Los tres modelos de replicación y el experimento de Meselson y Stahl (bandas del tubo por generación) → secciones 2 y 3 + widget bio_meselson.
   3. Fracciones de ADN híbrido y ligero tras n generaciones; nº de moléculas y de hebras originales → sección 3.
   4. Polaridad 5'→3', antiparalelismo, hebra adelantada y retrasada: dibujar e interpretar la horquilla → sección 4 + widget bio_horquilla.
   5. Enzimas y proteínas (helicasa, topoisomerasa, SSB, primasa, ADN pol III y I, ligasa) y por qué hace falta un cebador → sección 4 y 6.
   6. Diferencias procariotas/eucariotas (orígenes, velocidad, fragmentos, polimerasas, extremos) → sección 7.
   7. Corrección de pruebas y reparación (exonucleasa, MMR, BER, NER, UV y xeroderma) → sección 8.
   8. Problema del extremo, telómeros y telomerasa; envejecimiento y cáncer → sección 9 + widget bio_telomeros.
   9. Cálculos: tiempo de replicación, nº de orígenes, nº de fragmentos de Okazaki y cebadores, Chargaff → secciones 7 y 9 + ejercicios.
   10. Empaquetamiento: nucleosoma, histonas, cromatina y cromosoma → sección 5.
   Convenciones declaradas: fragmentos de Okazaki de 1000-2000 nt (procariotas; se usa 1500) y 100-200 nt (eucariotas; se usa 200);
   horquilla de unos 1000 nt/s (E. coli) y 50 nt/s (humana); errores 10⁻⁵ → 10⁻⁷ (corrección) → 10⁻⁹ (reparación de
   apareamientos); telómero de 10 000 nt que pierde 100 nt por división; densidades de CsCl 1,724 (¹⁵N) y 1,710 (¹⁴N) g/mL.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t11/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. ¿Cómo sabemos que el ADN es el material genético?
  secciones[0] = env(
    "<h5>Por qué se creía que eran las proteínas</h5>" +
    "<p>En 1869 Miescher aisló del núcleo de las células una sustancia rica en fósforo, la «nucleína» (el ADN). Pero hasta mediados del siglo XX casi nadie pensaba que fuese el material hereditario: las <b>proteínas</b> están hechas con <b>20 aminoácidos</b> distintos y pueden tener infinitas formas, mientras que el ADN solo tiene <b>4 bases</b> y parecía demasiado «aburrido» para guardar tanta información. Para demostrar que el ADN es el material genético había que probar dos cosas: que <b>lleva la información</b> y que <b>es lo que se transmite</b> de una célula a otra.</p>" +
    "<h5>Griffith (1928): el «principio transformante»</h5>" +
    "<p>Griffith trabajaba con el neumococo (<i>Streptococcus pneumoniae</i>), la bacteria de una de las neumonías. Tiene dos cepas: la <b>S</b> («smooth», colonias lisas, con <b>cápsula</b> de polisacárido, <b>virulenta</b>) y la <b>R</b> («rough», colonias rugosas, sin cápsula, <b>no virulenta</b>, porque el sistema inmunitario la destruye). Inyectó ratones y obtuvo esto:</p>" +
    tabla(["Inyección al ratón", "Resultado", "Qué indica"], [
      ["Cepa R viva", "el ratón sobrevive", "la R es inofensiva"],
      ["Cepa S viva", "el ratón muere", "la S es virulenta"],
      ["Cepa S muerta por calor", "el ratón sobrevive", "la S muerta ya no hace daño"],
      ["<b>R viva + S muerta por calor</b>", "<b>el ratón muere</b> y de su sangre se aíslan bacterias <b>S vivas</b>", "algo de la S muerta ha <b>transformado</b> a la R"]
    ], "q3t") +
    "<p>La última fila es la clave: las bacterias R habían adquirido, a partir de los restos de las S, la capacidad de fabricar cápsula, y además la <b>heredaban</b> (sus descendientes seguían siendo S). Griffith lo llamó <b>principio transformante</b>, pero no supo qué molécula era.</p>" +
    "<h5>Avery, MacLeod y McCarty (1944): el principio transformante es ADN</h5>" +
    "<p>Avery y su equipo hicieron un extracto de bacterias S muertas, lo purificaron y probaron qué pasaba si destruían cada tipo de molécula antes de mezclarlo con bacterias R vivas:</p>" +
    tabla(["Tratamiento del extracto de S", "¿Siguen apareciendo bacterias S?", "Conclusión"], [
      ["Proteasa (destruye proteínas)", "sí", "las proteínas no son"],
      ["ARNasa (destruye ARN)", "sí", "el ARN no es"],
      ["<b>ADNasa (destruye ADN)</b>", "<b>no</b>", "<b>el ADN es el principio transformante</b>"]
    ], "q3t") +
    "<p>Es un experimento de <b>eliminación</b>: se quita una sustancia cada vez y se mira cuál es imprescindible. Aun así, muchos científicos dudaron: «¿y si quedan restos de proteína?».</p>" +
    "<h5>Hershey y Chase (1952): marcar el ADN y las proteínas por separado</h5>" +
    "<p>Usaron el bacteriófago <b>T2</b>, un virus formado solo por <b>ADN</b> dentro de una cápside de <b>proteína</b>, que infecta a <i>E. coli</i>. La idea ingeniosa fue usar dos isótopos radiactivos: el <b>fósforo-32 (<sup>32</sup>P)</b>, que está en el ADN (cada nucleótido lleva un fosfato) y casi no está en las proteínas, y el <b>azufre-35 (<sup>35</sup>S)</b>, que está en algunas proteínas (cisteína y metionina) y no está en el ADN.</p>" +
    "<ol>" +
    "<li>Prepararon dos lotes de fagos: uno con el ADN marcado (<sup>32</sup>P) y otro con las proteínas marcadas (<sup>35</sup>S).</li>" +
    "<li>Dejaron que cada lote infectase bacterias.</li>" +
    "<li>Agitaron la mezcla en una batidora para soltar de la superficie de las bacterias lo que no hubiese entrado (las «cáscaras» de los virus).</li>" +
    "<li>Centrifugaron: las bacterias, más pesadas, forman el <b>sedimento</b>; las cáscaras de los virus se quedan en el líquido de arriba, el <b>sobrenadante</b>.</li>" +
    "</ol>" +
    tabla(["Lote", "Radiactividad en el sobrenadante (fuera)", "Radiactividad en el sedimento (dentro de las bacterias)"], [
      ["Proteínas con <sup>35</sup>S", "<b>la mayor parte</b>", "poca"],
      ["ADN con <sup>32</sup>P", "poca", "<b>la mayor parte</b>"]
    ], "q3t") +
    "<p>Además, los fagos nuevos que salían de las bacterias del lote de <sup>32</sup>P llevaban parte de ese fósforo marcado, pero casi nada de <sup>35</sup>S. Conclusión: <b>lo que entra en la bacteria y dirige la fabricación de nuevos virus es el ADN</b>; la proteína se queda fuera. Hershey recibió el Nobel en 1969.</p>" +
    ojo("«Hershey y Chase marcaron el ADN con azufre» es un error clásico. El orden fácil de recordar: <b>P de fósforo = ADN</b> (el ADN tiene fosfatos) y <b>S de azufre = proteínas</b>. Y no confundas los dos experimentos: Griffith y Avery trabajaron con <b>bacterias</b> (transformación); Hershey y Chase, con <b>virus</b>.") +
    "<h5>Otras pistas que apuntaban al ADN</h5>" +
    "<p>Chargaff (1950) vio que en el ADN de cualquier especie <b>A = T y G = C</b>, mientras que la proporción A+T frente a G+C cambia de una especie a otra (¡una «firma» de la especie!). Watson y Crick (1953), con las imágenes de difracción de rayos X de Franklin y Wilkins, propusieron la doble hélice: dos hebras complementarias, una buena forma de copiarse. Y una precisión útil: en algunos <b>virus</b> (como el de la gripe o el VIH) el material genético es <b>ARN</b>; lo que demostraron estos experimentos es que en los organismos celulares y en muchos virus es ADN, no que todo material genético lo sea.</p>" +
    tabla(["Año", "Quién", "Organismo", "Qué demostró"], [
      ["1928", "Griffith", "neumococo y ratón", "existe un «principio transformante» heredable"],
      ["1944", "Avery, MacLeod y McCarty", "neumococo", "el principio transformante es ADN (la ADNasa lo destruye)"],
      ["1950", "Chargaff", "ADN de varias especies", "A = T y G = C"],
      ["1952", "Hershey y Chase", "fago T2 y <i>E. coli</i>", "dentro de la bacteria entra el ADN (<sup>32</sup>P), no la proteína (<sup>35</sup>S)"],
      ["1953", "Watson y Crick", "modelo molecular", "doble hélice con bases complementarias"],
      ["1958", "Meselson y Stahl", "<i>E. coli</i> con <sup>15</sup>N y <sup>14</sup>N", "la replicación es semiconservativa"]
    ], "q3t") +
    "<p>Para repasar, empareja cada experimento con su resultado y ordena los pasos de Hershey y Chase:</p>" +
    w("emparejar", "experimentos") + w("orden", "ordenhc")
  );

  // ---------------------------------------------------------------- 2. Tres modelos
  secciones[1] = env(
    "<h5>Qué predice cada modelo</h5>" +
    "<p>Una buena hipótesis hace <b>predicciones</b> que se pueden comprobar. Para el ADN de una célula que se replica una sola vez, cada modelo predice algo distinto sobre las hebras de las dos moléculas hijas:</p>" +
    tabla(["", "Conservativo", "Semiconservativo", "Dispersivo"], [
      ["Moléculas hijas", "una vieja entera y una nueva entera", "las dos son híbridas", "las dos son mezcla"],
      ["Hebras de cada hija", "vieja+vieja ; nueva+nueva", "<b>vieja + nueva</b> (las dos)", "trozos viejos y nuevos mezclados en cada hebra"],
      ["¿Hebras originales intactas?", "sí (juntas)", "sí (separadas, una por molécula)", "no (se trocean)"]
    ], "q3t") +
    "<p>Watson y Crick ya habían insinuado en 1953 el modelo semiconservativo: «no se nos escapa que el apareamiento específico que hemos postulado sugiere un posible mecanismo de copia». Pero hacía falta una prueba experimental, y el reto era <b>distinguir ADN viejo de ADN nuevo</b>: ¡los dos son químicamente idénticos! Meselson y Stahl lo resolvieron con un truco de <b>densidad</b>.</p>" +
    ejemplo("Cuántas moléculas y cuántas hebras originales", "Una molécula de ADN se replica de forma semiconservativa n veces. ¿Cuántas moléculas hay? ¿Cuántas contienen alguna hebra de la molécula original?", [
      "Cada replicación duplica el número de moléculas: tras n replicaciones hay <b>2<sup>n</sup></b> moléculas (n = 3: 8; n = 4: 16).",
      "Las dos hebras originales nunca se destruyen: cada una se reparte en una molécula distinta y allí se queda para siempre.",
      "Por eso <b>solo 2 moléculas</b> conservan una hebra original (y cada una tiene una sola); las demás, 2<sup>n</sup> − 2, son enteramente nuevas. De las 2<sup>n+1</sup> hebras totales, solo 2 son originales."
    ])
  );

  // ---------------------------------------------------------------- 3. Meselson y Stahl
  secciones[2] = env(
    "<h5>Por qué funciona el truco de la densidad</h5>" +
    "<p>Los nucleótidos llevan nitrógeno (en las bases). El nitrógeno normal es el isótopo <b><sup>14</sup>N</b> («ligero»); existe otro isótopo estable, el <b><sup>15</sup>N</b>, que pesa un poco más («pesado»). Una bacteria que solo tenga <sup>15</sup>N para fabricar sus bases tendrá un ADN algo más denso, y esa pequeña diferencia se puede detectar con una <b>ultracentrifugación en gradiente de CsCl</b>: al girar a gran velocidad, la solución de cloruro de cesio forma un gradiente de densidad y cada molécula de ADN se queda <b>flotando en la zona donde su densidad coincide con la del líquido</b>, formando una banda. ADN pesado, banda más abajo; ADN ligero, banda más arriba; ADN híbrido, banda en medio.</p>" +
    "<h5>Predicciones por generación</h5>" +
    "<p>Se cultiva <i>E. coli</i> durante muchas generaciones en <sup>15</sup>N (todo su ADN es pesado, <b>generación 0</b>) y se pasa a un medio con <sup>14</sup>N. A partir de ahí, todo el ADN nuevo será ligero. Se extrae ADN tras cada generación (cada ~20 minutos, el tiempo que tarda <i>E. coli</i> en dividirse):</p>" +
    tabla(["Generación en <sup>14</sup>N", "Conservativo", "Semiconservativo", "Dispersivo"], [
      ["0", "una banda pesada", "una banda pesada", "una banda pesada"],
      ["1", "dos bandas: 50 % pesada + 50 % ligera", "<b>una banda intermedia (100 %)</b>", "una banda intermedia (100 %)"],
      ["2", "dos bandas: 25 % pesada + 75 % ligera", "<b>dos bandas: 50 % intermedia + 50 % ligera</b>", "una banda intermedia, más cerca de la ligera"],
      ["3", "12,5 % pesada + 87,5 % ligera", "25 % intermedia + 75 % ligera", "una banda aún más cerca de la ligera"]
    ], "q3t") +
    "<p><b>Lo que se observó:</b> en la generación 1, una única banda intermedia (descarta el conservativo); en la generación 2, dos bandas, intermedia y ligera, a partes iguales (descarta el dispersivo). Solo el semiconservativo cumple ambas observaciones. Esta es la lógica de un experimento ideal: <b>cada resultado elimina un modelo</b>. El experimento se publicó en 1958 y se ha llamado «el experimento más bello de la biología».</p>" +
    "<h5>La regla general (para los problemas)</h5>" +
    "<p>Tras <b>n</b> generaciones en <sup>14</sup>N, desde un ADN totalmente pesado, el modelo semiconservativo da 2<sup>n</sup> moléculas de las cuales <b>2 son híbridas</b> (una hebra <sup>15</sup>N original y una <sup>14</sup>N nueva) y 2<sup>n</sup> − 2 son ligeras. En fracciones: <b>2 / 2<sup>n</sup></b> híbridas y <b>1 − 2 / 2<sup>n</sup></b> ligeras. (n = 1: 100 % híbridas; n = 2: 50 % y 50 %; n = 3: 25 % y 75 %; n = 4: 12,5 % y 87,5 %.)</p>" +
    w("bio_meselson") +
    ejemplo("Un sentido más fino: ¿y si el cultivo hubiese continuado?", "Tras 4 generaciones en <sup>14</sup>N, ¿qué porcentaje del ADN es híbrido y qué porcentaje es ligero? ¿Cambia la posición de las bandas respecto a la generación 2?", [
      "n = 4 → 2<sup>4</sup> = 16 moléculas, de las cuales 2 híbridas y 14 ligeras.",
      "Híbridas: 2/16 = 12,5 %. Ligeras: 14/16 = 87,5 %.",
      "Las bandas siguen en las mismas dos posiciones (intermedia y ligera); lo que cambia es el <b>grosor</b>: cada vez más gruesa la ligera y más fina la intermedia."
    ]) +
    w("orden", "ordenmes") +
    ojo("Un error frecuente: pensar que «semiconservativo» significa que se conserva la mitad del ADN. Lo que se conserva es <b>una de las dos hebras</b> en cada molécula hija. Y cuidado con las generaciones: la generación 0 es el punto de partida (todo pesado), no la primera replicación.")
  );

  // ---------------------------------------------------------------- 4. Mecanismo molecular
  secciones[3] = env(
    "<h5>Tres reglas que explican casi todo</h5>" +
    "<p>Antes de los pasos, tres ideas que hay que tener claras (el resto del mecanismo es consecuencia de ellas):</p>" +
    "<ol>" +
    "<li><b>Las dos hebras son antiparalelas</b>: una va de 5′ a 3′ y la complementaria, de 3′ a 5′ (Tema 5).</li>" +
    "<li><b>La ADN polimerasa solo añade nucleótidos al extremo 3′-OH</b> de una cadena ya existente: construye siempre en sentido <b>5′ → 3′</b>. No puede ir al revés.</li>" +
    "<li><b>La ADN polimerasa no sabe empezar de cero</b>: necesita un <b>cebador</b> (una cadena corta que ya tenga un extremo 3′-OH libre al que añadir). En la célula, el cebador es un trocito de <b>ARN</b> de unos 10 nucleótidos que fabrica la <b>primasa</b>.</li>" +
    "</ol>" +
    "<h5>La horquilla de replicación paso a paso</h5>" +
    "<ol>" +
    "<li><b>Origen de replicación.</b> La replicación empieza en un punto concreto (ori), rico en A-T (solo dos puentes de hidrógeno: más fácil de abrir). Proteínas iniciadoras se unen allí.</li>" +
    "<li><b>La helicasa abre la hélice</b> rompiendo los puentes de hidrógeno (gastando ATP). Se forma una <b>burbuja</b> con <b>dos horquillas</b> que avanzan en sentidos opuestos: la replicación es <b>bidireccional</b>.</li>" +
    "<li><b>Se evita que se vuelva a cerrar y que se enrede.</b> Las proteínas <b>SSB</b> (de unión a ADN monocatenario) cubren las hebras separadas; la <b>topoisomerasa</b> corta y vuelve a unir el ADN delante de la horquilla para aliviar la tensión (como al separar las hebras de una cuerda retorcida, por delante se enrolla más).</li>" +
    "<li><b>La primasa</b> fabrica un cebador de ARN complementario a cada molde.</li>" +
    "<li><b>La ADN polimerasa</b> alarga el cebador añadiendo nucleótidos complementarios (A con T, G con C), usando como sustrato los desoxirribonucleótidos trifosfato (dNTP): la energía de los dos fosfatos que se liberan impulsa el enlace.</li>" +
    "<li><b>Hebra adelantada (conductora o continua).</b> En el molde que se lee en el sentido de avance de la horquilla, la polimerasa puede ir siempre detrás de la helicasa: basta <b>un solo cebador</b> y se sintetiza de forma <b>continua</b>.</li>" +
    "<li><b>Hebra retrasada (rezagada o discontinua).</b> En el otro molde, el sentido 5′ → 3′ queda <b>alejándose de la horquilla</b>. Cada vez que la horquilla abre un tramo nuevo, hay que poner otro cebador y sintetizar un trozo hacia atrás: son los <b>fragmentos de Okazaki</b> (Reiji Okazaki, 1968).</li>" +
    "<li><b>Maduración.</b> En procariotas, la <b>ADN polimerasa I</b> quita los cebadores de ARN y rellena el hueco con ADN; la <b>ADN ligasa</b> sella la última unión entre fragmentos con un enlace fosfodiéster. Resultado: dos moléculas de ADN hijas completas, cada una con una hebra vieja y otra nueva.</li>" +
    "</ol>" +
    ojo("La hebra retrasada <b>no se sintetiza «al revés»</b>: la polimerasa siempre trabaja de 5′ a 3′. Lo que ocurre es que, en esa hebra, el sentido 5′ → 3′ apunta en dirección contraria a la del avance de la horquilla, y por eso hay que hacerla en trozos. Y recuerda: <b>un cebador por fragmento</b>, así que hay muchos más cebadores en la retrasada que en la adelantada.") +
    w("bio_horquilla") +
    w("orden", "ordenhor") +
    "<h5>Cómo dibujar la horquilla en un examen</h5>" +
    "<p>Un esquema que siempre vale: dibuja el ADN parental a un lado y las dos hebras separándose en «Y» hacia el otro; marca <b>3′ y 5′</b> en cada extremo de cada hebra; dibuja la hebra nueva <b>continua con la flecha apuntando hacia la horquilla</b> (adelantada) y la otra en <b>trozos con flechas apuntando hacia fuera</b> (retrasada), con un cuadrito para cada cebador. Rotula helicasa (en el vértice), primasa, ADN polimerasa, ligasa y SSB. Una comprobación rápida: <b>todas las flechas de síntesis van de 5′ a 3′ y cada hebra nueva es antiparalela a su molde</b>.</p>" +
    ejemplo("Hebra complementaria y orientación", "La hebra molde es 3′-TACGGATC-5′. Escribe la hebra nueva e indica cómo se sintetiza.", [
      "Complementaria base a base: T→A, A→T, C→G, G→C, G→C, A→T, T→A, C→G: <b>ATGCCTAG</b>.",
      "Es antiparalela: si el molde va 3′ → 5′, la nueva va 5′ → 3′: <b>5′-ATGCCTAG-3′</b>.",
      "La polimerasa añade los nucleótidos al extremo 3′ de la nueva, así que la va construyendo de izquierda a derecha en este dibujo."
    ])
  );

  // ---------------------------------------------------------------- 5. Empaquetamiento
  secciones[4] = env(
    "<h5>Los niveles del empaquetamiento</h5>" +
    "<p>Cada nivel reduce la longitud y hace al ADN manejable:</p>" +
    tabla(["Nivel", "Qué es", "Dato clave"], [
      ["Doble hélice", "ADN desnudo", "diámetro ≈ 2 nm"],
      ["<b>Nucleosoma</b>", "≈ 147 pares de bases enrolladas casi 2 vueltas sobre un <b>octámero de histonas</b> (2 H2A, 2 H2B, 2 H3, 2 H4)", "«collar de cuentas»; ≈ 10 nm"],
      ["Fibra de cromatina", "nucleosomas plegados sobre sí mismos con ayuda de la histona <b>H1</b>", "≈ 30 nm"],
      ["Bucles y dominios", "la fibra se pliega en lazos anclados a un andamiaje de proteínas", "—"],
      ["<b>Cromosoma metafásico</b>", "máxima condensación", "visible al microscopio en división"]
    ], "q3t") +
    "<p>Las histonas son proteínas <b>básicas</b> (ricas en lisina y arginina, con carga positiva) y por eso se unen con fuerza al ADN, que es <b>ácido</b> (carga negativa por los fosfatos). Hay un orden de magnitud útil: unos 6,4·10<sup>9</sup> pares de bases en una célula diploide humana medirían ≈ 2,2 m estirados (0,34 nm por par de bases); con ≈ 200 pares de bases por nucleosoma (147 enrollados + un tramo de «ADN de unión»), hacen falta unos 32 millones de nucleosomas. Otra consecuencia: <b>la replicación debe desmontar y volver a montar los nucleosomas</b> a medida que avanza la horquilla, y la célula fabrica histonas nuevas en la fase S.</p>" +
    ojo("<b>Cromatina y cromosoma son el mismo material</b> (ADN + proteínas) en distinto grado de empaquetamiento: cromatina en interfase, cromosomas en división. No son dos sustancias distintas. Y la eucromatina (laxa, genes activos) frente a la heterocromatina (compacta, silenciada) la verás en el tema 12.")
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Quién hace qué: enzimas y proteínas de la replicación", html: env(
    "<p>Es la tabla que más cae. Memoriza la <b>función</b> de cada una con un verbo.</p>" +
    tabla(["Enzima o proteína", "Qué hace", "Pista para recordarla"], [
      ["<b>Helicasa</b>", "separa las dos hebras rompiendo puentes de hidrógeno (gasta ATP)", "«abre la cremallera»"],
      ["<b>Topoisomerasa</b> (girasa en bacterias)", "corta y vuelve a unir el ADN para quitar la tensión por delante de la horquilla", "«evita el nudo»"],
      ["<b>SSB</b> (proteínas de unión a monocatenario)", "mantienen separadas las hebras abiertas", "«sujetan la cremallera abierta»"],
      ["<b>Primasa</b>", "sintetiza el cebador de ARN (≈ 10 nt)", "«pone la primera letra»"],
      ["<b>ADN polimerasa III</b> (procariotas)", "alarga las cadenas nuevas 5′ → 3′ y corrige errores (exonucleasa 3′ → 5′)", "«la que copia»"],
      ["<b>ADN polimerasa I</b> (procariotas)", "quita el cebador de ARN y rellena con ADN", "«limpia y rellena»"],
      ["<b>ADN ligasa</b>", "une con un enlace fosfodiéster los extremos contiguos de los fragmentos", "«pega»"]
    ], "q3t") +
    "<p>En eucariotas las funciones son equivalentes, con otros nombres: la <b>polimerasa α</b> (que lleva asociada la primasa) fabrica el cebador y un poco de ADN; la <b>polimerasa δ</b> sintetiza la hebra retrasada y la <b>ε</b> la adelantada; una proteína con forma de anillo, la <b>pinza deslizante (PCNA)</b>, mantiene la polimerasa pegada al molde para que no se suelte; y enzimas como la <b>RNasa H y la FEN1</b> eliminan los cebadores. Descubrió la primera ADN polimerasa Arthur Kornberg (1956, Nobel 1959).</p>" +
    w("emparejar", "enzimas") +
    ojo("<b>Helicasa ≠ topoisomerasa</b>: la helicasa abre las hebras; la topoisomerasa alivia el superenrollamiento que esa apertura provoca. <b>Primasa ≠ polimerasa</b>: la primasa es una ARN polimerasa especializada que hace el cebador; la ADN polimerasa no puede empezar sola. <b>Polimerasa ≠ ligasa</b>: la polimerasa alarga una cadena, la ligasa solo sella el corte entre dos cadenas ya hechas.") +
    "<h5>Por qué la ADN polimerasa necesita un cebador (la pregunta de «explica por qué…»)</h5>" +
    "<p>La polimerasa forma un enlace entre el grupo 3′-OH del último nucleótido de la cadena y el fosfato del nucleótido que llega. Si no hay un 3′-OH al que añadir, no hay nada que alargar. Una ARN polimerasa (como la primasa) sí puede empezar una cadena de cero; por eso el cebador es de ARN. Después se cambia por ADN, y así la célula se asegura de que la parte «peor copiada» (el inicio) acaba corregida y sustituida.</p>"
  ) });

  nuevas.push({ h: "7. Procariotas y eucariotas: dos formas de replicar", html: env(
    "<p>Tienes que poder comparar. Los principios son los mismos; cambia la escala:</p>" +
    tabla(["", "Procariotas (<i>E. coli</i>)", "Eucariotas (humano)"], [
      ["ADN", "una molécula circular, ≈ 4,6 millones de pares de bases", "varias moléculas lineales (cromosomas), ≈ 3 200 millones por genoma haploide"],
      ["Dónde y cuándo", "en el citoplasma (nucleoide), durante todo el ciclo si crece", "en el núcleo, en la <b>fase S</b> del ciclo celular"],
      ["Orígenes de replicación", "<b>uno solo</b> (oriC)", "<b>muchos miles</b> por genoma"],
      ["Velocidad de la horquilla", "≈ 1000 nt/s", "≈ 50 nt/s"],
      ["Fragmentos de Okazaki", "1000-2000 nt", "100-200 nt (un nucleosoma)"],
      ["ADN polimerasas principales", "III (copia) y I (cebadores)", "α (cebador), δ y ε (copia)"],
      ["Extremos", "no hay: el cromosoma es circular", "<b>telómeros</b> y problema del extremo"],
      ["Cromatina", "sin nucleosomas", "hay que desmontar y montar nucleosomas"]
    ], "q3t") +
    "<h5>Por qué los eucariotas necesitan muchos orígenes</h5>" +
    "<p>Una cuenta lo demuestra. Una célula humana tiene ≈ 6,4·10<sup>9</sup> pares de bases (genoma diploide). Si hubiese un solo origen, con dos horquillas a 50 nt/s cada una, tardaría 6,4·10<sup>9</sup> / (2 · 50) = 6,4·10<sup>7</sup> s ≈ <b>740 días</b>. Pero la fase S dura unas 8 horas (28 800 s): hacen falta, como mínimo, 6,4·10<sup>9</sup> / (100 · 28 800) ≈ <b>2 223 orígenes</b>; en la realidad hay decenas de miles, que se activan de forma escalonada. En <i>E. coli</i>, en cambio, 4,6·10<sup>6</sup> / (2 · 1000) = 2 300 s ≈ <b>38 minutos</b> con un único origen.</p>" +
    ejemplo("Cálculo con fragmentos y cebadores", "En un eucariota, una horquilla ha replicado 1 000 nt. Con fragmentos de Okazaki de 200 nt, ¿cuántos fragmentos tiene la hebra retrasada y cuántos cebadores se han usado en total?", [
      "Fragmentos de la retrasada: 1 000 / 200 = <b>5</b>.",
      "La hebra adelantada necesita <b>1</b> cebador; cada fragmento de la retrasada, 1 más: 5.",
      "Total de cebadores: 1 + 5 = <b>6</b>."
    ]) +
    "<p>Fíjate en que este cálculo explica por qué la replicación de la hebra retrasada es mucho más «cara» que la de la adelantada: más cebadores, más fragmentos que madurar y más uniones que sellar.</p>" +
    w("clasificar", "relacion") + w("clasificar", "hebras")
  ) });

  nuevas.push({ h: "8. Errores, corrección de pruebas y reparación", html: env(
    "<p>Copiar 6 400 millones de letras sin errores parece imposible. La célula lo consigue en <b>tres filtros</b> sucesivos (con tasas orientativas, para que veas el orden de magnitud):</p>" +
    tabla(["Filtro", "Qué hace", "Tasa de error tras el filtro"], [
      ["1. Selección de la base", "la polimerasa elige la base que encaja por complementariedad", "≈ 1 error por 10<sup>5</sup> nucleótidos"],
      ["2. <b>Corrección de pruebas</b>", "la ADN polimerasa tiene actividad <b>exonucleasa 3′ → 5′</b>: retrocede y corta el nucleótido mal puesto", "≈ 1 por 10<sup>7</sup>"],
      ["3. <b>Reparación de apareamientos erróneos</b> (MMR)", "proteínas revisan la hebra recién hecha, cortan el tramo con el error y se rellena", "≈ 1 por 10<sup>9</sup>"]
    ], "q3t") +
    "<p>Con 10<sup>−9</sup> por nucleótido, una célula diploide humana (6,4·10<sup>9</sup>) comete unos <b>6,4 errores</b> por división: ¡unos pocos! Esos errores no corregidos son <b>mutaciones</b>, la materia prima de la variación (Tema 13).</p>" +
    "<h5>Cuando el ADN se daña entre divisiones</h5>" +
    "<p>El ADN también se daña por la luz ultravioleta, la radiación, sustancias químicas o por el propio metabolismo. La célula tiene sistemas de <b>reparación</b>:</p>" +
    tabla(["Sistema", "Daño que repara", "Cómo"], [
      ["<b>Fotorreactivación</b>", "dímeros de timina por UV", "una enzima activada por la luz separa los dímeros (en bacterias y plantas, no en placentarios)"],
      ["<b>Reparación por escisión de bases</b> (BER)", "una base alterada (por ejemplo, por desaminación)", "se quita la base, se corta el esqueleto y se rellena con ADN"],
      ["<b>Reparación por escisión de nucleótidos</b> (NER)", "lesiones voluminosas, como los dímeros de timina que distorsionan la hélice", "se corta un tramo de ≈ 25-30 nucleótidos con la lesión, se rellena y se liga"],
      ["<b>Reparación de roturas de doble hebra</b>", "cortes en las dos hebras", "unión de extremos o recombinación con el cromosoma homólogo"]
    ], "q3t") +
    ojo("«La corrección de pruebas la hace la ligasa» es falso: la hace la propia <b>ADN polimerasa</b> con su actividad exonucleasa 3′ → 5′. La ligasa solo sella cortes. Y cuidado con el vocabulario: <b>exonucleasa</b> quita nucleótidos desde un extremo; <b>endonucleasa</b> corta en medio de la cadena.") +
    "<h5>Una enfermedad que lo demuestra: xeroderma pigmentoso</h5>" +
    "<p>Las personas con <b>xeroderma pigmentoso</b> tienen un fallo en el sistema NER: no reparan los dímeros de timina que causa el sol. Sus células acumulan mutaciones y tienen una probabilidad muy alta de sufrir cáncer de piel; deben evitar por completo la luz solar. Es el ejemplo clásico de «un fallo en la reparación causa enfermedad». (Lindahl, Modrich y Sancar recibieron el Nobel de Química en 2015 por describir los mecanismos de reparación.)</p>"
  ) });

  nuevas.push({ h: "9. El problema del extremo: telómeros y telomerasa", html: env(
    "<h5>El problema</h5>" +
    "<p>La hebra retrasada necesita un cebador por fragmento. En el <b>último fragmento</b>, al final de un cromosoma lineal, el cebador de ARN se coloca y luego se elimina, pero <b>no hay un extremo 3′-OH previo que pueda rellenar el hueco</b>. El resultado: <b>en cada replicación, el extremo 5′ de cada hebra nueva queda un poco más corto</b> (≈ 50-100 nt por división). Si el ADN acabase ahí con genes, se perderían genes en cada división. La solución evolutiva: los extremos de los cromosomas llevan una secuencia repetida sin genes, los <b>telómeros</b> (en humanos, <b>TTAGGG</b> repetido miles de veces), que se acortan en lugar de los genes y protegen al cromosoma de ser confundido con una rotura. Los procariotas, con ADN circular, no tienen este problema.</p>" +
    "<h5>La telomerasa</h5>" +
    "<p>La <b>telomerasa</b> es una enzima formada por <b>ARN</b> y proteína (una transcriptasa inversa): lleva incorporada una pequeña cadena de ARN que sirve de molde para <b>alargar el extremo 3′ del telómero</b>, añadiendo repeticiones TTAGGG; luego la célula completa la hebra complementaria. La descubrieron <b>Greider y Blackburn</b> (1985) y recibieron el Nobel de Medicina en 2009 junto con Szostak.</p>" +
    tabla(["Tipo de célula", "Telomerasa", "Consecuencia"], [
      ["Mayoría de células somáticas", "casi inactiva", "el telómero se acorta con cada división; al llegar a un tamaño crítico la célula entra en <b>senescencia</b> (<b>límite de Hayflick</b>, ≈ 50-60 divisiones en cultivo, 1961)"],
      ["Células madre y germinales", "activa", "mantienen el telómero y pueden dividirse muchas veces"],
      ["<b>Células cancerosas</b> (≈ 85-90 %)", "<b>reactivada</b>", "no se acortan: se dividen sin límite («inmortales»)"]
    ], "q3t") +
    w("bio_telomeros") +
    ejemplo("¿Cuántas divisiones aguanta una célula somática?", "Un telómero mide 10 000 nt y pierde 100 nt por división. Si la célula deja de dividirse al llegar a 4 000 nt, ¿cuántas divisiones puede hacer?", [
      "Pérdida total permitida: 10 000 − 4 000 = 6 000 nt.",
      "Divisiones: 6 000 / 100 = <b>60</b>.",
      "Es del orden de lo que Hayflick observó en células humanas en cultivo (unas 50-60 divisiones)."
    ]) +
    ojo("Los telómeros <b>no</b> son «relojes de la muerte»: el envejecimiento tiene muchas causas. Y reactivar la telomerasa para rejuvenecer tiene un riesgo claro, porque la actividad de telomerasa es una de las características de las células cancerosas. En el examen: acortamiento = envejecimiento celular, telomerasa activa = células madre o cáncer.")
  ) });

  nuevas.push({ h: "10. Ejemplo PAU resuelto: interpretar un experimento tipo Meselson y Stahl", html: env(
    "<p><b>Enunciado.</b> Un cultivo de <i>E. coli</i> crece durante muchas generaciones en un medio con <sup>15</sup>NH<sub>4</sub>Cl. Después se pasa a un medio con <sup>14</sup>NH<sub>4</sub>Cl y se extrae ADN a distintos tiempos (<i>E. coli</i> se divide cada 20 min). El ADN se ultracentrifuga en un gradiente de CsCl. Resultados:</p>" +
    tabla(["Tiempo en <sup>14</sup>N", "Bandas observadas en el tubo (de arriba, ligero, a abajo, pesado)"], [
      ["0 min", "una banda en la posición pesada (densidad 1,724)"],
      ["20 min", "una banda en la posición intermedia (1,717)"],
      ["40 min", "dos bandas de igual grosor: una intermedia (1,717) y otra ligera (1,710)"]
    ], "q3t") +
    "<p><b>Preguntas:</b> (a) ¿Qué pasa en el medio con <sup>14</sup>N para que aparezca ADN de densidad intermedia? (b) ¿Qué modelo de replicación apoya el resultado y por qué se descartan los otros dos? (c) Predice qué se vería a los 60 minutos. (d) ¿Qué enzimas intervienen en este proceso?</p>" +
    ejemplo("Resolución", "Paso a paso, con la lógica que valora el corrector:", [
      "<b>(a)</b> Cada molécula hija conserva una hebra antigua con <sup>15</sup>N (pesada) y recibe una hebra nueva con <sup>14</sup>N (ligera): es un <b>híbrido</b>, de densidad intermedia (el promedio de 1,724 y 1,710 es 1,717).",
      "<b>(b)</b> Apoya el modelo <b>semiconservativo</b>. A los 20 min no hay banda pesada ni ligera, solo intermedia: <b>se descarta el conservativo</b> (habría una pesada y una ligera). A los 40 min aparece una banda totalmente ligera, que el dispersivo (una sola banda cada vez más ligera, pero nunca tanto como el ADN normal) no puede explicar: <b>se descarta el dispersivo</b>.",
      "<b>(c)</b> 60 min = 3 generaciones: 2<sup>3</sup> = 8 moléculas, 2 híbridas y 6 ligeras: <b>25 % en la banda intermedia y 75 % en la ligera</b> (la ligera, el triple de gruesa).",
      "<b>(d)</b> Helicasa (abre las hebras), primasa (cebador de ARN), ADN polimerasa III (copia 5′ → 3′ y corrige), ADN polimerasa I (quita el cebador) y ligasa (une fragmentos); topoisomerasa y SSB como apoyo."
    ]) +
    "<p><b>Consejo de examen:</b> cuando te den bandas, razona siempre con el «ladrillo» del ADN: una molécula = dos hebras, y cada hebra es o vieja (¹⁵N) o nueva (¹⁴N). Dibuja las moléculas con trazo grueso (vieja) y fino (nueva) y las bandas salen solas.</p>"
  ) });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Las preguntas de este tema siguen cuatro modelos. Aquí tienes cada uno con una respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Describe el experimento de Hershey y Chase y su conclusión", "Respuesta modelo:", [
      "<b>Material:</b> bacteriófago T2 (ADN dentro de cápside proteica) y <i>E. coli</i>.",
      "<b>Método:</b> se marcó el ADN con <sup>32</sup>P en un lote y la proteína con <sup>35</sup>S en otro; tras infectar y agitar en batidora, se centrifugó.",
      "<b>Resultado:</b> el <sup>35</sup>S quedó en el sobrenadante (fuera de la bacteria) y el <sup>32</sup>P en el sedimento (dentro).",
      "<b>Conclusión:</b> es el ADN, no la proteína, lo que entra en la bacteria y dirige la producción de nuevos virus: el ADN es el material genético."
    ]) +
    ejemplo("Pregunta 2. Explica por qué la replicación es semiconservativa y describe cómo se demostró", "Respuesta modelo:", [
      "<b>Definición:</b> cada molécula hija conserva una hebra de la original y tiene una hebra nueva.",
      "<b>Experimento:</b> Meselson y Stahl (1958): <i>E. coli</i> en <sup>15</sup>N y luego en <sup>14</sup>N; ultracentrifugación en CsCl.",
      "<b>Resultados:</b> generación 1: una banda intermedia (descarta el conservativo); generación 2: banda intermedia y banda ligera (descarta el dispersivo).",
      "<b>Conclusión:</b> semiconservativo."
    ]) +
    ejemplo("Pregunta 3. Hebra adelantada y retrasada: por qué hay dos tipos y qué diferencias tienen", "Respuesta modelo:", [
      "<b>Causa:</b> las hebras son antiparalelas y la ADN polimerasa solo sintetiza de 5′ a 3′.",
      "<b>Adelantada:</b> el sentido de síntesis coincide con el avance de la horquilla; se hace de forma continua con un cebador.",
      "<b>Retrasada:</b> el sentido de síntesis es contrario al avance; se hace en fragmentos de Okazaki, cada uno con su cebador, y luego se unen con la ligasa."
    ]) +
    ejemplo("Pregunta 4. Telómeros y telomerasa", "Respuesta modelo:", [
      "<b>Telómeros:</b> secuencias repetidas (TTAGGG) en los extremos de los cromosomas, sin genes.",
      "<b>Función:</b> evitar la pérdida de genes por el problema del extremo (el último cebador no se puede rellenar) y proteger los extremos.",
      "<b>Telomerasa:</b> enzima con molde de ARN que alarga los telómeros; activa en células madre y en cáncer, casi inactiva en las somáticas, que envejecen y dejan de dividirse."
    ]) +
    "<p>Los ejercicios del final incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio11a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
