/* ============================================================
   Biología II · ampliaciones · Tema 4: Proteínas y enzimas
   (parte A: teoría. Parte B, bio2_t04b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t4.js (bio_aminoacidos, bio_enzima, bio_factores).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Fórmula general del aminoácido y formación del enlace peptídico (con pérdida de agua) → sección 1 + esquema + widget bio_aminoacidos.
   2. Los cuatro niveles de estructura y qué enlaces mantiene cada uno → sección 2 + clasificar.
   3. Desnaturalización: qué se rompe, qué NO se rompe (el enlace peptídico) y renaturalización → sección 2 (tabla desnaturalizar/hidrolizar).
   4. Funciones de las proteínas con un ejemplo concreto de cada una → sección 3 + emparejar.
   5. Enzima, sitio activo, complejo enzima-sustrato y energía de activación; llave-cerradura y ajuste inducido → sección 4 + ordenar.
   6. Cofactores y coenzimas (vitaminas) y clases de enzimas → sección nueva 5.
   7. Cinética de Michaelis–Menten: saturación, Vmax y Km (cualitativa) y efecto de [E] → sección nueva 6 + widget bio_enzima.
   8. Inhibición competitiva, no competitiva e irreversible; regulación alostérica y retroinhibición → sección nueva 7.
   9. Efecto del pH y de la temperatura: gráficas en campana y por qué la curva cae → sección nueva 8 + widget bio_factores.
   10. Interpretar un experimento (hígado + agua oxigenada) y una gráfica de inhibición → sección nueva 10 (ejemplos PAU resueltos).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t4/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // esquema del enlace peptídico (SVG con colores del tema)
  var SVG_PEPTIDICO =
    "<svg class='bio4-svg' viewBox='0 0 560 190' role='img' aria-label='Dos aminoácidos se unen por un enlace peptídico y se libera una molécula de agua'>" +
    "<rect class='caja' x='4' y='4' width='552' height='182' rx='12'/>" +
    "<text class='at' x='24' y='38'>H₂N–CH(R₁)–CO–<tspan fill='var(--pen)'>OH</tspan></text>" +
    "<text class='at' x='262' y='38'>+</text>" +
    "<text class='at' x='292' y='38'><tspan fill='var(--pen)'>H</tspan>–NH–CH(R₂)–COOH</text>" +
    "<text class='pie' x='24' y='56'>aminoácido 1 (el grupo carboxilo cede el OH)</text>" +
    "<text class='pie' x='292' y='56'>aminoácido 2 (el grupo amino cede un H)</text>" +
    "<path class='en' d='M280 70 L280 98 M272 90 L280 100 L288 90'/>" +
    "<text class='pie' x='292' y='90'>condensación: se pierde H₂O</text>" +
    "<text class='at' x='24' y='134'>H₂N–CH(R₁)<tspan fill='var(--red)'>–CO–NH–</tspan>CH(R₂)–COOH</text>" +
    "<text class='pie' x='24' y='160'>dipéptido: en rojo, el enlace peptídico (–CO–NH–)</text>" +
    "<ellipse class='h2o' cx='480' cy='128' rx='48' ry='20'/>" +
    "<text class='at' x='480' y='134' text-anchor='middle'>H₂O</text>" +
    "<text class='at' x='392' y='134'>+</text>" +
    "</svg>";

  // ---------------------------------------------------------------- 1. Aminoácidos
  secciones[0] = env(
    "<h5>La fórmula que tienes que saber dibujar</h5>" +
    "<p>Todos los aminoácidos tienen la misma «cabeza» y distinto «apellido». Alrededor de un carbono central, el <b>carbono α</b>, se unen cuatro cosas: un <b>grupo amino</b> (–NH<sub>2</sub>), un <b>grupo carboxilo</b> (–COOH), un <b>hidrógeno</b> y un <b>radical R</b>. La fórmula general es <b>H<sub>2</sub>N–CH(R)–COOH</b>. Lo único que cambia de un aminoácido a otro es el radical R, y de él dependen sus propiedades.</p>" +
    "<ul>" +
    "<li><b>Glicina</b>: R = H (el más sencillo; el único sin carbono quiral). <b>Alanina</b>: R = CH<sub>3</sub>.</li>" +
    "<li><b>Cisteína</b>: R termina en –SH. Dos cisteínas pueden unirse por un <b>puente disulfuro</b> (–S–S–), un enlace covalente que fija la forma de la proteína.</li>" +
    "<li>En las proteínas de todos los seres vivos los aminoácidos son de la forma <b>L</b> (una de las dos imágenes especulares que permite el carbono α).</li>" +
    "</ul>" +
    "<h5>Los 20 aminoácidos, ordenados por su radical</h5>" +
    tabla(["Tipo de radical", "Ejemplos", "Cómo se comporta en agua"], [
      ["<b>Apolar</b> (9)", "Gly, Ala, Val, Leu, Ile, Pro, Met, Phe, Trp", "Rehúye el agua (hidrófobo): en una proteína globular se esconde en el interior"],
      ["<b>Polar sin carga</b> (6)", "Ser, Thr, Cys, Tyr, Asn, Gln", "Forma puentes de hidrógeno con el agua: queda en la superficie"],
      ["<b>Ácido</b> (2)", "Asp, Glu", "Pierde un H⁺ y queda con carga negativa a pH 7"],
      ["<b>Básico</b> (3)", "Lys, Arg, His", "Gana un H⁺ y queda con carga positiva (o parcial, His) a pH 7"]
    ], "q3t") +
    "<p>Son <b>aminoácidos esenciales</b> los que el cuerpo humano no puede fabricar y tiene que tomar con la dieta: <b>9 en el adulto</b> (His, Ile, Leu, Lys, Met, Phe, Thr, Trp y Val). Una dieta variada los aporta; las proteínas animales y la soja contienen todos, y los cereales y las legumbres se complementan (los cereales son pobres en lisina y las legumbres, en metionina).</p>" +
    "<h5>Anfóteros: ácido y base a la vez</h5>" +
    "<p>Un aminoácido tiene un grupo ácido (–COOH) y un grupo básico (–NH<sub>2</sub>), así que es <b>anfótero</b>. En agua, a pH próximo a 7, existe como <b>ion dipolar</b> (zwitterión): –COO⁻ y –NH<sub>3</sub><sup>+</sup> a la vez, con carga total cero. Si el medio se acidifica, gana H⁺ y se carga positivamente; si se vuelve básico, pierde H⁺ y se carga negativamente. El pH al que la carga neta es cero es el <b>punto isoeléctrico (pI)</b>, y en él las proteínas son menos solubles. Por eso la leche se corta al acidificarla: la caseína (pI ≈ 4,6) se agrupa y precipita al bajar el pH hasta ese valor, como pasa al hacer yogur o al echarle limón.</p>" +
    "<h5>El enlace peptídico</h5>" +
    "<p>El grupo carboxilo de un aminoácido reacciona con el grupo amino del siguiente: se forma un <b>enlace –CO–NH–</b> y se libera <b>una molécula de agua</b> (reacción de condensación; la contraria, con agua, es la hidrólisis). El enlace peptídico es <b>covalente</b>, <b>plano y rígido</b> (tiene algo de doble enlace) y los átomos de cada lado quedan en posición <i>trans</i>; solo giran los enlaces con el carbono α. Eso limita cómo puede plegarse la cadena.</p>" +
    SVG_PEPTIDICO +
    "<p>Una cadena tiene un extremo con un grupo amino libre (<b>extremo N</b>) y otro con un grupo carboxilo libre (<b>extremo C</b>), y la secuencia se escribe siempre de N a C. Según la longitud se habla de <b>dipéptido</b> (2 aminoácidos), tripéptido… <b>oligopéptido</b> (hasta unos 10) y <b>polipéptido</b> (más de 10). Una <b>proteína</b> es uno o varios polipéptidos plegados y funcionales (los libros suelen poner el límite en torno a 50–100 aminoácidos).</p>" +
    "<p><b>Regla de cuentas:</b> una cadena de <i>n</i> aminoácidos tiene <b>n − 1</b> enlaces peptídicos y se han liberado <b>n − 1</b> moléculas de agua. Y como hay 20 aminoácidos distintos, hay <b>20<sup><i>n</i></sup></b> secuencias posibles de longitud <i>n</i>: 20<sup>3</sup> = 8000 tripéptidos y, para una proteína de 100 aminoácidos, ≈ 1,3·10<sup>130</sup>. Una proteína típica tiene entre 100 y 1000 aminoácidos (la titina del músculo, más de 30 000).</p>" +
    w("bio_aminoacidos") +
    ojo("El agua se libera <b>al formar</b> el enlace, no al romperlo. Para romperlo hace falta <b>añadir</b> agua (hidrólisis), que es lo que hacen las proteasas al digerir. Y un péptido no es lo mismo que una proteína: la insulina (51 aminoácidos) está en el límite; la hemoglobina (574 aminoácidos en cuatro cadenas) es claramente una proteína.") +
    w("clasificar", "aminoacidos"));

  // ---------------------------------------------------------------- 2. Niveles de estructura
  secciones[1] = env(
    "<h5>Cada nivel, con sus enlaces</h5>" +
    "<p>La forma de una proteína se describe en cuatro niveles. Cada uno se apoya en el anterior, y lo importante es saber <b>qué enlace</b> mantiene cada nivel.</p>" +
    tabla(["Nivel", "Qué es", "Enlaces o fuerzas", "Ejemplo"], [
      ["<b>Primaria</b>", "Secuencia lineal de aminoácidos (el «texto»)", "Enlaces peptídicos (covalentes)", "Hemoglobina: cadenas de 141 (α) y 146 (β) aminoácidos"],
      ["<b>Secundaria</b>", "Plegamiento local regular: hélice α o lámina β", "Puentes de hidrógeno entre –CO– y –NH– de la cadena principal", "α-queratina (hélice α); fibroína de la seda (lámina β)"],
      ["<b>Terciaria</b>", "Forma 3D completa de una sola cadena", "Entre radicales R: puentes disulfuro, puentes de H, atracciones iónicas, interacciones hidrofóbicas, fuerzas de Van der Waals", "Mioglobina (≈ 150 aa), una enzima"],
      ["<b>Cuaternaria</b>", "Unión de varias cadenas (subunidades) ya plegadas", "Los mismos enlaces débiles entre subunidades", "Hemoglobina: 2 cadenas α + 2 β"]
    ], "q3t") +
    "<ul>" +
    "<li><b>Hélice α:</b> la cadena se enrolla como un muelle (3,6 aminoácidos por vuelta); cada –CO– forma un puente de H con el –NH– del aminoácido cuatro puestos más allá.</li>" +
    "<li><b>Lámina β:</b> tramos de cadena extendidos se colocan uno junto a otro (como una hoja plegada en acordeón) y los puentes de H unen tramos vecinos.</li>" +
    "<li><b>Terciaria:</b> en las proteínas globulares, que viven en agua, los radicales apolares se agrupan <b>dentro</b> (interacciones hidrofóbicas) y los polares o cargados quedan <b>fuera</b>. Por eso son solubles.</li>" +
    "<li><b>Cuaternaria:</b> solo existe en proteínas con más de una cadena. La mioglobina (una cadena) llega hasta la terciaria; la hemoglobina (cuatro) tiene cuaternaria y cada cadena guarda un grupo hemo con hierro que une una molécula de O<sub>2</sub>.</li>" +
    "</ul>" +
    "<h5>Una letra cambia una proteína: la anemia falciforme</h5>" +
    "<p>La secuencia primaria lo decide todo, porque de ella sale el plegamiento. En la <b>anemia falciforme</b> basta un solo cambio: en la posición 6 de la cadena β de la hemoglobina, el aminoácido <b>ácido glutámico</b> (ácido, polar) es sustituido por <b>valina</b> (apolar). La hemoglobina anómala (HbS) forma fibras cuando hay poco oxígeno y los glóbulos rojos adoptan forma de hoz, se atascan en los capilares y se destruyen antes. Un cambio en la primaria cambia la terciaria y la cuaternaria, y con ellas la función.</p>" +
    "<h5>Proteínas fibrosas y globulares; simples y conjugadas</h5>" +
    tabla(["", "Fibrosas", "Globulares"], [
      ["<b>Forma</b>", "Alargada, en cables o láminas", "Enrollada en un ovillo compacto"],
      ["<b>Solubilidad</b>", "Insolubles en agua", "Solubles en agua"],
      ["<b>Función</b>", "Estructural y de protección", "Transporte, enzimática, hormonal, defensiva"],
      ["<b>Ejemplos</b>", "Colágeno, queratina, elastina, fibroína", "Hemoglobina, albúmina, anticuerpos, la mayoría de las enzimas"]
    ], "q3t") +
    "<p>Según su composición, las <b>holoproteínas</b> contienen solo aminoácidos (albúmina, colágeno) y las <b>heteroproteínas</b> llevan además una parte no proteica, el <b>grupo prostético</b>: la hemoglobina (grupo hemo, es una cromoproteína), las glucoproteínas (glúcido), las lipoproteínas (lípidos, como el LDL y el HDL del colesterol), las nucleoproteínas (ácidos nucleicos, como las histonas con el ADN).</p>" +
    "<p>Dato típico: el <b>colágeno</b> es la proteína más abundante del cuerpo humano. No tiene hélice α: son tres cadenas enrolladas entre sí en una <b>triple hélice</b> rica en glicina, prolina e hidroxiprolina. Para hidroxilar la prolina hace falta la <b>vitamina C</b>; sin ella el colágeno es defectuoso, y aparece el escorbuto (encías que sangran, heridas que no cierran).</p>" +
    w("clasificar", "niveles") +
    "<h5>Desnaturalización y renaturalización</h5>" +
    "<p>Los enlaces que mantienen la secundaria, la terciaria y la cuaternaria son débiles (puentes de H, atracciones iónicas, interacciones hidrofóbicas) salvo los puentes disulfuro. Si algo los rompe, la proteína <b>se desdobla y pierde su forma 3D</b>: es la <b>desnaturalización</b>. La secuencia primaria queda intacta, pero la proteína <b>pierde su función</b> (una enzima deja de ser enzima) y suele volverse <b>menos soluble</b>: se coagula y precipita. Los <b>agentes desnaturalizantes</b> son el calor, los cambios fuertes de pH, el alcohol y otros disolventes orgánicos, los detergentes, la urea (7–8 M), las sales de metales pesados (Hg²⁺, Pb²⁺, Ag⁺) y la agitación.</p>" +
    "<ul>" +
    "<li><b>Huevo:</b> al cocerlo, la clara pasa de transparente a blanca y sólida: las proteínas (ovoalbúmina) se han desnaturalizado y se han agregado. No vuelve atrás.</li>" +
    "<li><b>Alcohol de 70°:</b> desinfecta porque desnaturaliza las proteínas de las bacterias (de 96° no penetra igual: coagula la superficie).</li>" +
    "<li><b>Permanente del pelo:</b> se reducen los puentes disulfuro de la queratina, se da la forma deseada y se vuelven a formar en otra posición.</li>" +
    "</ul>" +
    "<p><b>¿Siempre es irreversible?</b> No. En 1961, <b>Anfinsen</b> trató la ribonucleasa con urea y un reductor: la enzima se desplegó y perdió su actividad. Al eliminar ambos, la proteína <b>recuperó</b> su forma y su actividad: <b>renaturalización</b>. Conclusión (Nobel de Química 1972): la secuencia primaria contiene la información para plegarse. En la célula, unas proteínas llamadas <b>chaperonas</b> ayudan a que las cadenas recién hechas se plieguen bien y a que no se agreguen; los <b>priones</b> (enfermedad de las «vacas locas») son una proteína normal que se pliega mal y arrastra a las demás.</p>" +
    tabla(["", "Desnaturalización", "Hidrólisis de la proteína"], [
      ["<b>Qué rompe</b>", "Enlaces débiles (y a veces S–S)", "Enlaces peptídicos"],
      ["<b>Primaria</b>", "Se conserva", "Se destruye"],
      ["<b>Cómo se produce</b>", "Calor, pH, alcohol, urea…", "Proteasas (digestión) o ácido fuerte caliente"],
      ["<b>Resultado</b>", "Cadena desplegada, sin función", "Aminoácidos o péptidos cortos"]
    ], "q3t") +
    ojo("Cocinar la carne <b>desnaturaliza</b> las proteínas, pero no las digiere. De hecho, las desnaturalizadas se digieren mejor, porque las proteasas llegan más fácil a los enlaces peptídicos. Digerir es hidrolizar los enlaces peptídicos; desnaturalizar no rompe ni uno.") +
    "");

  // ---------------------------------------------------------------- 3. Funciones
  secciones[2] = env(
    "<h5>Una función, un ejemplo concreto</h5>" +
    "<p>En el examen no basta con decir «transporte»: hay que nombrar <b>la proteína y qué hace</b>. Esta es la tabla que conviene saberse:</p>" +
    tabla(["Función", "Proteína", "Qué hace"], [
      ["<b>Estructural</b>", "Colágeno, queratina, elastina, tubulina", "Dan resistencia a tendones y piel, forman pelo y uñas, dan elasticidad a los vasos y forman los microtúbulos del citoesqueleto"],
      ["<b>Enzimática</b>", "Amilasa, catalasa, ADN polimerasa", "Catalizan casi todas las reacciones de la célula"],
      ["<b>Transporte</b>", "Hemoglobina, albúmina, proteínas de membrana", "Llevan O<sub>2</sub>, ácidos grasos libres e iones y glucosa a través de las membranas"],
      ["<b>Defensiva</b>", "Anticuerpos (inmunoglobulinas), fibrinógeno y trombina", "Reconocen y neutralizan antígenos; coagulan la sangre y tapan heridas"],
      ["<b>Hormonal</b>", "Insulina, glucagón, hormona del crecimiento", "Mensajeros químicos que regulan el metabolismo y el crecimiento"],
      ["<b>Contráctil</b>", "Actina y miosina", "Se deslizan unas sobre otras y contraen el músculo"],
      ["<b>Reserva</b>", "Ovoalbúmina (huevo), caseína (leche)", "Aportan aminoácidos al embrión o a la cría"],
      ["<b>Homeostática</b>", "Proteínas del plasma", "Amortiguan el pH y mantienen la presión osmótica de la sangre"],
      ["<b>Receptor y reconocimiento</b>", "Receptores de membrana, antígenos de superficie", "Reciben las señales del exterior y permiten a la célula reconocer a otras"]
    ], "q3t") +
    "<p>Una misma proteína puede variar de función según el tejido, y una proteína solo existe si el gen que la codifica se expresa: de ahí que la función de cada célula dependa de qué proteínas fabrica.</p>" +
    w("emparejar", "funciones"));

  // ---------------------------------------------------------------- 4. Enzimas
  secciones[3] = env(
    "<p>Durante mucho tiempo nadie supo de qué estaban hechas. En 1926, <b>James Sumner</b> cristalizó la ureasa y demostró que una enzima es una <b>proteína</b> (Nobel de Química 1946).</p>" +
    "<h5>El sitio activo y el complejo enzima-sustrato</h5>" +
    "<p>Una enzima es mucho mayor que su sustrato, pero solo una pequeña zona, el <b>sitio activo</b>, participa en la reacción. Está formado por unos pocos aminoácidos que, aunque estén lejos en la secuencia primaria, quedan juntos gracias al plegamiento: otra razón por la que <b>la forma 3D lo es todo</b>. En el sitio activo hay un <b>centro de unión</b> (reconoce al sustrato) y un <b>centro catalítico</b> (rompe o forma enlaces). El sustrato se une y forma el <b>complejo enzima-sustrato</b> (ES); se produce la reacción y se liberan el producto y la enzima, intacta y lista para empezar de nuevo:</p>" +
    "<div class='formula-wrap'><div class='formula'>E + S ⇌ ES → E + P</div></div>" +
    "<h5>Dos modelos de acoplamiento</h5>" +
    tabla(["Modelo", "Quién y cuándo", "Idea"], [
      ["<b>Llave-cerradura</b>", "Emil Fischer, 1894", "El sitio activo tiene una forma rígida complementaria a la del sustrato, como una llave en su cerradura"],
      ["<b>Ajuste inducido</b>", "Daniel Koshland, 1958", "El sitio activo es flexible: al llegar el sustrato, la enzima cambia de forma y se adapta, como una mano a un guante. Es el modelo que se acepta hoy"]
    ], "q3t") +
    "<h5>Cómo baja la energía de activación</h5>" +
    "<p>Una enzima <b>no cambia</b> la energía de los reactivos ni la de los productos (ΔG), ni el equilibrio: solo hace la reacción <b>más rápida</b>. Disminuye la <b>energía de activación</b> (E<sub>a</sub>), la barrera de energía que hay que superar (es el mismo concepto del Tema 5 de Química II). Lo logra al <b>acercar y orientar</b> a los sustratos, <b>tensar</b> sus enlaces y crear en el sitio activo un ambiente químico favorable. Las enzimas aceleran las reacciones entre millones y más de 10<sup>12</sup> veces: sin ellas, en una célula a 37 °C muchas reacciones tardarían años.</p>" +
    "<h5>Enzima frente a catalizador inorgánico</h5>" +
    tabla(["", "Enzima", "Catalizador inorgánico (Pt, Fe…)"], [
      ["<b>Naturaleza</b>", "Proteína (a veces con cofactor)", "Metal u óxido"],
      ["<b>Especificidad</b>", "Muy alta: un sustrato y un tipo de reacción", "Baja: sirve para muchas reacciones"],
      ["<b>Condiciones</b>", "Suaves: 37 °C, pH ≈ 7, en agua", "A menudo temperatura y presión altas"],
      ["<b>Control</b>", "Se activa, se inhibe y se regula", "No se regula"],
      ["<b>Efecto del calor</b>", "Se desnaturaliza por encima de su óptimo", "Aguanta temperaturas altas"],
      ["<b>Lo que tienen en común</b>", "No se consumen, bajan la E<sub>a</sub> y no cambian el equilibrio", "Ídem"]
    ], "q3t") +
    "<h5>Ejemplos que ya conoces</h5>" +
    "<ul>" +
    "<li><b>Amilasa</b> de la saliva: rompe el almidón en azúcares más sencillos (por eso el pan masticado sabe dulce al cabo de un rato).</li>" +
    "<li><b>Lactasa</b>: rompe la lactosa. Si falta, hay intolerancia a la lactosa; la leche «sin lactosa» lleva lactasa añadida.</li>" +
    "<li><b>Catalasa</b>: descompone el agua oxigenada tóxica (2 H<sub>2</sub>O<sub>2</sub> → 2 H<sub>2</sub>O + O<sub>2</sub>). Por eso la herida burbujea; y por eso el hígado y la patata crudos burbujean al echarles agua oxigenada.</li>" +
    "<li><b>Bromelina</b> de la piña: una proteasa. La gelatina (colágeno) no cuaja con piña fresca, porque la enzima la rompe; sí con piña en lata, porque el calor del enlatado la desnaturalizó.</li>" +
    "</ul>" +
    w("orden", "catalisis") + w("emparejar", "enzimas") +
    ojo("«La enzima se gasta» y «la enzima transforma la reacción» son errores clásicos. La enzima <b>no se consume</b> (se recupera al final) y <b>no cambia el equilibrio</b>: lleva a la misma mezcla final, pero antes.") +
    "");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Cofactores, vitaminas y clases de enzimas", html: env(
    "<p>Algunas enzimas son solo proteína (<b>enzimas simples</b>). Otras, las <b>conjugadas</b>, necesitan un ayudante no proteico, el <b>cofactor</b>, para funcionar. La parte proteica sola es la <b>apoenzima</b> (inactiva) y la enzima completa y activa es la <b>holoenzima</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>holoenzima (activa) = apoenzima (proteína) + cofactor</div></div>" +
    tabla(["Cofactor", "Qué es", "Ejemplos"], [
      ["<b>Ion metálico</b>", "Catión inorgánico", "Zn²⁺ (anhidrasa carbónica), Mg²⁺ (quinasas), Fe²⁺ (catalasa, en el grupo hemo), Cu²⁺"],
      ["<b>Coenzima</b>", "Molécula orgánica, casi siempre derivada de una <b>vitamina</b>; transporta electrones o grupos de átomos", "NAD⁺ (vitamina B<sub>3</sub>, niacina), FAD (B<sub>2</sub>, riboflavina), coenzima A (B<sub>5</sub>, ácido pantoténico), TPP (B<sub>1</sub>, tiamina)"],
      ["<b>Grupo prostético</b>", "Cofactor unido de forma permanente a la enzima", "Grupo hemo de la catalasa"]
    ], "q3t") +
    "<p>Esto explica por qué las <b>vitaminas</b> son necesarias en cantidades pequeñas y por qué su falta da enfermedades: sin la vitamina, falta la coenzima y las enzimas que la necesitan no funcionan (falta de B<sub>1</sub>: beriberi; de B<sub>3</sub>: pelagra; de C: escorbuto). Y los iones metálicos son los <b>oligoelementos</b> del Tema 1 (Zn, Fe, Cu…) trabajando en el sitio activo.</p>" +
    w("emparejar", "coenzimas") +
    "<h5>Cómo se llaman y cómo se clasifican</h5>" +
    "<p>Muchas enzimas se nombran con el nombre de su <b>sustrato</b> más <b>-asa</b> (lactosa → <b>lactasa</b>; lípidos → <b>lipasa</b>) o con el <b>tipo de reacción</b> (deshidrogenasa). Algunas conservan nombres antiguos (pepsina, tripsina). Según la reacción que catalizan, se agrupan en <b>6 clases</b>:</p>" +
    tabla(["Clase", "Qué hace", "Ejemplos"], [
      ["<b>1. Oxidorreductasas</b>", "Transfieren electrones: oxidan y reducen", "Deshidrogenasa láctica, catalasa"],
      ["<b>2. Transferasas</b>", "Pasan un grupo químico de una molécula a otra", "Hexoquinasa (pasa un fosfato del ATP a la glucosa)"],
      ["<b>3. Hidrolasas</b>", "Rompen enlaces añadiendo agua", "Amilasa, lipasa, lactasa, pepsina, tripsina"],
      ["<b>4. Liasas</b>", "Rompen o forman enlaces sin agua ni oxidación (a menudo con dobles enlaces)", "Fumarasa, descarboxilasas"],
      ["<b>5. Isomerasas</b>", "Reordenan átomos dentro de la molécula (isómeros)", "Glucosa-fosfato isomerasa"],
      ["<b>6. Ligasas</b>", "Unen dos moléculas gastando ATP", "ADN ligasa, sintetasas"]
    ], "q3t") +
    w("clasificar", "clases")) });

  nuevas.push({ h: "6. Cinética enzimática: Michaelis–Menten", html: env(
    "<p>La <b>velocidad inicial</b> (v) es la cantidad de producto que aparece por unidad de tiempo en los primeros instantes, cuando aún no se ha acabado el sustrato. Si se mide con distintas concentraciones de sustrato [S] y se dibuja, sale una <b>hipérbola</b> (Michaelis y Menten, 1913):</p>" +
    "<ul>" +
    "<li><b>Con poco sustrato</b> hay enzimas libres de sobra: cada molécula de sustrato que se añade encuentra enzima y la velocidad crece casi en línea recta.</li>" +
    "<li><b>Al aumentar [S]</b> las enzimas se van ocupando y la curva se aplana.</li>" +
    "<li><b>Con mucho sustrato</b> todas las enzimas están ocupadas (<b>saturación</b>): la velocidad llega a un tope, la <b>velocidad máxima (V<sub>max</sub>)</b>, y por más sustrato que se añada ya no sube. Es como un autobús: una vez llenos todos los asientos, subir a más gente no lo hace más rápido.</li>" +
    "</ul>" +
    "<p>La <b>constante de Michaelis (K<sub>m</sub>)</b> es la concentración de sustrato a la que la velocidad vale <b>la mitad de la máxima</b>. Es una concentración (mM), no una velocidad, y mide la <b>afinidad</b> de la enzima por el sustrato: <b>K<sub>m</sub> baja = mucha afinidad</b> (con poco sustrato ya está casi saturada); K<sub>m</sub> alta = poca afinidad. Un ejemplo: la hexoquinasa, que fosforila la glucosa en todas las células, tiene una K<sub>m</sub> ≈ 0,1 mM y trabaja con poca glucosa; la glucoquinasa del hígado, con K<sub>m</sub> ≈ 10 mM, solo trabaja a fondo cuando hay mucha glucosa en sangre, justo después de comer.</p>" +
    "<p>La ecuación de la curva, que no hace falta saber de memoria pero ayuda a entenderla, es <b>v = V<sub>max</sub> · [S] / (K<sub>m</sub> + [S])</b>. De ella salen tres lecturas útiles:</p>" +
    tabla(["[S] frente a K<sub>m</sub>", "v / V<sub>max</sub>", "Lectura"], [
      ["[S] = 0,1 · K<sub>m</sub>", "9 %", "Muy lejos de saturar: v casi proporcional a [S]"],
      ["[S] = K<sub>m</sub>", "50 %", "Definición de K<sub>m</sub>"],
      ["[S] = 4 · K<sub>m</sub>", "80 %", "Ya se nota el aplanamiento"],
      ["[S] = 9 · K<sub>m</sub>", "90 %", "Casi saturada"],
      ["[S] = 19 · K<sub>m</sub>", "95 %", "Doblar [S] ya apenas sirve de nada"]
    ], "q3t") +
    "<p>Y <b>la cantidad de enzima [E]</b>: si se duplica [E], hay el doble de sitios activos y <b>V<sub>max</sub> se duplica</b>; K<sub>m</sub> (que depende de la enzima y del sustrato, no de cuánta enzima haya) <b>no cambia</b>.</p>" +
    w("bio_enzima") +
    ojo("«Con más sustrato, la velocidad sube siempre» es falso: se llega a V<sub>max</sub>. Y «K<sub>m</sub> es la velocidad a la mitad» también: K<sub>m</sub> es la <b>concentración de sustrato</b> a la que se alcanza la mitad de la velocidad máxima.") +
    "<p>Si en un examen aparece una gráfica de v frente a [S]: <b>(1)</b> localiza la meseta (V<sub>max</sub>); <b>(2)</b> baja a la mitad de esa altura y lee en el eje horizontal (K<sub>m</sub>); <b>(3)</b> si hay dos curvas, compara las mesetas y compara dónde están las mitades.</p>") });

  nuevas.push({ h: "7. Inhibición y regulación de las enzimas", html: env(
    "<p>Un <b>inhibidor</b> es una sustancia que reduce la actividad de una enzima. Es una de las formas de controlar el metabolismo y la base de muchos medicamentos y venenos. Se distinguen por el lugar de unión y por cómo afectan a la curva de Michaelis (la V<sub>max</sub> y la K<sub>m</sub>):</p>" +
    tabla(["", "Competitiva", "No competitiva", "Irreversible"], [
      ["<b>Dónde se une</b>", "Al sitio activo, porque se parece al sustrato", "A otro lugar de la enzima (fuera del sitio activo): cambia su forma", "Al sitio activo (o cerca), con enlace covalente"],
      ["<b>V<sub>max</sub></b>", "No cambia", "Disminuye", "Disminuye (enzima destruida)"],
      ["<b>K<sub>m</sub></b>", "Aumenta (aparente)", "No cambia", "—"],
      ["<b>¿Se supera con más sustrato?</b>", "Sí", "No", "No"],
      ["<b>Ejemplos</b>", "Malonato (frente a succinato), sulfamidas, metotrexato, estatinas, ibuprofeno", "Metales pesados (Hg²⁺, Pb²⁺) sobre los grupos –SH", "Penicilina, aspirina, cianuro, gases nerviosos e insecticidas organofosforados"]
    ], "q3t") +
    "<p>La <b>inhibición competitiva</b> se entiende con una imagen: inhibidor y sustrato <b>compiten</b> por el mismo sitio. Si hay mucho sustrato, este gana casi siempre, y se llega igualmente a la misma V<sub>max</sub>; por eso, en la gráfica, la curva con inhibidor termina en el mismo tope pero tarda más en llegar (K<sub>m</sub> aparente mayor). En la <b>no competitiva</b> el inhibidor inutiliza una parte de las enzimas sin que el sustrato pueda hacer nada: la meseta baja.</p>" +
    "<h5>Medicamentos y venenos que son inhibidores</h5>" +
    "<ul>" +
    "<li><b>Penicilina:</b> inhibe de forma irreversible la enzima que une las cadenas de la pared celular bacteriana (transpeptidasa). Sin pared, las bacterias estallan; las células humanas no tienen pared.</li>" +
    "<li><b>Aspirina:</b> inhibe de forma irreversible la ciclooxigenasa y frena la fabricación de prostaglandinas del dolor y la fiebre.</li>" +
    "<li><b>Estatinas:</b> inhiben (competitivamente) la HMG-CoA reductasa, enzima clave de la síntesis de colesterol.</li>" +
    "<li><b>Cianuro:</b> bloquea la citocromo c oxidasa de la respiración celular, y las células no pueden usar el oxígeno.</li>" +
    "<li><b>Sulfamidas:</b> parecen al ácido p-aminobenzoico (PABA) y compiten por la enzima de las bacterias que lo usa para fabricar ácido fólico.</li>" +
    "</ul>" +
    w("clasificar", "inhibicion") +
    "<h5>Cómo regula la célula sus propias enzimas</h5>" +
    "<ul>" +
    "<li><b>Enzimas alostéricas:</b> además del sitio activo tienen otro sitio (el <b>alostérico</b>) donde se une un <b>modulador</b>, positivo (activa) o negativo (inhibe), que cambia la forma del sitio activo. Su curva es <b>sigmoidea</b> (en «S») y no hiperbólica, porque las subunidades cooperan.</li>" +
    "<li><b>Retroinhibición (<i>feedback</i>):</b> el producto final de una ruta inhibe la primera enzima de esa misma ruta, y así no se fabrica de más. Ejemplo: la isoleucina inhibe la primera enzima de su propia ruta de síntesis (treonina desaminasa).</li>" +
    "<li><b>Zimógenos (proenzimas):</b> enzimas que se fabrican inactivas y se activan al cortar un fragmento de la cadena, justo donde hacen falta. Así evitan digerir la célula que las fabrica: el <b>tripsinógeno</b> del páncreas se activa en el intestino y el <b>pepsinógeno</b> del estómago se activa con el HCl.</li>" +
    "<li><b>Modificaciones químicas:</b> por ejemplo, añadir o quitar un grupo fosfato activa o desactiva una enzima.</li>" +
    "</ul>") });

  nuevas.push({ h: "8. Factores que afectan a la actividad enzimática", html: env(
    "<p>La actividad de una enzima depende de cuatro cosas: <b>la concentración de sustrato</b> y <b>de enzima</b> (sección anterior), <b>la temperatura</b> y <b>el pH</b>. Las dos últimas dan curvas en campana, pero por motivos distintos:</p>" +
    tabla(["Factor", "Por debajo del óptimo", "En el óptimo", "Por encima / lejos del óptimo"], [
      ["<b>Temperatura</b>", "Poca energía cinética: menos choques, reacción lenta. La enzima <b>no se daña</b> (reversible)", "Máxima actividad (≈ 37 °C en humanos)", "Se rompen los enlaces débiles, <b>desnaturalización</b>: la actividad cae de golpe y no vuelve al enfriar"],
      ["<b>pH</b>", "Cambian las cargas de los aminoácidos del sitio activo y de la superficie", "La forma y las cargas del sitio activo son las ideales", "Igual, y además puede desnaturalizar la proteína"]
    ], "q3t") +
    "<h5>Temperatura</h5>" +
    "<p>Al subir la temperatura aumenta la velocidad (de forma aproximada, se <b>duplica por cada 10 °C</b>, lo que se llama Q<sub>10</sub> ≈ 2); pero, pasado el óptimo, la enzima se desnaturaliza y la velocidad cae casi a cero. Por eso la curva es una <b>campana asimétrica</b>: sube despacio y baja de golpe. Consecuencias: en el frigorífico o el congelador las enzimas de los alimentos (y de las bacterias) se ralentizan, <b>pero no se destruyen</b> (al sacar el alimento vuelven a actuar; por eso se «escaldan» las verduras antes de congelar); en cambio, hervir o pasteurizar sí las desnaturaliza. Las enzimas de organismos de ambientes extremos tienen otro óptimo: la <b>Taq polimerasa</b>, de la bacteria <i>Thermus aquaticus</i> de las fuentes termales, resiste los 95 °C y trabaja a ≈ 72 °C; se usa en la PCR para copiar ADN (Mullis, 1983; Nobel 1993).</p>" +
    "<h5>pH</h5>" +
    "<p>Cada enzima tiene su pH óptimo, que corresponde al lugar donde trabaja. La <b>pepsina</b> del estómago (pH ≈ 2) funciona a pH 2 y se inactiva en el intestino; la <b>amilasa salival</b> (pH ≈ 6,8) deja de actuar al llegar al estómago ácido; la <b>tripsina</b> del intestino delgado (pH ≈ 8) trabaja con el bicarbonato que neutraliza el ácido gástrico. Así, la digestión es una cadena en la que cada enzima encuentra su pH.</p>" +
    w("bio_factores") +
    "<h5>Enzimas en la vida diaria y en la industria</h5>" +
    tabla(["Enzima", "Dónde se usa", "Para qué"], [
      ["Proteasas y lipasas", "Detergentes «biológicos»", "Rompen manchas de sangre, huevo y grasa a 30–40 °C"],
      ["Lactasa", "Leche sin lactosa", "Rompe la lactosa para quienes no la digieren"],
      ["Quimosina (renina)", "Fabricación de queso", "Corta la caseína y cuaja la leche"],
      ["Glucosa oxidasa", "Tiras para medir la glucemia", "Oxida la glucosa y el cambio de color indica la cantidad"],
      ["Papaína, bromelina", "Ablandar carne, piña y gelatina", "Rompen proteínas (colágeno)"],
      ["Taq polimerasa", "PCR", "Copia ADN a alta temperatura sin desnaturalizarse"]
    ], "q3t") +
    ojo("Las enzimas no son seres vivos y no «mueren»: se <b>desnaturalizan</b>. Y el frío <b>no</b> desnaturaliza una enzima (solo la frena); lo que la destruye es el calor excesivo o un pH extremo.")) });

  nuevas.push({ h: "9. Los cálculos del tema", html: env(
    "<p>En Biología de Bachillerato no hay muchas cuentas, pero estas cuatro aparecen y se pueden ganar los puntos con facilidad.</p>" +
    ejemplo("Enlaces, agua y masa de un péptido", "El tripéptido Gly-Ala-Ser, ¿cuántos enlaces peptídicos tiene, cuántas moléculas de agua se liberaron al formarlo y cuál es su masa? (M: Gly 75,07; Ala 89,09; Ser 105,09; agua 18,015 g/mol)", [
      "n = 3 aminoácidos → n − 1 = <b>2 enlaces peptídicos</b> y <b>2 moléculas de agua</b>.",
      "Suma de masas: 75,07 + 89,09 + 105,09 = 269,25 g/mol.",
      "Masa del péptido = 269,25 − 2 · 18,015 = <b>233,22 g/mol</b>."
    ]) +
    ejemplo("Cuántas cadenas distintas puede haber", "¿Cuántos tripéptidos distintos se pueden formar con los 20 aminoácidos? ¿Y polipéptidos de 100 aminoácidos?", [
      "En cada posición se puede poner cualquiera de los 20: 20 · 20 · 20 = 20<sup>3</sup> = <b>8000 tripéptidos</b>.",
      "Para 100 posiciones: 20<sup>100</sup> ≈ <b>1,3·10<sup>130</sup></b>.",
      "Un número mayor que el de átomos del universo observable (≈ 10<sup>80</sup>): por eso la evolución solo ha «probado» una mínima parte de las proteínas posibles."
    ]) +
    ejemplo("De los aminoácidos a los nucleótidos del gen", "Una proteína tiene 99 aminoácidos. ¿Cuántos nucleótidos tiene como mínimo la región del gen que la codifica?", [
      "Cada aminoácido lo codifica un <b>triplete</b> (3 nucleótidos; se verá con los ácidos nucleicos).",
      "99 · 3 = 297 nucleótidos, más un triplete de terminación (3): <b>300 nucleótidos</b>.",
      "(El triplete de terminación no codifica ningún aminoácido: avisa de dónde acaba la proteína.)"
    ]) +
    ejemplo("Leer una tabla de Michaelis–Menten", "Con una enzima se obtienen estos datos de velocidad (µmol/min): [S] = 1 mM → 33,3; 2 mM → 50,0; 4 mM → 66,7; 8 mM → 80,0; 16 mM → 88,9; 32 mM → 94,1. Estima V<sub>max</sub> y K<sub>m</sub>.", [
      "La velocidad se aplana y se acerca a 100 µmol/min: <b>V<sub>max</sub> ≈ 100 µmol/min</b> (la curva nunca la toca, pero se aproxima).",
      "La mitad de V<sub>max</sub> es 50 µmol/min.",
      "Ese valor corresponde a [S] = 2 mM: <b>K<sub>m</sub> = 2 mM</b>."
    ]) +
    ejemplo("Cuánto sube la velocidad con la temperatura", "Una reacción enzimática tiene Q<sub>10</sub> = 2. Si a 20 °C va a 1 unidad, ¿a cuánto va a 30 °C y a 40 °C (por debajo del óptimo)?", [
      "Cada 10 °C la velocidad se multiplica por 2.",
      "A 30 °C: 1 · 2 = <b>2 unidades</b>. A 40 °C: 1 · 2 · 2 = <b>4 unidades</b>.",
      "Solo vale por debajo del óptimo: pasado este, la desnaturalización hace que la velocidad caiga."
    ])) });

  nuevas.push({ h: "10. Ejemplo PAU resuelto: interpretar un experimento y una gráfica", html: env(
    ejemplo("Hígado y agua oxigenada en cuatro tubos", "En un laboratorio se echan 5 mL de agua oxigenada (H<sub>2</sub>O<sub>2</sub>) en cuatro tubos. Tubo A: un trozo de hígado crudo triturado. Tubo B: un trozo de hígado hervido 5 min. Tubo C: hígado crudo con unas gotas de HCl (pH ≈ 2). Tubo D: solo agua oxigenada. Observaciones tras un minuto: A, mucha espuma; B, nada; C, muy poca espuma; D, casi nada. a) ¿Qué es la espuma y qué la produce? b) Interpreta B y C. c) ¿Para qué sirve D? d) Si un tubo E con hígado crudo se enfría a 4 °C y la espuma es muy lenta, pero al calentarlo a 37 °C vuelve a haberla, ¿qué diferencia hay con B?", [
      "<b>a)</b> La espuma son burbujas de O<sub>2</sub>. Las produce la <b>catalasa</b> del hígado: 2 H<sub>2</sub>O<sub>2</sub> → 2 H<sub>2</sub>O + O<sub>2</sub>. Es una enzima (proteína) que acelera la descomposición del agua oxigenada.",
      "<b>b)</b> En B, el calor <b>desnaturalizó</b> la catalasa: perdió su forma 3D y su función, aunque su secuencia sigue intacta. En C, el pH ácido alejado del óptimo cambia las cargas del sitio activo (y puede desnaturalizar la enzima): casi no hay actividad.",
      "<b>c)</b> D es el <b>control</b>: muestra que sin hígado el agua oxigenada casi no se descompone por sí sola, así que la espuma de A se debe a algo que lleva el hígado.",
      "<b>d)</b> En E la enzima está <b>intacta</b>: el frío solo reduce la energía cinética y la actividad es reversible. En B, la desnaturalización es <b>irreversible</b> (no se recupera aunque se enfríe)."
    ]) +
    ejemplo("Gráfica con y sin inhibidor", "Se mide la velocidad (µmol/min) de una enzima con distintas [S]. Sin inhibidor (curva A): 1 mM → 33,3; 2 → 50,0; 4 → 66,7; 8 → 80,0; 16 → 88,9; 32 → 94,1. Con un inhibidor (curva B): 1 → 14,3; 2 → 25,0; 4 → 40,0; 8 → 57,1; 16 → 72,7; 32 → 84,2. a) ¿Qué tipo de inhibición es? b) Estima K<sub>m</sub> en cada caso. c) ¿Cómo se podría contrarrestar?", [
      "Las dos curvas tienden a la misma V<sub>max</sub> (≈ 100 µmol/min): B va más despacio pero sigue subiendo hacia el mismo tope. <b>a)</b> Es inhibición <b>competitiva</b> (si fuera no competitiva, B se aplanaría en una V<sub>max</sub> más baja).",
      "<b>b)</b> K<sub>m</sub> es [S] a V<sub>max</sub>/2 = 50 µmol/min. En A: <b>K<sub>m</sub> = 2 mM</b>. En B, se llega a 50 µmol/min con [S] = 6 mM (por la ecuación: 100 · 6 / (6 + 6) = 50): <b>K<sub>m</sub> aparente = 6 mM</b>, el triple.",
      "<b>c)</b> Con mucho <b>más sustrato</b>: el sustrato desplaza al inhibidor del sitio activo y se vuelve a acercar a V<sub>max</sub>."
    ])) });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>En Biología el orden de una buena respuesta es: <b>definir → explicar con el mecanismo → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema, con respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Define enzima y explica cómo actúa", "Respuesta modelo:", [
      "<b>Definición:</b> proteína (a veces con cofactor) que actúa como <b>catalizador biológico</b>: acelera una reacción sin consumirse ni cambiar el equilibrio.",
      "<b>Mecanismo:</b> el sustrato se une al <b>sitio activo</b>, formándose el complejo enzima-sustrato; la enzima <b>baja la energía de activación</b>; se libera el producto y la enzima queda libre.",
      "<b>Especificidad:</b> viene de la forma 3D del sitio activo (llave-cerradura; hoy, ajuste inducido)."
    ]) +
    ejemplo("Pregunta 2. Niveles de estructura de una proteína", "Respuesta modelo:", [
      "<b>Primaria:</b> secuencia de aminoácidos, con enlaces peptídicos.",
      "<b>Secundaria:</b> hélice α o lámina β, con puentes de hidrógeno entre –CO– y –NH–.",
      "<b>Terciaria:</b> plegamiento 3D de una cadena, con enlaces entre radicales (puentes disulfuro, puentes de H, iónicos, hidrofóbicos).",
      "<b>Cuaternaria:</b> unión de varias cadenas (hemoglobina)."
    ]) +
    ejemplo("Pregunta 3. Desnaturalización", "Respuesta modelo:", [
      "<b>Definición:</b> pérdida de la estructura 3D (secundaria, terciaria y cuaternaria) por rotura de enlaces débiles, sin romper los enlaces peptídicos.",
      "<b>Causas:</b> temperatura, pH extremo, disolventes, detergentes, metales pesados, urea.",
      "<b>Consecuencia:</b> pérdida de la función. Puede ser reversible (renaturalización, Anfinsen) o no (huevo cocido)."
    ]) +
    ejemplo("Pregunta 4. Factores que influyen en la actividad enzimática", "Respuesta modelo:", [
      "<b>[S]:</b> la velocidad aumenta hasta la saturación (V<sub>max</sub>). <b>[E]:</b> más enzima, mayor V<sub>max</sub>.",
      "<b>Temperatura:</b> aumenta hasta un óptimo y luego cae por desnaturalización. <b>pH:</b> curva en campana con un óptimo propio de cada enzima.",
      "<b>Inhibidores:</b> competitivo (sube K<sub>m</sub>, mismo V<sub>max</sub>), no competitivo (baja V<sub>max</sub>); y la regulación alostérica."
    ]) +
    "<p>Los ejercicios del final del tema incluyen preguntas abiertas con rúbrica, para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio4a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
