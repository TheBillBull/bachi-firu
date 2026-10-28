/* ============================================================
   Química II · ampliaciones · Tema 11: Polímeros y macromoléculas
   (parte A: se añade al final de las secciones originales 1 a 4)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t11/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es un polímero
  secciones[0] = env(
    "<h5>El vocabulario que hay que dominar</h5>" +
    "<ul>" +
    "<li><b>Monómero</b>: la molécula pequeña de partida (eteno, cloroeteno, glucosa, un aminoácido…).</li>" +
    "<li><b>Unidad repetida</b> (o «mero»): el trozo que se repite en la cadena. Se escribe entre corchetes con un subíndice <i>n</i>: −[CH₂−CH₂]<sub>n</sub>−.</li>" +
    "<li><b>Grado de polimerización</b> (<i>n</i>): número de unidades repetidas de una cadena. En un plástico corriente es de miles.</li>" +
    "<li><b>Masa molar del polímero</b>: M = n · M(unidad repetida). Como las cadenas de una muestra no son todas igual de largas, se habla siempre de una masa molar <b>media</b>.</li>" +
    "</ul>" +
    "<p>El nombre se forma con <b>poli-</b> + el monómero: poli(eteno) o polietileno, poli(cloroeteno) o policloruro de vinilo (PVC).</p>" +
    ejemplo("Del polímero al grado de polimerización",
      "Una muestra de polietileno tiene una masa molar media de 56 000 g/mol. ¿Cuántas unidades repetidas tiene cada cadena y cuántos átomos de carbono? (C = 12; H = 1)",
      ["Unidad repetida: −CH₂−CH₂−, es decir, C₂H₄. M(unidad) = 2·12 + 4·1 = 28 g/mol.",
       "n = M(polímero) / M(unidad) = 56 000 / 28 = <b>2 000 unidades</b>.",
       "Cada unidad aporta 2 átomos de C: 2 000 · 2 = <b>4 000 átomos de carbono</b> en cada cadena."]) +
    "<h5>¿Por qué un polímero se comporta distinto de una molécula pequeña?</h5>" +
    "<p>Dos cadenas largas se tocan por <b>miles de puntos a la vez</b>. Cada contacto es una fuerza intermolecular muy débil (fuerzas de London, y enlaces de hidrógeno si hay grupos −NH o −OH), pero se suman: por eso los polímeros son sólidos a temperatura ambiente aunque el monómero sea un gas (el eteno es un gas; el polietileno, un sólido). Por la misma razón <b>no tienen un punto de fusión nítido</b>: se reblandecen en un intervalo de temperaturas, porque las cadenas son de longitudes distintas.</p>" +
    "<h5>Cinco formas de clasificar los polímeros</h5>" +
    tabla(["Criterio", "Tipos", "Ejemplos"], [
      ["Origen", "naturales · sintéticos (· artificiales: naturales modificados)", "almidón, ADN · PVC, nailon · celofán, rayón (celulosa modificada)"],
      ["Cómo se forman", "adición · condensación", "polietileno · nailon, PET"],
      ["Monómeros distintos", "homopolímeros · copolímeros", "PE, PVC · SBR, ABS"],
      ["Forma de las cadenas", "lineales · ramificadas · entrecruzadas (red)", "PE de alta densidad · PE de baja densidad · baquelita"],
      ["Respuesta al calor", "termoplásticos · termoestables · elastómeros", "PE, PET · baquelita · caucho vulcanizado"]
    ], "q3t") +
    ojo("«Polímero» y «plástico» no son sinónimos: el almidón, la celulosa, las proteínas o el caucho natural son polímeros y no los llamamos plásticos. «Plástico» es un material moldeable, casi siempre sintético."));

  // ---------------------------------------------------------------- 2. Adición
  secciones[1] = env(
    "<h5>Qué ocurre en la polimerización por adición</h5>" +
    "<p>El monómero debe tener un <b>doble enlace C=C</b> (los alquenos y sus derivados, llamados «vinílicos»). El enlace π, el más débil, se abre, y cada uno de los dos carbonos se une a un carbono de un monómero vecino. Es la misma reacción de adición del Tema 10, pero repetida miles de veces y con otro monómero en lugar de H₂ o HBr:</p>" +
    "<div class='formula-wrap'><div class='formula'>n CH₂=CHX → −[CH₂−CHX]<sub>n</sub>−</div></div>" +
    "<p>No se pierde ni se gana ningún átomo: la <b>unidad repetida tiene la misma fórmula que el monómero</b>. En la industria se inicia con un <b>radical libre</b> (un peróxido que se rompe con calor) y la cadena crece en tres etapas:</p>" +
    "<ul>" +
    "<li><b>Iniciación</b>: un radical R• ataca el doble enlace de un monómero y deja un radical en el otro carbono.</li>" +
    "<li><b>Propagación</b>: ese nuevo radical ataca a otro monómero, y así miles de veces; la cadena crece muy rápido.</li>" +
    "<li><b>Terminación</b>: dos cadenas con radical se encuentran y se unen (o el radical se apaga con otro reactivo), y la cadena deja de crecer.</li>" +
    "</ul>" +
    "<p>En la EvAU nunca se pide el mecanismo radicalario: basta saber que <b>el doble enlace desaparece</b> y que la cadena queda con solo enlaces simples.</p>" +
    w("q11_cadena") +
    "<h5>Cómo se escribe la unidad repetida</h5>" +
    "<p>Se dibujan los dos carbonos del doble enlace <b>en la cadena principal</b> y todo lo que cuelga (H, Cl, CH₃, C₆H₅…) como sustituyente. Es un error muy típico dejar el doble enlace en el polímero o poner los sustituyentes dentro de la cadena.</p>" +
    tabla(["Monómero", "Unidad repetida", "Polímero", "Usos"], [
      ["CH₂=CH₂ (eteno)", "−CH₂−CH₂−", "polietileno (PE)", "bolsas, botellas, film"],
      ["CH₂=CH−CH₃ (propeno)", "−CH₂−CH(CH₃)−", "polipropileno (PP)", "envases, tapones, fibras"],
      ["CH₂=CHCl (cloroeteno)", "−CH₂−CHCl−", "PVC", "tuberías, ventanas, cables"],
      ["CH₂=CH−C₆H₅ (estireno)", "−CH₂−CH(C₆H₅)−", "poliestireno (PS)", "bandejas, aislante"],
      ["CF₂=CF₂ (tetrafluoroeteno)", "−CF₂−CF₂−", "PTFE (teflón)", "antiadherente, juntas"],
      ["CH₂=CH−CN (acrilonitrilo)", "−CH₂−CH(CN)−", "poliacrilonitrilo (PAN)", "fibras acrílicas"],
      ["CH₂=C(CH₃)−COOCH₃", "−CH₂−C(CH₃)(COOCH₃)−", "PMMA (metacrilato)", "mamparas, lentes"]
    ], "q3t") +
    ejemplo("Cuántos monómeros hay en una cadena de PVC",
      "Una cadena de PVC tiene una masa molar de 125 000 g/mol. ¿Cuántos monómeros de cloroeteno se han unido? ¿Cuántos átomos de cloro tiene la cadena? (C = 12; H = 1; Cl = 35,5)",
      ["Monómero: CH₂=CHCl → M = 2·12 + 3·1 + 35,5 = 62,5 g/mol. En una adición la unidad repetida pesa lo mismo.",
       "n = 125 000 / 62,5 = <b>2 000 monómeros</b>.",
       "Cada unidad lleva 1 Cl: <b>2 000 átomos de cloro</b> por cadena (un 56,8 % de la masa: 35,5/62,5)."]) +
    ejemplo("Masa de polímero que se obtiene",
      "Se polimerizan 500 kg de propeno con un rendimiento del 90 %. ¿Qué masa de polipropileno se obtiene?",
      ["En una adición no se pierde nada: 500 kg de monómero darían, como máximo, 500 kg de polímero (la masa se conserva).",
       "Con un 90 % de rendimiento: 500 · 0,90 = <b>450 kg de polipropileno</b>."]) +
    "<h5>Dienos y cauchos</h5>" +
    "<p>Si el monómero tiene <b>dos</b> dobles enlaces (un dieno, como el buta-1,3-dieno o el isopreno), solo se usa uno por unión pero queda un doble enlace en cada unidad: el polímero conserva C=C. Esos dobles enlaces son los que después permiten <b>vulcanizar</b> el caucho con azufre (sección 6). El caucho natural es el poliisopreno.</p>" +
    ojo("Si ves un polímero cuya cadena principal es solo de átomos de carbono unidos por enlaces simples, casi seguro viene de una <b>adición</b>. Si en la cadena aparecen −CO−NH−, −CO−O− u otros átomos distintos de C, viene de una <b>condensación</b>."));

  // ---------------------------------------------------------------- 3. Condensación
  secciones[2] = env(
    "<h5>Qué hace falta para condensar una cadena</h5>" +
    "<p>Cada monómero necesita <b>al menos dos grupos reactivos</b> (si tuviera uno solo, la reacción se pararía en una molécula, como en una esterificación normal). Hay dos tipos de combinación:</p>" +
    "<ul>" +
    "<li><b>Dos monómeros distintos</b>, cada uno con dos grupos iguales, que se alternan: un diácido + una diamina (nailon) o un diácido + un diol (PET).</li>" +
    "<li><b>Un solo monómero con dos grupos distintos</b>: un aminoácido (−NH₂ y −COOH) o un hidroxiácido (−OH y −COOH, ácido láctico).</li>" +
    "</ul>" +
    "<p>Cada vez que reaccionan dos grupos se forma un enlace y se expulsa una molécula pequeña, casi siempre <b>agua</b> (a veces HCl o metanol). Los enlaces importantes son los que ya viste en el Tema 10:</p>" +
    tabla(["Grupos que reaccionan", "Enlace formado", "Se libera", "Polímero"], [
      ["−COOH + H₂N−", "amida: −CO−NH−", "H₂O", "nailon, proteínas (enlace peptídico), Kevlar"],
      ["−COOH + HO−", "éster: −CO−O−", "H₂O", "PET, PLA, poliésteres"],
      ["HO− + HO− de dos azúcares", "éter: C−O−C (enlace glucosídico)", "H₂O", "almidón, celulosa, glucógeno"]
    ], "q3t") +
    "<div class='formula-wrap'><div class='formula'>n HOOC−(CH₂)₄−COOH + n H₂N−(CH₂)₆−NH₂ → −[CO−(CH₂)₄−CO−NH−(CH₂)₆−NH]<sub>n</sub>− + (2n − 1) H₂O</div></div>" +
    "<p>El «(2n − 1)» viene de contar enlaces: 2n monómeros en fila forman 2n − 1 uniones, y cada una libera una molécula de agua. Para n grande se aproxima a 2n, es decir, <b>2 H₂O por unidad repetida</b>.</p>" +
    "<p>Vuelve al <b>constructor de cadenas</b> de la sección 2 y pulsa «Condensación»: elige nailon, PET, PLA, péptido o almidón, sube <i>n</i> y mira cómo crece el número de moléculas de agua liberadas y cómo la unidad repetida pesa menos que los monómeros juntos.</p>" +
    ejemplo("Nailon 6,6: masa de polímero y de agua",
      "Se hacen reaccionar 29,2 g de ácido hexanodioico (M = 146) con 23,2 g de hexano-1,6-diamina (M = 116). Si la reacción es completa, ¿qué masa de nailon 6,6 se forma y cuánta agua se libera? (H₂O = 18)",
      ["n(ácido) = 29,2/146 = 0,200 mol; n(diamina) = 23,2/116 = 0,200 mol. Reaccionan mol a mol: no hay limitante.",
       "Cada unidad repetida usa 1 ácido + 1 diamina y libera 2 H₂O: se forman 0,200 mol de unidades y 0,400 mol de H₂O.",
       "Agua: 0,400 · 18 = <b>7,2 g</b>.",
       "La masa se conserva: 29,2 + 23,2 − 7,2 = <b>45,2 g de nailon</b>. Comprobación: M(unidad) = 146 + 116 − 36 = 226; 0,200 · 226 = 45,2 g."]) +
    ejemplo("Poliéster PET con rendimiento",
      "Se parte de 100 kg de ácido tereftálico (M = 166) y un exceso de etano-1,2-diol (M = 62). Con un rendimiento del 85 %, ¿cuántos kg de PET se obtienen? (unidad repetida: M = 192)",
      ["n(ácido) = 100 000 g / 166 = 602,4 mol (el diol está en exceso, el ácido es el limitante).",
       "Cada mol de ácido da 1 mol de unidad repetida: 602,4 mol · 192 g/mol = 115,7 kg (teórico).",
       "Con η = 85 %: 115,7 · 0,85 = <b>98,3 kg de PET</b>."]) +
    ojo("Para que el polímero llegue a tener cadenas largas hace falta que haya <b>la misma cantidad</b> de los dos monómeros (proporción 1 : 1). Si sobra uno, las cadenas terminan pronto con ese monómero en los dos extremos y quedan cortas."));

  // ---------------------------------------------------------------- 4. Naturales y sintéticos
  secciones[3] = env(
    "<h5>Los tres grandes biopolímeros</h5>" +
    "<p>Los seres vivos fabrican sus polímeros por condensación y los rompen por <b>hidrólisis</b> (la reacción inversa, con agua y enzimas). La tabla resume lo que debes saber:</p>" +
    tabla(["Biopolímero", "Monómero", "Enlace entre monómeros", "Función"], [
      ["Polisacáridos: almidón, glucógeno, celulosa", "glucosa (C₆H₁₂O₆)", "glucosídico (C−O−C)", "reserva de energía (almidón, glucógeno), pared de las células vegetales (celulosa)"],
      ["Proteínas", "α-aminoácidos (20 distintos)", "peptídico (−CO−NH−, una amida)", "enzimas, estructura (colágeno, queratina), transporte (hemoglobina)"],
      ["Ácidos nucleicos: ADN, ARN", "nucleótidos (azúcar + fosfato + base)", "fosfodiéster (entre fosfato y azúcar)", "almacenar y transmitir la información genética"]
    ], "q3t") +
    "<h5>Polisacáridos: la misma glucosa, dos polímeros muy distintos</h5>" +
    "<p>El almidón y la celulosa son cadenas de glucosa y tienen la misma unidad repetida (C₆H₁₀O₅), pero la glucosa se une con una orientación distinta: <b>α</b> en el almidón y <b>β</b> en la celulosa. Esa diferencia, aparentemente pequeña, hace que el almidón sea una espiral digerible por nuestras enzimas y la celulosa, en cambio, una fibra recta e indigerible para el ser humano. El glucógeno (reserva animal) es como el almidón pero más ramificado.</p>" +
    "<div class='formula-wrap'><div class='formula'>n C₆H₁₂O₆ → (C₆H₁₀O₅)<sub>n</sub> + (n − 1) H₂O &nbsp;&nbsp;(la hidrólisis es la reacción inversa)</div></div>" +
    ejemplo("Hidrólisis del almidón",
      "Se hidrolizan por completo 16,2 g de almidón. ¿Cuántos gramos de glucosa se obtienen? (C = 12; H = 1; O = 16)",
      ["M(unidad C₆H₁₀O₅) = 6·12 + 10 + 5·16 = 162 g/mol → 16,2 g son 0,100 mol de unidades.",
       "Cada unidad recupera 1 H₂O al hidrolizarse: se consumen 0,100 mol de agua = 1,8 g.",
       "Masa de glucosa = 16,2 + 1,8 = <b>18,0 g</b> (0,100 mol de glucosa × 180 g/mol)."]) +
    "<h5>Proteínas: el enlace peptídico</h5>" +
    "<p>Un α-aminoácido tiene un grupo amino (−NH₂) y un grupo ácido (−COOH) en el mismo carbono, más una cadena lateral R que lo distingue. El −COOH de uno reacciona con el −NH₂ de otro: se forma una <b>amida</b> (el <b>enlace peptídico</b>) y se libera agua. Con dos aminoácidos se obtiene un dipéptido; con tres, un tripéptido; con muchos, un polipéptido o proteína.</p>" +
    "<div class='formula-wrap'><div class='formula'>H₂N−CHR−COOH<br>+ H₂N−CHR'−COOH<br>→ H₂N−CHR−CO−<br>NH−CHR'−COOH<br>+ H₂O</div></div>" +
    ejemplo("Masa de un tripéptido",
      "Calcula la masa molar del tripéptido Gly-Ala-Gly. Glicina: C₂H₅NO₂ (M = 75); alanina: C₃H₇NO₂ (M = 89). (H₂O = 18)",
      ["Tres aminoácidos se unen con 3 − 1 = 2 enlaces peptídicos, y se liberan 2 H₂O.",
       "M = 75 + 89 + 75 − 2·18 = 239 − 36 = <b>203 g/mol</b>."]) +
    ojo("Con <i>n</i> aminoácidos hay <i>n</i> − 1 enlaces peptídicos y se liberan <i>n</i> − 1 moléculas de agua (no <i>n</i>). En una cadena lineal el primer aminoácido conserva su −NH₂ libre y el último su −COOH libre." ) +
    "<h5>Ácidos nucleicos</h5>" +
    "<p>Cada <b>nucleótido</b> tiene tres partes: un azúcar (desoxirribosa en el ADN, ribosa en el ARN), un grupo fosfato y una base nitrogenada (A, T, G, C en el ADN; en el ARN la T se sustituye por U, uracilo). Los nucleótidos se unen por <b>enlaces fosfodiéster</b>: el fosfato de uno se une al azúcar del siguiente, con pérdida de agua. El esqueleto azúcar−fosfato es siempre el mismo y la información está en la <b>secuencia de bases</b>, igual que un texto está en el orden de las letras. El ADN son dos cadenas enfrentadas, unidas por enlaces de hidrógeno entre bases (A con T, G con C).</p>" +
    "<h5>El caucho natural</h5>" +
    "<p>El látex del árbol del caucho es poliisopreno, un polímero de adición del 2-metilbuta-1,3-dieno (isopreno). Sin tratar es blando y pegajoso. En la sección 6 verás cómo la vulcanización lo convierte en un elastómero útil.</p>");

  B.parte.q2t11a = { secciones: secciones };
})(window);
