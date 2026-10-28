/* ============================================================
   Matemáticas II · ampliaciones · Tema 5: Puntos, rectas y planos en el espacio
   (parte B: secciones nuevas 7 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t5/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Tres planos: el sistema 3×3 en el espacio",
      html:
        "<p>Tres planos son tres ecuaciones con tres incógnitas: es el <b>teorema de Rouché-Frobenius</b> del Tema 3 visto en 3D. Si M es la matriz de coeficientes y M* la ampliada, el rango de cada una decide la posición. La clave para distinguir los casos con rango 2 o 1 es mirar <b>qué pares de planos son paralelos o coincidentes</b> (normales proporcionales).</p>" +
        tabla(["rango M", "rango M*", "Sistema", "Posición de los tres planos"], [
          ["3", "3", "compatible determinado", "se cortan en <b>un punto</b>"],
          ["2", "2", "compatible indeterminado", "se cortan en <b>una recta</b> (un haz), o dos son coincidentes y el tercero los corta"],
          ["2", "3", "incompatible", "no hay punto común: <b>prisma triangular</b> (se cortan dos a dos en rectas paralelas), o dos paralelos y un tercero que los corta"],
          ["1", "1", "compatible indeterminado", "los tres planos son <b>coincidentes</b>"],
          ["1", "2", "incompatible", "los tres son <b>paralelos</b> (o dos coincidentes y uno paralelo a ellos)"]
        ]) +
        "<p><b>Cómo diferenciar los casos con rango M = 2.</b> Si rango M = 2 y rango M* = 2, miras las normales: si ningún par de normales es proporcional, los tres planos pasan por una misma recta (haz); si hay un par proporcional (con la ecuación proporcional entera), esos dos son el mismo plano y el tercero lo corta. Si rango M = 2 y rango M* = 3, ocurre lo mismo con las normales: sin pares proporcionales es un prisma triangular; con un par proporcional (planos paralelos distintos) el tercero los corta a ambos.</p>" +
        ejemplo("Un punto",
          "Estudia la posición de π₁: x + y + z = 3, π₂: x − y + z = 1, π₃: x + y − z = 1.",
          ["M = (1 1 1 ; 1 −1 1 ; 1 1 −1). det M = 1·(1 − 1) − 1·(−1 − 1) + 1·(1 + 1) = 0 + 2 + 2 = 4 ≠ 0 ⟹ rango M = rango M* = 3.",
           "Se cortan en <b>un punto</b>. Restando π₁ − π₂: 2y = 2 ⟹ y = 1; π₁ − π₃: 2z = 2 ⟹ z = 1; y de π₁: x = 1. Punto (1, 1, 1)."]) +
        ejemplo("Prisma triangular",
          "Estudia π₁: x + y = 1, π₂: y + z = 1, π₃: x − z = 1.",
          ["M = (1 1 0 ; 0 1 1 ; 1 0 −1): det M = 1·(−1 − 0) − 1·(0 − 1) + 0 = −1 + 1 = 0 ⟹ rango M = 2 (hay un menor 2×2 no nulo).",
           "En la ampliada: π₁ − π₂ da x − z = 0, pero π₃ dice x − z = 1. Incompatible ⟹ rango M* = 3.",
           "Ningún par de normales es proporcional ⟹ los planos se cortan <b>dos a dos</b> y no tienen punto común: <b>prisma triangular</b>."]) +
        ejemplo("Un haz (una recta común)",
          "Estudia π₁: x + y = 1, π₂: y + z = 1, π₃: x − z = 0.",
          ["Es el mismo sistema, pero ahora π₃ = π₁ − π₂ (x − z = 0, términos independientes incluidos: 1 − 1 = 0). Entonces rango M = rango M* = 2.",
           "Ningún par de normales es proporcional ⟹ <b>los tres planos pasan por una misma recta</b>: x = t, y = 1 − t, z = t."]) +
        w("esp_planos", "planos") +
        ojo("Con rango M = 2 y rango M* = 2 hay dos situaciones muy distintas (un haz o dos planos coincidentes). Mirar solo los rangos no basta: hay que mirar también si las normales son proporcionales.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Haces de planos",
      html:
        "<h5>Haz de planos paralelos</h5>" +
        "<p>Todos los planos paralelos a π: Ax + By + Cz + D = 0 tienen la forma <b>Ax + By + Cz + k = 0</b> (misma normal, distinto término independiente). El valor de k se fija imponiendo que el plano pase por un punto.</p>" +
        "<h5>Haz de planos secantes</h5>" +
        "<p>Los planos que contienen a la recta r: π₁ = 0, π₂ = 0 son todos de la forma</p>" +
        "<div class='formula-wrap'><div class='formula'>(A₁x + B₁y + C₁z + D₁) + λ·(A₂x + B₂y + C₂z + D₂) = 0</div></div>" +
        "<p>(más el propio π₂, que se obtiene en el límite λ → ∞). Con una condición se calcula λ: que pase por un punto, que sea paralelo a un vector o a un eje, que sea perpendicular a otro plano… Es una alternativa al método «recta + punto» y suele ser más corta cuando la recta viene en implícita.</p>" +
        ejemplo("Plano del haz que pasa por un punto",
          "Halla el plano que contiene a la recta r: x + y − z = 1, 2x − y + z = 2 y pasa por el origen.",
          ["Haz: (x + y − z − 1) + λ(2x − y + z − 2) = 0.",
           "Origen (0, 0, 0): (−1) + λ(−2) = 0 ⟹ λ = −1/2.",
           "Sustituimos y multiplicamos por 2: 2(x + y − z − 1) − (2x − y + z − 2) = 0 ⟹ 3y − 3z = 0 ⟹ <b>y − z = 0</b>.",
           "Comprobación: sumando las dos ecuaciones de r sale 3x = 3, luego x = 1, y entonces la primera da y − z = 0. Todos los puntos de r cumplen y = z ✓."]) +
        ejemplo("Plano del haz paralelo a un eje",
          "Del haz (x + y − z − 1) + λ(x − y + z − 3) = 0, halla el plano paralelo al eje OZ.",
          ["Agrupando: (1 + λ)x + (1 − λ)y + (−1 + λ)z − 1 − 3λ = 0. La normal es (1 + λ, 1 − λ, λ − 1).",
           "Paralelo a OZ ⟺ normal perpendicular a (0, 0, 1) ⟺ coeficiente de z igual a 0 ⟹ λ − 1 = 0 ⟹ λ = 1.",
           "Plano: 2x − 4 = 0 ⟹ <b>x = 2</b>. Es, efectivamente, paralelo a OZ (falta la variable z)."]) +
        ojo("En el haz de la recta hay <b>infinitos planos</b>, pero el que se pide se determina con una sola condición. Si te dan dos condiciones, una de ellas sobra o el problema es incompatible. Y recuerda que el plano π₂ «se escapa» del haz: si el plano buscado resulta ser π₂, la ecuación con λ no lo encuentra.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Puntos alineados, coplanarios y otros problemas con puntos",
      html:
        "<h5>Tres puntos alineados</h5>" +
        "<p>A, B y C están alineados si AB y AC son <b>proporcionales</b> (rango 1), es decir, AB × AC = 0. Con un parámetro se iguala la proporción coordenada a coordenada.</p>" +
        ejemplo("Alineados con dos incógnitas",
          "Halla m y n para que A(1, 0, 2), B(2, m, 4) y C(−1, 4, n) estén alineados.",
          ["AB = (1, m, 2) y AC = (−2, 4, n − 2).",
           "Proporcionales: −2/1 = 4/m = (n − 2)/2. De −2 = 4/m ⟹ m = −2. De −2 = (n − 2)/2 ⟹ n − 2 = −4 ⟹ n = −2.",
           "Solución: <b>m = −2, n = −2</b>. Comprobación: AB = (1, −2, 2), AC = (−2, 4, −4) = −2·AB ✓."]) +
        "<h5>Cuatro puntos coplanarios</h5>" +
        "<p>A, B, C y D son coplanarios si [AB, AC, AD] = 0 (Tema 4). Equivale a que D cumpla la ecuación del plano ABC. Con un parámetro, es una ecuación en m.</p>" +
        ejemplo("Coplanarios con parámetro",
          "Halla m para que A(1, 0, 1), B(2, 1, 0), C(0, 1, 2) y D(m, 0, 3) sean coplanarios.",
          ["AB = (1, 1, −1), AC = (−1, 1, 1), AD = (m − 1, −1, 2).",
           "[AB, AC, AD] = |1 1 −1 ; −1 1 1 ; m−1 −1 2| = 1·(2 + 1) − 1·(−2 − (m − 1)) + (−1)·(1 − (m − 1)) = 3 + (m + 1) − (2 − m) = 2 + 2m.",
           "2 + 2m = 0 ⟹ <b>m = −1</b>. Otra vía: n = AB × AC = (2, 0, 2), el plano ABC es x + z = 2, y D(m, 0, 3) lo cumple si m + 3 = 2, es decir, m = −1 ✓."]) +
        "<h5>Cuarto vértice de un paralelogramo y simétrico de un punto</h5>" +
        "<p>Si ABCD es un paralelogramo (vértices en orden), AB = DC, así que <b>D = A + C − B</b>. El <b>simétrico</b> de A respecto de un punto M es A′ = 2M − A (M es el punto medio de AA′). Son resultados que aparecen como parte de un problema mayor.</p>" +
        ejemplo("Paralelogramo y simétrico",
          "Dados A(1, 2, 3), B(2, 4, 3) y C(4, 5, 1), halla D para que ABCD sea un paralelogramo, y el simétrico de A respecto de M(0, 1, −1).",
          ["D = A + C − B = (1 + 4 − 2, 2 + 5 − 4, 3 + 1 − 3) = <b>(3, 3, 1)</b>. Comprobación: AB = (1, 2, 0) = DC = (4 − 3, 5 − 3, 1 − 1) = (1, 2, 0) ✓.",
           "A′ = 2M − A = (0 − 1, 2 − 2, −2 − 3) = <b>(−1, 0, −5)</b>. Comprobación: el punto medio de AA′ es (0, 1, −1) = M ✓."]) +
        "<h5>Punto de una recta con una condición</h5>" +
        "<p>Para hallar «el punto de r que cumple…», se escribe el punto genérico P(t) con las paramétricas y se impone la condición (que esté en un plano, que tenga una coordenada dada, que equidiste de dos puntos…): resulta una ecuación en t.</p>" +
        ejemplo("Corte de una recta con un plano coordenado",
          "Halla el punto en que la recta que pasa por A(1, 2, 3) con director v = (1, 1, −1) corta al plano XY.",
          ["Punto genérico: (1 + t, 2 + t, 3 − t). El plano XY es z = 0.",
           "3 − t = 0 ⟹ t = 3 ⟹ <b>(4, 5, 0)</b>."])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Problemas con parámetro (estilo EvAU)",
      html:
        "<p>En Madrid es frecuente un apartado del tipo «estudia la posición relativa según el valor de m». El método es siempre el mismo: <b>calcular un determinante o un producto escalar que dependa de m, ver cuándo se anula y comprobar a mano los valores críticos</b>.</p>" +
        tabla(["Pregunta", "Qué hay que calcular", "Se anula cuando…"], [
          ["Dos rectas: ¿se cortan?", "det(u, v, AQ) en m", "se cortan (u, v no paralelos)"],
          ["Recta y plano: ¿paralelos?", "v·n en m", "v·n = 0 ⟹ paralelos o contenida"],
          ["Dos planos: ¿paralelos?", "proporcionalidad de (A, B, C, D)", "normales proporcionales"],
          ["Tres planos", "det M en m, y los rangos en los valores críticos", "det = 0: estudiar M y M* aparte"],
          ["Puntos coplanarios / alineados", "[AB, AC, AD] o proporcionalidad de AB y AC", "se cumple la condición"]
        ]) +
        ejemplo("Dos rectas con parámetro",
          "Estudia según m la posición de r: A(0, 1, −1), u = (1, m, 2) y s: B(1, 0, 1), v = (2, 1, m).",
          ["AB = (1, −1, 2). ¿Paralelas? u ∥ v exigiría 1/2 = m/1 = 2/m: la primera igualdad da m = 1/2 y la tercera m = 4, imposible a la vez. <b>Nunca son paralelas</b>; el rango de {u, v} es 2 siempre.",
           "det(u, v, AB) = |1 m 2 ; 2 1 m ; 1 −1 2| = 1·(2 + m) − m·(4 − m) + 2·(−2 − 1) = m² − 3m − 4 = (m − 4)(m + 1).",
           "Si <b>m = 4 o m = −1</b>: el determinante es 0 ⟹ se cortan. Si <b>m ≠ 4 y m ≠ −1</b>: se cruzan."]) +
        ejemplo("Recta y plano con parámetro",
          "Estudia según m la posición de r: x = 1 + t, y = 2 − t, z = t y π: 2x + my − z = 4.",
          ["v = (1, −1, 1), n = (2, m, −1): v·n = 2 − m − 1 = 1 − m.",
           "Si <b>m ≠ 1</b>: v·n ≠ 0 ⟹ secantes (siempre se cortan en un punto).",
           "Si <b>m = 1</b>: v·n = 0. Se mira un punto de r, P(1, 2, 0): 2 + 2 − 0 = 4 ✓ cumple π ⟹ <b>la recta está contenida en el plano</b>. (Con este plano nunca son paralelos sin tocarse: depende de que el punto cumpla o no la ecuación.)"]) +
        ejemplo("Tres planos con parámetro",
          "Estudia según m: x + y + z = 1, x + my + z = 2, x + y + mz = 1.",
          ["det M = |1 1 1 ; 1 m 1 ; 1 1 m| = 1·(m² − 1) − 1·(m − 1) + 1·(1 − m) = (m − 1)². Se anula solo para m = 1.",
           "<b>m ≠ 1</b>: rango M = rango M* = 3 ⟹ los tres planos se cortan en un punto.",
           "<b>m = 1</b>: los planos son x + y + z = 1, x + y + z = 2 y x + y + z = 1. Rango M = 1 y rango M* = 2 ⟹ incompatible: π₁ y π₃ son <b>coincidentes</b> y π₂ es <b>paralelo</b> a ellos."]) +
        ojo("Cuando un determinante con parámetro se anula en un valor, <b>ese valor no está resuelto</b>: hay que sustituirlo y estudiar el caso a mano. Y no olvides la otra rama: el resto de valores de m. Una respuesta completa tiene siempre «si m = … entonces…, y si m ≠ …, entonces…».")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para resolver un problema de posiciones relativas.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t5b = { nuevas: nuevas };
})(window);
