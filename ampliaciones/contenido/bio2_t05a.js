/* ============================================================
   Biología II · ampliaciones · Tema 5: Ácidos nucleicos
   (parte A: teoría. Parte B, bio2_t05b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widget nuevo en ampliaciones/lab_bio_t5.js (bio_adn). Cifras recalculadas en herramientas/verificar_bio2_t5.py.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Componentes del nucleótido (nucleósido ≠ nucleótido) y enlace fosfodiéster; polaridad 5′→3′ → sección 1 + orden.
   2. Bases púricas frente a pirimidínicas y cuál es de ADN o de ARN → sección 1 + clasificar.
   3. Modelo de Watson y Crick: antiparalela, complementaria, 2 y 3 puentes de H, dextrógira → sección 2 + widget bio_adn.
   4. Regla de Chargaff y problemas de porcentajes de bases (A = T, C = G; A + G = C + T) → secciones 2, 6 y 7.
   5. Niveles de empaquetamiento (nucleosoma, fibra de 30 nm, bucles, cromosoma) y nombres de las histonas → sección 2 + esquema.
   6. ADN procariota frente a eucariota (circular/lineal, histonas, plásmidos, ADN mitocondrial) → sección 2.
   7. Tipos de ARN: estructura y función de ARNm, ARNt (anticodón) y ARNr; otros ARN → sección 3.
   8. Diferencias ADN/ARN (tabla completa y por qué el ADN es más estable) → sección 3 + clasificar.
   9. Experimentos: Griffith, Avery, Hershey y Chase; interpretar datos de Chargaff y curvas de fusión → secciones 5 y 7.
   10. Cálculos: longitud del ADN, puentes de H, vueltas de hélice, enlaces fosfodiéster, nucleosomas → sección 6.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t5/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // esquema de los niveles de empaquetamiento del ADN eucariota (SVG generado)
  function niveles() {
    var filas = [
      ["1. Doble hélice de ADN", "2 nm de grosor"],
      ["2. Collar de perlas (nucleosomas)", "11 nm"],
      ["3. Fibra de cromatina (solenoide)", "30 nm"],
      ["4. Bucles sobre un armazón proteico", "300 nm"],
      ["5. Cromosoma metafásico", "cromátida 700 nm · cromosoma 1400 nm"]
    ];
    var s = "<svg class='bio5-svg' viewBox='0 0 440 330' role='img' aria-label='Niveles de empaquetamiento del ADN: doble hélice, nucleosomas, fibra de 30 nm, bucles y cromosoma'><rect class='b5-marco' x='2' y='2' width='436' height='326' rx='12'/>", i, cy, k;
    for (i = 0; i < 5; i++) {
      cy = 36 + i * 64;
      if (i === 0) {
        s += "<path class='b5-cad' d='M20 " + cy + " q15 -16 30 0 t30 0 t30 0 t30 0'/><path class='b5-cad2' d='M20 " + cy + " q15 16 30 0 t30 0 t30 0 t30 0'/>";
      } else if (i === 1) {
        s += "<line class='b5-cad' x1='16' y1='" + cy + "' x2='150' y2='" + cy + "'/>";
        for (k = 0; k < 4; k++) s += "<circle class='b5-bola' cx='" + (38 + k * 36) + "' cy='" + cy + "' r='11'/>";
      } else if (i === 2) {
        for (k = 0; k < 7; k++) s += "<ellipse class='b5-cad' cx='" + (28 + k * 18) + "' cy='" + cy + "' rx='7' ry='16' fill='none'/>";
      } else if (i === 3) {
        s += "<line class='b5-cad' x1='16' y1='" + cy + "' x2='150' y2='" + cy + "'/>";
        for (k = 0; k < 4; k++) s += "<ellipse class='b5-cad2' cx='" + (34 + k * 32) + "' cy='" + (cy + (k % 2 ? 15 : -15)) + "' rx='12' ry='15' fill='none'/>";
      } else {
        s += "<path class='b5-cad' d='M62 " + (cy - 22) + " L112 " + (cy + 22) + " M112 " + (cy - 22) + " L62 " + (cy + 22) + "' style='stroke-width:12'/><circle class='b5-bola' cx='87' cy='" + cy + "' r='6'/>";
      }
      s += "<text x='170' y='" + (cy - 4) + "'>" + filas[i][0] + "</text><text x='170' y='" + (cy + 14) + "' style='font-weight:400'>" + filas[i][1] + "</text>";
    }
    return s + "</svg>";
  }

  // ---------------------------------------------------------------- 1. El nucleótido
  secciones[0] = env(
    "<h5>Anatomía de un nucleótido</h5>" +
    "<p>Un nucleótido tiene tres piezas unidas en una sola molécula: una <b>pentosa</b> (azúcar de 5 carbonos), una <b>base nitrogenada</b> y un <b>grupo fosfato</b>. Los carbonos de la pentosa se numeran <b>1′, 2′, 3′, 4′ y 5′</b> (con «prima» para no confundirlos con los de la base). Hay que saber quién se une dónde:</p>" +
    "<ul><li>La <b>base</b> se une al carbono <b>1′</b> de la pentosa por un enlace <b>N-glucosídico</b>.</li>" +
    "<li>El <b>fosfato</b> se une al carbono <b>5′</b> por un enlace <b>éster</b>.</li>" +
    "<li>El carbono <b>3′</b> queda con un grupo –OH libre: es el que se usará para encadenar el siguiente nucleótido.</li></ul>" +
    tabla(["Término", "Qué es", "Ejemplo"], [
      ["<b>Nucleósido</b>", "pentosa + base (sin fosfato)", "adenosina, citidina, desoxitimidina"],
      ["<b>Nucleótido</b>", "pentosa + base + <b>fosfato</b> (nucleósido monofosfato)", "adenosín monofosfato (AMP), dAMP"],
      ["<b>Polinucleótido</b>", "muchos nucleótidos unidos por enlaces fosfodiéster", "una hebra de ADN o de ARN"]
    ], "q3t") +
    ojo("Nucleósido no es nucleótido: al nucleósido le <b>falta el fosfato</b>. Es una de las definiciones que más se pregunta (y se confunde).") +
    "<h5>Las cinco bases: grandes y pequeñas</h5>" +
    tabla(["Tipo", "Estructura", "Bases", "Dónde aparecen"], [
      ["<b>Púricas</b> (purinas)", "dos anillos fusionados (la «grande»)", "<b>adenina (A)</b> y <b>guanina (G)</b>", "ADN y ARN"],
      ["<b>Pirimidínicas</b> (pirimidinas)", "un solo anillo (la «pequeña»)", "<b>citosina (C)</b>, <b>timina (T)</b> y <b>uracilo (U)</b>", "C en ambos; T solo en ADN; U solo en ARN"]
    ], "q3t") +
    "<p>Truco de memoria: «<b>CUT</b>» (C, U, T) son las <b>pirimidinas</b>. Y la timina es, en el fondo, un uracilo con un grupo metilo (–CH<sub>3</sub>) añadido; esa pequeña diferencia tiene consecuencias (se explican en la sección 3).</p>" +
    w("clasificar", "bases") +
    "<h5>Cómo se encadenan: el enlace fosfodiéster</h5>" +
    "<p>El <b>–OH del carbono 3′</b> de un nucleótido reacciona con el <b>fosfato del carbono 5′</b> del siguiente: se forma un <b>enlace fosfodiéster</b> (el fosfato queda unido por <b>dos</b> enlaces éster, de ahí «di-éster») y se libera una molécula de <b>agua</b>. Es otra condensación, igual que el enlace glucosídico (tema 2), el éster de los lípidos (tema 3) y el peptídico (tema 4). Resultado: un <b>esqueleto azúcar–fosfato</b> repetido, del que cuelgan las bases como «letras» de un mensaje.</p>" +
    "<div class='formula-wrap'><div class='formula'>n nucleótidos → polinucleótido + (n − 1) H<sub>2</sub>O &nbsp;(n − 1 enlaces fosfodiéster)</div></div>" +
    "<p>Una hebra <b>tiene sentido</b>: en un extremo, el <b>5′</b>, hay un fosfato libre; en el otro, el <b>3′</b>, un –OH libre. Por convención una secuencia se lee y se escribe de <b>5′ a 3′</b> (como se lee un texto). Es la misma dirección en la que las enzimas añaden nucleótidos nuevos: siempre al extremo 3′.</p>" +
    w("orden", "ordenpoli") +
    "<h5>Cada fosfato lleva una carga negativa</h5>" +
    "<p>A pH celular los grupos fosfato están ionizados (–O<sup>−</sup>): por eso se llaman <b>ácidos</b> nucleicos y por eso el ADN es una molécula con mucha <b>carga negativa</b>, que se une a proteínas con carga positiva (las histonas) y a iones como el Mg<sup>2+</sup>. En el laboratorio esa carga se aprovecha: al aplicar un campo eléctrico (electroforesis en gel) los fragmentos de ADN migran hacia el polo positivo, y los más cortos avanzan más deprisa.</p>" +
    "<h5>Nucleótidos que no forman ácidos nucleicos</h5>" +
    "<p>Los nucleótidos también trabajan sueltos: el <b>ATP</b> (adenosín trifosfato) es la moneda de energía de la célula (tema 8); el <b>GTP</b> aporta energía en la síntesis de proteínas; el <b>NAD<sup>+</sup></b> y el <b>FAD</b> son coenzimas que transportan electrones; y el <b>AMP cíclico</b> es un mensajero dentro de la célula. Las mismas piezas, con funciones muy distintas.</p>"
  );

  // ---------------------------------------------------------------- 2. ADN
  secciones[1] = env(
    "<h5>El modelo de Watson y Crick (1953)</h5>" +
    "<p>Con los datos de Chargaff (proporciones de bases) y las imágenes de difracción de rayos X de <b>Rosalind Franklin</b> y <b>Maurice Wilkins</b> (la famosa «foto 51»), <b>James Watson y Francis Crick</b> propusieron en 1953 que el ADN es una <b>doble hélice</b>. Lo que hay que saber:</p>" +
    tabla(["Característica", "Qué significa"], [
      ["<b>Dos hebras</b> enrolladas", "alrededor de un eje común, formando una hélice <b>dextrógira</b> (gira a la derecha, como un tornillo)"],
      ["<b>Antiparalelas</b>", "una va de 5′ a 3′ y la otra, en sentido contrario, de 3′ a 5′"],
      ["Esqueleto <b>por fuera</b>", "azúcar–fosfato (hidrofílico, con carga negativa), en contacto con el agua"],
      ["Bases <b>por dentro</b>", "apiladas como los peldaños de una escalera de caracol (apolares, lejos del agua)"],
      ["<b>Complementarias</b>", "A–T unidas por <b>2</b> puentes de hidrógeno; C–G por <b>3</b>"],
      ["Medidas (forma B)", "diámetro <b>2 nm</b>; <b>0,34 nm</b> entre pares de bases; una vuelta cada <b>3,4 nm</b>, es decir, 10 pares de bases por vuelta"]
    ], "q3t") +
    "<p>(En el ADN real hay 10,5 pares de bases por vuelta; en los problemas de Selectividad se usa 10, que da cuentas redondas.)</p>" +
    "<h5>Por qué siempre A con T y C con G</h5>" +
    "<p>Una base de dos anillos (purina) se empareja siempre con una de un solo anillo (pirimidina): así la «escalera» tiene <b>siempre la misma anchura</b> (2 nm). Si se unieran dos purinas sobraría ancho, y si fueran dos pirimidinas faltaría. Además, solo A–T y C–G tienen los grupos exactos para formar puentes de hidrógeno entre sí. La consecuencia es la <b>regla de Chargaff</b> (1950):</p>" +
    "<div class='formula-wrap'><div class='formula'>%A = %T &nbsp;·&nbsp; %C = %G &nbsp;·&nbsp; A + G = C + T (purinas = pirimidinas)</div></div>" +
    "<p>Pero <b>A + T no tiene por qué igualar a C + G</b>: esa proporción cambia entre especies y es como una «firma». El ADN humano tiene aproximadamente un 41 % de G + C; algunas bacterias de suelo, más del 70 %.</p>" +
    ojo("La regla A = T, C = G solo vale para ADN <b>bicatenario</b>. En un ADN de una sola hebra (algunos virus) o en un ARN, los porcentajes no se igualan. Es el truco de muchos problemas: si A ≠ T, la muestra no es una doble hélice.") +
    w("bio_adn") +
    "<h5>Una hebra y su complementaria</h5>" +
    "<p>Al ser antiparalelas y complementarias, si una hebra es <b>5′-ATCGGA-3′</b>, la otra es <b>3′-TAGCCT-5′</b> (o, escrita como se lee, <b>5′-TCCGAT-3′</b>). Las dos contienen la misma información: cada una sirve de <b>molde</b> para reconstruir la otra. Esto es lo que permite copiar el ADN al dividirse la célula (tema 11).</p>" +
    "<h5>Qué mantiene unida la doble hélice</h5>" +
    "<ul><li><b>Puentes de hidrógeno</b> entre bases complementarias: individualmente débiles, pero hay millones; abren y cierran la hélice con facilidad cuando la célula necesita leerla.</li>" +
    "<li><b>Apilamiento de las bases</b> (fuerzas hidrofóbicas y de Van der Waals entre peldaños vecinos): aporta más estabilidad que los propios puentes de H.</li>" +
    "<li><b>Repulsión</b> entre fosfatos: la desestabiliza; la compensan iones positivos (Na<sup>+</sup>, Mg<sup>2+</sup>) y las histonas.</li></ul>" +
    "<h5>Desnaturalizar y renaturalizar</h5>" +
    "<p>Al <b>calentar</b> el ADN (o subir mucho el pH) se rompen los puentes de hidrógeno y las hebras se separan: es la <b>desnaturalización</b> (<b>fusión</b>) del ADN, <b>sin romper</b> los enlaces fosfodiéster. La temperatura a la que la mitad de las moléculas está separada es la <b>Tm</b>. Como los pares C–G tienen 3 puentes y los A–T solo 2, <b>cuanto más G + C, mayor Tm</b>. Una aproximación habitual: <b>Tm ≈ 69,3 + 0,41 · (%G+C)</b> °C, en condiciones salinas habituales. Al enfriar despacio, las hebras complementarias se vuelven a encontrar: <b>renaturalización</b> o hibridación. Es la base de la <b>PCR</b> (que amplifica ADN con ciclos de calentar y enfriar) y de las pruebas de paternidad.</p>" +
    "<h5>Otras formas de ADN</h5>" +
    "<p>La forma B (la del modelo) es la más común en la célula. Existen la <b>forma A</b> (más ancha y corta, aparece en ADN deshidratado y en híbridos ADN–ARN) y la <b>forma Z</b> (levógira, en zigzag, en zonas ricas en C–G). Con saber que la B es dextrógira y es la «normal» basta.</p>" +
    "<h5>Cómo guardan su ADN procariotas y eucariotas</h5>" +
    tabla(["", "Procariotas (bacterias)", "Eucariotas"], [
      ["Forma del cromosoma", "<b>una</b> molécula <b>circular</b> (a veces más de una)", "varias moléculas <b>lineales</b> (46 en la especie humana)"],
      ["Dónde", "en el <b>nucleoide</b>, sin membrana", "en el <b>núcleo</b> (dentro de una envoltura doble)"],
      ["Proteínas", "sin histonas; pequeñas proteínas básicas y <b>superenrollamiento</b>", "<b>histonas</b> y otras: forman la <b>cromatina</b>"],
      ["ADN extra", "<b>plásmidos</b> (pequeños círculos con genes de resistencia a antibióticos)", "<b>ADN mitocondrial</b> y de cloroplastos (circular, como el bacteriano)"]
    ], "q3t") +
    "<p>Los plásmidos son fundamentales en biotecnología: se usan para introducir genes (por ejemplo, el de la insulina humana) en bacterias. Y que mitocondrias y cloroplastos tengan ADN circular, ribosomas pequeños y se dividan por su cuenta es uno de los argumentos de la <b>teoría endosimbiótica</b> (tema 7).</p>" +
    "<h5>Cómo cabe tanto ADN en tan poco espacio: niveles de empaquetamiento</h5>" +
    "<p>El ADN de una sola célula humana, si se estirara, mediría unos <b>2 metros</b>; el núcleo apenas tiene 6 µm. Se consigue plegándolo en niveles sucesivos, con ayuda de proteínas. Cada nivel acorta la longitud (el cálculo está en la sección 6).</p>" +
    niveles() +
    "<p style='text-align:center;font-size:14px'>Cada nivel «guarda» el anterior; en la interfase la cromatina está en niveles 2–4, y solo al dividirse la célula llega al 5.</p>" +
    tabla(["Nivel", "Qué ocurre", "Participan"], [
      ["<b>Nucleosoma</b> (collar de perlas, 11 nm)", "unos <b>146 pares de bases</b> dan algo menos de <b>2 vueltas</b> (≈ 1,65) alrededor de un <b>octámero de histonas</b>; entre un nucleosoma y otro queda ADN de unión (en total ≈ 200 pb por nucleosoma)", "<b>8 histonas</b>: 2 de cada tipo H2A, H2B, H3 y H4 (el núcleo del nucleosoma)"],
      ["<b>Fibra de 30 nm</b> (solenoide)", "los nucleosomas se enrollan en espiral, unos 6 por vuelta", "<b>histona H1</b> (histona de unión), que «cierra» el ADN de unión"],
      ["<b>Bucles</b> (300 nm)", "la fibra de 30 nm forma grandes bucles anclados a un armazón de proteínas", "proteínas de andamiaje (no histonas)"],
      ["<b>Cromosoma metafásico</b> (1400 nm)", "máximo grado de condensación, solo durante la división; cada cromosoma tiene 2 cromátidas idénticas", "condensinas y otras proteínas"]
    ], "q3t") +
    w("orden", "ordenempaq") +
    "<p>Las <b>histonas</b> son proteínas <b>básicas</b>, ricas en lisina y arginina: sus cargas positivas atraen los fosfatos (carga negativa) del ADN. Por eso se pegan tan bien.</p>" +
    "<h5>Eucromatina y heterocromatina</h5>" +
    tabla(["", "Eucromatina", "Heterocromatina"], [
      ["Grado de empaquetamiento", "<b>poco</b> condensada (aspecto claro al microscopio)", "<b>muy</b> condensada (teñida más oscura)"],
      ["Genes", "<b>activos</b>, se transcriben", "<b>inactivos</b> (silenciados)"],
      ["Ejemplo", "genes que la célula usa a diario", "el cromosoma X inactivo de las mujeres (corpúsculo de Barr)"]
    ], "q3t") +
    "<h5>Función del ADN</h5>" +
    "<p>El ADN <b>almacena</b> la información genética en el orden de sus bases (como un texto de 4 letras); se <b>replica</b> antes de dividirse la célula, para que cada hija reciba una copia exacta (tema 11); y se <b>transcribe</b> a ARN, que dirige la síntesis de proteínas (tema 12). Los cambios en esa secuencia son las <b>mutaciones</b>, materia prima de la evolución.</p>"
  );

  // ---------------------------------------------------------------- 3. ARN
  secciones[2] = env(
    "<h5>Por qué el ARN es distinto: dos pequeños cambios con grandes efectos</h5>" +
    "<p>El ARN tiene <b>ribosa</b> (con un –OH extra en el carbono 2′) y <b>uracilo</b> en lugar de timina. Dos consecuencias importantes:</p>" +
    "<ul><li>Ese –OH extra hace al ARN <b>más reactivo y menos estable</b>: se degrada pronto, algo que a la célula le conviene para «mensajes» temporales. El ADN, sin ese –OH, es una molécula muy estable, adecuada para guardar información durante toda la vida.</li>" +
    "<li>La célula repara el ADN fijándose en que <b>nunca debe haber uracilo</b>: si una citosina se estropea y se convierte en uracilo, se detecta como error y se corrige. Si el ADN llevara U de forma normal, esa señal de alarma no existiría. Por eso el ADN lleva timina.</li></ul>" +
    "<p>El ARN suele ser de <b>cadena simple</b>, pero puede <b>plegarse sobre sí mismo</b>: algunas zonas de la hebra son complementarias entre sí y se emparejan formando «horquillas» (con A–U y C–G). Esa forma tridimensional es esencial para el ARNt y el ARNr.</p>" +
    "<h5>Los tipos de ARN, uno a uno</h5>" +
    tabla(["Tipo", "Estructura", "Función", "Datos útiles"], [
      ["<b>ARNm</b> (mensajero)", "cadena lineal, de longitud variable", "lleva la <b>copia de un gen</b> del ADN hasta los ribosomas; se lee en <b>codones</b> (3 bases = 1 aminoácido)", "vida corta; en eucariotas lleva <b>caperuza</b> en 5′ y <b>cola de poli-A</b> en 3′; ≈ 5 % del ARN celular"],
      ["<b>ARNt</b> (transferencia)", "≈ 75–90 nucleótidos, plegado en <b>trébol</b> (en 3D, en «L»)", "<b>transporta aminoácidos</b> al ribosoma y los coloca según el código", "<b>anticodón</b> (3 bases complementarias del codón) y extremo 3′ (CCA) donde se une el aminoácido; ≈ 15 %"],
      ["<b>ARNr</b> (ribosómico)", "cadenas largas muy plegadas, unidas a proteínas", "forma los <b>ribosomas</b> y cataliza el enlace peptídico (es una <b>ribozima</b>)", "el más abundante: ≈ 80 % del ARN"]
    ], "q3t") +
    w("emparejar", "arn") +
    "<h5>Otros ARN que conviene conocer</h5>" +
    "<ul><li><b>ARN nuclear pequeño (ARNsn)</b>: forma parte del <b>espliceosoma</b>, que corta los <b>intrones</b> del ARN recién copiado (tema 12).</li>" +
    "<li><b>ARN interferente y microARN (ARNsi, ARNmi)</b>: moléculas cortas de 20–25 nucleótidos que <b>apagan genes</b> destruyendo o bloqueando ARNm concretos (interferencia por ARN, Nobel de 2006 a Fire y Mello).</li>" +
    "<li><b>ARN como genoma</b>: muchos virus (VIH, coronavirus, gripe) usan ARN, no ADN, para guardar su información.</li></ul>" +
    "<h5>Ribosomas: una trampa de unidades</h5>" +
    "<p>Los ribosomas constan de dos subunidades, una grande y una pequeña, formadas por ARNr y proteínas. Se miden en unidades Svedberg (<b>S</b>), que dependen de la forma y de la velocidad de sedimentación, <b>no se suman</b>: procariotas <b>70S</b> = 50S + 30S; eucariotas <b>80S</b> = 60S + 40S.</p>" +
    "<h5>El ARN catalizador y el «mundo de ARN»</h5>" +
    "<p>En 1982 <b>Cech</b> y en 1983 <b>Altman</b> descubrieron que algunos ARN pueden actuar como <b>catalizadores</b> (<b>ribozimas</b>; Nobel de Química de 1989), algo que se creía exclusivo de las proteínas. Eso apoya la <b>hipótesis del mundo de ARN</b>: antes de que existieran el ADN y las proteínas, el ARN habría hecho a la vez de molécula que guarda información y de catalizador.</p>" +
    "<h5>Un ejemplo de la vida real: las vacunas de ARNm</h5>" +
    "<p>Algunas vacunas (por ejemplo, frente a la COVID-19) llevan <b>ARNm</b> envuelto en una <b>nanopartícula de lípidos</b> (¡los lípidos del tema 3!). Las células lo leen en sus ribosomas, fabrican la proteína del virus y el sistema inmunitario aprende a reconocerla. El ARNm no entra en el núcleo, no se integra en el ADN y se degrada en horas.</p>" +
    "<h5>Cuadro comparativo ADN – ARN</h5>" +
    tabla(["", "ADN", "ARN"], [
      ["Azúcar", "<b>desoxirribosa</b>", "<b>ribosa</b>"],
      ["Bases", "A, G, C y <b>T</b>", "A, G, C y <b>U</b>"],
      ["Cadenas", "normalmente <b>dos</b> (doble hélice)", "normalmente <b>una</b>"],
      ["Tamaño", "muy largo (millones de pb)", "mucho más corto"],
      ["Estabilidad", "alta (guarda la información)", "menor (mensajes temporales)"],
      ["Dónde", "núcleo, mitocondrias, cloroplastos; nucleoide en procariotas", "núcleo, citoplasma y ribosomas"],
      ["Función", "almacena y transmite la información genética", "expresa esa información (ARNm, ARNt, ARNr, otros)"],
      ["Tipos", "uno solo (con formas A, B, Z)", "ARNm, ARNt, ARNr, ARNsn, ARNmi…"]
    ], "q3t") +
    w("clasificar", "adnarn")
  );

  // ---------------------------------------------------------------- 4. Relación
  secciones[3] = env(
    "<h5>Conexiones con el resto de la asignatura</h5>" +
    "<ul><li><b>Tema 1 (agua y sales):</b> los puentes de hidrógeno mantienen unidas las hebras; la carga negativa de los fosfatos depende del pH y los iones (Mg<sup>2+</sup>, Na<sup>+</sup>) la neutralizan.</li>" +
    "<li><b>Temas 2, 3 y 4:</b> el mismo patrón de condensación (con pérdida de agua) construye los glúcidos, los lípidos, las proteínas y los ácidos nucleicos. Las histonas son proteínas; los nucleótidos llevan pentosas; las vacunas de ARNm usan lípidos.</li>" +
    "<li><b>Tema 8:</b> el ATP y el NAD<sup>+</sup> son nucleótidos libres que mueven la energía de la célula.</li>" +
    "<li><b>Temas 11 y 12:</b> la replicación copia el ADN (complementariedad de bases) y la expresión lo transcribe y traduce (ARNm, ARNt, ARNr).</li>" +
    "<li><b>Química II:</b> grupos funcionales (éster de fosfato, amina, anillos aromáticos de las bases) y equilibrio ácido–base de los fosfatos.</li></ul>"
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Cómo se descubrió: de la «nucleína» a la doble hélice", html: env(
    "<p>Que el ADN sea el material genético no era evidente: durante décadas se pensó que lo eran las proteínas (más variadas, con 20 «letras» frente a 4). Esta es la secuencia de experimentos, y qué demostró cada uno:</p>" +
    tabla(["Año", "Quién", "Qué hizo / descubrió"], [
      ["1869", "<b>Miescher</b>", "aísla del pus de vendas una sustancia rica en fósforo del núcleo: la «nucleína» (el ADN)"],
      ["1928", "<b>Griffith</b>", "con neumococos y ratones observa la <b>transformación</b>: algo pasa de bacterias muertas a vivas"],
      ["1944", "<b>Avery, MacLeod y McCarty</b>", "demuestran que ese «principio transformante» es el <b>ADN</b>"],
      ["1950", "<b>Chargaff</b>", "A = T y C = G; la proporción A+T / C+G varía según la especie"],
      ["1952", "<b>Hershey y Chase</b>", "con virus bacteriófagos marcados: en la infección <b>entra el ADN</b>, no la proteína"],
      ["1952–53", "<b>Franklin y Wilkins</b>", "difracción de rayos X: el ADN es una <b>hélice</b> regular (foto 51)"],
      ["1953", "<b>Watson y Crick</b>", "modelo de la <b>doble hélice</b> (artículo en la revista <i>Nature</i>)"]
    ], "q3t") +
    "<p>Watson, Crick y Wilkins recibieron el Premio Nobel de Fisiología o Medicina en <b>1962</b>; Rosalind Franklin había fallecido en 1958 y el Nobel no se concede a título póstumo, aunque sus datos fueron clave.</p>" +
    "<h5>El experimento de Griffith (1928)</h5>" +
    "<p>Griffith trabajaba con la bacteria <i>Streptococcus pneumoniae</i>, que tiene dos cepas: la <b>S</b> (con cápsula, <b>virulenta</b>, colonias lisas) y la <b>R</b> (sin cápsula, inofensiva, colonias rugosas). Sus cuatro grupos de ratones:</p>" +
    tabla(["Se inyecta", "Resultado"], [
      ["cepa R viva", "el ratón <b>vive</b>"],
      ["cepa S viva", "el ratón <b>muere</b>"],
      ["cepa S <b>muerta por calor</b>", "el ratón <b>vive</b>"],
      ["cepa R viva + cepa S muerta por calor", "el ratón <b>muere</b>, y de su sangre se aíslan bacterias <b>S vivas</b>"]
    ], "q3t") +
    "<p>Conclusión: las bacterias R recibieron «algo» de las S muertas y se <b>transformaron</b> en virulentas, de forma <b>hereditaria</b>. Griffith no sabía qué era ese «principio transformante».</p>" +
    "<h5>Avery, MacLeod y McCarty (1944)</h5>" +
    "<p>Purificaron los componentes de las bacterias S y probaron cada uno sobre cultivos de R. Solo el <b>extracto de ADN</b> transformaba. Más aún: al tratarlo con <b>ADNasa</b> (enzima que destruye el ADN) la transformación <b>desaparecía</b>, mientras que con <b>proteasa</b> o <b>ARNasa</b> se conservaba. Conclusión: el principio transformante es el <b>ADN</b>.</p>" +
    "<h5>Hershey y Chase (1952)</h5>" +
    "<p>Usaron el bacteriófago T2, un virus formado solo por <b>ADN</b> dentro de una cubierta de <b>proteína</b>. Se aprovecharon de que el ADN contiene <b>fósforo</b> (y casi no azufre) y las proteínas contienen <b>azufre</b> (y casi no fósforo). Prepararon dos lotes de virus: uno con <b>ADN marcado con <sup>32</sup>P</b> y otro con <b>proteínas marcadas con <sup>35</sup>S</b>. Los dejaron infectar bacterias, agitaron la mezcla en una batidora (para soltar las cubiertas vacías) y centrifugaron: las bacterias, más pesadas, forman el <b>sedimento</b>; los restos de virus quedan en el <b>sobrenadante</b>.</p>" +
    tabla(["Lote", "Marca", "Dónde se encontró la radiactividad", "Conclusión"], [
      ["1", "<sup>32</sup>P (ADN)", "en el <b>sedimento</b> (dentro de las bacterias)", "el ADN entra en la bacteria"],
      ["2", "<sup>35</sup>S (proteínas)", "en el <b>sobrenadante</b> (fuera)", "la proteína se queda fuera"]
    ], "q3t") +
    "<p>Como los virus nuevos se forman con las instrucciones que entraron, el <b>ADN es el material genético</b>. (Hershey recibió el Nobel de 1969.) Una excepción: en los virus de ARN, el material genético es ARN.</p>" +
    "<h5>Los datos de Chargaff</h5>" +
    "<p>Hacia 1950, Chargaff midió la composición de bases en el ADN de muchos organismos. Valores aproximados de sus tablas (porcentaje de cada base):</p>" +
    tabla(["Organismo", "A", "T", "G", "C", "A / T", "G / C", "(A+T) / (G+C)"], [
      ["Ser humano", "30,9", "29,4", "19,9", "19,8", "1,05", "1,01", "1,52"],
      ["<i>E. coli</i>", "26,0", "23,9", "24,9", "25,2", "1,09", "0,99", "1,00"],
      ["Levadura", "31,3", "32,9", "18,7", "17,1", "0,95", "1,09", "1,79"]
    ], "q3t") +
    "<p>Dos conclusiones: (1) en <b>todas</b> las especies A ≈ T y G ≈ C (las pequeñas diferencias son errores de medida); (2) la proporción (A+T)/(G+C) <b>cambia</b> de una especie a otra. Esto indicaba un <b>emparejamiento</b> entre bases, pero no explicaba la forma: faltaban los rayos X y la imaginación de Watson y Crick.</p>"
  ) });

  nuevas.push({ h: "6. Cálculos con ácidos nucleicos", html: env(
    "<p>Datos que usamos: <b>0,34 nm</b> por par de bases, <b>10 pb por vuelta</b> (3,4 nm), A–T: 2 puentes de H, C–G: 3. Cada nucleótido añadido a una hebra forma 1 enlace fosfodiéster.</p>" +
    ejemplo("Chargaff: porcentajes de bases", "Una muestra de ADN bicatenario tiene un 30 % de adenina. ¿Qué porcentaje hay de las otras bases?", [
      "<b>A = T</b> en el ADN bicatenario: %T = 30 %.",
      "A + T = 60 %. El resto es G + C: 100 − 60 = 40 %.",
      "<b>G = C</b>: cada una vale 40 / 2 = <b>20 %</b>.",
      "Comprobación: 30 + 30 + 20 + 20 = 100. ✓ Purinas (A + G) = 50 %, pirimidinas (C + T) = 50 %."
    ]) +
    ejemplo("Hebra complementaria", "La hebra 5′-ATCGGATC-3′ es parte de un ADN bicatenario. Escribe la hebra complementaria y cuenta los puentes de hidrógeno.", [
      "Complementaria, <b>antiparalela</b>: se empareja A–T, T–A, C–G, G–C, G–C, A–T, T–A, C–G: <b>3′-TAGCCTAG-5′</b>.",
      "Pares: A–T, T–A, A–T, T–A (4 pares A–T) y C–G, G–C, G–C, C–G (4 pares C–G).",
      "Puentes de hidrógeno: 4 · 2 + 4 · 3 = 8 + 12 = <b>20</b>.",
      "Leída 5′→3′ la complementaria es 5′-GATCCGAT-3′."
    ]) +
    ejemplo("Longitud y vueltas de una molécula", "Un fragmento de ADN tiene 1000 pares de bases. ¿Qué longitud tiene y cuántas vueltas da la hélice?", [
      "Longitud: 1000 · 0,34 nm = <b>340 nm</b>.",
      "Vueltas: 1000 / 10 = <b>100 vueltas</b> (cada una de 3,4 nm; 100 · 3,4 = 340 nm ✓)."
    ]) +
    ejemplo("Cromosoma bacteriano", "El cromosoma circular de <i>E. coli</i> tiene unos 4,6 millones de pares de bases (4,6 · 10<sup>6</sup>). ¿Qué longitud tendría estirado? Compárala con la bacteria (≈ 2 µm).", [
      "Longitud: 4,6 · 10<sup>6</sup> · 0,34 nm = 1,564 · 10<sup>6</sup> nm = <b>1,564 mm</b>.",
      "La bacteria mide ≈ 2 µm = 0,002 mm: el ADN es unas <b>780 veces más largo</b> que la célula (1,564 / 0,002 = 782). Por eso necesita superenrollarse.",
      "Se usa «nm = 10<sup>−9</sup> m»: 1,564 · 10<sup>6</sup> nm = 1,564 · 10<sup>−3</sup> m."
    ]) +
    ejemplo("ADN humano en el núcleo", "Una célula humana diploide tiene unos 6,4 · 10<sup>9</sup> pares de bases. (a) ¿Qué longitud de ADN lleva en total? (b) Si hay unos 200 pb por nucleosoma, ¿cuántos nucleosomas hay?", [
      "<b>(a)</b> 6,4 · 10<sup>9</sup> · 0,34 nm = 2,176 · 10<sup>9</sup> nm = <b>2,18 m</b>. Y cabe en un núcleo de ≈ 6 µm: se ha acortado unas 360 000 veces (2,176 m / 6 µm).",
      "<b>(b)</b> 6,4 · 10<sup>9</sup> / 200 = 3,2 · 10<sup>7</sup> = <b>32 millones de nucleosomas</b>."
    ]) +
    ejemplo("Dos plásmidos", "Un plásmido de 3000 pb tiene un 40 % de G + C. Calcula cuántas adeninas contiene y cuántos puentes de hidrógeno hay.", [
      "Un plásmido bicatenario tiene 3000 pares = 6000 bases. G + C = 40 % de 6000 = 2400; G = C = 1200.",
      "A + T = 6000 − 2400 = 3600; A = T = <b>1800</b>.",
      "Pares C–G: 1200 (3 puentes cada uno) = 3600; pares A–T: 1800 (2 puentes cada uno) = 3600. Total <b>7200 puentes</b>."
    ]) +
    ejemplo("Enlaces fosfodiéster", "Una hebra de ADN tiene 20 nucleótidos. ¿Cuántos enlaces fosfodiéster hay en ella? ¿Y en una doble hélice de 20 pb?", [
      "Una hebra de n nucleótidos: n − 1 = <b>19</b> enlaces.",
      "Doble hélice de 20 pb: dos hebras de 20 → 2 · 19 = <b>38</b> enlaces fosfodiéster (y 20 pares de bases con puentes de H)."
    ]) +
    ejemplo("Transcripción", "Se transcribe una hebra molde 3′-TACGGATTC-5′. Escribe el ARNm (5′→3′).", [
      "La ARN polimerasa pone la base complementaria: T→A, A→U, C→G, G→C, G→C, A→U, T→A, T→A, C→G.",
      "ARNm: <b>5′-AUGCCUAAG-3′</b>. (No hay T: donde el molde tiene A, el ARN lleva U.)",
      "Tiene 9 nucleótidos = 3 codones: AUG · CCU · AAG."
    ]) +
    ejemplo("Temperatura de fusión", "Con la aproximación Tm ≈ 69,3 + 0,41 · (%G+C), calcula la Tm de un ADN con un 40 % de G+C y de otro con un 60 %.", [
      "40 %: 69,3 + 0,41 · 40 = 69,3 + 16,4 = <b>85,7 °C</b>.",
      "60 %: 69,3 + 0,41 · 60 = 69,3 + 24,6 = <b>93,9 °C</b>.",
      "El más rico en G + C necesita más calor: tiene más pares con 3 puentes."
    ]) +
    ojo("En Selectividad suelen dar los porcentajes de una base y piden las demás, o dan una secuencia y piden la complementaria o el ARNm. Escribe siempre 5′ y 3′ en los extremos para no equivocarte con la antiparalelia.")
  ) });

  nuevas.push({ h: "7. Ejemplo PAU resuelto: interpretar un experimento", html: env(
    ejemplo("Hershey y Chase", "Un grupo de bacteriófagos se cultiva con <sup>32</sup>P y otro con <sup>35</sup>S. Cada lote infecta bacterias; tras agitar y centrifugar, se mide la radiactividad: lote A, 85 % de <sup>32</sup>P en el sedimento y 15 % en el sobrenadante; lote B, 80 % de <sup>35</sup>S en el sobrenadante y 20 % en el sedimento. (a) ¿Qué molécula marca cada isótopo y por qué? (b) ¿Qué indica el resultado? (c) ¿Para qué sirve la batidora y la centrifugación?", [
      "<b>(a)</b> El fósforo está en el <b>ADN</b> (grupos fosfato) y casi no en las proteínas; el azufre está en algunos aminoácidos (<b>proteínas</b>) y no en el ADN. Por tanto <sup>32</sup>P marca el ADN y <sup>35</sup>S marca la proteína.",
      "<b>(b)</b> El <sup>32</sup>P (ADN) aparece mayoritariamente en el sedimento, es decir, <b>dentro</b> de las bacterias; el <sup>35</sup>S (proteína) queda fuera, en el sobrenadante. Solo el ADN entra en la bacteria y dirige la formación de nuevos virus: el <b>ADN es el material genético</b>.",
      "<b>(c)</b> La batidora separa de la superficie bacteriana las cubiertas vacías; la centrifugación hace sedimentar las bacterias (más pesadas) y deja los restos del virus en el líquido.",
      "<b>Detalle de examen:</b> el reparto no es 100 / 0 porque la separación es imperfecta (algo de ADN queda sin entrar y algo de proteína se queda pegado); lo que importa es la <b>mayoría</b> en cada fracción."
    ]) +
    ejemplo("Interpretar composición de bases", "Se analizan tres muestras de ácido nucleico. M1: A 27 %, T 27 %, G 23 %, C 23 %. M2: A 25 %, T 30 %, G 24 %, C 21 %. M3: A 22 %, U 28 %, G 31 %, C 19 %. (a) Indica de qué molécula se trata en cada caso. (b) ¿Cuál tiene más puentes de hidrógeno por par de bases?", [
      "<b>M1:</b> A = T y G = C: ADN <b>bicatenario</b> (27 + 27 + 23 + 23 = 100).",
      "<b>M2:</b> hay T pero A ≠ T y G ≠ C: ADN <b>monocatenario</b> (virus como el ϕX174); no se pueden aparear dos hebras. Suma: 100.",
      "<b>M3:</b> hay <b>uracilo</b> y no timina: es <b>ARN</b>. Suma: 22 + 28 + 31 + 19 = 100.",
      "<b>(b)</b> Solo M1 tiene pares. G + C = 46 %: por par, 2 · 0,54 + 3 · 0,46 = 1,08 + 1,38 = <b>2,46 puentes</b> de media por par de bases."
    ]) +
    ejemplo("Curva de fusión del ADN", "Se calientan dos muestras de ADN bicatenario y se mide la absorbancia a 260 nm (sube cuando se separan las hebras). La muestra X se desnaturaliza a mitad a 86 °C y la Y a 94 °C. (a) ¿Qué ocurre al calentar? (b) ¿Cuál tiene más G + C? (c) ¿Se rompen los enlaces fosfodiéster?", [
      "<b>(a)</b> Se rompen los <b>puentes de hidrógeno</b> y las hebras se separan (desnaturalización). La absorbancia sube porque las bases libres absorben más luz UV.",
      "<b>(b)</b> La <b>Y</b>: su Tm es mayor porque tiene más pares C–G (3 puentes de H), que cuestan más de romper.",
      "<b>(c)</b> No: los enlaces fosfodiéster son covalentes, mucho más fuertes; la molécula conserva cada hebra intacta. Al enfriar despacio, las hebras vuelven a unirse (renaturalización)."
    ])) });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar con la estructura → ejemplo → función</b>. Preguntas típicas con respuesta modelo:</p>" +
    ejemplo("Pregunta 1. El nucleótido y el polinucleótido", "Respuesta modelo:", [
      "<b>Nucleótido:</b> pentosa + base nitrogenada + grupo fosfato (el nucleósido es solo pentosa + base).",
      "<b>Enlace:</b> el –OH del C3′ de uno con el fosfato del C5′ del siguiente: <b>enlace fosfodiéster</b>, con pérdida de agua.",
      "<b>Resultado:</b> una cadena con esqueleto azúcar–fosfato, sentido 5′→3′ y las bases hacia un lado."
    ]) +
    ejemplo("Pregunta 2. Modelo de Watson y Crick", "Respuesta modelo:", [
      "<b>Doble hélice</b> dextrógira de dos hebras <b>antiparalelas</b>, con el esqueleto azúcar–fosfato por fuera y las bases por dentro.",
      "<b>Complementariedad:</b> A–T (2 puentes de H) y C–G (3 puentes de H): por eso A = T y C = G (Chargaff).",
      "<b>Medidas:</b> 2 nm de diámetro; 0,34 nm entre pares de bases; 3,4 nm por vuelta (10 pb).",
      "<b>Consecuencia biológica:</b> cada hebra sirve de molde para copiar la otra: replicación semiconservativa."
    ]) +
    ejemplo("Pregunta 3. Niveles de empaquetamiento", "Respuesta modelo:", [
      "<b>Nucleosoma:</b> ≈ 146 pb enrollados en casi 2 vueltas sobre un octámero de histonas (H2A, H2B, H3, H4 ×2): «collar de perlas» de 11 nm.",
      "<b>Fibra de 30 nm:</b> los nucleosomas se enrollan en solenoide con la histona H1.",
      "<b>Bucles</b> de la fibra sobre un armazón proteico y, en la división, <b>cromosoma</b> metafásico, el máximo grado de condensación.",
      "<b>Para qué:</b> meter ≈ 2 m de ADN en un núcleo de micras y regular qué genes están activos."
    ]) +
    ejemplo("Pregunta 4. Diferencias ADN / ARN y tipos de ARN", "Respuesta modelo:", [
      "<b>Diferencias:</b> desoxirribosa / ribosa; T / U; doble hélice / cadena simple; más largo y estable / más corto y menos estable.",
      "<b>ARNm:</b> lleva la copia de un gen (codones). <b>ARNt:</b> trébol, anticodón, lleva aminoácidos. <b>ARNr:</b> forma los ribosomas y cataliza el enlace peptídico.",
      "<b>Conexión:</b> el ADN almacena, el ARN expresa: ADN → ARN → proteína (temas 11 y 12)."
    ]) +
    "<p>Los ejercicios del final del tema incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio5a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
