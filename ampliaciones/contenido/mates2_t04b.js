/* ============================================================
   Matemáticas II · ampliaciones · Tema 4: Vectores en el espacio
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t4/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 5
    {
      h: "5. Combinación lineal, dependencia e independencia",
      html:
        "<h5>Combinación lineal</h5>" +
        "<p>Un vector w es <b>combinación lineal</b> de u y v si existen números a y b con <b>w = a·u + b·v</b>. Con más vectores, igual: w = a·u + b·v + c·t. Encontrar a y b es resolver un sistema de tres ecuaciones (una por componente), con dos incógnitas.</p>" +
        ejemplo("Expresar un vector como combinación lineal",
          "Escribe w = (3, −2, −1) como combinación lineal de u = (1, 0, 1) y v = (0, 1, 2), si es posible.",
          ["w = a·u + b·v = (a, b, a + 2b).",
           "Igualando componentes: a = 3, b = −2, a + 2b = −1.",
           "Comprobamos la tercera con los valores de las dos primeras: 3 + 2·(−2) = −1 ✓. Luego <b>w = 3u − 2v</b>."]) +
        ejemplo("Cuando no se puede",
          "¿Es w = (1, 1, 1) combinación lineal de u = (1, 0, 1) y v = (0, 1, 2)?",
          ["w = (a, b, a + 2b): las dos primeras ecuaciones dan a = 1, b = 1.",
           "La tercera exigiría a + 2b = 3, pero w tiene 1. Contradicción: <b>no</b> es combinación lineal.",
           "Geométricamente, w no está en el plano que generan u y v."]) +
        "<h5>Dependencia e independencia lineal</h5>" +
        "<p>Los vectores u₁, …, u<sub>n</sub> son <b>linealmente dependientes</b> si alguno es combinación lineal de los demás (o, equivalentemente, si a₁u₁ + … + a<sub>n</sub>u<sub>n</sub> = 0 con algún a<sub>i</sub> ≠ 0). Si no, son <b>independientes</b>. En ℝ³ hay un criterio para cada cantidad de vectores:</p>" +
        tabla(["Cuántos vectores", "Son dependientes si…", "Geométricamente"], [
          ["1 vector", "es el vector nulo", "—"],
          ["2 vectores", "son proporcionales (u × v = 0)", "están en la misma recta"],
          ["3 vectores", "<b>det (u, v, w) = 0</b> (producto mixto 0)", "están en el mismo plano (coplanarios)"],
          ["4 o más vectores", "<b>siempre</b> (en ℝ³ no cabe más)", "—"]
        ]) +
        "<p>Dicho con matrices (Tema 3 de Sistemas): el <b>rango</b> de la matriz cuyas filas son los vectores es el número máximo de vectores independientes. Los tres vectores son independientes ⟺ el rango es 3 ⟺ el determinante es distinto de 0.</p>" +
        ejemplo("¿Dependientes? Y si lo son, ¿cómo?",
          "Estudia si u = (1, 2, 3), v = (2, 1, 0) y t = (4, 5, 6) son linealmente independientes.",
          ["det = |1 2 3 ; 2 1 0 ; 4 5 6| = 1·(6 − 0) − 2·(12 − 0) + 3·(10 − 4) = 6 − 24 + 18 = 0.",
           "Son <b>dependientes</b>. Para ver la relación, buscamos t = a·u + b·v: a + 2b = 4 y 2a + b = 5 dan a = 2, b = 1; la tercera componente (3a + 0 = 6) lo confirma.",
           "<b>t = 2u + v</b>: los tres vectores son coplanarios y el rango es 2."]) +
        ejemplo("Dependencia con un parámetro",
          "Halla los valores de m para los que u = (1, 1, m), v = (1, m, 1) y t = (m, 1, 1) son linealmente dependientes, y el rango en cada caso.",
          ["det = |1 1 m ; 1 m 1 ; m 1 1| = 1·(m − 1) − 1·(1 − m) + m·(1 − m²) = 3m − 2 − m³ = −(m − 1)²(m + 2).",
           "Se anula para m = 1 (doble) y m = −2. Para cualquier otro m, el rango es 3.",
           "<b>m = 1</b>: los tres vectores son (1, 1, 1): rango 1.",
           "<b>m = −2</b>: (1, 1, −2), (1, −2, 1), (−2, 1, 1). Los dos primeros no son proporcionales y la suma de los tres es (0, 0, 0): rango 2."]) +
        ojo("«Dependientes» no significa «iguales» ni «paralelos»: tres vectores distintos y no paralelos de dos en dos pueden ser dependientes si están en un mismo plano. Por eso se mira el determinante y no solo si son proporcionales.")
    },
    // -------------------------------------------------------------- 6
    {
      h: "6. Bases y coordenadas",
      html:
        "<p>Una <b>base</b> de ℝ³ es un conjunto de <b>tres vectores linealmente independientes</b>. Todo vector del espacio se escribe de manera <b>única</b> como combinación lineal de ellos, y esos tres coeficientes son sus <b>coordenadas</b> en esa base. La base más cómoda es la canónica {i, j, k}, donde las coordenadas coinciden con las componentes: (x, y, z) = x·i + y·j + z·k.</p>" +
        "<p><b>Comprobar que tres vectores forman base</b> = comprobar que el determinante es distinto de 0. <b>Hallar las coordenadas</b> de w = resolver un sistema 3×3 (Tema 3). Se pone w = a·e₁ + b·e₂ + c·e₃ y se igualan componentes.</p>" +
        ejemplo("Base y coordenadas",
          "Comprueba que B = {(1, 1, 0), (0, 1, 1), (1, 0, 1)} es una base y halla las coordenadas de w = (3, 4, 5) en esa base.",
          ["det = |1 1 0 ; 0 1 1 ; 1 0 1| = 1·(1 − 0) − 1·(0 − 1) + 0 = 2 ≠ 0 ⟹ son independientes: es una base.",
           "w = a(1, 1, 0) + b(0, 1, 1) + c(1, 0, 1) ⟹ a + c = 3, a + b = 4, b + c = 5.",
           "Sumando las tres ecuaciones: 2(a + b + c) = 12, luego a + b + c = 6. Restando cada una: b = 6 − 3 = 3, c = 6 − 4 = 2, a = 6 − 5 = 1.",
           "<b>w = (1, 3, 2)<sub>B</sub></b>. Comprobación: 1·(1,1,0) + 3·(0,1,1) + 2·(1,0,1) = (3, 4, 5) ✓."]) +
        "<h5>Bases ortogonales y ortonormales</h5>" +
        "<p>Una base es <b>ortogonal</b> si sus vectores son perpendiculares dos a dos, y <b>ortonormal</b> si además son unitarios. Su gran ventaja: las coordenadas se calculan <b>sin resolver ningún sistema</b>, con productos escalares:</p>" +
        "<div class='formula-wrap'><div class='formula'>w = c₁e₁ + c₂e₂ + c₃e₃ &nbsp;con&nbsp; c<sub>i</sub> = (w·e<sub>i</sub>) / |e<sub>i</sub>|² &nbsp;(si es ortonormal, c<sub>i</sub> = w·e<sub>i</sub>)</div></div>" +
        "<p>Es lo mismo que la proyección de la sección 2: c<sub>i</sub> es cuánto de w «cabe» en la dirección de e<sub>i</sub>. Una base ortogonal de vectores no nulos es siempre independiente (no hace falta calcular el determinante).</p>" +
        ejemplo("Coordenadas en una base ortogonal",
          "Comprueba que e₁ = (1, 2, 2), e₂ = (2, 1, −2) y e₃ = (2, −2, 1) son perpendiculares dos a dos y halla las coordenadas de w = (3, 0, 6).",
          ["e₁·e₂ = 2 + 2 − 4 = 0; e₁·e₃ = 2 − 4 + 2 = 0; e₂·e₃ = 4 − 2 − 2 = 0 ✓. Los tres tienen módulo 3 (|e<sub>i</sub>|² = 9).",
           "w·e₁ = 3 + 0 + 12 = 15; w·e₂ = 6 + 0 − 12 = −6; w·e₃ = 6 + 0 + 6 = 12.",
           "Coordenadas: c₁ = 15/9 = 5/3, c₂ = −6/9 = −2/3, c₃ = 12/9 = 4/3.",
           "Comprobación: (5/3)(1,2,2) − (2/3)(2,1,−2) + (4/3)(2,−2,1) = ((5 − 4 + 8)/3, (10 − 2 − 8)/3, (10 + 4 + 4)/3) = (3, 0, 6) ✓."]) +
        ejemplo("Base con parámetro",
          "¿Para qué valores de m forman base de ℝ³ los vectores (1, m, 0), (0, 1, m) y (m, 0, 1)?",
          ["det = |1 m 0 ; 0 1 m ; m 0 1| = 1·(1 − 0) − m·(0 − m²) + 0 = 1 + m³.",
           "1 + m³ = 0 ⟹ m³ = −1 ⟹ m = −1 (única raíz real).",
           "Forman base para <b>todo m ≠ −1</b>. Para m = −1 son dependientes: (1,−1,0), (0,1,−1), (−1,0,1) suman (0,0,0)."]) +
        ojo("Las coordenadas dependen de la base: el mismo vector w tiene coordenadas distintas en bases distintas. Cuando un enunciado dice «las coordenadas de w en la base B», <b>no</b> son las componentes que aparecen escritas, salvo que B sea la canónica.")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Vectores con parámetro: el método de la EvAU",
      html:
        "<p>En Madrid casi todos los problemas de vectores traen una letra (m, a, k…). El esquema es siempre el mismo: <b>traduce la condición a una ecuación en m, y resuélvela</b>.</p>" +
        tabla(["La condición dice…", "Se traduce en…", "Tipo de ecuación"], [
          ["perpendiculares", "u·v = 0", "lineal o cuadrática"],
          ["ángulo dado α", "u·v = |u||v|cos α", "cuadrática (cuidado: elevar al cuadrado crea soluciones falsas)"],
          ["paralelos", "u × v = 0, o componentes proporcionales", "sistema"],
          ["módulo dado", "|u|² = k²", "cuadrática"],
          ["área dada", "|u × v| = A (o ½|u × v| = A en el triángulo)", "cuadrática"],
          ["coplanarios / dependientes / no forman base", "[u, v, w] = 0", "cúbica o lineal: factoriza"],
          ["volumen dado", "|[u, v, w]| = V (o V/6 en el tetraedro)", "con valor absoluto: dos casos"],
          ["forman base", "[u, v, w] ≠ 0", "el complementario de las raíces"]
        ]) +
        "<p>Juega con el simulador: elige el tipo de condición y mueve el parámetro. Los puntos rojos son las soluciones de la ecuación; en ellos cambia la conclusión (el rango baja, el ángulo pasa a 90°, el volumen se anula…).</p>" +
        w("vec_param") +
        ejemplo("Problema 1 · Perpendicularidad y ángulo",
          "Sean u = (1, 1, 0) y v = (1, m, 1). Halla m para que formen un ángulo de 60°.",
          ["u·v = 1 + m; |u| = √2; |v| = √(m² + 2).",
           "cos 60° = 1/2 ⟹ (1 + m)/(√2·√(m² + 2)) = 1/2 ⟹ 2(1 + m) = √2·√(m² + 2).",
           "Elevamos al cuadrado: 4(1 + m)² = 2(m² + 2) ⟹ 2m² + 4m + 2 = m² + 2 ⟹ m² + 4m = 0 ⟹ m = 0 o m = −4.",
           "Al elevar al cuadrado se pierde el signo: hay que comprobar. El lado izquierdo 2(1 + m) debe ser positivo (es igual a una raíz): m = −4 da 2·(−3) &lt; 0, <b>descartada</b> (formaría 120°).",
           "<b>m = 0</b>. Comprobación: v = (1, 0, 1), u·v = 1, cos α = 1/(√2·√2) = 1/2 ✓."]) +
        ejemplo("Problema 2 · Área con parámetro",
          "Sean u = (1, 1, 0) y v = (m, 0, 1). Halla m para que el área del paralelogramo que forman sea √6.",
          ["u × v = (1·1 − 0·0, −(1·1 − 0·m), 1·0 − 1·m) = (1, −1, −m).",
           "|u × v|² = 1 + 1 + m² = m² + 2. Condición: m² + 2 = 6 ⟹ m² = 4.",
           "<b>m = 2 o m = −2</b> (el área es la misma porque m aparece al cuadrado)."]) +
        ejemplo("Problema 3 · Volumen con parámetro",
          "Los vectores u = (1, 1, 1), v = (0, 2, 1) y t = (m, 0, 3) son aristas de un tetraedro de volumen 2. Halla m.",
          ["[u, v, t] = |1 1 1 ; 0 2 1 ; m 0 3| = 1·(6 − 0) − 1·(0 − m) + 1·(0 − 2m) = 6 + m − 2m = 6 − m.",
           "Volumen del tetraedro = |6 − m|/6 = 2 ⟹ |6 − m| = 12.",
           "Dos casos: 6 − m = 12 ⟹ m = −6, o 6 − m = −12 ⟹ <b>m = 18</b>. Soluciones: <b>m = −6 y m = 18</b>."]) +
        ejemplo("Problema 4 · ¿Cuándo forman base?",
          "Halla los valores de m para los que u = (m, 1, 0), v = (1, m, 1) y t = (0, 1, m) <b>no</b> forman base de ℝ³.",
          ["det = |m 1 0 ; 1 m 1 ; 0 1 m| = m·(m² − 1) − 1·(m − 0) + 0 = m³ − m − m = m³ − 2m = m(m² − 2).",
           "m(m² − 2) = 0 ⟹ m = 0, m = √2 o m = −√2.",
           "<b>No forman base para m = 0, √2, −√2</b>; para todos los demás valores sí (el simulador de arriba, tercera opción, muestra la curva)."]) +
        ojo("Cuando elevas al cuadrado para quitar una raíz, <b>siempre comprueba</b> las soluciones en la ecuación original. Y con «volumen = V» no olvides los dos casos del valor absoluto: lo normal es que salgan dos soluciones.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Problemas tipo EvAU resueltos y calculadora",
      html:
        "<p>Antes de los problemas, una herramienta para <b>comprobar tus propias cuentas</b>: escribe los vectores y la calculadora te da cada operación con los pasos intermedios. Úsala para ver dónde te equivocas, no para saltarte el cálculo a mano.</p>" +
        w("vec_calc") +
        ejemplo("Problema 5 · Un triángulo en el espacio, completo",
          "Sean A(2, 0, 1), B(3, 2, −1) y C(1, 1, 2). Calcula: (a) el ángulo en A; (b) el área del triángulo; (c) la altura desde C; (d) un vector unitario perpendicular al plano ABC.",
          ["AB = (1, 2, −2) y AC = (−1, 1, 1). |AB| = 3 y |AC| = √3.",
           "(a) AB·AC = −1 + 2 − 2 = −1 ⟹ cos A = −1/(3√3) ≈ −0,192 ⟹ <b>A ≈ 101,10°</b>.",
           "(b) AB × AC = (2·1 − (−2)·1, −(1·1 − (−2)(−1)), 1·1 − 2·(−1)) = (4, 1, 3). |AB × AC| = √26. Área = <b>√26/2 ≈ 2,55</b>.",
           "(c) altura desde C sobre AB: 2·Área/|AB| = √26/3 ≈ <b>1,70</b>.",
           "(d) (4, 1, 3)/√26 ≈ <b>(0,784; 0,196; 0,588)</b>."]) +
        ejemplo("Problema 6 · Pirámide sobre un paralelogramo",
          "La base de una pirámide es el paralelogramo ABCD con A(0, 0, 0), B(2, 0, 0), D(1, 2, 0) y la cúspide es E(1, 1, 3). Halla C y el volumen.",
          ["C = B + D − A = (3, 2, 0).",
           "Área de la base: |AB × AD| = |(2, 0, 0) × (1, 2, 0)| = |(0, 0, 4)| = 4. La altura es la cota de E: 3.",
           "Volumen de la pirámide = (1/3)·4·3 = <b>4</b>.",
           "Con el producto mixto: [AB, AD, AE] = |2 0 0 ; 1 2 0 ; 1 1 3| = 12 es el volumen del paralelepípedo, y la pirámide con base paralelogramo es su tercera parte: 12/3 = 4 ✓."]) +
        ejemplo("Problema 7 · Un vector perpendicular de módulo dado",
          "Halla un vector de módulo 6 perpendicular a u = (1, 2, 2) y a v = (2, 1, −2).",
          ["u × v = (2·(−2) − 2·1, −(1·(−2) − 2·2), 1·1 − 2·2) = (−6, 6, −3), de módulo √(36 + 36 + 9) = 9.",
           "Unitario: (−6, 6, −3)/9 = (−2/3, 2/3, −1/3).",
           "Módulo 6: 6·(−2/3, 2/3, −1/3) = <b>(−4, 4, −2)</b>. También sirve el opuesto (4, −4, 2): hay dos soluciones."]) +
        ejemplo("Problema 8 · Módulos y producto escalar",
          "Si |u| = 3, |v| = 4 y u·v = 6, calcula |u + v|, |u − v| y el coseno del ángulo.",
          ["|u + v|² = (u + v)·(u + v) = |u|² + 2u·v + |v|² = 9 + 12 + 16 = 37 ⟹ <b>|u + v| = √37 ≈ 6,08</b>.",
           "|u − v|² = |u|² − 2u·v + |v|² = 9 − 12 + 16 = 13 ⟹ <b>|u − v| = √13 ≈ 3,61</b>.",
           "cos α = 6/(3·4) = 1/2 ⟹ α = 60°. Así se trabaja sin conocer las componentes."])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para resolver un problema con parámetro.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t4b = { nuevas: nuevas };
})(window);
