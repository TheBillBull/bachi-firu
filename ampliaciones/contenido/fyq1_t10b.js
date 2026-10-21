/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 10: Dinámica (las leyes de Newton)
   Parte B: refuerzo de las secciones originales 4–6 (3.ª ley, peso y masa, rozamiento)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t10/" + ref); }
  var P = B._fq10;

  // ---------------------------------------------------------------- 4. Tercera ley
  P.secciones[3] =
    "<h5>Las fuerzas aparecen siempre por parejas</h5>" +
    "<p>La tercera ley expresa una idea sencilla y profunda: una fuerza es una <b>interacción</b> entre dos cuerpos, y por eso no existe una fuerza «suelta». Si A empuja a B, B empuja a A. Las dos fuerzas de la pareja, llamadas <b>acción</b> y <b>reacción</b> (los nombres son intercambiables: ninguna «va primero»), tienen siempre estas características:</p>" +
    "<ul>" +
    "<li><b>Mismo módulo</b> (siempre, incluso si un cuerpo es mucho más pesado que otro o si se aceleran de modo distinto).</li>" +
    "<li><b>Misma dirección y sentido opuesto.</b></li>" +
    "<li><b>Actúan sobre cuerpos distintos</b>: la acción sobre B y la reacción sobre A. Por eso <b>nunca se anulan</b> entre sí: para anularse tendrían que actuar sobre el mismo cuerpo.</li>" +
    "<li><b>Son de la misma naturaleza</b>: si una es gravitatoria, la otra también; si una es de contacto (normal, rozamiento), la otra también.</li>" +
    "<li><b>Aparecen y desaparecen a la vez</b>: no hay retraso entre la acción y la reacción.</li>" +
    "</ul>" +
    tabla(["Acción (la ejerce A sobre B)", "Reacción (la ejerce B sobre A)"], [
      ["La Tierra atrae al libro (su peso)", "El libro atrae a la Tierra con la misma fuerza"],
      ["La mesa empuja al libro hacia arriba (normal)", "El libro empuja a la mesa hacia abajo"],
      ["Tu pie empuja el suelo hacia atrás al andar", "El suelo empuja tu pie hacia delante (rozamiento): es lo que te hace avanzar"],
      ["Un cohete expulsa gases hacia atrás", "Los gases empujan al cohete hacia delante"],
      ["La raqueta golpea la pelota", "La pelota golpea la raqueta con la misma fuerza"],
      ["Una nadadora empuja el agua hacia atrás", "El agua empuja a la nadadora hacia delante"]
    ]) +
    "<h5>El error más famoso: confundir una pareja acción-reacción con dos fuerzas que se equilibran</h5>" +
    "<p>Un libro está en reposo sobre una mesa. Sobre el libro actúan <b>dos</b> fuerzas: su peso (hacia abajo) y la normal (hacia arriba). Son iguales y opuestas, y por eso el libro está en equilibrio… pero <b>no son una pareja de acción-reacción</b>: actúan las dos sobre el mismo cuerpo (el libro), y son de naturaleza distinta (una gravitatoria, otra de contacto). La reacción del peso es la atracción del libro sobre la Tierra; la reacción de la normal es el empujón del libro sobre la mesa. Una buena regla: <b>una pareja acción-reacción siempre tiene la forma «A sobre B» y «B sobre A»</b>; si las dos fuerzas son «sobre el mismo cuerpo», no son pareja.</p>" +
    "<h5>Entonces, si las fuerzas son iguales y opuestas, ¿cómo se mueve algo?</h5>" +
    "<p>Una pregunta clásica: «Si el caballo tira del carro con una fuerza y el carro tira del caballo con la misma fuerza opuesta, ¿cómo es posible que se muevan?». La respuesta está en que esas dos fuerzas actúan sobre cuerpos distintos. Para saber cómo se mueve el <b>carro</b>, sólo cuentan las fuerzas que actúan <b>sobre el carro</b>: el tirón del caballo hacia delante y el rozamiento del suelo hacia atrás. Si el tirón supera al rozamiento, el carro acelera. Para el <b>caballo</b> cuentan las fuerzas sobre el caballo: el tirón del carro hacia atrás y el empujón del suelo hacia delante (el rozamiento estático de sus patas), que es mayor. Cada cuerpo se analiza por separado con su propio diagrama de cuerpo libre. Eso es también lo que pasa cuando andas: tú empujas el suelo hacia atrás y el suelo te empuja a ti hacia delante; sobre ti actúa sólo la segunda.</p>" +
    "<p>Y además, aunque las fuerzas sean iguales, <b>las aceleraciones no lo son</b>: a = F/m. Cuando dos patinadores se empujan, ambos reciben la misma fuerza, pero el más ligero adquiere más velocidad. Cuando un camión choca con un mosquito, la fuerza sobre ambos es idéntica (!), pero la aceleración del mosquito es enorme y la del camión, inapreciable.</p>" +
    w("f10_accion") +
    ejemplo("Dos bloques en contacto: la fuerza entre ellos", "Una fuerza horizontal de 24 N empuja un bloque A de 5 kg que está en contacto con otro bloque B de 3 kg, sobre una mesa sin rozamiento. Calcula la aceleración y la fuerza que A ejerce sobre B.", [
      "Los dos bloques se mueven juntos con la misma aceleración: a = F/(m<sub>A</sub> + m<sub>B</sub>) = 24/8 = <b>3 m/s²</b>.",
      "Sobre B actúa sólo la fuerza de contacto de A: F<sub>AB</sub> = m<sub>B</sub>·a = 3·3 = <b>9 N</b>.",
      "Comprobación con A: ΣF = 24 − F<sub>BA</sub> = 24 − 9 = 15 N = m<sub>A</sub>·a = 5·3 ✓ (F<sub>BA</sub> = F<sub>AB</sub> = 9 N, por la 3.ª ley)."
    ]) +
    ojo("la tercera ley es válida siempre (también cuando los cuerpos se aceleran). Lo que no es válido es sumar acción y reacción en el mismo diagrama de cuerpo libre.");

  // ---------------------------------------------------------------- 5. Peso y masa
  P.secciones[4] =
    "<h5>Dos propiedades distintas que casi siempre coinciden</h5>" +
    "<p>Con la palabra «masa» se mide en realidad algo en dos situaciones diferentes. La <b>masa inercial</b> es la que aparece en la segunda ley: mide lo difícil que es acelerar el cuerpo (a = F/m). La <b>masa gravitatoria</b> es la que aparece en la fuerza de atracción gravitatoria (Tema 11): mide cuán intensamente interacciona el cuerpo con la gravedad. No hay ninguna razón <i>a priori</i> para que sean la misma cantidad, pero los experimentos más precisos (desde Galileo hasta los de hoy, con una precisión mejor que una parte en 10¹³) dicen que lo son. Esa coincidencia explica un hecho notable: <b>todos los cuerpos caen con la misma aceleración g</b>, sea cual sea su masa. Un cuerpo con el doble de masa pesa el doble (el doble de fuerza), pero también tiene doble inercia: el efecto se compensa y a = P/m = m·g/m = g. En ausencia de aire, un martillo y una pluma llegan a la vez al suelo, como se comprobó en la Luna en 1971.</p>" +
    "<h5>El peso depende de dónde estés; la masa, no</h5>" +
    "<p>El peso P = m·g es la fuerza con que un astro atrae un cuerpo, y por eso depende de la intensidad g del campo gravitatorio donde esté. La masa, en cambio, es la misma en todas partes. En la superficie de la Tierra g varía muy poco (9,78 m/s² en el ecuador, 9,83 m/s² en los polos; 9,8 m/s² como valor de trabajo), y disminuye al subir a gran altura (Tema 11).</p>" +
    tabla(["Astro", "g (m/s²)", "Peso de una persona de 60 kg", "Aceleración de caída libre"], [
      ["Luna", "1,62", "97,2 N (≈ 10 kgf)", "1/6 de la terrestre"],
      ["Marte", "3,71", "222,6 N (≈ 23 kgf)", "0,38 de la terrestre"],
      ["Tierra", "9,8", "588 N (60 kgf)", "—"],
      ["Júpiter", "24,8", "1488 N (≈ 152 kgf)", "2,5 veces la terrestre"]
    ]) +
    "<p>Una báscula de baño está calibrada para la Tierra y marca «kilos» aunque en realidad mide una <b>fuerza</b> (la normal que la báscula ejerce sobre ti) y la divide entre 9,8. En la Luna, la misma báscula marcaría unos 10 kg para una persona de 60 kg: la masa no ha cambiado (60 kg), sólo su peso.</p>" +
    "<h5>La fuerza normal: no siempre es igual al peso</h5>" +
    "<p>La normal es la fuerza con que una superficie empuja al cuerpo que se apoya en ella; es perpendicular a la superficie y su valor <b>se ajusta</b> a lo que haga falta para que el cuerpo no la atraviese. No tiene fórmula propia: se obtiene de la segunda ley en la dirección perpendicular a la superficie. Por eso <b>sólo coincide con el peso en un caso muy concreto</b>: un cuerpo sobre una superficie horizontal sin otras fuerzas verticales y sin aceleración vertical.</p>" +
    tabla(["Situación", "Eje perpendicular al apoyo", "Normal"], [
      ["Cuerpo en reposo sobre el suelo", "N − m·g = 0", "N = m·g"],
      ["Se tira de él con una fuerza F hacia arriba y oblicua (ángulo θ)", "N + F·sen θ − m·g = 0", "N = m·g − F·sen θ (menor)"],
      ["Se empuja hacia abajo con F oblicua", "N − F·sen θ − m·g = 0", "N = m·g + F·sen θ (mayor)"],
      ["Plano inclinado un ángulo θ (sin otras fuerzas)", "N − m·g·cos θ = 0", "N = m·g·cos θ"],
      ["Ascensor con aceleración a (↑ positiva)", "N − m·g = m·a", "N = m·(g + a)"]
    ]) +
    "<h5>El peso aparente: lo que marca la báscula</h5>" +
    "<p>Lo que se nota como «sentirse más pesado o más ligero» es en realidad la <b>fuerza normal</b>, que es la que sientes en los pies (el peso real m·g no cambia). Si estás de pie sobre una báscula en un ascensor, la segunda ley en vertical (eje hacia arriba) da N − m·g = m·a, es decir, <b>N = m·(g + a)</b>, donde a es la aceleración del ascensor con signo (positiva hacia arriba). Si el ascensor <b>arranca hacia arriba</b> o <b>frena bajando</b>, la aceleración es hacia arriba (a &gt; 0) y la báscula marca más; si <b>arranca hacia abajo</b> o <b>frena subiendo</b>, a &lt; 0 y marca menos. Con velocidad constante (a = 0), marca lo mismo que parado. En <b>caída libre</b> (a = −g), N = 0: la báscula marca cero y flotas respecto del ascensor. Es lo que ocurre en la Estación Espacial Internacional: no hay «ausencia de gravedad» (el peso allí es el 88 % del terrestre), sino caída libre continua alrededor de la Tierra.</p>" +
    w("f10_ascensor") +
    ejemplo("Una persona en un ascensor", "Una persona de 60 kg está de pie sobre una báscula en un ascensor. ¿Qué fuerza marca la báscula si el ascensor sube con aceleración de 1 m/s²? ¿Y si baja con esa misma aceleración (frenando al subir)? (g = 9,8 m/s²)", [
      "En reposo: N = m·g = 60·9,8 = 588 N (la báscula marca «60 kg»).",
      "Aceleración hacia arriba (a = +1): N = m(g + a) = 60·(9,8 + 1) = <b>648 N</b> (marca 66,1 kg: te notas más pesado).",
      "Aceleración hacia abajo (a = −1): N = 60·(9,8 − 1) = <b>528 N</b> (marca 53,9 kg: te notas más ligero).",
      "Cable roto (a = −g): N = 60·(9,8 − 9,8) = <b>0</b>."
    ]) +
    ojo("el peso se mide en <b>newtons</b> y la masa en kilogramos. Decir «peso 60 kilos» es lenguaje coloquial para la masa. Y recuerda: la normal <b>no</b> es la reacción del peso (son dos fuerzas sobre el mismo cuerpo).");

  // ---------------------------------------------------------------- 6. Rozamiento
  P.secciones[5] =
    "<h5>Por qué existe el rozamiento</h5>" +
    "<p>Incluso las superficies más pulidas son rugosas a escala microscópica: tienen picos y valles que se encajan unos en otros, y además los átomos de las dos superficies se atraen allí donde se tocan realmente (el área de contacto real es una pequeña fracción del área aparente). Para que una superficie deslice sobre otra hay que romper esas uniones y arrastrar los picos, y eso exige una fuerza. El rozamiento es la fuerza de contacto, <b>paralela a la superficie</b>, que se opone al deslizamiento (o a la tendencia a deslizar) entre dos cuerpos en contacto. Es una fuerza de la misma naturaleza que la normal (las dos son las componentes de la fuerza total que ejerce la superficie sobre el cuerpo).</p>" +
    "<p>Se distinguen tres tipos: el rozamiento <b>estático</b> (entre superficies que no deslizan una sobre otra), el rozamiento <b>cinético</b> o dinámico (cuando sí deslizan) y el de <b>rodadura</b> (una rueda que rueda sin deslizar), que es mucho menor, y por eso las ruedas son tan útiles.</p>" +
    "<h5>Las leyes empíricas del rozamiento por deslizamiento</h5>" +
    "<ul>" +
    "<li><b>Es proporcional a la normal</b>, no al peso: F<sub>r</sub> = μ·N. Si la normal cambia (un plano inclinado, una fuerza oblicua), cambia el rozamiento.</li>" +
    "<li><b>No depende del área aparente de contacto</b>: un ladrillo que desliza apoyado sobre su cara grande o sobre la pequeña sufre el mismo rozamiento (la normal es la misma; el área real depende de la presión).</li>" +
    "<li><b>El rozamiento cinético es aproximadamente independiente de la velocidad</b> (a las velocidades habituales).</li>" +
    "<li><b>El rozamiento estático se adapta</b> a la fuerza que lo provoca, hasta un máximo: 0 ≤ F<sub>r,e</sub> ≤ μ<sub>e</sub>·N. Mientras el cuerpo no desliza, el rozamiento vale justo lo que haga falta para que no deslice (si lo empujas con 10 N, el rozamiento vale 10 N; con 30 N, vale 30 N…) hasta que se supera el máximo.</li>" +
    "<li><b>El coeficiente estático es mayor o igual que el cinético</b> (μ<sub>e</sub> ≥ μ<sub>c</sub>): cuesta más ponerlo en marcha que mantenerlo en movimiento.</li>" +
    "</ul>" +
    tabla(["Pareja de superficies", "μ<sub>e</sub> (estático)", "μ<sub>c</sub> (cinético)"], [
      ["Madera sobre madera", "0,5", "0,3"],
      ["Acero sobre acero (seco)", "0,74", "0,57"],
      ["Goma sobre asfalto seco", "0,9", "0,8"],
      ["Goma sobre asfalto mojado", "0,6", "0,5"],
      ["Acero sobre hielo", "0,1", "0,03"],
      ["Teflón sobre acero", "0,04", "0,04"]
    ]) +
    "<p>Estos valores son orientativos (dependen mucho del estado de las superficies). Lo importante es la comparación: el hielo es resbaladizo porque su μ es unas veinte veces menor que el del asfalto seco.</p>" +
    w("f10_rozamiento") +
    ejemplo("¿Se mueve o no? Estático frente a cinético", "Una caja de 40 kg reposa en el suelo (μ<sub>e</sub> = 0,5; μ<sub>c</sub> = 0,35). a) ¿Qué ocurre si se empuja con 180 N? b) ¿Y con 250 N? (g = 9,8 m/s²)", [
      "Normal: N = m·g = 40·9,8 = 392 N. Rozamiento estático máximo: μ<sub>e</sub>·N = 0,5·392 = 196 N. Rozamiento cinético: μ<sub>c</sub>·N = 0,35·392 = 137,2 N.",
      "a) 180 N &lt; 196 N: <b>no se mueve</b>. El rozamiento estático vale exactamente <b>180 N</b> (no 196 N: se adapta a la fuerza aplicada). ΣF = 0.",
      "b) 250 N &gt; 196 N: <b>desliza</b>. El rozamiento pasa a ser cinético, 137,2 N, y a = (250 − 137,2)/40 = <b>2,82 m/s²</b>."
    ]) +
    ejemplo("Tirar o empujar: la normal cambia", "Una maleta de 20 kg se arrastra con una fuerza de 80 N que forma 30° con el suelo, con μ = 0,2. Calcula la aceleración si se tira de ella (la fuerza apunta hacia arriba) y si se empuja (la fuerza apunta hacia abajo).", [
      "Componentes de la fuerza: F<sub>x</sub> = 80·cos 30° = 69,28 N; F<sub>y</sub> = 80·sen 30° = 40 N. Peso: 20·9,8 = 196 N.",
      "<b>Tirando</b> (F<sub>y</sub> hacia arriba): N = 196 − 40 = 156 N → F<sub>r</sub> = 0,2·156 = 31,2 N → a = (69,28 − 31,2)/20 = <b>1,90 m/s²</b>.",
      "<b>Empujando</b> (F<sub>y</sub> hacia abajo): N = 196 + 40 = 236 N → F<sub>r</sub> = 47,2 N → a = (69,28 − 47,2)/20 = <b>1,10 m/s²</b>.",
      "Es mejor tirar que empujar: al tirar se alivia la normal y, con ella, el rozamiento."
    ]) +
    ejemplo("Distancia de frenado", "Un coche que va a 108 km/h frena bloqueando las ruedas. Calcula la distancia hasta detenerse sobre asfalto seco (μ<sub>c</sub> = 0,7) y sobre hielo (μ<sub>c</sub> = 0,1).", [
      "108 km/h = 30 m/s. La única fuerza horizontal es el rozamiento: m·a = −μ·m·g → |a| = μ·g (¡la masa se cancela!).",
      "Asfalto seco: |a| = 0,7·9,8 = 6,86 m/s² → d = v²/(2|a|) = 900/13,72 = <b>65,6 m</b>.",
      "Hielo: |a| = 0,1·9,8 = 0,98 m/s² → d = 900/1,96 = <b>459 m</b> (siete veces más)."
    ]) +
    "<h5>El rozamiento no sólo frena: también nos permite movernos</h5>" +
    "<p>Es un error pensar que el rozamiento siempre «va contra el movimiento del cuerpo». Va contra el movimiento <b>relativo de las superficies</b> en contacto. Cuando andas, tu pie empuja el suelo hacia atrás; el suelo, por la tercera ley, te empuja hacia delante con una fuerza de rozamiento estático: esa es la fuerza que te acelera. Sin rozamiento (sobre hielo muy liso) patinarías sin avanzar. Lo mismo ocurre con las ruedas motrices de un coche: el rozamiento estático entre neumático y asfalto empuja al coche hacia delante. Otro ejemplo: una caja sobre la plataforma de un camión que arranca avanza <i>gracias</i> al rozamiento con la plataforma.</p>" +
    ojo("el rozamiento estático <b>no</b> vale siempre μ<sub>e</sub>·N: ese es su valor <i>máximo</i>. Cuando el cuerpo no desliza vale lo que haga falta (hasta ese máximo). Y el rozamiento cinético vale μ<sub>c</sub>·N <b>siempre</b> que haya deslizamiento, sea cual sea la fuerza aplicada.");
})(window);
