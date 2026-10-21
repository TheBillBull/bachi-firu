/* ============================================================
   Física y Química I · simulacros nuevos (sim8–sim11)
   sim8 y sim9: monográficos de Química y de Física (5 bloques × 2 puntos).
   sim10 y sim11: globales de seis bloques como los simulacros 1–7 de la web.
   Todas las cifras están comprobadas con herramientas/verificar_fyq1_simulacros.py.
   Constantes: R = 0,082 atm·L/(mol·K); Vm (c.n.) = 22,4 L/mol; NA = 6,022·10²³; g = 10 m/s²; G = 6,67·10⁻¹¹ N·m²/kg².
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  B.registrarSimulacros("fyq1", [

    // ------------------------------------------------------------------ sim8 · Química
    { id: "sim8", titulo: "Simulacro 8 · Química", tipo: "ciencias",
      bloques: [
        { titulo: "Estructura atómica y enlace", puntos: 2,
          enunciado: "a) Escribe la configuración electrónica del azufre (Z = 16) y la del ion S²⁻. ¿Qué gas noble tiene la misma configuración?  b) Explica la geometría y la polaridad de la molécula NH₃.",
          solucion: "a) S: 1s² 2s² 2p⁶ 3s² 3p⁴ (6 electrones de valencia). Al ganar 2 electrones completa el 3p: S²⁻: <b>1s² 2s² 2p⁶ 3s² 3p⁶</b>, igual que el <b>argón</b> (Z = 18). b) El nitrógeno tiene 3 pares enlazantes y 1 par solitario: 4 pares de electrones alrededor del N que se disponen en tetraedro (TRPECV). Como un par es solitario, la molécula es una <b>pirámide trigonal</b> con ángulos ≈ 107°. Los enlaces N–H son polares y los dipolos no se anulan (por la forma piramidal): <b>molécula polar</b>." },
        { titulo: "Formulación inorgánica", puntos: 2,
          enunciado: "Formula: a) óxido de hierro(III), b) ácido sulfúrico, c) hidróxido de calcio. Nombra: d) NaClO, e) CuSO₄, f) HNO₃.",
          solucion: "a) <b>Fe₂O₃</b> (hierro con valencia 3, oxígeno con 2: se cruzan las valencias). b) <b>H₂SO₄</b>. c) <b>Ca(OH)₂</b> (el calcio es +2 y hay dos OH⁻). d) NaClO: <b>hipoclorito de sodio</b> (cloro con número de oxidación +1). e) CuSO₄: <b>sulfato de cobre(II)</b> (el ion sulfato es 2− y el cobre 2+). f) HNO₃: <b>ácido nítrico</b>." },
        { titulo: "Gases y disoluciones", puntos: 2,
          enunciado: "a) Un recipiente de 5 L contiene 2 g de H₂ (M = 2 g/mol) a 27 °C. Calcula la presión del gas.  b) Se disuelven 20 g de NaOH (M = 40 g/mol) en agua hasta completar 500 mL. Calcula la molaridad.",
          solucion: "a) n = 2/2 = 1 mol y T = 27 + 273 = 300 K. P = nRT/V = 1·0,082·300/5 = <b>4,92 atm</b>. b) n = 20/40 = 0,5 mol en 0,5 L: M = n/V = 0,5/0,5 = <b>1 mol/L</b>." },
        { titulo: "Estequiometría y reactivo limitante", puntos: 2,
          enunciado: "Se quema metano según CH₄ + 2 O₂ → CO₂ + 2 H₂O (M(CH₄) = 16, M(CO₂) = 44, Vm = 22,4 L/mol). a) Con 10 g de CH₄ y O₂ en exceso, calcula la masa y el volumen en c.n. de CO₂.  b) Si solo se dispone de 8 g de O₂ (M = 32), ¿qué masa de CO₂ se obtiene?",
          solucion: "a) n(CH₄) = 10/16 = 0,625 mol. La proporción CH₄:CO₂ es 1:1, así que se forman 0,625 mol de CO₂: <b>27,5 g</b> (0,625·44) y <b>14 L</b> en c.n. (0,625·22,4). b) n(O₂) = 8/32 = 0,25 mol. Se necesitan 2 mol de O₂ por cada mol de CH₄, luego el O₂ alcanza para 0,125 mol de CH₄: el <b>O₂ es el reactivo limitante</b>. Se forman 0,125 mol de CO₂ = <b>5,5 g</b>." },
        { titulo: "Termoquímica y química del carbono", puntos: 2,
          enunciado: "a) Calcula la entalpía de C₂H₄ + H₂ → C₂H₆ sabiendo que las entalpías de combustión son −1411 kJ/mol (C₂H₄), −286 kJ/mol (H₂) y −1560 kJ/mol (C₂H₆).  b) Formula el 2-metilbutano y la butanona e indica el grupo funcional de cada uno.",
          solucion: "a) Ley de Hess: ΔH = Σ ΔH<sub>c</sub>(reactivos) − Σ ΔH<sub>c</sub>(productos) = (−1411 − 286) − (−1560) = <b>−137 kJ/mol</b> (exotérmica). b) 2-metilbutano: CH₃–CH(CH₃)–CH₂–CH₃ (C₅H₁₂), un hidrocarburo saturado (alcano ramificado). Butanona: CH₃–CO–CH₂–CH₃ (C₄H₈O), con el grupo carbonilo en un carbono intermedio: <b>cetona</b>." }
      ] },

    // ------------------------------------------------------------------ sim9 · Física
    { id: "sim9", titulo: "Simulacro 9 · Física", tipo: "ciencias",
      bloques: [
        { titulo: "Movimiento rectilíneo uniformemente acelerado", puntos: 2,
          enunciado: "Un coche pasa de 36 km/h a 108 km/h en 10 s con aceleración constante. Calcula la aceleración y la distancia recorrida en ese tiempo.",
          solucion: "Se pasa a m/s: 36 km/h = 10 m/s y 108 km/h = 30 m/s. a = (v − v₀)/t = (30 − 10)/10 = <b>2 m/s²</b>. d = v₀t + ½at² = 10·10 + ½·2·10² = 100 + 100 = <b>200 m</b> (también, d = velocidad media × tiempo = (10 + 30)/2·10 = 200 m)." },
        { titulo: "Lanzamiento vertical", puntos: 2,
          enunciado: "Se lanza una piedra verticalmente hacia arriba con 20 m/s desde el suelo (g = 10 m/s², sin rozamiento). Calcula la altura máxima, el tiempo que tarda en volver al suelo y la velocidad con que llega.",
          solucion: "En el punto más alto v = 0: h<sub>máx</sub> = v₀²/(2g) = 400/20 = <b>20 m</b>. Tiempo de subida: v₀/g = 2 s; el de bajada es igual, así que vuelve al suelo en <b>4 s</b>. Llega con la misma rapidez con que salió: <b>20 m/s hacia abajo</b> (v = v₀ − gt = 20 − 10·4 = −20 m/s)." },
        { titulo: "Movimiento circular uniforme", puntos: 2,
          enunciado: "Una rueda de 0,4 m de radio gira a 120 rpm. Calcula su velocidad angular, la velocidad lineal de un punto del borde y su aceleración centrípeta.",
          solucion: "ω = 120·2π/60 = <b>4π rad/s ≈ 12,57 rad/s</b>. v = ωR = 4π·0,4 = 1,6π ≈ <b>5,03 m/s</b>. a<sub>c</sub> = ω²R = (4π)²·0,4 = 6,4π² ≈ <b>63,2 m/s²</b> (dirigida al centro). (Comprobación: v²/R = 5,03²/0,4 = 63,2 ✓.)" },
        { titulo: "Dinámica con rozamiento", puntos: 2,
          enunciado: "Un bloque de 10 kg se empuja con una fuerza horizontal de 50 N sobre una superficie con coeficiente de rozamiento 0,2 (g = 10 m/s²). Calcula la fuerza de rozamiento, la aceleración y la velocidad a los 4 s si parte del reposo.",
          solucion: "Normal: N = mg = 100 N. Rozamiento: F<sub>r</sub> = μN = 0,2·100 = <b>20 N</b>. Segunda ley: F − F<sub>r</sub> = m·a → a = (50 − 20)/10 = <b>3 m/s²</b>. v = at = 3·4 = <b>12 m/s</b>." },
        { titulo: "Gravitación y energía mecánica", puntos: 2,
          enunciado: "a) Calcula la gravedad en la superficie de Marte (M = 6,42·10²³ kg, R = 3,39·10⁶ m, G = 6,67·10⁻¹¹ N·m²/kg²).  b) Un cuerpo de 2 kg cae desde 20 m (g = 10 m/s²): con la conservación de la energía mecánica, calcula su velocidad al llegar al suelo y su energía cinética.",
          solucion: "a) g = GM/R² = 6,67·10⁻¹¹·6,42·10²³/(3,39·10⁶)² = 4,28·10¹³/1,149·10¹³ ≈ <b>3,73 m/s²</b>. b) Sin rozamiento, la energía potencial inicial se convierte en cinética: mgh = ½mv² → v = √(2gh) = √400 = <b>20 m/s</b>. E<sub>c</sub> = mgh = 2·10·20 = <b>400 J</b>." }
      ] },

    // ------------------------------------------------------------------ sim10 · global
    { id: "sim10", titulo: "Simulacro 10", tipo: "ciencias",
      bloques: [
        { titulo: "Estructura atómica, enlace y formulación", puntos: 1.67,
          enunciado: "Escribe la configuración electrónica del calcio (Z = 20), indica el ion más estable que forma y formula el hidróxido de aluminio y el ácido nitroso.",
          solucion: "Ca: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s². Pierde los 2 electrones del 4s y forma <b>Ca²⁺</b> (configuración del argón). Hidróxido de aluminio: <b>Al(OH)₃</b>. Ácido nitroso: <b>HNO₂</b>." },
        { titulo: "Leyes fundamentales y estequiometría", puntos: 1.67,
          enunciado: "¿Cuántos gramos de CaCO₃ (M = 100 g/mol) hacen falta para obtener 11,2 L de CO₂ medidos en condiciones normales según CaCO₃ → CaO + CO₂?",
          solucion: "n(CO₂) = 11,2/22,4 = 0,5 mol. La reacción es 1:1, así que hacen falta 0,5 mol de CaCO₃: m = 0,5·100 = <b>50 g</b>." },
        { titulo: "Termoquímica y química del carbono", puntos: 1.67,
          enunciado: "Una reacción tiene ΔH = −92 kJ y ΔS = −199 J/K. ¿Es espontánea a 25 °C? Nombra además CH₃–CH₂–OH.",
          solucion: "T = 298 K. ΔG = ΔH − TΔS = −92 kJ − 298·(−0,199 kJ/K) = −92 + 59,3 = <b>−32,7 kJ</b>. Como ΔG &lt; 0, <b>es espontánea</b> a 25 °C (la entalpía favorable compensa la pérdida de entropía). CH₃–CH₂–OH es el <b>etanol</b>, un alcohol." },
        { titulo: "Cinemática", puntos: 1.67,
          enunciado: "Un coche A circula a 20 m/s constantes. En el instante en que pasa por un punto, un coche B parte de ese punto desde el reposo con a = 4 m/s². ¿Cuándo y dónde alcanza B al coche A?",
          solucion: "x<sub>A</sub> = 20t y x<sub>B</sub> = ½·4·t² = 2t². Se igualan: 20t = 2t² → t(2t − 20) = 0 → t = 0 (el instante inicial) o <b>t = 10 s</b>. Posición: x = 20·10 = <b>200 m</b> del punto de partida (en ese momento B va a 40 m/s)." },
        { titulo: "Dinámica y gravitación", puntos: 1.67,
          enunciado: "Un satélite orbita a 600 km sobre la superficie de la Tierra (R<sub>T</sub> = 6,4·10⁶ m, M<sub>T</sub> = 6·10²⁴ kg, G = 6,67·10⁻¹¹ N·m²/kg²). Calcula su velocidad orbital.",
          solucion: "Radio de la órbita: r = 6,4·10⁶ + 0,6·10⁶ = 7,0·10⁶ m. La fuerza gravitatoria hace de fuerza centrípeta: GMm/r² = mv²/r → v = √(GM/r) = √(6,67·10⁻¹¹·6·10²⁴/7·10⁶) = √(5,72·10⁷) ≈ <b>7,56·10³ m/s ≈ 7,6 km/s</b>." },
        { titulo: "Energía y movimiento armónico simple", puntos: 1.65,
          enunciado: "Una masa de 0,5 kg unida a un muelle de constante k = 200 N/m oscila con amplitud 0,1 m. Calcula el periodo, la velocidad máxima y la energía total.",
          solucion: "ω = √(k/m) = √(200/0,5) = 20 rad/s → T = 2π/ω = 2π/20 ≈ <b>0,314 s</b>. v<sub>máx</sub> = Aω = 0,1·20 = <b>2 m/s</b>. E = ½kA² = ½·200·0,1² = <b>1 J</b> (comprobación: ½mv²<sub>máx</sub> = ½·0,5·4 = 1 J ✓)." }
      ] },

    // ------------------------------------------------------------------ sim11 · global
    { id: "sim11", titulo: "Simulacro 11", tipo: "ciencias",
      bloques: [
        { titulo: "Estructura atómica, enlace y formulación", puntos: 1.67,
          enunciado: "Explica por qué el agua es líquida a temperatura ambiente y el sulfuro de hidrógeno (H₂S) es un gas. Formula el sulfato de sodio y el dióxido de azufre.",
          solucion: "Entre las moléculas de agua hay <b>enlaces de hidrógeno</b> (el H unido al O, muy electronegativo, es atraído por un par solitario de otra molécula): son fuerzas intermoleculares fuertes que elevan el punto de ebullición. El azufre es mucho menos electronegativo y no forma enlaces de hidrógeno apreciables; entre moléculas de H₂S solo hay fuerzas de dispersión y dipolo–dipolo débiles, así que hierve a −60 °C. Sulfato de sodio: <b>Na₂SO₄</b>. Dióxido de azufre: <b>SO₂</b>." },
        { titulo: "Leyes fundamentales y disoluciones", puntos: 1.67,
          enunciado: "Una disolución de H₂SO₄ es 2 M. a) ¿Qué volumen contiene 0,1 mol?  b) ¿Qué volumen de esa disolución hay que tomar para preparar 500 mL de una disolución 0,4 M?",
          solucion: "a) V = n/M = 0,1/2 = 0,05 L = <b>50 mL</b>. b) Moles necesarios: n = 0,4·0,5 = 0,2 mol. Se toman de la disolución 2 M: V = 0,2/2 = 0,1 L = <b>100 mL</b>, y se completa con agua hasta 500 mL (M₁V₁ = M₂V₂: 2·100 = 0,4·500 ✓)." },
        { titulo: "Termoquímica y química del carbono", puntos: 1.67,
          enunciado: "Con las entalpías de formación ΔH<sub>f</sub>: CH₄(g) = −75, CO₂(g) = −394 y H₂O(l) = −286 kJ/mol, calcula la entalpía de combustión CH₄ + 2 O₂ → CO₂ + 2 H₂O y el calor que se desprende al quemar 8 g de metano (M = 16).",
          solucion: "ΔH = Σ ΔH<sub>f</sub>(productos) − Σ ΔH<sub>f</sub>(reactivos) = [−394 + 2·(−286)] − [−75 + 2·0] = −966 + 75 = <b>−891 kJ/mol</b>. 8 g de CH₄ son 8/16 = 0,5 mol: calor = 0,5·891 = <b>445,5 kJ</b> desprendidos." },
        { titulo: "Cinemática", puntos: 1.67,
          enunciado: "Un objeto se lanza horizontalmente a 15 m/s desde una altura de 80 m (g = 10 m/s²). Calcula el tiempo de caída y el alcance horizontal.",
          solucion: "En vertical es una caída libre: 80 = ½·10·t² → t² = 16 → <b>t = 4 s</b>. En horizontal el movimiento es uniforme: x = v·t = 15·4 = <b>60 m</b>. (Velocidad al llegar: v<sub>y</sub> = 10·4 = 40 m/s, y |v| = √(15² + 40²) = 42,7 m/s.)" },
        { titulo: "Dinámica", puntos: 1.67,
          enunciado: "Un coche de 1000 kg toma una curva plana de 50 m de radio a 36 km/h. Calcula la fuerza centrípeta necesaria y el coeficiente de rozamiento mínimo para que no derrape (g = 10 m/s²).",
          solucion: "v = 36 km/h = 10 m/s. F<sub>c</sub> = mv²/R = 1000·100/50 = <b>2000 N</b>. La única fuerza horizontal es el rozamiento estático, que debe valer al menos eso: μmg ≥ 2000 → μ ≥ 2000/10000 = <b>0,2</b>." },
        { titulo: "Trabajo, energía y potencia", puntos: 1.65,
          enunciado: "Una grúa eleva una carga de 200 kg hasta 15 m de altura en 30 s a velocidad constante (g = 10 m/s²). Calcula el trabajo, la potencia útil y la potencia que consume si su rendimiento es del 80 %.",
          solucion: "A velocidad constante la fuerza iguala al peso: F = mg = 2000 N. W = F·h = 2000·15 = <b>30 000 J</b>. P<sub>útil</sub> = W/t = 30 000/30 = <b>1000 W</b>. Con rendimiento 0,8: P<sub>consumida</sub> = 1000/0,8 = <b>1250 W</b>." }
      ] }

  ]);

})(window);
