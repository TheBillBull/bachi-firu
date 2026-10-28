/* ============================================================
   Matemáticas II · ampliaciones · Tema 13: Azar y probabilidad
   (parte B: secciones nuevas 6 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t13/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Álgebra de sucesos y diagramas de Venn",
      html:
        "<p>Muchos enunciados de la EvAU empiezan con una frase en castellano («que ocurra al menos uno», «que no ocurra ninguno») que hay que <b>traducir a conjuntos</b> antes de calcular. Si tienes una tabla de traducción en la cabeza, la mitad del problema está hecha.</p>" +
        tabla(["En castellano", "En símbolos", "Probabilidad"], [
          ["Ocurre A o B (al menos uno)", "A ∪ B", "P(A) + P(B) − P(A ∩ B)"],
          ["Ocurren A y B (los dos)", "A ∩ B", "dato, o P(A)·P(B | A)"],
          ["No ocurre A", "Ā", "1 − P(A)"],
          ["No ocurre ninguno (ni A ni B)", "Ā ∩ B̄ = (A ∪ B)ᶜ", "1 − P(A ∪ B)"],
          ["No ocurren los dos (como mucho uno)", "Ā ∪ B̄ = (A ∩ B)ᶜ", "1 − P(A ∩ B)"],
          ["Solo A (A pero no B)", "A ∩ B̄ = A − B", "P(A) − P(A ∩ B)"],
          ["Exactamente uno", "(A ∩ B̄) ∪ (Ā ∩ B)", "P(A) + P(B) − 2·P(A ∩ B)"]
        ]) +
        "<h5>Las leyes de De Morgan</h5>" +
        "<p><b>(A ∪ B)ᶜ = Ā ∩ B̄</b> y <b>(A ∩ B)ᶜ = Ā ∪ B̄</b>. En palabras: «no (A o B)» equivale a «ni A ni B»; «no (A y B)» equivale a «no A o no B». En probabilidad son un atajo constante: si te dan P(Ā ∪ B̄) = 0,8, sabes de inmediato que P(A ∩ B) = 1 − 0,8 = 0,2, sin dibujar nada.</p>" +
        "<p>El diagrama de Venn de probabilidades ayuda porque cada región lleva su valor y las cuatro suman 1. Mueve P(A), P(B) y P(A ∩ B), elige una operación y mira qué región se ilumina y qué probabilidad le corresponde.</p>" +
        w("m2_venn_prob") +
        ejemplo("Del enunciado a las regiones",
          "Se sabe que P(A) = 0,5, P(B) = 0,4 y P(A ∪ B) = 0,7. Calcula P(A ∩ B), P(Ā ∩ B̄), P(Ā ∪ B̄) y la probabilidad de que ocurra exactamente uno.",
          ["P(A ∩ B) = 0,5 + 0,4 − 0,7 = <b>0,2</b>.",
           "Regiones del Venn: solo A = 0,5 − 0,2 = 0,3; ambos = 0,2; solo B = 0,4 − 0,2 = 0,2; ninguno = 1 − 0,7 = <b>0,3</b> (suman 0,3 + 0,2 + 0,2 + 0,3 = 1 ✓).",
           "P(Ā ∩ B̄) = P((A ∪ B)ᶜ) = 1 − 0,7 = <b>0,3</b>.   P(Ā ∪ B̄) = P((A ∩ B)ᶜ) = 1 − 0,2 = <b>0,8</b>.",
           "Exactamente uno = solo A + solo B = 0,3 + 0,2 = <b>0,5</b>."]) +
        ejemplo("Un dato dado «al revés» con De Morgan",
          "Si P(Ā ∪ B̄) = 0,8, P(A) = 0,5 y P(Ā ∩ B̄) = 0,3, calcula P(B).",
          ["De Morgan: P(A ∩ B) = 1 − P(Ā ∪ B̄) = 1 − 0,8 = 0,2.   Y P(A ∪ B) = 1 − P(Ā ∩ B̄) = 1 − 0,3 = 0,7.",
           "De P(A ∪ B) = P(A) + P(B) − P(A ∩ B): 0,7 = 0,5 + P(B) − 0,2 ⟹ <b>P(B) = 0,4</b>."]) +
        "<h5>«Al menos uno» con muchos sucesos: el truco del complementario</h5>" +
        "<p>Para tres o más sucesos independientes, la unión se desarrolla fatal (siete términos). Se evita pasando al complementario: <b>P(al menos uno) = 1 − P(ninguno) = 1 − P(Ā₁)·P(Ā₂)·P(Ā₃)</b>. Para «exactamente uno» sí hay que sumar los casos y se calcula caso a caso.</p>" +
        ejemplo("Tres tiradores",
          "Tres tiradores aciertan con probabilidades 0,8, 0,7 y 0,6, y disparan de forma independiente. Calcula la probabilidad de que acierte al menos uno, la de que acierte exactamente uno y la de que acierten los tres.",
          ["<b>Ninguno</b> acierta: 0,2·0,3·0,4 = 0,024 ⟹ <b>al menos uno</b>: 1 − 0,024 = <b>0,976</b>.",
           "<b>Exactamente uno</b>: acierta solo el 1.º (0,8·0,3·0,4 = 0,096), o solo el 2.º (0,2·0,7·0,4 = 0,056), o solo el 3.º (0,2·0,3·0,6 = 0,036). Suma: <b>0,188</b>.",
           "<b>Los tres</b>: 0,8·0,7·0,6 = <b>0,336</b>."]) +
        ojo("«Exactamente uno» <b>no</b> es lo mismo que «al menos uno». En el Venn, «al menos uno» ilumina las tres regiones (solo A, ambos, solo B); «exactamente uno» solo las dos de los lados, sin la intersección. La diferencia es justo P(A ∩ B).")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Independencia frente a incompatibilidad",
      html:
        "<p>Es la confusión más frecuente del tema, y la EvAU lo sabe. Son dos ideas distintas:</p>" +
        tabla(["", "Incompatibles", "Independientes"], [
          ["Significa", "No pueden ocurrir a la vez", "Saber uno no cambia la probabilidad del otro"],
          ["En fórmulas", "A ∩ B = ∅, es decir P(A ∩ B) = 0", "P(A ∩ B) = P(A)·P(B)"],
          ["Unión", "P(A ∪ B) = P(A) + P(B)", "P(A ∪ B) = P(A) + P(B) − P(A)·P(B)"],
          ["Condicionada", "P(A | B) = 0", "P(A | B) = P(A)"],
          ["Se ve en el Venn", "Círculos separados", "Los círculos se solapan «en la proporción justa»"]
        ]) +
        "<p><b>Si P(A) &gt; 0 y P(B) &gt; 0, dos sucesos incompatibles nunca son independientes</b>: ocurrir A obliga a que B no ocurra, así que saber A sí cambia la probabilidad de B (la deja en 0). Comprueba en el simulador de la sección 6 con el botón «Incompatibles» que el indicador de independencia marca «no».</p>" +
        "<p>Tres formas equivalentes de comprobar independencia (si una vale, valen las tres): <b>P(A ∩ B) = P(A)·P(B)</b>, <b>P(A | B) = P(A)</b>, <b>P(B | A) = P(B)</b>. Además, si A y B son independientes, también lo son A y B̄, Ā y B, Ā y B̄: saber algo de uno no te dice nada del otro, ni del contrario.</p>" +
        ejemplo("Hallar x para que sean independientes (o incompatibles)",
          "Sean A y B con P(A) = 0,3 y P(A ∪ B) = 0,58. Calcula P(B) si (a) A y B son independientes; (b) A y B son incompatibles.",
          ["<b>(a)</b> Independientes: P(A ∩ B) = 0,3·x. Entonces 0,58 = 0,3 + x − 0,3x = 0,3 + 0,7x ⟹ 0,7x = 0,28 ⟹ <b>x = 0,4</b>.",
           "Comprobación: P(A ∩ B) = 0,12 y 0,3 + 0,4 − 0,12 = 0,58 ✓.",
           "<b>(b)</b> Incompatibles: P(A ∩ B) = 0 ⟹ 0,58 = 0,3 + x ⟹ <b>x = 0,28</b>.",
           "El mismo dato produce dos valores distintos: por eso el enunciado tiene que decir cuál de las dos situaciones se da."]) +
        ejemplo("Comprobar independencia con tres datos",
          "Se sabe que P(A) = 0,55, P(B) = 0,6 y P(A | B) = 0,5. ¿Son independientes? Calcula P(A ∩ B).",
          ["P(A ∩ B) = P(B)·P(A | B) = 0,6·0,5 = <b>0,3</b>.",
           "Si fueran independientes, sería P(A)·P(B) = 0,55·0,6 = 0,33 ≠ 0,3. (O de otra forma: P(A | B) = 0,5 ≠ P(A) = 0,55.) <b>No son independientes.</b>",
           "P(A ∪ B) = 0,55 + 0,6 − 0,3 = 0,85."]) +
        ejemplo("Independencia en un experimento de dados",
          "Se lanza un dado. A = «sale par», B = «sale múltiplo de 3». ¿Son independientes?",
          ["A = {2, 4, 6} ⟹ P(A) = 1/2.   B = {3, 6} ⟹ P(B) = 1/3.   A ∩ B = {6} ⟹ P(A ∩ B) = 1/6.",
           "P(A)·P(B) = 1/2 · 1/3 = 1/6 = P(A ∩ B) ✓ ⟹ <b>son independientes</b>, aunque tienen un resultado en común (no son incompatibles).",
           "Si cambias B por «sale 5 o más» = {5, 6}: P(B) = 1/3, P(A ∩ B) = 1/6 también (solo el 6)... y P(A)·P(B) = 1/6: otra vez independientes. En cambio con B = «sale más de 3» = {4, 5, 6}: P(B) = 1/2, P(A ∩ B) = 2/6 = 1/3 ≠ 1/4: <b>dependientes</b>. Con dados no se adivina: se calcula."]) +
        ojo("«Independientes» no se ve en el enunciado como palabra mágica: a veces solo dice «los resultados de dos lanzamientos» o «con reposición». En cambio «sin reposición» casi siempre significa <b>dependientes</b>.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Tablas de contingencia y diagramas de árbol",
      html:
        "<p>Muchos problemas dan los datos de una forma y piden otra. Hay tres representaciones equivalentes (árbol, tabla de contingencia, fórmulas) y conviene saber pasar de una a otra. La <b>tabla de contingencia</b> es la más fiable cuando los datos son <b>porcentajes de una misma población</b>: rellenas las casillas y todo se lee contando.</p>" +
        ejemplo("Una tabla con 200 alumnos",
          "En un grupo de 200 alumnos hay 120 chicas. Practican deporte 80 alumnos, y de ellos 50 son chicas. Se elige un alumno al azar. Calcula P(chica | deporte), P(deporte | chica) y estudia la independencia.",
          ["Se construye la tabla (columnas: deporte / no; filas: chica / chico). Chicas con deporte: 50. Chicas sin deporte: 120 − 50 = 70. Chicos con deporte: 80 − 50 = 30. Chicos sin deporte: 80 − 30 = 50 (hay 200 − 120 = 80 chicos).",
           "<b>P(chica | deporte)</b> = 50/80 = 5/8 = 0,625 (la casilla entre el total de su <i>columna</i>).   <b>P(deporte | chica)</b> = 50/120 = 5/12 ≈ 0,417 (la casilla entre el total de su <i>fila</i>).",
           "Independencia: P(chica)·P(deporte) = 0,6·0,4 = 0,24, mientras que P(chica ∩ deporte) = 50/200 = 0,25. Como 0,24 ≠ 0,25, <b>no son independientes</b> (aunque casi)."]) +
        w("m13_contingencia") +
        "<p>Cambia las frecuencias de la tabla y comprueba cómo se mueven las condicionadas. El caso «Independientes» está construido para que los productos coincidan casilla a casilla.</p>" +
        "<h5>Del árbol a la tabla y vuelta</h5>" +
        "<p>Cuando el enunciado da porcentajes («el 60 % de los clientes son de la zona norte, y de ellos el 30 % compra online…»), conviene <b>inventar una población de 1.000 (o 10.000) personas</b> y rellenar la tabla con números enteros: las operaciones con probabilidades se convierten en simples divisiones de casillas. Es el mismo método de las 1.000 personas del test médico.</p>" +
        ejemplo("Del árbol a la tabla",
          "El 70 % de los alumnos usa transporte público. De los que lo usan, el 50 % llega con retraso; de los que no, el 20 %. ¿Qué porcentaje de los alumnos con retraso usa transporte público?",
          ["Población de 1.000 alumnos: 700 usan transporte y 300 no. Con retraso: 0,5·700 = 350 y 0,2·300 = 60. Total con retraso: 410.",
           "Entre los 410 con retraso, 350 usan transporte: <b>350/410 = 35/41 ≈ 0,854</b>.",
           "Con probabilidades sería: P(B) = 0,7·0,5 + 0,3·0,2 = 0,41 y P(A | B) = 0,35/0,41. Es exactamente lo mismo; la tabla evita errores de signo y de orden."])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Problemas completos al estilo EvAU",
      html:
        "<p>Los tres tipos de problema que más se repiten: urnas con trasvase, objetos con una causa oculta (moneda trucada, fábrica) y pruebas diagnósticas. Todos se resuelven con el mismo esquema: <b>definir los sucesos, dibujar el árbol (o la tabla), multiplicar por ramas, sumar hojas, y dividir para «dar la vuelta»</b>.</p>" +
        ejemplo("Urnas con trasvase",
          "La urna U₁ tiene 4 bolas blancas y 6 negras; la urna U₂, 3 blancas y 2 negras. Se saca una bola de U₁ al azar, se pasa a U₂ y de U₂ se extrae una bola. (a) ¿Probabilidad de que la bola extraída de U₂ sea blanca? (b) Si es blanca, ¿probabilidad de que la bola pasada fuese blanca?",
          ["Sucesos: B₁ = «la bola pasada es blanca» (P = 4/10), N₁ = «negra» (P = 6/10). Y B₂ = «la extraída de U₂ es blanca».",
           "Si pasó una blanca, U₂ tiene 6 bolas con 4 blancas: P(B₂ | B₁) = 4/6 = 2/3. Si pasó una negra, 3 blancas de 6: P(B₂ | N₁) = 1/2.",
           "<b>(a)</b> P(B₂) = 4/10·2/3 + 6/10·1/2 = 4/15 + 3/10 = 8/30 + 9/30 = <b>17/30 ≈ 0,567</b>.",
           "<b>(b)</b> Bayes: P(B₁ | B₂) = (4/10·2/3)/(17/30) = (8/30)/(17/30) = <b>8/17 ≈ 0,471</b>.",
           "Observa que antes de saber nada P(B₁) = 0,4 y, sabiendo que la extraída fue blanca, sube a 0,471: ver blanca hace algo más probable que se haya añadido una blanca."]) +
        ejemplo("Moneda trucada",
          "Una caja contiene dos monedas: una normal y otra trucada con P(cara) = 0,8. Se elige una al azar y se lanza. (a) ¿Probabilidad de cara? (b) Salió cara: ¿probabilidad de que fuese la trucada?",
          ["T = «trucada» (P = 1/2), N = «normal» (P = 1/2). C = «cara».",
           "<b>(a)</b> P(C) = 0,5·0,8 + 0,5·0,5 = 0,4 + 0,25 = <b>0,65</b>.",
           "<b>(b)</b> P(T | C) = 0,4/0,65 = 8/13 ≈ <b>0,615</b>. Antes de lanzar era 0,5; una cara aumenta la sospecha de que sea la trucada."]) +
        ejemplo("Test con falsos negativos",
          "Una enfermedad afecta al 2 % de la población. El test da positivo en el 90 % de los enfermos y en el 4 % de los sanos. Una persona da <b>negativo</b>. ¿Probabilidad de que, aun así, esté enferma?",
          ["E = «enfermo» (0,02), S = «sano» (0,98). Negativo (−): P(− | E) = 0,10 (falso negativo) y P(− | S) = 0,96.",
           "P(E ∩ −) = 0,02·0,10 = 0,002.   P(S ∩ −) = 0,98·0,96 = 0,9408.   P(−) = 0,002 + 0,9408 = 0,9428.",
           "<b>P(E | −) = 0,002/0,9428 ≈ 0,0021</b>: un 0,21 %. Un negativo tranquiliza mucho más que un positivo alarma, por la misma razón de la tasa base."]) +
        ejemplo("Datos al revés: ¿qué sensibilidad hace falta?",
          "Con prevalencia del 10 % y un 5 % de falsos positivos, ¿qué sensibilidad s debe tener el test para que P(enfermo | positivo) = 0,5?",
          ["P(E | +) = 0,1·s/(0,1·s + 0,9·0,05) = 0,1s/(0,1s + 0,045).",
           "Igualando a 0,5: 0,1s = 0,5·(0,1s + 0,045) ⟹ 0,1s = 0,05s + 0,0225 ⟹ 0,05s = 0,0225 ⟹ <b>s = 0,45</b>.",
           "Interpretación: basta un test que detecte menos de la mitad de los enfermos para que, con esa prevalencia, un positivo sea «cara o cruz»."])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Método general y errores típicos",
      html:
        "<h5>Cinco pasos que sirven para casi todo</h5>" +
        "<ol><li><b>Nombra los sucesos</b> con letras y escribe lo que significa cada una («D = defectuosa»).</li>" +
        "<li><b>Traduce los datos</b> a probabilidades, distinguiendo conjuntas P(A ∩ B), condicionadas P(A | B) y simples P(A). Palabras clave de la condicionada: «sabiendo que», «dado que», «de los que», «entre los». Mira lo que va <b>detrás</b> del «dado que»: es la condición.</li>" +
        "<li><b>Elige representación</b>: árbol si hay etapas o causas; tabla si son porcentajes de una población; Venn si hay operaciones de sucesos.</li>" +
        "<li><b>Calcula</b>: producto por ramas, suma de hojas (total), cociente (Bayes o condicionada). Para «al menos uno», prueba el complementario.</li>" +
        "<li><b>Comprueba</b>: ¿entre 0 y 1? ¿las ramas de cada nodo suman 1? ¿el resultado cumple el sentido común?</li></ol>" +
        "<h5>Los errores que más puntos cuestan</h5>" +
        tabla(["Error", "Corrección"], [
          ["Confundir P(A | B) con P(B | A)", "Son distintas: la condición es lo que va detrás de la barra. Bayes es precisamente el puente entre ellas."],
          ["Creer que incompatibles ⟹ independientes (o al revés)", "Con probabilidades no nulas, incompatibles ⟹ NO independientes."],
          ["Sumar P(A) + P(B) sin restar P(A ∩ B)", "Solo se puede sumar sin restar si son incompatibles."],
          ["Multiplicar P(A)·P(B) sin ser independientes", "En general es P(A)·P(B | A)."],
          ["Hacer la media simple en vez de la total", "Hay que ponderar cada rama por la probabilidad de su causa."],
          ["Usar Laplace sin equiprobabilidad", "Las sumas de dos dados no son equiprobables; los pares sí."],
          ["Dar P(E | +) = sensibilidad", "La sensibilidad es P(+ | E); lo que se pide es la inversa. Hace falta la prevalencia."]
        ])
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar por tipo de situación y el orden correcto para resolver un problema con Bayes.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t13b = { nuevas: nuevas };
})(window);
