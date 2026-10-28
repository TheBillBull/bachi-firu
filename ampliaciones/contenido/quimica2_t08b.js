/* ============================================================
   Química II · ampliaciones · Tema 8: Oxidación-reducción
   (parte B: secciones nuevas 5 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t8/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5. Potenciales
    {
      h: "5. Potenciales estándar de reducción: predecir si hay reacción",
      html: env(
        "<h5>Una escala para ordenar oxidantes y reductores</h5>" +
        "<p>No hay forma de medir el potencial de <b>un</b> electrodo solo; se mide siempre la diferencia entre dos. Por eso se elige un cero: el <b>electrodo estándar de hidrógeno</b> (Pt | H₂, 1 atm | H⁺, 1 M), al que se asigna E° = 0,00 V. El <b>potencial estándar de reducción</b> E° de un par es la fem de la pila formada con el electrodo de hidrógeno (a 25 °C, 1 M, 1 atm), escrito siempre como <b>reducción</b>: forma oxidada + n e⁻ → forma reducida.</p>" +
        "<ul>" +
        "<li><b>E° alto y positivo</b> (F₂, MnO₄⁻, Cl₂): la forma oxidada se reduce con ganas → <b>oxidante fuerte</b>. Su forma reducida es un reductor muy débil.</li>" +
        "<li><b>E° muy negativo</b> (Li, Na, Mg, Al): la forma oxidada casi nunca se reduce → la forma reducida es un <b>reductor fuerte</b>.</li>" +
        "</ul>" +
        w("q8_escala") +
        "<h5>La regla de las tres líneas</h5>" +
        "<ol>" +
        "<li>Para cada par, escribe su E° de reducción (de la tabla).</li>" +
        "<li>El par con <b>E° mayor</b> se reduce (cátodo); el otro se oxida (ánodo; se invierte la semirreacción, pero <b>no se cambia el signo del potencial en la fórmula</b>).</li>" +
        "<li><b>E°<sub>pila</sub> = E°<sub>cátodo</sub> − E°<sub>ánodo</sub></b>. Si E° &gt; 0, la reacción es <b>espontánea</b> tal como la has escrito; si E° &lt; 0, es espontánea la inversa.</li>" +
        "</ol>" +
        tabla(["Par (oxidante / reductor)", "E° (V)", "Par", "E° (V)"], [
          ["Li⁺/Li", "−3,04", "Cu²⁺/Cu", "+0,34"],
          ["Na⁺/Na", "−2,71", "I₂/I⁻", "+0,54"],
          ["Mg²⁺/Mg", "−2,37", "Fe³⁺/Fe²⁺", "+0,77"],
          ["Al³⁺/Al", "−1,66", "Ag⁺/Ag", "+0,80"],
          ["Zn²⁺/Zn", "−0,76", "NO₃⁻/NO (ácido)", "+0,96"],
          ["Fe²⁺/Fe", "−0,44", "Br₂/Br⁻", "+1,07"],
          ["Ni²⁺/Ni", "−0,25", "Cr₂O₇²⁻/Cr³⁺ (ácido)", "+1,33"],
          ["Pb²⁺/Pb", "−0,13", "Cl₂/Cl⁻", "+1,36"],
          ["2 H⁺/H₂", "0,00", "MnO₄⁻/Mn²⁺ (ácido)", "+1,51"]
        ], "q3t") +
        ejemplo("Ejemplo resuelto: ¿se disuelve en HCl?", "Con los datos de la tabla, razona si el Zn y el Cu se disuelven en una disolución de HCl 1 M.", [
          "En HCl diluido el único oxidante posible es el H⁺ (par H⁺/H₂, E° = 0,00 V): el Cl⁻ no se reduce.",
          "<b>Zn</b>: Zn + 2 H⁺ → Zn²⁺ + H₂. E° = E°(H⁺/H₂) − E°(Zn²⁺/Zn) = 0,00 − (−0,76) = <b>+0,76 V</b> &gt; 0 → <b>sí se disuelve</b>, y se desprende H₂.",
          "<b>Cu</b>: Cu + 2 H⁺ → Cu²⁺ + H₂. E° = 0,00 − 0,34 = <b>−0,34 V</b> &lt; 0 → <b>no reacciona</b>.",
          "Regla práctica: <b>los metales con E° negativo (por debajo del hidrógeno) se disuelven en ácidos no oxidantes</b>; los de E° positivo, no."
        ]) +
        ejemplo("Ejemplo resuelto: desplazamientos de metales", "¿Se deposita cobre al meter un clavo de hierro en CuSO₄? ¿Y plata al meter una barra de cobre en AgNO₃?", [
          "Hierro y Cu²⁺: el oxidante es el Cu²⁺ (+0,34 V) y el reductor es el Fe (−0,44 V). E° = 0,34 − (−0,44) = <b>+0,78 V</b> &gt; 0: <b>sí</b>, Fe + Cu²⁺ → Fe²⁺ + Cu. Es el «clavo que se cubre de cobre».",
          "Cobre y Ag⁺: Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag. E° = 0,80 − 0,34 = <b>+0,46 V</b> &gt; 0: <b>sí</b>. Se forma plata sobre el cobre y la disolución se vuelve azul (Cu²⁺).",
          "Regla: un metal desplaza de sus disoluciones a los iones de todos los metales que están <b>por encima</b> de él en la tabla (E° mayor)."
        ]) +
        "<h5>Espontaneidad: ΔG° y la constante de equilibrio</h5>" +
        "<p>El potencial es la forma eléctrica de la energía libre. Si la pila produce <b>n</b> moles de electrones por mol de reacción, el trabajo eléctrico máximo es n·F·E° y:</p>" +
        "<div class='formula-wrap'><div class='formula'>ΔG° = −n·F·E° &nbsp;&nbsp;&nbsp; (F = 96 500 C/mol)</div></div>" +
        "<p>Si E° &gt; 0, ΔG° &lt; 0: espontánea. La constante de equilibrio sale de ΔG° = −R·T·ln K, o directamente, a 25 °C: <b>log K = n·E°/0,0592</b>. Cuanto mayor es E°, mayor es K.</p>" +
        ejemplo("Ejemplo resuelto: ΔG° y K de la pila Daniell", "Calcula ΔG° y K para Zn + Cu²⁺ → Zn²⁺ + Cu (E°(Cu²⁺/Cu) = +0,34 V; E°(Zn²⁺/Zn) = −0,76 V).", [
          "E° = 0,34 − (−0,76) = <b>1,10 V</b>; n = 2 electrones.",
          "ΔG° = −n·F·E° = −2 · 96 500 · 1,10 = −212 300 J = <b>−212 kJ</b>.",
          "log K = n·E°/0,0592 = 2 · 1,10/0,0592 = 37,2 → <b>K ≈ 1,4·10³⁷</b>: el equilibrio está desplazado totalmente hacia los productos."
        ]) +
        ojo("Dos reglas que se pierden mucho: (1) <b>E° no se multiplica por los coeficientes</b> al ajustar (es una propiedad intensiva; lo que sí cambia es n, y por tanto ΔG°). (2) Un E° &gt; 0 dice <b>que</b> la reacción es espontánea, no <b>que sea rápida</b>: algunos metales con E° &lt; 0 no atacan al ácido por estar pasivados (óxido protector, como el Al) o por cinética.") +
        ejemplo("Ejemplo resuelto: ácidos oxidantes", "¿Se disuelve el cobre en ácido nítrico diluido? (E°(NO₃⁻/NO) = +0,96 V)", [
          "Aquí el oxidante no es el H⁺, sino el <b>anión NO₃⁻</b> en medio ácido: NO₃⁻ + 4 H⁺ + 3 e⁻ → NO + 2 H₂O, E° = +0,96 V.",
          "E° = 0,96 − 0,34 = <b>+0,62 V</b> &gt; 0: <b>sí se disuelve</b>, pero sin desprender H₂: 3 Cu + 2 NO₃⁻ + 8 H⁺ → 3 Cu²⁺ + 2 NO + 4 H₂O.",
          "La misma lógica explica por qué el Cu se disuelve en HNO₃ pero no en HCl. La plata (E° = 0,80) también se disuelve en HNO₃: 0,96 − 0,80 = +0,16 V."
        ])
      )
    },
    // ------------------------------------------------------------ 6. Valoraciones redox
    {
      h: "6. Valoraciones redox: permanganato y dicromato",
      html: env(
        "<h5>La misma idea que una valoración ácido-base</h5>" +
        "<p>Una valoración redox mide la concentración de un reductor (o de un oxidante) añadiendo desde una bureta otra disolución de concentración conocida hasta el <b>punto de equivalencia</b>: los electrones cedidos por uno son exactamente los ganados por el otro. El cálculo es estequiometría con la ecuación <b>ajustada</b>.</p>" +
        tabla(["Valorante", "Se reduce a", "e⁻ por ion", "Indicador / punto final"], [
          ["MnO₄⁻ (KMnO₄), medio ácido", "Mn²⁺ (casi incoloro)", "5", "él mismo (autoindicador): el primer exceso da color rosa-violeta persistente"],
          ["Cr₂O₇²⁻ (K₂Cr₂O₇), medio ácido", "Cr³⁺ (verde)", "6", "indicador redox (difenilamina, que vira a violeta)"],
          ["I₂ / S₂O₃²⁻ (yodometría)", "I⁻ / S₄O₆²⁻", "2 / 1", "almidón (azul con I₂)"]
        ], "q3t") +
        w("q8_valora") +
        "<h5>Receta en cuatro pasos</h5>" +
        "<ol><li><b>Ecuación ajustada</b> (ion-electrón, medio ácido casi siempre con H₂SO₄; no con HCl, que el MnO₄⁻ oxidaría a Cl₂).</li>" +
        "<li><b>Moles de valorante</b>: n = C·V (con V en litros).</li>" +
        "<li><b>Moles del analito</b> con los coeficientes (o con los electrones: n<sub>e⁻</sub> es igual en los dos).</li>" +
        "<li><b>Concentración</b>: moles/volumen de muestra (¡y deshacer la dilución si la hubo!).</li></ol>" +
        ejemplo("Ejemplo resuelto: hierro(II) con permanganato", "Se valoran 20,0 mL de una disolución de FeSO₄ acidulada con H₂SO₄; se gastan 18,4 mL de KMnO₄ 0,0200 mol/L. Calcula la concentración de Fe²⁺.", [
          "Ecuación: MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O.",
          "Moles de permanganato: 0,0200 · 0,0184 = <b>3,68·10⁻⁴ mol</b>.",
          "Por la estequiometría (1 : 5): moles de Fe²⁺ = 5 · 3,68·10⁻⁴ = <b>1,84·10⁻³ mol</b>.",
          "[Fe²⁺] = 1,84·10⁻³ / 0,0200 = <b>0,0920 mol/L</b> (equivale a 0,0920 · 55,85 = 5,14 g/L)."
        ]) +
        ejemplo("Ejemplo resuelto: agua oxigenada", "Se diluyen 10,0 mL de agua oxigenada comercial hasta 100 mL. De esa disolución se toman 25,0 mL y se valoran en medio ácido con KMnO₄ 0,0150 mol/L, gastando 21,6 mL. Halla la concentración (mol/L y g/L) del agua oxigenada comercial.", [
          "Ecuación: 2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O (relación 2 : 5).",
          "n(MnO₄⁻) = 0,0150 · 0,0216 = 3,24·10⁻⁴ mol → n(H₂O₂) = (5/2) · 3,24·10⁻⁴ = <b>8,10·10⁻⁴ mol</b> en 25,0 mL.",
          "[H₂O₂] en la disolución diluida = 8,10·10⁻⁴ / 0,0250 = 0,0324 mol/L.",
          "Se diluyó 10 veces (10 mL → 100 mL): [H₂O₂] comercial = <b>0,324 mol/L</b> → 0,324 · 34,01 = <b>11,0 g/L</b>."
        ]) +
        ejemplo("Ejemplo resuelto: patrón primario y riqueza de un mineral", "(a) Una muestra de 0,2500 g de oxalato de sodio, Na₂C₂O₄ (M = 134,0 g/mol), pura, consume 18,7 mL de KMnO₄ en medio ácido. ¿Concentración del KMnO₄? (b) Una muestra de 0,5000 g de mineral de hierro, disuelta toda en Fe²⁺, consume 26,1 mL de K₂Cr₂O₇ 0,0167 mol/L. ¿Qué % de Fe contiene?", [
          "<b>(a)</b> n(C₂O₄²⁻) = 0,2500/134,0 = 1,866·10⁻³ mol. Relación 2 MnO₄⁻ : 5 C₂O₄²⁻ → n(MnO₄⁻) = (2/5) · 1,866·10⁻³ = 7,46·10⁻⁴ mol. [MnO₄⁻] = 7,46·10⁻⁴/0,0187 = <b>0,0399 mol/L</b>.",
          "<b>(b)</b> Cr₂O₇²⁻ + 6 Fe²⁺ + 14 H⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O. n(Cr₂O₇²⁻) = 0,0167 · 0,0261 = 4,36·10⁻⁴ mol → n(Fe²⁺) = 6 · 4,36·10⁻⁴ = 2,62·10⁻³ mol.",
          "Masa de Fe = 2,62·10⁻³ · 55,85 = 0,146 g → riqueza = 0,146/0,5000 · 100 = <b>29,2 %</b>."
        ]) +
        ojo("Con permanganato se acidula con <b>H₂SO₄</b>, nunca con HCl (el Cl⁻ se oxidaría y gastarías más permanganato) ni con HNO₃ (oxidaría al analito). Y el color aparece <b>en el primer exceso</b>: la última gota es la que da el rosa.")
      )
    },
    // ------------------------------------------------------------ 7. Electrólisis
    {
      h: "7. Electrólisis: forzar lo que no es espontáneo",
      html: env(
        "<h5>Una pila al revés</h5>" +
        "<p>En una <b>cuba electrolítica</b> se aplica con un generador una diferencia de potencial <b>mayor</b> que la fem de la pila correspondiente, para obligar a que ocurra la reacción redox contraria a la espontánea (E° &lt; 0). Se consume energía eléctrica para producir cambio químico; en la pila ocurre lo inverso.</p>" +
        tabla(["", "Pila galvánica", "Cuba electrolítica"], [
          ["Reacción", "espontánea (ΔG° &lt; 0, E° &gt; 0)", "forzada (ΔG° &gt; 0, E° &lt; 0)"],
          ["Energía", "química → eléctrica", "eléctrica → química"],
          ["Ánodo (oxidación)", "polo <b>−</b>", "polo <b>+</b> (conectado al + del generador)"],
          ["Cátodo (reducción)", "polo <b>+</b>", "polo <b>−</b> (conectado al − del generador)"],
          ["Dispositivo", "dos vasos y puente salino", "un solo recipiente, un generador"],
          ["Electrones", "van del ánodo al cátodo por el cable", "van del ánodo al cátodo, empujados por el generador"]
        ], "q3t") +
        "<p>Lo que <b>nunca cambia</b>: el ánodo es donde ocurre la oxidación y el cátodo donde ocurre la reducción, y los electrones siempre circulan del ánodo al cátodo por el circuito externo. Solo cambia la polaridad (quién es + y quién −).</p>" +
        "<h5>Qué se produce en cada electrodo</h5>" +
        "<ul>" +
        "<li><b>Sal fundida</b> (NaCl fundido): solo hay Na⁺ y Cl⁻. Cátodo: Na⁺ + e⁻ → Na. Ánodo: 2 Cl⁻ → Cl₂ + 2 e⁻. Se necesitan más de 4,07 V (E° = −2,71 − 1,36).</li>" +
        "<li><b>Disolución acuosa</b>: el agua compite. En el cátodo se reduce lo que tenga <b>mayor E°</b> (el H₂O, E ≈ −0,41 V a pH 7, antes que Na⁺, K⁺, Ca²⁺ o Al³⁺; en cambio Cu²⁺, Ag⁺ se reducen antes que el agua). En el ánodo se oxida lo que tenga <b>menor E°</b>: Cl⁻, Br⁻, I⁻ o el agua (que da O₂).</li>" +
        "<li><b>NaCl(aq)</b> (proceso cloro-álcali): cátodo, 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻; ánodo, 2 Cl⁻ → Cl₂ + 2 e⁻. Quedan Na⁺ y OH⁻ en disolución: se obtiene <b>NaOH</b>, H₂ y Cl₂.</li>" +
        "<li><b>Agua</b> (con un poco de H₂SO₄ o Na₂SO₄ para que conduzca): cátodo, 2 H⁺ + 2 e⁻ → H₂; ánodo, 2 H₂O → O₂ + 4 H⁺ + 4 e⁻. Siempre sale <b>el doble de volumen de H₂ que de O₂</b>.</li>" +
        "<li><b>Electrodos activos</b> (refinado del cobre): con ánodo de cobre impuro, es el propio Cu del ánodo el que se oxida (Cu → Cu²⁺ + 2 e⁻) y se deposita Cu puro en el cátodo. Con una pieza de metal como cátodo se logra <b>galvanoplastia</b> (cromado, niquelado, plateado).</li>" +
        "<li><b>Aluminio</b>: se obtiene por electrólisis de Al₂O₃ fundido (en criolita), no en disolución, porque en agua se reduciría antes el H₂O que el Al³⁺ (E° = −1,66 V).</li>" +
        "</ul>" +
        ejemplo("Ejemplo resuelto: ¿qué se descarga primero?", "Una disolución acuosa de CuCl₂ se electroliza con electrodos inertes. Indica las semirreacciones, la reacción global y el voltaje mínimo (E°(Cu²⁺/Cu) = +0,34 V; E°(Cl₂/Cl⁻) = +1,36 V).", [
          "Cátodo (−): se reduce el Cu²⁺ (E° = 0,34 V, mayor que el del agua): Cu²⁺ + 2 e⁻ → Cu.",
          "Ánodo (+): se oxida el Cl⁻: 2 Cl⁻ → Cl₂ + 2 e⁻.",
          "Global: <b>CuCl₂ → Cu + Cl₂</b>. E° = 0,34 − 1,36 = <b>−1,02 V</b>: no es espontánea y hay que aplicar <b>más de 1,02 V</b>."
        ]) +
        ojo("En una electrólisis, <b>el ánodo es el polo positivo</b>, y es el que atrae a los aniones (a eso debe su nombre). Es el error más repetido al pasar de las pilas a las cubas.")
      )
    },
    // ------------------------------------------------------------ 8. Faraday
    {
      h: "8. Las leyes de Faraday: cuánto, cuánto tiempo y con qué intensidad",
      html: env(
        "<h5>La carga de un mol de electrones</h5>" +
        "<p>La corriente es carga que pasa por segundo: <b>Q = I·t</b> (culombios = amperios · segundos). Un electrón transporta 1,602·10⁻¹⁹ C, así que un mol de electrones transporta <b>F = 96 485 C ≈ 96 500 C</b> (el faraday). Faraday descubrió que la cantidad de sustancia que se transforma en un electrodo es <b>proporcional a la carga</b> que ha pasado, y que con la misma carga se transforman cantidades proporcionales a la masa equivalente (M/n) de cada sustancia.</p>" +
        "<div class='formula-wrap'><div class='formula'>m = M·I·t / (n·F) &nbsp;&nbsp;&nbsp; n(sustancia) = I·t / (n·F)</div></div>" +
        "<p>donde <b>M</b> es la masa molar de lo que se deposita o desprende, <b>n</b> los electrones por unidad (Cu²⁺ → Cu: 2; Ag⁺ → Ag: 1; Al³⁺ → Al: 3; 2 Cl⁻ → Cl₂: 2) e <b>I·t</b> la carga. En problemas hay que pasar siempre el tiempo a <b>segundos</b>.</p>" +
        w("q8_faraday") +
        "<h5>Método único: de la carga a los gramos</h5>" +
        "<ol><li>Carga: Q = I·t (t en s).</li><li>Moles de electrones: Q/F.</li><li>Moles de sustancia: moles de e⁻ / n (de la semirreacción).</li><li>Masa (M) o volumen del gas (pV = nRT).</li></ol>" +
        ejemplo("Ejemplo resuelto: calcular la masa", "¿Qué masa de cobre se deposita al pasar 3,0 A durante 40 min por una disolución de CuSO₄? (M(Cu) = 63,5 g/mol)", [
          "Cu²⁺ + 2 e⁻ → Cu (n = 2). Tiempo: 40 min = 2400 s. Carga: Q = 3,0 · 2400 = 7200 C.",
          "Moles de e⁻: 7200/96 500 = 0,0746 mol → moles de Cu: 0,0746/2 = 0,0373 mol.",
          "Masa: 0,0373 · 63,5 = <b>2,37 g</b> (o directamente: 63,5 · 3,0 · 2400/(2 · 96 500))."
        ]) +
        ejemplo("Ejemplo resuelto: calcular el tiempo, y también la intensidad", "(a) ¿Cuánto tarda una corriente de 2,50 A en depositar 5,00 g de plata de una disolución de AgNO₃? (b) ¿Qué intensidad hace falta para obtener 10,0 g de Al en 2 horas a partir de Al³⁺? (M(Ag) = 107,9; M(Al) = 27,0)", [
          "<b>(a)</b> Ag⁺ + e⁻ → Ag (n = 1). Moles de Ag: 5,00/107,9 = 0,04634 mol → moles de e⁻ = 0,04634 mol → Q = 0,04634 · 96 500 = 4472 C. Tiempo: t = Q/I = 4472/2,50 = <b>1789 s ≈ 29,8 min</b>.",
          "<b>(b)</b> Al³⁺ + 3 e⁻ → Al (n = 3). Moles de Al: 10,0/27,0 = 0,3704 mol → moles de e⁻ = 3 · 0,3704 = 1,111 mol → Q = 1,111 · 96 500 = 107 200 C. Tiempo: 2 h = 7200 s. Intensidad: I = Q/t = 107 200/7200 = <b>14,9 A</b>."
        ]) +
        ejemplo("Ejemplo resuelto: gases en una electrólisis", "Se electroliza agua con una corriente de 5,0 A durante 30 min. Calcula los volúmenes de H₂ y de O₂ recogidos a 25 °C y 1 atm (R = 0,082 atm·L/(mol·K)).", [
          "Q = 5,0 · 1800 = 9000 C → moles de e⁻ = 9000/96 500 = 0,0933 mol.",
          "Cátodo: 2 H⁺ + 2 e⁻ → H₂ → n(H₂) = 0,0933/2 = 0,0466 mol. Ánodo: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻ → n(O₂) = 0,0933/4 = 0,0233 mol.",
          "V = nRT/p: V(H₂) = 0,0466 · 0,082 · 298/1 = <b>1,14 L</b>; V(O₂) = 0,0233 · 0,082 · 298 = <b>0,570 L</b>. El H₂ tiene el doble de volumen, como dice la fórmula H₂O."
        ]) +
        "<h5>Cubas en serie</h5>" +
        "<p>Si varias cubas están conectadas <b>en serie</b>, la intensidad es la misma en todas y, como el tiempo también, <b>pasa la misma carga</b> por cada una. Los moles de electrones son iguales; lo que cambia es cuánto produce cada una con ellos:</p>" +
        "<div class='formula-wrap'><div class='formula'>m₁ / m₂ = (M₁/n₁) / (M₂/n₂)</div></div>" +
        ejemplo("Ejemplo resuelto: dos cubas en serie", "Una cuba con CuSO₄ y otra con AgNO₃ están en serie. En la primera se depositan 1,00 g de cobre. ¿Cuánta plata se deposita en la segunda?", [
          "Moles de Cu: 1,00/63,5 = 0,01575 mol → moles de e⁻ = 2 · 0,01575 = 0,0315 mol (los mismos que pasan por la segunda cuba).",
          "Ag⁺ + e⁻ → Ag: moles de Ag = 0,0315 mol → masa = 0,0315 · 107,9 = <b>3,40 g</b>.",
          "Con la fórmula: m(Ag) = 1,00 · (107,9/1)/(63,5/2) = 3,40 g ✔."
        ]) +
        ojo("Las trampas de Faraday: (1) el tiempo debe ir en <b>segundos</b>; (2) <b>n</b> es el nº de electrones <b>por átomo depositado</b>, no el del ion (Fe³⁺ → Fe: 3; Fe²⁺ → Fe: 2); (3) para gases, M y n son de la molécula (O₂: 4 e⁻; Cl₂: 2 e⁻; H₂: 2 e⁻); (4) la masa que sale es la <b>teórica</b>: con un rendimiento del 90 % se depositaría el 90 %.")
      )
    },
    // ------------------------------------------------------------ 9. Aplicaciones y corrosión
    {
      h: "9. Pilas comerciales, combustible y corrosión",
      html: env(
        "<h5>Pilas y baterías que usas a diario</h5>" +
        tabla(["Dispositivo", "Ánodo (−)", "Cátodo (+)", "Voltaje", "Notas"], [
          ["Pila seca / alcalina", "Zn", "MnO₂ (grafito)", "≈ 1,5 V", "no recargable; la alcalina usa KOH en lugar de NH₄Cl"],
          ["Acumulador de plomo", "Pb", "PbO₂", "≈ 2,0 V por celda (6 celdas: 12 V)", "recargable: al cargarse funciona como cuba electrolítica"],
          ["Ion-litio", "Li intercalado en grafito", "óxido de Co o de Fe y Li", "≈ 3,6 V", "alta densidad de energía; recargable"],
          ["Pila de combustible H₂/O₂", "H₂ → 2 H⁺ + 2 e⁻", "O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O", "≈ 1,23 V", "se alimenta continuamente; el único residuo es agua"]
        ]) +
        ejemplo("Ejemplo resuelto: la pila de combustible", "La reacción global es 2 H₂ + O₂ → 2 H₂O. Con E°(O₂/H₂O) = +1,23 V y E°(H⁺/H₂) = 0 V, calcula la fem y el ΔG° por mol de O₂.", [
          "Cátodo: O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O (1,23 V). Ánodo: 2 H₂ → 4 H⁺ + 4 e⁻ (0,00 V).",
          "fem = 1,23 − 0,00 = <b>1,23 V</b>; n = 4 electrones por mol de O₂.",
          "ΔG° = −4 · 96 500 · 1,23 = −474 780 J ≈ <b>−475 kJ</b> por mol de O₂ (el calor de formación del agua da −2 · 237 = −474 kJ: coincide)."
        ]) +
        "<h5>Corrosión del hierro: una pila que se monta sola</h5>" +
        "<p>El hierro se oxida en presencia de oxígeno y <b>agua</b>. Sobre la superficie se forman micropilas: en una zona (el ánodo) el hierro se disuelve, Fe → Fe²⁺ + 2 e⁻; los electrones viajan por el propio metal hasta otra zona (el cátodo) donde se reduce el oxígeno disuelto, O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ (E° = +0,40 V). El agua con sales (mar, carreteras con sal) actúa de puente salino. Los productos se oxidan después a óxido férrico hidratado, Fe₂O₃·nH₂O, la herrumbre, que es porosa y no protege.</p>" +
        tabla(["Protección", "Cómo funciona", "Qué pasa si se raya"], [
          ["Pintura / grasa", "aísla del O₂ y el agua", "el hierro desprotegido se oxida"],
          ["Galvanizado (recubrir con Zn)", "barrera + <b>protección catódica</b>: el Zn (−0,76 V) se oxida antes que el Fe (−0,44 V)", "<b>sigue protegiendo</b>: el Zn actúa de ánodo de sacrificio"],
          ["Estañado (latas, Sn −0,14 V)", "barrera", "el Fe (−0,44 V) es más reductor que el Sn: se oxida <b>más rápido</b> que sin recubrimiento"],
          ["Ánodo de sacrificio (Mg o Zn atornillado)", "se oxida en lugar del Fe (cascos de barcos, tuberías enterradas)", "hay que reponerlo"],
          ["Pasivación (Al, acero inoxidable)", "capa de óxido muy fina y adherente (Al₂O₃, Cr₂O₃)", "se regenera sola con el oxígeno"]
        ]) +
        "<p>Criterio general: un metal protege a otro si tiene <b>E° menor</b> (es más reductor), porque será él quien se oxide. Por eso el Zn protege al Fe y el Sn no.</p>"
      )
    },
    // ------------------------------------------------------------ 10. EvAU
    {
      h: "10. Cómo se responde en la EvAU",
      html: env(
        "<h5>Qué te piden y por dónde empezar</h5>" +
        tabla(["Si el problema dice…", "Empieza por…", "Fórmula o método"], [
          ["«ajusta por el método del ion-electrón»", "n.º ox. → semirreacciones", "agua → H⁺ → e⁻ (→ OH⁻ si básico) → ×e⁻ → suma"],
          ["«¿es espontánea?» / «¿se disuelve en…?» / «¿desplaza a…?»", "E° de cada par", "E° = E°cátodo − E°ánodo &gt; 0"],
          ["«pila», «ánodo», «cátodo», «notación»", "el mayor E° es el cátodo", "ánodo(−) | ion ‖ ion | cátodo(+)"],
          ["«fem de la pila» / «ΔG°» / «K»", "E° de la pila", "ΔG° = −nFE° · log K = nE°/0,0592"],
          ["«valoración con KMnO₄ / K₂Cr₂O₇»", "ecuación ajustada", "moles valorante → razón → [analito]"],
          ["«electrólisis», «cuba», «masa depositada»", "semirreacción del electrodo", "m = M·I·t/(n·F)"],
          ["«cubas en serie»", "misma carga", "m₁/m₂ = (M₁/n₁)/(M₂/n₂)"],
          ["«corrosión», «proteger el hierro»", "comparar E° con el Fe", "menor E° → protege"]
        ], "q3t") +
        ejemplo("Problema tipo EvAU completo", "Se construye una pila con una barra de Zn en ZnSO₄ 1 M y otra de Ag en AgNO₃ 1 M, unidas por un puente salino. Datos: E°(Zn²⁺/Zn) = −0,76 V; E°(Ag⁺/Ag) = +0,80 V; M(Zn) = 65,4; M(Ag) = 107,9. (a) Semirreacciones, reacción global y notación. (b) fem. (c) ¿Qué masa de Ag se deposita cuando se disuelven 0,50 g de Zn? (d) ¿Hacia dónde van los electrones y los iones del puente?", [
          "<b>(a)</b> La Ag⁺/Ag tiene el E° mayor: cátodo (reducción). Zn: ánodo. Ánodo: Zn → Zn²⁺ + 2 e⁻. Cátodo: 2 (Ag⁺ + e⁻ → Ag). Global: <b>Zn + 2 Ag⁺ → Zn²⁺ + 2 Ag</b>. Notación: <b>Zn(s) | Zn²⁺(1 M) ‖ Ag⁺(1 M) | Ag(s)</b>.",
          "<b>(b)</b> fem = 0,80 − (−0,76) = <b>1,56 V</b>.",
          "<b>(c)</b> n(Zn) = 0,50/65,4 = 7,65·10⁻³ mol. Por cada Zn se depositan 2 Ag: n(Ag) = 1,53·10⁻² mol → m = 1,53·10⁻² · 107,9 = <b>1,65 g</b>.",
          "<b>(d)</b> Los electrones van por el cable del <b>Zn (ánodo, −) a la Ag (cátodo, +)</b>. En el puente, los <b>aniones</b> (p. ej. NO₃⁻) van hacia el vaso del <b>Zn</b> y los <b>cationes</b> (K⁺) hacia el de la <b>Ag</b>."
        ]) +
        "<h5>Lista de comprobación antes de entregar</h5>" +
        "<ul>" +
        "<li>¿Los e⁻ de la reducción están a la izquierda y los de la oxidación a la derecha?</li>" +
        "<li>¿Átomos <b>y carga</b> coinciden a los dos lados?</li>" +
        "<li>¿Usé E° <b>de reducción</b> y resté cátodo − ánodo (no al revés)?</li>" +
        "<li>¿El tiempo está en s, el volumen en L y la masa en g?</li>" +
        "<li>¿Dije qué electrodo es el ánodo, cuál el cátodo y su polaridad (distinta en pila que en cuba)?</li>" +
        "</ul>"
      )
    },
    // ------------------------------------------------------------ 11. ¿Qué falla aquí?
    {
      h: "11. ¿Qué falla aquí? Errores típicos de oxidación-reducción",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 12. Autocomprobación
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1") + w("orden", "orden2") + w("clasificar", "clas1") + w("clasificar", "clas2")
    }
  ];

  B.parte.q2t8b = { nuevas: nuevas };
})(window);
