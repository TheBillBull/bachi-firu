/* ============================================================
   Matemáticas I · simulacros nuevos (sim12–sim20)
   Nueve exámenes con solución desarrollada: siete monográficos por bloques de temas
   y dos globales de seis bloques (como los simulacros 1–7 de la web).
   Todas las cifras están comprobadas con herramientas/verificar_mates1.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  B.registrarSimulacros("mates1", [

    // ------------------------------------------------------------------ sim12
    { id: "sim12", titulo: "Simulacro 12 · Números reales y sucesiones", tipo: "ciencias",
      bloques: [
        { titulo: "Radicales y racionalización", puntos: 2,
          enunciado: "a) Simplifica √50 + √18 − √8.  b) Racionaliza 12/(√6 + √2) y da un valor aproximado.",
          solucion: "a) Se extraen factores: √50 = 5√2, √18 = 3√2 y √8 = 2√2. Son radicales semejantes: 5√2 + 3√2 − 2√2 = <b>6√2</b>. b) Se multiplica arriba y abajo por el conjugado √6 − √2: 12(√6 − √2)/((√6)² − (√2)²) = 12(√6 − √2)/(6 − 2) = <b>3√6 − 3√2 ≈ 3,106</b>." },
        { titulo: "Intervalos y valor absoluto", puntos: 2,
          enunciado: "Resuelve |2x − 3| ≤ 5 y |x − 2| ≥ 3. Escribe cada solución como intervalo o unión de intervalos y calcula la intersección de las dos.",
          solucion: "|2x − 3| ≤ 5 ⇔ −5 ≤ 2x − 3 ≤ 5 ⇔ −2 ≤ 2x ≤ 8 ⇔ −1 ≤ x ≤ 4: <b>[−1, 4]</b>. |x − 2| ≥ 3 ⇔ x − 2 ≤ −3 ó x − 2 ≥ 3 ⇔ x ≤ −1 ó x ≥ 5: <b>(−∞, −1] ∪ [5, +∞)</b>. Intersección: el único punto común es x = −1, así que es <b>{−1}</b>." },
        { titulo: "Fracción generatriz y notación científica", puntos: 2,
          enunciado: "a) Halla la fracción generatriz de 2,3(45) (el 45 se repite) y simplifícala.  b) Calcula (3,2·10⁵)·(5·10⁻⁸)/(8·10⁻²) y da el resultado en notación científica.",
          solucion: "a) Periódico mixto: (2345 − 23)/990 = 2322/990. Dividiendo entre 18: <b>129/55</b> (comprobación: 129 ÷ 55 = 2,34545…). b) Mantisas: 3,2·5/8 = 2. Exponentes: 5 + (−8) − (−2) = −1. Resultado: <b>2·10⁻¹ = 0,2</b>." },
        { titulo: "Progresiones", puntos: 2,
          enunciado: "a) En una progresión aritmética a₃ = 11 y a₁₀ = 39. Halla a₁, la diferencia y la suma de los 20 primeros términos.  b) Una progresión geométrica tiene a₁ = 5 y razón 3. Calcula la suma de sus 6 primeros términos.",
          solucion: "a) Entre los términos 3 y 10 hay 7 saltos: 39 = 11 + 7d → <b>d = 4</b>. a₃ = a₁ + 2d → 11 = a₁ + 8 → <b>a₁ = 3</b>. a₂₀ = 3 + 19·4 = 79 y S₂₀ = 20·(3 + 79)/2 = <b>820</b>. b) S₆ = 5·(3⁶ − 1)/(3 − 1) = 5·728/2 = <b>1820</b>." },
        { titulo: "Series e interés compuesto", puntos: 2,
          enunciado: "a) Calcula la suma infinita 18 + 6 + 2 + 2/3 + …  b) Se depositan 5.000 € al 4 % de interés compuesto anual. ¿Cuánto dinero hay al cabo de 8 años?",
          solucion: "a) Es geométrica con a = 18 y razón 6/18 = 1/3, con |r| &lt; 1: S = 18/(1 − 1/3) = 18/(2/3) = <b>27</b>. b) Cada año el capital se multiplica por 1,04: C₈ = 5.000·1,04⁸ = 5.000·1,368569… ≈ <b>6.842,85 €</b>." }
      ] },

    // ------------------------------------------------------------------ sim13
    { id: "sim13", titulo: "Simulacro 13 · Álgebra: polinomios, ecuaciones y sistemas", tipo: "ciencias",
      bloques: [
        { titulo: "Ruffini y factorización", puntos: 2,
          enunciado: "Divide P(x) = 2x³ − 3x² − 2x + 3 entre (x − 1) con la regla de Ruffini, indica cociente y resto, y factoriza P(x) por completo.",
          solucion: "Ruffini con raíz 1 y coeficientes 2, −3, −2, 3: se baja el 2; 2·1 = 2 → −3 + 2 = −1; −1·1 = −1 → −2 − 1 = −3; −3·1 = −3 → 3 − 3 = 0. Cociente <b>2x² − x − 3</b> y resto <b>0</b> (por tanto x = 1 es raíz). Ahora 2x² − x − 3 = 0 → x = (1 ± 5)/4 → x = 3/2 y x = −1, así que 2x² − x − 3 = (2x − 3)(x + 1). Resultado: <b>P(x) = (x − 1)(x + 1)(2x − 3)</b>." },
        { titulo: "Ecuaciones bicuadrada e irracional", puntos: 2,
          enunciado: "Resuelve a) x⁴ − 5x² + 4 = 0  b) √(x + 3) = x − 3 (comprobando las soluciones).",
          solucion: "a) Con t = x²: t² − 5t + 4 = 0 → t = 1 ó t = 4 → x = ±1 y x = ±2: <b>x ∈ {−2, −1, 1, 2}</b>. b) Elevando al cuadrado: x + 3 = x² − 6x + 9 → x² − 7x + 6 = 0 → x = 1 ó x = 6. Comprobación: x = 1 → √4 = 2 pero 1 − 3 = −2 ✗ (solución falsa); x = 6 → √9 = 3 = 6 − 3 ✓. <b>Solución: x = 6</b>." },
        { titulo: "Sistemas de ecuaciones", puntos: 2,
          enunciado: "Resuelve a) x + y = 5, x² + y² = 13  b) 2x − y = 1, 3x + 2y = 19.",
          solucion: "a) De la primera, y = 5 − x. Sustituyendo: x² + (5 − x)² = 13 → 2x² − 10x + 12 = 0 → x² − 5x + 6 = 0 → x = 2 ó x = 3. <b>Soluciones: (2, 3) y (3, 2)</b>. b) De la primera, y = 2x − 1; en la segunda: 3x + 2(2x − 1) = 19 → 7x = 21 → x = 3 e y = 5. <b>Solución: (3, 5)</b>." },
        { titulo: "Inecuaciones", puntos: 2,
          enunciado: "Resuelve a) x² − 3x − 4 ≥ 0  b) (x − 1)/(x + 2) &lt; 0.",
          solucion: "a) x² − 3x − 4 = (x − 4)(x + 1): es una parábola hacia arriba con raíces −1 y 4, así que es ≥ 0 fuera de las raíces: <b>(−∞, −1] ∪ [4, +∞)</b>. b) El cociente es negativo cuando numerador y denominador tienen signos distintos. Puntos críticos: 1 (anula el numerador) y −2 (anula el denominador, no se incluye). Entre −2 y 1 el numerador es negativo y el denominador positivo: <b>(−2, 1)</b>." },
        { titulo: "Problema con ecuaciones", puntos: 2,
          enunciado: "Un rectángulo tiene 34 cm de perímetro y su diagonal mide 13 cm. Calcula sus lados.",
          solucion: "Sean a y b los lados. Perímetro: 2(a + b) = 34 → a + b = 17. Diagonal (Pitágoras): a² + b² = 169. Como (a + b)² = a² + b² + 2ab, se tiene 289 = 169 + 2ab → ab = 60. Entonces a y b son las raíces de t² − 17t + 60 = 0: t = (17 ± 7)/2 = 12 y 5. <b>Los lados miden 12 cm y 5 cm</b> (comprobación: 5² + 12² = 169 ✓)." }
      ] },

    // ------------------------------------------------------------------ sim14
    { id: "sim14", titulo: "Simulacro 14 · Trigonometría", tipo: "ciencias",
      bloques: [
        { titulo: "Razones y ángulo doble", puntos: 2,
          enunciado: "Si sen a = 5/13 y a está en el 2.º cuadrante, calcula cos a, tan a y sen 2a.",
          solucion: "cos² a = 1 − 25/169 = 144/169. En el 2.º cuadrante el coseno es negativo: <b>cos a = −12/13</b>. tan a = sen a/cos a = <b>−5/12</b>. sen 2a = 2·sen a·cos a = 2·(5/13)·(−12/13) = <b>−120/169</b> (negativo: 2a está en el 3.er o 4.º cuadrante)." },
        { titulo: "Valores exactos con las fórmulas de suma", puntos: 2,
          enunciado: "Calcula, sin calculadora y de forma exacta: sen 75°, cos 105° y tan 15°.",
          solucion: "sen 75° = sen(45° + 30°) = (√2/2)(√3/2) + (√2/2)(1/2) = <b>(√6 + √2)/4</b> ≈ 0,966. cos 105° = cos(60° + 45°) = (1/2)(√2/2) − (√3/2)(√2/2) = <b>(√2 − √6)/4</b> ≈ −0,259. tan 15° = tan(45° − 30°) = (1 − 1/√3)/(1 + 1/√3) = (√3 − 1)/(√3 + 1) = (√3 − 1)²/2 = <b>2 − √3</b> ≈ 0,268." },
        { titulo: "Teorema del seno", puntos: 2,
          enunciado: "En un triángulo ABC se conocen A = 40°, B = 65° y a = 10 cm. Calcula C, b y c.",
          solucion: "C = 180° − 40° − 65° = <b>75°</b>. Teorema del seno: a/sen A = b/sen B = c/sen C. Entonces b = 10·sen 65°/sen 40° = 10·0,9063/0,6428 ≈ <b>14,10 cm</b> y c = 10·sen 75°/sen 40° = 10·0,9659/0,6428 ≈ <b>15,03 cm</b>." },
        { titulo: "Teorema del coseno y área", puntos: 2,
          enunciado: "Los lados de un triángulo miden 7, 8 y 9. Calcula su ángulo mayor y su área.",
          solucion: "El ángulo mayor es el opuesto al lado mayor (9): cos C = (7² + 8² − 9²)/(2·7·8) = 32/112 = 2/7 → <b>C ≈ 73,40°</b>. Área = ½·7·8·sen C, con sen C = √(1 − 4/49) = √45/7 = 3√5/7: Área = 28·3√5/7 = <b>12√5 ≈ 26,83 u²</b>. (Comprobación con Herón: s = 12 y √(12·5·4·3) = √720 = 12√5 ✓.)" },
        { titulo: "Ecuación e identidad", puntos: 2,
          enunciado: "a) Resuelve cos 2x = cos x en [0°, 360°).  b) Demuestra que sen 2x/(1 + cos 2x) = tan x.",
          solucion: "a) cos 2x = 2cos²x − 1, luego 2cos²x − 1 = cos x → 2cos²x − cos x − 1 = 0. Con t = cos x: t = (1 ± 3)/4 → t = 1 ó t = −1/2. cos x = 1 → x = 0°; cos x = −1/2 → x = 120° ó x = 240°. <b>x = 0°, 120°, 240°</b>. b) Transformando el lado izquierdo: sen 2x = 2·sen x·cos x y 1 + cos 2x = 1 + 2cos²x − 1 = 2cos²x. Así, 2·sen x·cos x/(2cos²x) = sen x/cos x = tan x ∎." }
      ] },

    // ------------------------------------------------------------------ sim15
    { id: "sim15", titulo: "Simulacro 15 · Números complejos y vectores", tipo: "ciencias",
      bloques: [
        { titulo: "Operaciones en forma binómica", puntos: 2,
          enunciado: "Calcula a) (3 + 2i)(1 − i) − (2 − i)²  b) (5 − 5i)/(1 + 2i).",
          solucion: "a) (3 + 2i)(1 − i) = 3 − 3i + 2i − 2i² = 5 − i. (2 − i)² = 4 − 4i + i² = 3 − 4i. Resta: (5 − i) − (3 − 4i) = <b>2 + 3i</b>. b) Se multiplica por el conjugado del denominador: (5 − 5i)(1 − 2i)/((1 + 2i)(1 − 2i)) = (5 − 10i − 5i + 10i²)/5 = (−5 − 15i)/5 = <b>−1 − 3i</b>." },
        { titulo: "Forma polar y potencias", puntos: 2,
          enunciado: "Escribe z = −1 + √3·i en forma polar y calcula z⁶.",
          solucion: "Módulo: |z| = √(1 + 3) = 2. Argumento: z está en el 2.º cuadrante y tan θ = √3/(−1), luego θ = 180° − 60° = 120°. Forma polar: <b>z = 2<sub>120°</sub></b>. Por Moivre: z⁶ = 2⁶ᵃ<sub>6·120°</sub> = 64<sub>720°</sub> = 64<sub>0°</sub> = <b>64</b>." },
        { titulo: "Ecuación de segundo grado en ℂ", puntos: 2,
          enunciado: "Resuelve x² − 4x + 13 = 0 en el conjunto de los números complejos y calcula el producto de las dos soluciones.",
          solucion: "Discriminante: 16 − 52 = −36 &lt; 0. x = (4 ± √(−36))/2 = (4 ± 6i)/2 = <b>2 + 3i y 2 − 3i</b> (son conjugadas). Producto: (2 + 3i)(2 − 3i) = 4 + 9 = <b>13</b>, que coincide con c/a de la ecuación." },
        { titulo: "Operaciones con vectores", puntos: 2,
          enunciado: "Sean u = (3, −1) y v = (2, 4). Calcula 2u − v, |u|, u·v y el ángulo que forman u y v.",
          solucion: "2u − v = (6 − 2, −2 − 4) = <b>(4, −6)</b>. |u| = √(9 + 1) = <b>√10</b>. u·v = 3·2 + (−1)·4 = <b>2</b>. |v| = √20 = 2√5. cos θ = u·v/(|u||v|) = 2/(√10·2√5) = 2/(2√50) = √2/10 ≈ 0,1414 → <b>θ ≈ 81,87°</b>." },
        { titulo: "Perpendicularidad y punto medio", puntos: 2,
          enunciado: "a) Halla k para que u = (k, 3) y v = (2, −4) sean perpendiculares.  b) Calcula el punto medio del segmento de extremos A(−2, 5) y B(6, 1).",
          solucion: "a) Son perpendiculares si u·v = 0: 2k − 12 = 0 → <b>k = 6</b>. b) M = ((−2 + 6)/2, (5 + 1)/2) = <b>(2, 3)</b>." }
      ] },

    // ------------------------------------------------------------------ sim16
    { id: "sim16", titulo: "Simulacro 16 · Rectas y geometría analítica", tipo: "ciencias",
      bloques: [
        { titulo: "Ecuaciones de una recta", puntos: 2,
          enunciado: "Halla las ecuaciones paramétricas y la ecuación general de la recta que pasa por A(1, 2) y B(4, −1).",
          solucion: "Vector director: AB = (3, −3). Paramétricas: <b>x = 1 + 3t, y = 2 − 3t</b>. Pendiente: m = −3/3 = −1, y − 2 = −(x − 1) → y = −x + 3. Ecuación general: <b>x + y − 3 = 0</b>. (Comprobación: B → 4 + (−1) − 3 = 0 ✓.)" },
        { titulo: "Paralela y perpendicular", puntos: 2,
          enunciado: "Dada la recta r: 2x − 3y + 5 = 0 y el punto P(4, 1), halla la recta paralela a r que pasa por P y la perpendicular a r que pasa por P.",
          solucion: "Paralela: mantiene los coeficientes de x e y: 2x − 3y + C = 0. Con P: 8 − 3 + C = 0 → C = −5. <b>2x − 3y − 5 = 0</b>. Perpendicular: se intercambian los coeficientes y se cambia un signo: 3x + 2y + D = 0. Con P: 12 + 2 + D = 0 → D = −14. <b>3x + 2y − 14 = 0</b>." },
        { titulo: "Posición relativa y distancia entre rectas", puntos: 2,
          enunciado: "Estudia la posición relativa de r: x + 2y − 4 = 0 y s: 2x + 4y + 1 = 0 y calcula la distancia entre ellas.",
          solucion: "1/2 = 2/4 pero 2/4 ≠ −4/1: los coeficientes de x e y son proporcionales y el término independiente no, así que son <b>paralelas distintas</b>. La distancia entre ellas es la de un punto de r a s. El punto (4, 0) está en r. d = |2·4 + 4·0 + 1|/√(2² + 4²) = 9/√20 = <b>9√5/10 ≈ 2,01</b>." },
        { titulo: "Distancia punto–recta y área", puntos: 2,
          enunciado: "a) Calcula la distancia del punto P(3, −2) a la recta 4x − 3y + 5 = 0.  b) Calcula el área del triángulo de vértices A(0, 0), B(4, 0) y C(1, 3).",
          solucion: "a) d = |4·3 − 3·(−2) + 5|/√(16 + 9) = |12 + 6 + 5|/5 = <b>23/5 = 4,6</b>. b) Base AB = 4 (sobre el eje X) y altura = ordenada de C = 3: Área = ½·4·3 = <b>6 u²</b>. (Con el determinante de AB = (4, 0) y AC = (1, 3): |4·3 − 0·1|/2 = 6 ✓.)" },
        { titulo: "Mediatriz", puntos: 2,
          enunciado: "Halla la ecuación de la mediatriz del segmento de extremos A(1, 1) y B(5, 3).",
          solucion: "La mediatriz pasa por el punto medio M = (3, 2) y es perpendicular a AB. La pendiente de AB es (3 − 1)/(5 − 1) = 1/2, así que la de la mediatriz es −2. y − 2 = −2(x − 3) → y = −2x + 8 → <b>2x + y − 8 = 0</b>. (Comprobación: cualquier punto de la mediatriz equidista de A y B; por ejemplo (4, 0): d(A) = √(9 + 1) = √10 y d(B) = √(1 + 9) = √10 ✓.)" }
      ] },

    // ------------------------------------------------------------------ sim17
    { id: "sim17", titulo: "Simulacro 17 · Funciones elementales", tipo: "ciencias",
      bloques: [
        { titulo: "Dominio", puntos: 2,
          enunciado: "Calcula el dominio de a) f(x) = √(x − 2)/(x² − 9)  b) g(x) = ln(5 − x).",
          solucion: "a) El radicando exige x − 2 ≥ 0 → x ≥ 2. El denominador no puede anularse: x² − 9 = 0 → x = ±3; de ellos sólo x = 3 está en x ≥ 2. <b>Dom f = [2, 3) ∪ (3, +∞)</b>. b) El argumento del logaritmo debe ser positivo: 5 − x &gt; 0 → x &lt; 5. <b>Dom g = (−∞, 5)</b>." },
        { titulo: "Función afín", puntos: 2,
          enunciado: "Halla la función afín cuya gráfica pasa por (−1, 5) y (3, −3) y calcula sus puntos de corte con los ejes.",
          solucion: "Pendiente: m = (−3 − 5)/(3 − (−1)) = −8/4 = −2. Punto-pendiente: y − 5 = −2(x + 1) → <b>y = −2x + 3</b>. Corte con el eje Y: x = 0 → <b>(0, 3)</b>. Corte con el eje X: y = 0 → x = 3/2 → <b>(3/2, 0)</b>." },
        { titulo: "Función cuadrática", puntos: 2,
          enunciado: "Estudia f(x) = x² − 4x + 3: vértice, puntos de corte con los ejes, intervalos de crecimiento y valor mínimo.",
          solucion: "Vértice: x = −b/(2a) = 4/2 = 2 y f(2) = 4 − 8 + 3 = −1 → <b>V(2, −1)</b>. Cortes con el eje X: x² − 4x + 3 = 0 → x = 1 y x = 3 → <b>(1, 0) y (3, 0)</b>. Corte con el eje Y: f(0) = <b>3</b>. Como a = 1 &gt; 0, la parábola abre hacia arriba: <b>decrece en (−∞, 2) y crece en (2, +∞)</b>, con <b>mínimo −1 en x = 2</b>." },
        { titulo: "Función a trozos", puntos: 2,
          enunciado: "Sea f(x) = x + 2 si x &lt; 1 y f(x) = x² si x ≥ 1. Calcula f(−3), f(1) y f(2), y estudia si es continua en x = 1.",
          solucion: "f(−3) = −3 + 2 = <b>−1</b> (−3 &lt; 1, primer trozo). f(1) = 1² = <b>1</b> (x ≥ 1, segundo trozo). f(2) = <b>4</b>. En x = 1: el límite por la izquierda es 1 + 2 = 3 y el límite por la derecha es 1² = 1. Los dos límites laterales no coinciden: <b>no es continua en x = 1</b> (discontinuidad de salto de tamaño 2)." },
        { titulo: "Exponenciales y logaritmos", puntos: 2,
          enunciado: "Resuelve a) 2^(x+1) = 32  b) log₃(x + 2) = 2  c) ln x + ln(x − 1) = ln 6.",
          solucion: "a) 32 = 2⁵ → x + 1 = 5 → <b>x = 4</b>. b) x + 2 = 3² = 9 → <b>x = 7</b>. c) ln x + ln(x − 1) = ln(x(x − 1)) = ln 6 → x² − x − 6 = 0 → x = 3 ó x = −2. Los argumentos deben ser positivos (x &gt; 1), así que se descarta x = −2: <b>x = 3</b>." }
      ] },

    // ------------------------------------------------------------------ sim18
    { id: "sim18", titulo: "Simulacro 18 · Límites y continuidad", tipo: "ciencias",
      bloques: [
        { titulo: "Indeterminaciones 0/0", puntos: 2,
          enunciado: "Calcula a) lím<sub>x→2</sub> (x² − 4)/(x − 2)  b) lím<sub>x→3</sub> (x² − 9)/(x² − 5x + 6).",
          solucion: "a) Por sustitución sale 0/0. Se factoriza x² − 4 = (x − 2)(x + 2) y se simplifica: (x + 2) → 2 + 2 = <b>4</b>. b) 0/0. x² − 9 = (x − 3)(x + 3) y x² − 5x + 6 = (x − 2)(x − 3). Simplificando (x − 3): (x + 3)/(x − 2) → 6/1 = <b>6</b>." },
        { titulo: "Límites en el infinito", puntos: 2,
          enunciado: "Calcula a) lím<sub>x→+∞</sub> (3x² + 1)/(x² − 4x)  b) lím<sub>x→+∞</sub> (2x³ − x)/(x² + 5).",
          solucion: "a) Mismo grado en numerador y denominador: el límite es el cociente de los coeficientes principales, <b>3</b>. b) El numerador tiene grado 3 y el denominador grado 2: el cociente crece sin límite, <b>+∞</b> (para x grande se parece a 2x³/x² = 2x)." },
        { titulo: "Límites laterales y asíntotas verticales", puntos: 2,
          enunciado: "a) Calcula los límites laterales de f(x) = 1/(x − 2) en x = 2.  b) Halla las asíntotas verticales de g(x) = (x + 1)/(x² − 1).",
          solucion: "a) Por la izquierda (x &lt; 2) el denominador es negativo y tiende a 0: <b>−∞</b>. Por la derecha, positivo: <b>+∞</b>. b) x² − 1 = (x − 1)(x + 1), luego g(x) = 1/(x − 1) para x ≠ −1. En x = 1 el denominador se anula y el numerador no (2/0): <b>asíntota vertical x = 1</b>. En x = −1 hay un 0/0 que se simplifica (límite −1/2): no es una asíntota, sino un «agujero» (discontinuidad evitable)." },
        { titulo: "Asíntotas", puntos: 2,
          enunciado: "Calcula todas las asíntotas de f(x) = (2x² + 1)/(x − 1).",
          solucion: "<b>Vertical</b>: x = 1 anula el denominador y no el numerador (3/0): x = 1. <b>Horizontal</b>: el límite en ±∞ es ±∞ (grado 2 sobre grado 1): no hay. <b>Oblicua</b>: se divide, (2x² + 1) = (x − 1)(2x + 2) + 3, es decir f(x) = 2x + 2 + 3/(x − 1). Como 3/(x − 1) → 0, la asíntota es la recta <b>y = 2x + 2</b>." },
        { titulo: "Continuidad y Bolzano", puntos: 2,
          enunciado: "a) Halla a para que f(x) = x² + a si x ≤ 1 y f(x) = 3x − 1 si x &gt; 1 sea continua en x = 1.  b) Demuestra que x³ + x − 1 = 0 tiene alguna solución en (0, 1).",
          solucion: "a) Límite por la izquierda: 1 + a (y f(1) = 1 + a). Límite por la derecha: 3·1 − 1 = 2. Continua si 1 + a = 2 → <b>a = 1</b>. b) f(x) = x³ + x − 1 es un polinomio, luego continua en [0, 1]. f(0) = −1 &lt; 0 y f(1) = 1 &gt; 0. Por el teorema de Bolzano existe c ∈ (0, 1) con f(c) = 0 ∎." }
      ] },

    // ------------------------------------------------------------------ sim19 (global)
    { id: "sim19", titulo: "Simulacro 19", tipo: "ciencias",
      bloques: [
        { titulo: "Álgebra", puntos: 1.67,
          enunciado: "Resuelve el sistema x − y = 1, x² + y² = 25.",
          solucion: "De la primera, y = x − 1. En la segunda: x² + (x − 1)² = 25 → 2x² − 2x − 24 = 0 → x² − x − 12 = 0 → x = 4 ó x = −3. Con x = 4: y = 3. Con x = −3: y = −4. <b>Soluciones: (4, 3) y (−3, −4)</b>." },
        { titulo: "Sucesiones", puntos: 1.67,
          enunciado: "En una progresión geométrica a₂ = 6 y a₅ = 48. Calcula la razón, a₁ y la suma de los 8 primeros términos.",
          solucion: "De a₂ a a₅ hay 3 pasos: 48 = 6·r³ → r³ = 8 → <b>r = 2</b>. a₂ = a₁·r → 6 = 2a₁ → <b>a₁ = 3</b>. S₈ = 3·(2⁸ − 1)/(2 − 1) = 3·255 = <b>765</b>." },
        { titulo: "Trigonometría", puntos: 1.67,
          enunciado: "En un triángulo se conocen a = 12 cm, b = 9 cm y el ángulo C = 50° entre ellos. Calcula el lado c y el ángulo A.",
          solucion: "Teorema del coseno: c² = 12² + 9² − 2·12·9·cos 50° = 225 − 216·0,6428 = 86,16 → <b>c ≈ 9,28 cm</b>. Para A: cos A = (b² + c² − a²)/(2bc) = (81 + 86,16 − 144)/(2·9·9,28) = 23,16/167,08 ≈ 0,1386 → <b>A ≈ 82,03°</b>. (Comprobación: B = 180° − 50° − 82,03° = 47,97° y por el teorema del seno 9/sen 47,97° = 12/sen 82,03° ✓.)" },
        { titulo: "Números complejos", puntos: 1.67,
          enunciado: "Calcula (1 + i)⁸ y (2 − i)/(1 + 3i).",
          solucion: "1 + i = √2<sub>45°</sub>, así que (1 + i)⁸ = (√2)⁸<sub>8·45°</sub> = 16<sub>360°</sub> = <b>16</b>. Para el cociente se multiplica por el conjugado: (2 − i)(1 − 3i)/((1 + 3i)(1 − 3i)) = (2 − 6i − i + 3i²)/10 = (−1 − 7i)/10 = <b>−0,1 − 0,7i</b>." },
        { titulo: "Geometría analítica", puntos: 1.67,
          enunciado: "Dados A(1, 2), B(5, 4) y C(3, 6): comprueba que el triángulo ABC es isósceles y calcula su área.",
          solucion: "|AB| = √(4² + 2²) = √20, |AC| = √(2² + 4²) = √20 y |BC| = √(2² + 2²) = √8. Como |AB| = |AC|, es <b>isósceles</b> (con vértice en A). Área = ½·|det(AB, AC)| con AB = (4, 2) y AC = (2, 4): ½·|16 − 4| = <b>6 u²</b>." },
        { titulo: "Análisis", puntos: 1.65,
          enunciado: "Estudia f(x) = x³ − 3x: extremos relativos, intervalos de crecimiento y punto de inflexión.",
          solucion: "f'(x) = 3x² − 3 = 3(x − 1)(x + 1). Puntos críticos: x = −1 y x = 1. f' &gt; 0 en (−∞, −1) ∪ (1, +∞) → crece; f' &lt; 0 en (−1, 1) → decrece. <b>Máximo relativo en (−1, 2)</b> y <b>mínimo relativo en (1, −2)</b>. f''(x) = 6x: se anula en x = 0 y cambia de signo (cóncava hacia abajo si x &lt; 0 y hacia arriba si x &gt; 0): <b>punto de inflexión en (0, 0)</b>." }
      ] },

    // ------------------------------------------------------------------ sim20 (global)
    { id: "sim20", titulo: "Simulacro 20", tipo: "ciencias",
      bloques: [
        { titulo: "Números reales", puntos: 1.67,
          enunciado: "Racionaliza y simplifica (3 + √2)/(3 − √2).",
          solucion: "Se multiplica por el conjugado del denominador: (3 + √2)²/((3 − √2)(3 + √2)) = (9 + 6√2 + 2)/(9 − 2) = <b>(11 + 6√2)/7 ≈ 2,78</b>." },
        { titulo: "Ahorro mensual", puntos: 1.67,
          enunciado: "Se ingresan 300 € al final de cada mes durante 5 años en una cuenta al 2,4 % anual (0,2 % mensual). ¿Qué capital se acumula?",
          solucion: "Es una suma geométrica: C = c·((1 + i)ⁿ − 1)/i con c = 300, i = 0,002 y n = 60. (1,002)⁶⁰ ≈ 1,12736. C = 300·0,12736/0,002 ≈ <b>19.104,26 €</b> (se han aportado 18.000 €)." },
        { titulo: "Trigonometría", puntos: 1.67,
          enunciado: "Sabiendo que tan a = 3/4 y que a está en el 3.er cuadrante, calcula sen a, cos a, sen 2a y cos(a/2).",
          solucion: "1 + tan²a = 1/cos²a → 1/cos²a = 25/16 → cos a = −4/5 (3.er cuadrante, negativo) y sen a = tan a·cos a = <b>−3/5</b>. <b>cos a = −4/5</b>. sen 2a = 2·(−3/5)(−4/5) = <b>24/25</b>. Si 180° &lt; a &lt; 270°, entonces 90° &lt; a/2 &lt; 135°: 2.º cuadrante, coseno negativo: cos(a/2) = −√((1 + cos a)/2) = −√((1/5)/2) = −1/√10 = <b>−√10/10 ≈ −0,316</b>." },
        { titulo: "Geometría analítica", puntos: 1.67,
          enunciado: "Halla la proyección ortogonal del punto P(5, 1) sobre la recta r: x − 2y + 1 = 0 y la distancia de P a r.",
          solucion: "El vector normal de r es n = (1, −2). Al sustituir P en la ecuación: 5 − 2 + 1 = 4. El pie de la perpendicular es P − (4/|n|²)·n = (5, 1) − (4/5)(1, −2) = (5 − 0,8; 1 + 1,6) = <b>(21/5, 13/5)</b>. (Comprobación: 21/5 − 2·13/5 + 1 = 0 ✓.) Distancia: |4|/√5 = <b>4√5/5 ≈ 1,79</b>." },
        { titulo: "Funciones y límites", puntos: 1.67,
          enunciado: "Para f(x) = (x² − 1)/(x² − 4) calcula el dominio, los puntos de corte con los ejes y las asíntotas.",
          solucion: "<b>Dominio</b>: x² − 4 ≠ 0 → ℝ − {−2, 2}. <b>Cortes</b>: con el eje X, x² − 1 = 0 → (−1, 0) y (1, 0); con el eje Y, f(0) = (−1)/(−4) = 1/4 → (0, 1/4). <b>Asíntotas verticales</b>: x = 2 y x = −2 (el numerador no se anula: 3 y 3). <b>Horizontal</b>: mismo grado, lím = 1/1 = 1 → y = 1." },
        { titulo: "Derivadas", puntos: 1.65,
          enunciado: "a) Halla la recta tangente a f(x) = x·ln x en x = e.  b) Halla los extremos relativos de g(x) = x²·e⁻ˣ.",
          solucion: "a) f'(x) = ln x + 1 (regla del producto), así que f'(e) = 2 y f(e) = e. Tangente: y − e = 2(x − e) → <b>y = 2x − e</b>. b) g'(x) = 2x·e⁻ˣ − x²·e⁻ˣ = x(2 − x)·e⁻ˣ. Se anula en x = 0 y x = 2 (e⁻ˣ nunca es 0). g' &lt; 0 si x &lt; 0, g' &gt; 0 en (0, 2) y g' &lt; 0 si x &gt; 2. <b>Mínimo relativo en (0, 0)</b> y <b>máximo relativo en (2, 4e⁻²) ≈ (2; 0,541)</b>." }
      ] }

  ]);

})(window);
