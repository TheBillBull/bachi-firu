/* ============================================================
   Matemáticas II · ampliaciones · Tema 14: Distribuciones de probabilidad
   (parte B: secciones nuevas 5 a 7)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t14/" + ref); }

  var nuevas = [];

  // ---------------------------------------------------------------- 5. La tabla N(0,1)
  nuevas.push({
    h: "5. La tabla N(0,1): cómo se lee y las cinco situaciones",
    html:
      "<p>La tabla de la normal estándar da, para cada z ≥ 0 con dos decimales, el valor <b>Φ(z) = P(Z ≤ z)</b> (el área a la izquierda de z). Se entra por la <b>fila</b> con la unidad y el primer decimal (1,3) y por la <b>columna</b> con el segundo decimal (0,07): la casilla de la fila 1,3 y la columna 0,07 es Φ(1,37) = <b>0,9147</b>. Algunos valores que conviene reconocer:</p>" +
      tabla(["z", "0", "0,5", "1", "1,28", "1,5", "1,64", "1,65", "1,96", "2", "2,33", "2,5", "2,58", "3"], [
        ["Φ(z)", "0,5", "0,6915", "0,8413", "0,8997", "0,9332", "0,9495", "0,9505", "0,9750", "0,9772", "0,9901", "0,9938", "0,9951", "0,9987"]
      ]) +
      "<p>Los números 1,645 (95 % por la izquierda), 1,96 (95 % central) y 2,575 (99 % central) se usan tanto que merece la pena saberlos de memoria. Como la tabla sólo cubre z ≥ 0, el resto de casos se reducen a ella por la <b>simetría</b> de la campana (el área a la izquierda de −z es la que hay a la derecha de z). Las cinco situaciones son:</p>" +
      tabla(["Se pide", "Se calcula como", "Ejemplo con la tabla"], [
        ["P(Z ≤ a), a ≥ 0", "Φ(a): se lee directamente", "P(Z ≤ 1,37) = 0,9147"],
        ["P(Z ≥ a)", "1 − Φ(a)", "P(Z ≥ 1,37) = 1 − 0,9147 = 0,0853"],
        ["P(Z ≤ −a)", "1 − Φ(a) (simetría)", "P(Z ≤ −0,84) = 1 − 0,7995 = 0,2005"],
        ["P(a ≤ Z ≤ b)", "Φ(b) − Φ(a)", "P(0,5 ≤ Z ≤ 1,5) = 0,9332 − 0,6915 = 0,2417"],
        ["P(−a ≤ Z ≤ b)", "Φ(b) − (1 − Φ(a)) = Φ(a) + Φ(b) − 1", "P(−1,25 ≤ Z ≤ 2) = 0,9772 + 0,8944 − 1 = 0,8716"],
        ["P(−a ≤ Z ≤ a)", "2Φ(a) − 1", "P(−1,96 ≤ Z ≤ 1,96) = 2·0,9750 − 1 = 0,95"]
      ]) +
      "<p>El método más seguro es <b>dibujar la campana</b>, sombrear la zona pedida y pensar qué área es: «todo menos lo que no quiero». Con z negativa, antes de buscar en la tabla se pasa a positiva por simetría. El simulador de la sección 3 te muestra exactamente esta cuenta (con los valores de la tabla) para cualquier μ, σ y valores a, b.</p>" +
      ejemplo("Leer la tabla en los cinco casos", "Para Z ~ N(0, 1) calcula (a) P(Z ≤ −1,5); (b) P(Z &gt; 2,33); (c) P(−1 ≤ Z ≤ 1); (d) P(1,25 ≤ Z ≤ 2).",
        ["<b>(a)</b> Simetría: P(Z ≤ −1,5) = 1 − Φ(1,5) = 1 − 0,9332 = <b>0,0668</b>.",
         "<b>(b)</b> P(Z &gt; 2,33) = 1 − Φ(2,33) = 1 − 0,9901 = <b>0,0099</b> (menos del 1 %).",
         "<b>(c)</b> P(−1 ≤ Z ≤ 1) = 2Φ(1) − 1 = 2·0,8413 − 1 = <b>0,6826</b> (la regla del 68 %).",
         "<b>(d)</b> P(1,25 ≤ Z ≤ 2) = Φ(2) − Φ(1,25) = 0,9772 − 0,8944 = <b>0,0828</b>."]) +
      ojo("Un error muy repetido: P(Z ≤ −0,84) = 1 − 0,7995 = 0,2005, no 0,7995 ni −0,7995. Una probabilidad jamás es negativa, y si z es negativa el área es menor que 0,5.")
  });

  // ---------------------------------------------------------------- 6. Normal con enunciado
  nuevas.push({
    h: "6. Problemas con la normal: tipificar, destipificar y búsqueda inversa",
    html:
      "<p>Los problemas de normal de la EvAU son siempre de uno de estos tipos. Ante cada uno, el primer paso es el mismo: <b>escribir la distribución</b> («X = peso ~ N(70, 8)») y dibujar la campana.</p>" +
      tabla(["Tipo", "Qué te dan", "Qué buscas", "Método"], [
        ["Directo", "μ, σ y un valor (o dos)", "Una probabilidad", "Tipificar x → z, tabla, restar o complementar"],
        ["Inverso", "μ, σ y una probabilidad (porcentaje)", "El valor k", "Convertir a P(Z ≤ z) = área, buscar z <b>en el cuerpo</b> de la tabla, destipificar k = μ + z·σ"],
        ["Parámetro", "Una probabilidad y un valor (y μ o σ)", "σ o μ", "Tipificar con la incógnita, igualar a z de la tabla, despejar"],
        ["Dos datos", "Dos probabilidades con dos valores", "μ y σ", "Dos z: sistema de dos ecuaciones lineales"]
      ]) +
      ejemplo("Tipo directo", "El peso de los adultos de una población sigue N(70; 8) kg. Halla (a) P(X &gt; 80); (b) P(62 ≤ X ≤ 78); (c) P(X &lt; 56); (d) cuántos de 1 000 adultos pesan más de 80 kg.",
        ["<b>(a)</b> z = (80 − 70)/8 = 1,25. P(X &gt; 80) = 1 − Φ(1,25) = 1 − 0,8944 = <b>0,1056</b>.",
         "<b>(b)</b> z = (62 − 70)/8 = −1 y z = (78 − 70)/8 = 1. P = Φ(1) − Φ(−1) = 2·0,8413 − 1 = <b>0,6826</b>.",
         "<b>(c)</b> z = (56 − 70)/8 = −1,75. P(X &lt; 56) = P(Z &lt; −1,75) = 1 − Φ(1,75) = 1 − 0,9599 = <b>0,0401</b>.",
         "<b>(d)</b> Se espera que el 10,56 % de la población pese más de 80 kg: 1 000·0,1056 = <b>≈ 106 adultos</b>."]) +
      w("m2t14_inversa") +
      "<h5>El tipo inverso, paso a paso</h5>" +
      "<ol><li>Escribe lo que te piden como P(X ≤ k) = p (o convierte: P(X ≥ k) = p ⟹ P(X ≤ k) = 1 − p).</li><li>Escribe P(Z ≤ z) = ese número y <b>busca el número en el interior de la tabla</b> (el más cercano) para leer z en los márgenes. Si el área es menor que 0,5, z es negativa: se busca 1 − área y se cambia el signo.</li><li>Destipifica: k = μ + z·σ.</li></ol>" +
      ejemplo("Tipo inverso: el 10 % superior", "Con X ~ N(70; 8), ¿a partir de qué peso k se está entre el 10 % de los más pesados?",
        ["P(X ≥ k) = 0,10 ⟹ P(X ≤ k) = 0,90 ⟹ P(Z ≤ z) = 0,90.",
         "En el cuerpo de la tabla, el valor más cercano a 0,90 es 0,8997 (que corresponde a z = 1,28; el siguiente, 0,9015, es de z = 1,29).",
         "k = 70 + 1,28·8 = 70 + 10,24 = <b>80,24 kg</b>. Se necesita pesar más de unos 80,2 kg."]) +
      ejemplo("Tipo inverso con un intervalo central", "Las puntuaciones de una prueba siguen N(100; 15). Halla el intervalo simétrico respecto de la media que contiene al 95 % de las personas.",
        ["Se busca [100 − h, 100 + h] con P(100 − h ≤ X ≤ 100 + h) = 0,95. Por simetría quedan 0,025 a cada lado: P(X ≤ 100 + h) = 0,975.",
         "En la tabla, Φ(z) = 0,9750 ⟹ z = 1,96. Entonces h = 1,96·15 = 29,4.",
         "Intervalo: <b>[70,6; 129,4]</b>. (La regla de los «2σ» daba [70, 130]: era una aproximación de 1,96 por 2.)"]) +
      ejemplo("Tipo parámetro: hallar σ", "Las alturas de una planta siguen N(100; σ) cm y se sabe que el 93,32 % mide 112 cm o menos. Halla σ.",
        ["P(X ≤ 112) = 0,9332 ⟹ P(Z ≤ (112 − 100)/σ) = 0,9332.",
         "En la tabla, 0,9332 corresponde a z = 1,5. Luego 12/σ = 1,5 ⟹ <b>σ = 8</b> cm."]) +
      ejemplo("Dos datos: hallar μ y σ", "X sigue una normal. Se sabe que P(X ≤ 80) = 0,9772 y P(X ≤ 56) = 0,1587. Halla μ y σ.",
        ["0,9772 ⟹ z = 2: (80 − μ)/σ = 2. Y 0,1587 = 1 − 0,8413 ⟹ z = −1: (56 − μ)/σ = −1.",
         "Sistema: 80 − μ = 2σ y 56 − μ = −σ. Restando: 24 = 3σ ⟹ <b>σ = 8</b>, y μ = 80 − 16 = <b>64</b>."])
  });

  // ---------------------------------------------------------------- 7. Binomial o normal
  nuevas.push({
    h: "7. ¿Binomial o normal? Problemas combinados y aproximación en problemas",
    html:
      "<p>En un problema real conviene decidir antes de calcular. Tres preguntas bastan:</p>" +
      tabla(["Pregunta", "Si la respuesta es…", "Modelo"], [
        ["¿Qué se mide?", "Se <b>cuenta</b> algo (éxitos, personas, piezas…) → valores 0, 1, 2, …", "Binomial B(n, p)"],
        ["", "Se <b>mide</b> algo continuo (peso, tiempo, altura, nota) y el enunciado dice «sigue una normal»", "Normal N(μ, σ)"],
        ["Si es binomial, ¿n es grande?", "n·p ≥ 5 y n·q ≥ 5 y el enunciado pide muchos términos (n ≈ 50 o más)", "Se puede aproximar por N(np, √npq) con corrección de continuidad"],
        ["", "n pequeño (≤ 20) o p muy pequeño o muy grande", "Fórmula binomial exacta; la normal no sirve"]
      ]) +
      "<h5>Aproximación en un problema con enunciado</h5>" +
      ejemplo("Moneda 400 veces", "Se lanza 400 veces una moneda equilibrada. Halla la probabilidad de obtener (a) 215 caras o más; (b) entre 190 y 210 caras, ambas incluidas.",
        ["X ~ B(400; 0,5). Como n·p = n·q = 200 ≥ 5, se aproxima por Y ~ N(200; √(400·0,5·0,5)) = N(200; 10).",
         "<b>(a)</b> P(X ≥ 215) ≈ P(Y ≥ 214,5) = P(Z ≥ 1,45) = 1 − 0,9265 = <b>0,0735</b>.",
         "<b>(b)</b> P(190 ≤ X ≤ 210) ≈ P(189,5 ≤ Y ≤ 210,5) = P(−1,05 ≤ Z ≤ 1,05) = 2·0,8531 − 1 = <b>0,7062</b>.",
         "El exacto con la binomial es 0,0735 y 0,7063: la aproximación acierta a 4 decimales. Sin corrección el apartado (b) daría P(−1 ≤ Z ≤ 1) = 0,6826, con un error de casi 0,024."]) +
      ejemplo("Pocas probabilidades: control de calidad", "Una fábrica produce un 10 % de piezas defectuosas. En un lote de 900 piezas, ¿qué probabilidad hay de que haya 76 defectuosas o menos?",
        ["X ~ B(900; 0,1): n·p = 90 ≥ 5 y n·q = 810 ≥ 5. Aproximación Y ~ N(90; √(900·0,1·0,9)) = N(90; 9).",
         "P(X ≤ 76) ≈ P(Y ≤ 76,5) = P(Z ≤ (76,5 − 90)/9) = P(Z ≤ −1,5) = 1 − 0,9332 = <b>0,0668</b>.",
         "Es poco probable (≈ 6,7 %): lo normal es encontrar unas 90 defectuosas, con una desviación de 9."]) +
      "<h5>Normal y binomial en el mismo problema</h5>" +
      "<p>A veces la probabilidad p de la binomial se obtiene con la normal. Primero se calcula la probabilidad de un individuo (con la tabla) y después se aplica la binomial a un grupo.</p>" +
      ejemplo("Normal para hallar p, binomial para el grupo", "La altura de los adultos sigue N(172; 7) cm. Se eligen 5 personas al azar. ¿Qué probabilidad hay de que al menos una mida más de 179 cm?",
        ["Para una persona: P(X &gt; 179) = P(Z &gt; (179 − 172)/7) = P(Z &gt; 1) = 1 − 0,8413 = 0,1587. Éste es el valor de p.",
         "Sea Y = nº de personas de las 5 que superan 179 cm: Y ~ B(5; 0,1587).",
         "P(Y ≥ 1) = 1 − P(Y = 0) = 1 − 0,8413⁵ = 1 − 0,4215 = <b>0,5785</b>."]) +
      ojo("Cuidado con la dirección: la normal se usa para continuas (peso, altura, tiempo) y la binomial para contar. Y no se aplica la corrección de continuidad a una normal «de verdad» (como las alturas), sólo cuando se aproxima una binomial.")
  });

  B.parte.m2t14b = { nuevas: nuevas };
})(window);
