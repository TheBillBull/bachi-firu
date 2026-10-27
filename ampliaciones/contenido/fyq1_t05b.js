/* ============================================================
   Física y Química I · ampliaciones · Tema 5
   (parte B: secciones nuevas: gases, disoluciones, combustiones, método y aplicaciones)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t5/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 7
    {
      h: "7. Estequiometría con gases",
      html:
        "<h5>Tres maneras de contar un gas en una reacción</h5>" +
        "<p>Muchas reacciones consumen o desprenden gases, y los gases casi nunca se pesan: se mide su <b>volumen</b> (a una presión y una temperatura dadas). Hay tres situaciones, y conviene reconocer cuál es la tuya antes de empezar:</p>" +
        tabla(["Situación", "Qué usar", "Ejemplo de frase del enunciado"], [
          ["Todos los gases están a la <b>misma P y T</b>", "los volúmenes son proporcionales a los coeficientes (Gay-Lussac / Avogadro)", "«…medidos en las mismas condiciones de presión y temperatura»"],
          ["El gas está en <b>condiciones normales</b> (0 °C y 1 atm)", "1 mol = 22,4 L", "«…medido en condiciones normales»"],
          ["El gas está a <b>otra presión o temperatura</b>", "PV = nRT (R = 0,082; T en K)", "«…a 1,2 atm y 27 °C»"]
        ]) +
        "<h5>Caso 1: volúmenes de gases a igual P y T</h5>" +
        "<p>Si todos los gases se miden en las mismas condiciones, el volumen es proporcional al número de moles (hipótesis de Avogadro). Entonces la relación de <b>volúmenes</b> es la relación de <b>coeficientes</b> y no hace falta ni la masa molar ni R. Pero sólo se puede aplicar a las sustancias que son <b>gases</b>: si el agua sale líquida, no cuenta.</p>" +
        ejemplo("Combustión del propano por volúmenes", "C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l). ¿Cuántos litros de O₂ se necesitan y cuántos de CO₂ se forman al quemar 10 L de propano, medidos todos en las mismas condiciones?", [
          "Coeficientes de los gases: C₃H₈ 1 · O₂ 5 · CO₂ 3.",
          "V(O₂) = 10 · 5/1 = <b>50 L</b>. V(CO₂) = 10 · 3/1 = <b>30 L</b>.",
          "El agua es líquida, así que no tiene «volumen de gas» que comparar."
        ]) +
        ejemplo("Síntesis del amoníaco por volúmenes", "N₂(g) + 3 H₂(g) → 2 NH₃(g). ¿Qué volumen de H₂ reacciona con 10 L de N₂ y qué volumen de NH₃ se forma (misma P y T)?", [
          "V(H₂) = 10 · 3/1 = <b>30 L</b>. V(NH₃) = 10 · 2/1 = <b>20 L</b>.",
          "Observa que el volumen total baja de 40 L a 20 L: los volúmenes, como los moles, no se conservan."
        ]) +
        "<h5>Caso 2: condiciones normales (CN)</h5>" +
        "<p>Cuando el enunciado dice «condiciones normales» (o «CN», o «0 °C y 1 atm») se puede usar el <b>volumen molar 22,4 L/mol</b> como un factor de conversión más de la cadena: litros ÷ 22,4 = moles, y moles × 22,4 = litros.</p>" +
        ejemplo("Un gas que se desprende", "CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂. ¿Qué volumen de CO₂ en CN se desprende al tratar 25 g de CaCO₃ con ácido en exceso? (Ca = 40; C = 12; O = 16)", [
          "n(CaCO₃) = 25/100 = 0,25 mol → n(CO₂) = 0,25 mol (coeficientes 1 : 1).",
          "V = 0,25 · 22,4 = <b>5,6 L</b> en CN."
        ]) +
        "<h5>Caso 3: otra presión o temperatura</h5>" +
        "<p>Fuera de CN el volumen de un mol cambia (a 1 atm y 25 °C ocupa 24,4 L). Hay que usar la ecuación de los gases ideales <b>PV = nRT</b> con R = 0,082 atm·L/(mol·K), la presión en atm, el volumen en litros y la <b>temperatura en kelvin</b> (K = °C + 273). El esquema es: moles (por estequiometría) y luego V = nRT/P. Si el gas es el dato, al revés: n = PV/RT y luego estequiometría.</p>" +
        ejemplo("Hidrógeno en el laboratorio", "Zn + 2 HCl → ZnCl₂ + H₂. Se echan 13,08 g de Zn en ácido en exceso. ¿Qué volumen de H₂ se obtiene (a) en CN; (b) a 1 atm y 25 °C? (Zn = 65,4)", [
          "n(Zn) = 13,08/65,4 = 0,200 mol → n(H₂) = 0,200 mol.",
          "(a) CN: V = 0,200 · 22,4 = <b>4,48 L</b>.",
          "(b) T = 25 + 273 = 298 K: V = nRT/P = 0,200 · 0,082 · 298 / 1 = <b>4,89 L</b> (algo mayor, porque está más caliente)."
        ]) +
        ejemplo("Cuando el dato es el gas", "N₂ + 3 H₂ → 2 NH₃. Se hacen reaccionar 2,0 L de H₂ medidos a 2 atm y 27 °C con N₂ en exceso. ¿Qué masa de NH₃ se forma? (N = 14; H = 1)", [
          "T = 27 + 273 = 300 K. n(H₂) = PV/RT = 2 · 2,0 / (0,082 · 300) = 4/24,6 = 0,1626 mol.",
          "n(NH₃) = 0,1626 · 2/3 = 0,1084 mol.",
          "m(NH₃) = 0,1084 · 17 = <b>1,84 g</b>."
        ]) +
        "<p>El simulador te deja elegir entre los dos modos: <b>volúmenes</b> (cada «bloque» del dibujo es un volumen de la ecuación) y <b>PV = nRT</b> (con la presión y la temperatura que elijas). Observa cómo, a igual cantidad de gas, el volumen cambia si cambias P o T, pero la proporción entre moles no.</p>" +
        w("q5_gases") +
        "<h5>Cuidado con las trampas habituales</h5>" +
        "<ul>" +
        "<li><b>22,4 L/mol sólo vale en CN.</b> Si el gas está a 25 °C o a 2 atm, hay que usar PV = nRT.</li>" +
        "<li><b>La temperatura va en kelvin</b>. Con 27 en vez de 300 el volumen sale diez veces menor.</li>" +
        "<li><b>No se aplica «volumen ÷ coeficiente» a sólidos o líquidos</b>: sólo a gases a igual P y T.</li>" +
        "<li>Si el gas se recoge <b>sobre agua</b>, lleva vapor de agua mezclado: hay que restar su presión de vapor (Dalton, Tema 4) antes de usar PV = nRT.</li>" +
        "<li>El <b>agua</b> puede ser líquida o vapor: míralo en el estado físico de la ecuación.</li>" +
        "</ul>"
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. Estequiometría con disoluciones",
      html:
        "<h5>De la molaridad a los moles</h5>" +
        "<p>En química del laboratorio los reactivos suelen estar disueltos en agua. En ese caso no se pesa el soluto: se mide el <b>volumen</b> de la disolución, y los moles salen de la molaridad (Tema 4):</p>" +
        H.formula("n = M · V (L)") +
        "<p>Una vez conocidos los moles, todo lo demás es igual que antes. Basta con recordar que el volumen va <b>en litros</b> y que un mismo volumen de disolución concentrada contiene más moles que uno de disolución diluida.</p>" +
        "<h5>Neutralización: ácido + base → sal + agua</h5>" +
        "<p>Cuando un ácido y una base reaccionan se neutralizan: HCl + NaOH → NaCl + H₂O (1 : 1) o H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O (1 : 2). Estas reacciones se usan para averiguar la concentración de una disolución desconocida: es la <b>valoración</b> o titulación.</p>" +
        ejemplo("Volumen para neutralizar", "¿Qué volumen de NaOH 0,2 M neutraliza 25 mL de HCl 0,1 M?", [
          "n(HCl) = 0,1 · 0,025 = 0,0025 mol. La reacción es 1 : 1, así que hacen falta 0,0025 mol de NaOH.",
          "V(NaOH) = n/M = 0,0025/0,2 = 0,0125 L = <b>12,5 mL</b>."
        ]) +
        ejemplo("Con un ácido diprótico", "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O. ¿Qué volumen de NaOH 0,2 M se necesita para neutralizar 20 mL de H₂SO₄ 0,15 M?", [
          "n(H₂SO₄) = 0,15 · 0,020 = 0,0030 mol → n(NaOH) = 0,0030 · 2/1 = 0,0060 mol.",
          "V(NaOH) = 0,0060/0,2 = 0,030 L = <b>30 mL</b>."
        ]) +
        "<h5>La valoración: descubrir una concentración</h5>" +
        "<p>En una <b>valoración</b> se añade, gota a gota desde una <b>bureta</b>, una disolución de concentración conocida a un volumen medido de la desconocida, hasta que la reacción es justo completa (el <b>punto de equivalencia</b>). Se detecta con un indicador que cambia de color, como la fenolftaleína, que pasa de incolora a rosa en medio básico. El volumen gastado permite calcular los moles y, de ahí, la concentración.</p>" +
        ejemplo("Una valoración", "Se valoran 25,0 mL de una disolución de HCl de concentración desconocida con NaOH 0,100 M y se gastan 20,0 mL hasta que vira el indicador. ¿Cuál es la molaridad del HCl?", [
          "n(NaOH) = 0,100 · 0,0200 = 0,00200 mol. Como la reacción es 1 : 1, n(HCl) = 0,00200 mol.",
          "M(HCl) = 0,00200/0,0250 = <b>0,0800 M</b>."
        ]) +
        "<h5>Precipitación: cuando se forma un sólido</h5>" +
        "<p>Si dos disoluciones se mezclan y uno de los posibles productos es <b>poco soluble</b>, se forma un sólido que cae al fondo: un <b>precipitado</b>. Reglas útiles de solubilidad en agua: casi todas las sales de <b>sodio, potasio y amonio</b> y todos los <b>nitratos</b> son solubles; los <b>cloruros</b> son solubles salvo los de plata, plomo(II) y mercurio(I); los <b>carbonatos</b>, <b>fosfatos</b> e <b>hidróxidos</b> son insolubles salvo los de los metales alcalinos y del amonio; el sulfato de bario y el de plomo(II) son insolubles. Estas reglas permiten saber qué precipita, y la estequiometría, cuánto.</p>" +
        ejemplo("Precipitado con reactivo limitante", "AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq). Se mezclan 100 mL de AgNO₃ 0,5 M con 100 mL de NaCl 0,25 M. ¿Cuántos gramos de AgCl precipitan y cuáles son las concentraciones de iones en la disolución final? (Ag = 108; Cl = 35,5)", [
          "n(AgNO₃) = 0,5 · 0,100 = 0,050 mol · n(NaCl) = 0,25 · 0,100 = 0,025 mol. Como la reacción es 1 : 1, el limitante es el <b>NaCl</b> (el menor).",
          "n(AgCl) = 0,025 mol → m = 0,025 · 143,5 = <b>3,59 g</b>.",
          "Volumen final (aditivo): 200 mL. Sobran 0,050 − 0,025 = 0,025 mol de AgNO₃ → [Ag⁺] = 0,025/0,200 = <b>0,125 M</b>.",
          "[NO₃⁻] = 0,050/0,200 = <b>0,25 M</b> (todo el nitrato queda disuelto) y [Na⁺] = 0,025/0,200 = <b>0,125 M</b>. El Cl⁻ ha precipitado entero, ya que era el limitante."
        ]) +
        "<h5>Un metal con un ácido en disolución</h5>" +
        ejemplo("Sólido más disolución, con gas", "Zn + 2 HCl → ZnCl₂ + H₂. Se añaden 5,0 g de Zn a 100 mL de HCl 1,0 M. ¿Cuál es el limitante? ¿Qué volumen de H₂ en CN se obtiene y cuánto Zn sobra? (Zn = 65,4)", [
          "n(Zn) = 5,0/65,4 = 0,0765 mol · n(HCl) = 1,0 · 0,100 = 0,100 mol.",
          "Moles ÷ coeficiente: Zn: 0,0765/1 = 0,0765 · HCl: 0,100/2 = 0,050. El menor es el del HCl → <b>HCl limitante</b>.",
          "n(H₂) = 0,100 · 1/2 = 0,050 mol → V = 0,050 · 22,4 = <b>1,12 L</b> en CN.",
          "Zn consumido: 0,050 mol; sobra 0,0765 − 0,050 = 0,0265 mol; es decir, <b>1,73 g de Zn</b>."
        ]) +
        "<p>Con el simulador puedes mezclar disoluciones o añadir un sólido y ver al instante cuál es el limitante, qué se forma (sólido, gas o disolución) y qué sobra. En las reacciones entre dos disoluciones, también te dice qué volumen de la segunda haría falta para que no sobre nada de ninguna.</p>" +
        w("q5_disoluciones") +
        ojo("Con disoluciones, el error más común es <b>olvidar pasar los mL a litros</b> (n = M·V con V en L) o <b>olvidar sumar los volúmenes</b> al calcular la concentración final de una mezcla. Y recuerda: la molaridad del <i>ion</i> es la del compuesto multiplicada por los iones de la fórmula (Al₂(SO₄)₃ 0,1 M da [Al³⁺] = 0,2 M y [SO₄²⁻] = 0,3 M).")
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Combustiones, aire y emisiones de CO₂",
      html:
        "<h5>Qué es una combustión y cómo se ajusta de golpe</h5>" +
        "<p>Una <b>combustión</b> es la reacción de una sustancia con el oxígeno que desprende calor y, normalmente, llama. Cuando el combustible es un <b>hidrocarburo</b> (sólo C e H) y el oxígeno sobra (combustión <b>completa</b>), los productos son siempre los mismos: <b>dióxido de carbono y agua</b>. Hay una fórmula general que permite ajustarla sin tanteo:</p>" +
        H.formula("C<sub>x</sub>H<sub>y</sub> + (x + y/4) O₂ → x CO₂ + (y/2) H₂O") +
        "<p>Comprobación con el metano (x = 1, y = 4): 1 + 1 = 2 O₂ → CH₄ + 2 O₂ → CO₂ + 2 H₂O ✓. Con el propano (x = 3, y = 8): 3 + 2 = 5 O₂ ✓. Con el butano (x = 4, y = 10): 4 + 2,5 = 6,5 O₂ → multiplicando por 2: 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O ✓. Si el combustible tiene oxígeno (etanol, C₂H₅OH o C₂H₆O), el O₂ necesario baja en z/2: 2 + 6/4 − 1/2 = 3 O₂.</p>" +
        "<h5>El aire como fuente de oxígeno</h5>" +
        "<p>El oxígeno no está solo: el aire seco contiene un <b>21 % de O₂</b> y un 78 % de N₂ en volumen (el resto, argón y otros gases). Por eso para obtener 1 L de O₂ hay que tomar unos 1/0,21 ≈ <b>4,8 L de aire</b>. El nitrógeno del aire no se quema (a bajas temperaturas), pero acompaña al aire y calienta con los demás gases de la combustión.</p>" +
        ejemplo("Un litro de gasolina", "Supón que la gasolina es octano puro (C₈H₁₈, M = 114 g/mol) con una densidad de 0,74 g/mL. Calcula la masa de CO₂ que se emite al quemar 1 L y el volumen de aire necesario (en CN) con un 21 % de O₂. (C = 12; H = 1; O = 16)", [
          "Ecuación: 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O. Masa de 1 L: 740 g → n = 740/114 = 6,49 mol.",
          "CO₂: 6,49 · 8 = 51,9 mol → 51,9 · 44 = 2 285 g ≈ <b>2,3 kg de CO₂</b> por cada litro de gasolina (¡más masa que la del propio combustible!).",
          "O₂: 6,49 · 12,5 = 81,1 mol → 81,1 · 22,4 = 1 817 L de O₂ → aire: 1 817/0,21 ≈ <b>8 700 L</b> (unos 8,7 m³).",
          "Comprobación de masa: 740 g + 2 596 g de O₂ = 3 336 g; productos: 2 285 g de CO₂ + 1 052 g de H₂O = 3 337 g ✓."
        ]) +
        "<p>Es un resultado que sorprende: el CO₂ que sale por el tubo de escape pesa <b>más de tres veces</b> lo que pesaba la gasolina. Pero no hay magia: cada átomo de carbono del combustible se combina con dos átomos de oxígeno <b>que vienen del aire</b>, y el oxígeno (16 u) pesa más que el carbono (12 u).</p>" +
        tabla(["Combustible", "Ecuación (por mol de combustible)", "kg de CO₂ por kg de combustible"], [
          ["Metano, CH₄", "CH₄ + 2 O₂ → CO₂ + 2 H₂O", "44/16 = 2,75"],
          ["Propano, C₃H₈", "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O", "3 · 44/44 = 3,00"],
          ["Butano, C₄H₁₀", "C₄H₁₀ + 6,5 O₂ → 4 CO₂ + 5 H₂O", "4 · 44/58 = 3,03"],
          ["Octano, C₈H₁₈", "C₈H₁₈ + 12,5 O₂ → 8 CO₂ + 9 H₂O", "8 · 44/114 = 3,09"],
          ["Etanol, C₂H₅OH", "C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O", "2 · 44/46 = 1,91"]
        ]) +
        ejemplo("Una bombona de butano", "Una bombona contiene 12,5 kg de butano (C₄H₁₀, M = 58 g/mol). ¿Qué masa de O₂ consume al quemarse del todo y cuánto CO₂ y H₂O produce?", [
          "n = 12 500/58 = 215,5 mol. Por mol de butano: 6,5 mol de O₂, 4 de CO₂ y 5 de H₂O.",
          "O₂: 215,5 · 6,5 = 1 401 mol → 1 401 · 32 = <b>44,8 kg</b>.",
          "CO₂: 215,5 · 4 = 862 mol → 862 · 44 = <b>37,9 kg</b>. H₂O: 215,5 · 5 = 1 078 mol → 1 078 · 18 = <b>19,4 kg</b>.",
          "Comprobación: 12,5 + 44,8 = 57,3 kg y 37,9 + 19,4 = 57,3 kg ✓."
        ]) +
        "<h5>Combustión incompleta: cuando falta oxígeno</h5>" +
        "<p>Si el oxígeno escasea (una estufa mal ventilada, un motor con mala mezcla), el carbono no llega a CO₂ y se queda en <b>monóxido de carbono, CO</b>, o incluso en <b>hollín</b> (carbono sólido). Con el metano: 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O. Se necesita menos oxígeno (1,5 mol por mol de CH₄ en lugar de 2) pero se desprende menos energía, y el CO es un gas <b>incoloro, inodoro y muy tóxico</b>: se une a la hemoglobina de la sangre mucho mejor que el O₂ e impide transportar oxígeno. Por eso hay que ventilar estufas, calderas y braseros, y por eso los coches llevan catalizador, que acaba de oxidar el CO a CO₂.</p>" +
        "<h5>Las combustiones y el cambio climático</h5>" +
        "<p>Todo combustible carbonado emite CO₂ al arder, y el CO₂ acumulado en la atmósfera refuerza el efecto invernadero. Por eso se calculan las <b>emisiones por kg o por litro</b> (como en el ejemplo de la gasolina) y se comparan combustibles. Ten presente que comparar los «kg de CO₂ por kg de combustible» no es lo mismo que comparar «CO₂ por energía aprovechada»: eso exige conocer la energía que libera cada combustible, tema de la termoquímica (Tema 6). Los seres vivos también «queman» su combustible: en la respiración celular, C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O es la misma estequiometría de una combustión, a temperatura corporal y con enzimas.</p>" +
        "<p>En el simulador puedes elegir un combustible, la cantidad y si la combustión es completa o incompleta; verás el oxígeno y el aire necesarios, lo que se forma y una comparación de emisiones.</p>" +
        w("q5_combustion")
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. Un método para cualquier problema",
      html:
        "<h5>El esquema general</h5>" +
        "<p>Los problemas de estequiometría parecen muy distintos entre sí (gramos, litros, disoluciones, impurezas, rendimientos…), pero siguen siempre el mismo camino, con pasos que se añaden o se omiten según lo que diga el enunciado:</p>" +
        "<ol>" +
        "<li><b>Escribe y ajusta</b> la ecuación química.</li>" +
        "<li><b>Corrige la pureza</b> si el reactivo es impuro (o pasa % y densidad a molaridad).</li>" +
        "<li><b>Pasa todos los datos a moles</b>: n = m/M · n = V/22,4 (gas en CN) · n = PV/RT (gas en otras condiciones) · n = M·V (disolución).</li>" +
        "<li>Si hay datos de <b>dos reactivos</b>, <b>busca el limitante</b> (moles ÷ coeficiente, el menor).</li>" +
        "<li><b>Proporción de la ecuación</b>: n(buscada) = n(limitante o dato) · coef(buscada)/coef(dato).</li>" +
        "<li><b>Pasa los moles</b> a lo que te piden: gramos (· M), litros (· 22,4 o nRT/P), partículas (· N<sub>A</sub>), molaridad (÷ V).</li>" +
        "<li>Si hay <b>rendimiento</b>, aplícalo al final, sobre la cantidad teórica de producto.</li>" +
        "<li><b>Comprueba</b>: unidades, orden de magnitud, que no salga más producto que reactivo, y la conservación de la masa.</li>" +
        "</ol>" +
        "<h5>Palabras clave del enunciado</h5>" +
        tabla(["Si el enunciado dice…", "…significa…", "Qué hacer"], [
          ["«cantidad suficiente», «exceso de…»", "ese reactivo no limita", "calcula con el otro reactivo, que sí tiene dato"],
          ["dan cantidades de <b>dos</b> reactivos", "hay que decidir quién limita", "moles ÷ coeficiente; el menor manda"],
          ["«riqueza», «pureza», «del 90 %»", "la muestra no es toda reactivo", "multiplica la masa por el % antes de pasar a moles"],
          ["«rendimiento del 80 %»", "sale menos de lo teórico", "calcula el teórico y multiplícalo por 0,80 al final"],
          ["«en condiciones normales»", "0 °C y 1 atm", "1 mol de gas = 22,4 L"],
          ["«a 1,2 atm y 27 °C»", "otras condiciones", "PV = nRT con T = 300 K"],
          ["«disolución 0,5 M»", "molaridad", "n = M · V(L)"],
          ["«densidad 1,19 g/mL»", "hay que pasar V a masa o al revés", "m = d · V"],
          ["«cuántas moléculas», «cuántos átomos»", "número de partículas", "N = n · N<sub>A</sub> (y átomos por molécula)"]
        ]) +
        "<h5>Un ejemplo con todos los ingredientes</h5>" +
        ejemplo("Pureza + disolución + limitante + gas + rendimiento", "Se tratan 20 g de un mineral de cinc del 65 % de riqueza con 150 mL de HCl 2 M. El H₂ desprendido se recoge a 1,2 atm y 27 °C y el rendimiento es del 90 %. Calcula el volumen de H₂ que se recoge. Zn + 2 HCl → ZnCl₂ + H₂ (Zn = 65,4)", [
          "<b>Pureza:</b> m(Zn puro) = 20 · 0,65 = 13,0 g → n(Zn) = 13,0/65,4 = 0,1988 mol.",
          "<b>Disolución:</b> n(HCl) = 2 · 0,150 = 0,300 mol.",
          "<b>Limitante:</b> Zn: 0,1988/1 = 0,1988 · HCl: 0,300/2 = 0,150 → <b>HCl limitante</b>.",
          "<b>Proporción:</b> n(H₂) teórico = 0,300 · 1/2 = 0,150 mol.",
          "<b>Volumen teórico:</b> V = nRT/P = 0,150 · 0,082 · 300/1,2 = 3,075 L.",
          "<b>Rendimiento:</b> V real = 3,075 · 0,90 = <b>2,77 L</b> de H₂. (Del Zn sobran 0,1988 − 0,150 = 0,0488 mol de los puros, unos 3,2 g.)"
        ]) +
        "<p>Mira los pasos como las piezas de un montaje: cada uno de los datos entra en el momento que le toca. Si en un problema no aparece pureza, simplemente se salta ese paso. Pruébalo con el constructor de planes: elige qué aparece en el enunciado y te dará el orden de las operaciones.</p>" +
        w("q5_mapa") +
        "<h5>Entrénate con problemas nuevos</h5>" +
        "<p>Cada pulsación de «Otro problema» genera una reacción nueva con otros números: mol-mol, masa-masa, limitante, rendimiento, pureza, gases en CN o a P y T, precipitados, neutralizaciones y ajustes. Corrige tu resultado con tolerancia del 1 % y mira la solución paso a paso.</p>" +
        w("q5_practica") +
        "<h5>Cómo comprobar que el resultado es razonable</h5>" +
        "<ul>" +
        "<li>La <b>masa de un producto</b> nunca puede superar la masa total de reactivos que ha reaccionado.</li>" +
        "<li>La <b>masa total se conserva</b>: reactivos que reaccionan = productos formados.</li>" +
        "<li>Con un <b>rendimiento menor del 100 %</b>, la cantidad real es menor que la teórica.</li>" +
        "<li>El <b>orden de magnitud</b>: 1 mol de gas ocupa del orden de 22 a 25 L en condiciones habituales; 1 mol de cualquier compuesto pesa entre unos pocos gramos y unos cientos.</li>" +
        "<li>Las <b>unidades</b> cuadran: gramos con g/mol da moles; mol con L/mol da litros.</li>" +
        "</ul>"
    },
    // ------------------------------------------------------------ 11
    {
      h: "11. Cuatro problemas completos, resueltos",
      html:
        "<p>Para terminar de entrenar el método, aquí tienes cuatro problemas de nivel de examen resueltos paso a paso. Intenta hacerlos tú antes de mirar la solución.</p>" +
        ejemplo("Problema 1 · Síntesis del amoníaco con limitante y rendimiento", "En un reactor se mezclan 140 g de N₂ y 40 g de H₂. (a) ¿Cuál es el reactivo limitante? (b) ¿Qué masa de NH₃ se forma si la reacción es completa? (c) ¿Cuánto H₂ sobra? (d) Si el rendimiento es del 30 %, ¿qué masa de NH₃ y qué volumen en CN se obtienen? N₂ + 3 H₂ → 2 NH₃ (N = 14; H = 1)", [
          "n(N₂) = 140/28 = 5 mol · n(H₂) = 40/2 = 20 mol.",
          "(a) N₂: 5/1 = 5 · H₂: 20/3 = 6,67 → <b>N₂ limitante</b>.",
          "(b) n(NH₃) = 5 · 2 = 10 mol → m = 10 · 17 = <b>170 g</b>.",
          "(c) H₂ consumido: 5 · 3 = 15 mol → sobran 20 − 15 = 5 mol = <b>10 g de H₂</b>.",
          "(d) Real: 170 · 0,30 = <b>51 g</b> = 3 mol → V = 3 · 22,4 = <b>67,2 L</b> en CN.",
          "Comprobación de masas en (b)/(c): 180 g antes (140 + 40) y 170 + 10 = 180 g después ✓."
        ]) +
        ejemplo("Problema 2 · Un antiácido", "Un comprimido antiácido contiene 500 mg de CaCO₃. El jugo gástrico es, aproximadamente, HCl 0,1 M. (a) ¿Qué volumen de ese ácido neutraliza el comprimido? (b) ¿Qué volumen de CO₂ en CN se desprende? CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂ (Ca = 40; C = 12; O = 16)", [
          "n(CaCO₃) = 0,500/100 = 0,00500 mol.",
          "(a) n(HCl) = 0,00500 · 2 = 0,0100 mol → V = n/M = 0,0100/0,1 = 0,100 L = <b>100 mL</b>.",
          "(b) n(CO₂) = 0,00500 mol → V = 0,00500 · 22,4 = 0,112 L = <b>112 mL</b> en CN. (Es la «efervescencia» y los eructos que producen algunos antiácidos.)"
        ]) +
        ejemplo("Problema 3 · El airbag", "Un airbag necesita 60 L de N₂ a 1 atm y 27 °C. Se obtiene de la descomposición de azida de sodio: 2 NaN₃ → 2 Na + 3 N₂. ¿Qué masa de NaN₃ debe contener el airbag? (Na = 23; N = 14; R = 0,082)", [
          "T = 27 + 273 = 300 K. n(N₂) = PV/RT = 1 · 60/(0,082 · 300) = 60/24,6 = 2,439 mol.",
          "n(NaN₃) = 2,439 · 2/3 = 1,626 mol. M(NaN₃) = 23 + 3 · 14 = 65 g/mol.",
          "m(NaN₃) = 1,626 · 65 = <b>105,7 g</b>. (Unos 106 g de sólido producen 60 L de gas en milisegundos.)"
        ]) +
        ejemplo("Problema 4 · Caliza impura con ácido", "Se tratan 10 g de una caliza del 80 % en CaCO₃ con 100 mL de HCl 1 M. (a) Limitante. (b) Masa de CaCl₂. (c) Volumen de CO₂ a 1 atm y 25 °C. (d) CaCO₃ que sobra. CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂ (Ca = 40; Cl = 35,5; C = 12; O = 16)", [
          "m(CaCO₃) = 10 · 0,80 = 8,0 g → n = 8,0/100 = 0,080 mol · n(HCl) = 1 · 0,100 = 0,100 mol.",
          "(a) CaCO₃: 0,080/1 = 0,080 · HCl: 0,100/2 = 0,050 → <b>HCl limitante</b>.",
          "(b) n(CaCl₂) = 0,100/2 = 0,050 mol → m = 0,050 · 111 = <b>5,55 g</b>.",
          "(c) n(CO₂) = 0,050 mol; T = 298 K → V = 0,050 · 0,082 · 298/1 = <b>1,22 L</b>.",
          "(d) CaCO₃ consumido: 0,050 mol; sobran 0,080 − 0,050 = 0,030 mol = <b>3,0 g</b> de CaCO₃ puro (más 2 g de impurezas inertes)."
        ])
    },
    // ------------------------------------------------------------ 12
    {
      h: "12. La estequiometría en la industria y en la vida",
      html:
        "<h5>Alimentar al mundo: el proceso Haber-Bosch</h5>" +
        "<p>Las plantas necesitan nitrógeno «fijado» (en forma de amoníaco, nitratos…), y el N₂ del aire es tan estable que casi ningún ser vivo puede usarlo. En 1909 Fritz Haber logró sintetizar amoníaco a partir de N₂ y H₂ a alta presión y temperatura con un catalizador, y Carl Bosch lo llevó a escala industrial en 1913. N₂ + 3 H₂ → 2 NH₃ es hoy una de las reacciones más importantes de la economía: gran parte del nitrógeno de los alimentos que comemos procede de fertilizantes hechos con amoníaco. La estequiometría fija las cuentas de la fábrica: por cada tonelada de NH₃ hacen falta 28/34 = <b>0,82 t de N₂</b> y 6/34 = <b>0,18 t de H₂</b> (0,82 + 0,18 = 1 t ✓).</p>" +
        "<h5>Hierro: el alto horno</h5>" +
        "<p>El hierro se obtiene reduciendo el óxido de hierro(III) del mineral con monóxido de carbono: Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. Por cada tonelada de hierro se necesitan 160/112 = <b>1,43 t de Fe₂O₃</b> puro y 84/112 = <b>0,75 t de CO</b>, y se emiten 132/112 = <b>1,18 t de CO₂</b> (comprobación: 1,43 + 0,75 = 2,18 t y 1 + 1,18 = 2,18 t ✓). Como el mineral no es puro, hay que corregirlo con la riqueza.</p>" +
        "<h5>Cal y cemento</h5>" +
        "<p>La cal viva (CaO) se obtiene calentando caliza: CaCO₃ → CaO + CO₂. Por estequiometría, cada tonelada de CaO que se fabrica libera 44/56 = <b>0,79 t de CO₂</b> sólo por la propia reacción, sin contar el CO₂ del combustible que calienta el horno: por eso la industria del cemento es responsable de una fracción importante de las emisiones mundiales.</p>" +
        "<h5>Fotosíntesis y respiración: la misma ecuación en sentido contrario</h5>" +
        "<p>Las plantas fabrican glucosa con luz solar: 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. En masas: 264 g de CO₂ + 108 g de H₂O → 180 g de glucosa + 192 g de O₂ (372 g = 372 g ✓). Cada gramo de glucosa que fabrica una planta libera 192/180 = 1,07 g de oxígeno a la atmósfera. La respiración de los animales (y de las plantas) hace el camino inverso.</p>" +
        "<h5>En la cocina y en el botiquín</h5>" +
        "<p>El <b>bicarbonato sódico</b> hace subir el bizcocho porque, al calentar, 2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂: el CO₂ forma burbujas que esponjan la masa. Los <b>comprimidos efervescentes</b> son bicarbonato con un ácido sólido (cítrico) que reaccionan al disolverse en agua. Los <b>antiácidos</b> neutralizan el exceso de HCl del estómago, como en el problema 2 anterior.</p>" +
        "<h5>Química verde: la «economía atómica»</h5>" +
        "<p>Un rendimiento del 100 % no basta si la reacción produce muchos residuos. La <b>economía atómica</b> mide qué fracción de la masa de los reactivos acaba en el producto buscado: economía atómica = M(producto deseado, con sus coeficientes) / Σ M(reactivos) · 100. Para N₂ + 3 H₂ → 2 NH₃ es del 100 % (todo lo que entra sale como amoníaco); para CaCO₃ → CaO es del 56/100 = 56 % (el resto se va como CO₂); para el alto horno, 112/244 = 45,9 %. Los químicos diseñan procesos con economía atómica alta para generar menos desechos.</p>" +
        ejemplo("Cuentas de una planta", "Una planta de cal viva funciona con una caliza del 94 % de riqueza y un rendimiento del 90 %. ¿Cuántas toneladas de caliza se necesitan para producir 100 t de CaO? (Ca = 40; C = 12; O = 16)", [
          "Teórico: 100/0,90 = 111,1 t de CaO. Como 56 t de CaO salen de 100 t de CaCO₃ puro (1 : 1 en moles), CaCO₃ puro = 111,1 · 100/56 = 198,4 t.",
          "Caliza impura: 198,4/0,94 = <b>211 t</b> (más de dos veces lo que se obtiene)."
        ])
    },
    // ------------------------------------------------------------ 13
    {
      h: "13. La estequiometría en la historia",
      html:
        "<p>La palabra <b>estequiometría</b> viene del griego <i>stoicheion</i> («elemento») y <i>metron</i> («medida»): la medida de los elementos. La acuñó el químico alemán Jeremias Richter en 1792, cuando la química estaba aprendiendo a pesar con precisión. Recorre la línea del tiempo hasta la industria moderna:</p>" +
        w("linea", "historia") +
        "<p>Es la historia de una idea: primero se descubrió que las reacciones obedecen <b>proporciones fijas</b> (Lavoisier, Richter, Proust, Dalton); después se entendió por qué (átomos y moléculas: Dalton, Avogadro, Cannizzaro); y por último se utilizó ese conocimiento para fabricar a gran escala lo que el mundo necesita (Haber, Bosch).</p>"
    },
    // ------------------------------------------------------------ 14
    {
      h: "14. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y comprueba la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 15
    {
      h: "15. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, un juego de parejas, una clasificación de tipos de problema, tarjetas de repaso y un ejercicio para ordenar los pasos de un problema completo.</p>" +
        w("quiz", "quiz1") + w("emparejar", "magnitudes") + w("clasificar", "tipos") + w("tarjetas", "tj1") + w("orden", "plan")
    }
  ];

  B.parte.t5b = { nuevas: nuevas };
})(window);
