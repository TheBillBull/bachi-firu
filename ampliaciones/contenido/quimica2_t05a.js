/* ============================================================
   Química II · ampliaciones · Tema 5: Cinética química
   (parte A: se añade al final de las secciones originales 1 a 5)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t5/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Velocidad de reacción
  secciones[0] = env(
    "<h5>Qué mide la velocidad y en qué unidades</h5>" +
    "<p>La <b>cinética química</b> estudia <i>cuánto tarda</i> en ocurrir una reacción, mientras que la termodinámica (Tema 6) dice <i>si</i> puede ocurrir y cuánta energía intercambia. Una reacción puede ser muy favorable y, aun así, lentísima: el diamante «debería» convertirse en grafito y no lo hace en la vida de nadie.</p>" +
    "<p>La velocidad se mide como cambio de concentración dividido entre el tiempo, así que sus unidades son <b>mol·L⁻¹·s⁻¹</b> (o mol/(L·min) si la reacción es lenta). Es siempre un número <b>positivo</b>.</p>" +
    "<h5>Velocidad media y velocidad instantánea</h5>" +
    "<p>La <b>velocidad media</b> en un intervalo es la pendiente de la <b>secante</b> que une dos puntos de la curva concentración–tiempo: v<sub>m</sub> = −Δ[A]/Δt = −([A]₂ − [A]₁)/(t₂ − t₁). La <b>velocidad instantánea</b> es la de un instante concreto: la pendiente de la <b>tangente</b> en ese punto (el límite de la velocidad media cuando Δt → 0, es decir, la derivada −d[A]/dt).</p>" +
    "<p>Como los reactivos se van gastando, la curva de un reactivo <b>se aplana con el tiempo</b>: la reacción es más rápida al principio (muchos reactivos, muchos choques) y más lenta al final. Por eso la velocidad inicial es la mayor, y por eso la velocidad media entre dos instantes no es igual a la instantánea en ninguno de ellos.</p>" +
    w("q5_curvas") +
    "<h5>La velocidad y los coeficientes estequiométricos</h5>" +
    "<p>En una reacción como N₂ + 3 H₂ → 2 NH₃, el H₂ se consume tres veces más deprisa que el N₂ y el NH₃ se forma al doble de ritmo que el N₂ se gasta. Para tener <b>una sola</b> velocidad de reacción se divide cada ritmo entre su coeficiente. Para a A + b B → c C + d D:</p>" +
    "<div class='formula-wrap'><div class='formula'>v = −(1/a)·Δ[A]/Δt = −(1/b)·Δ[B]/Δt = (1/c)·Δ[C]/Δt = (1/d)·Δ[D]/Δt</div></div>" +
    "<p>Las cantidades |Δ[X]/Δt| sin dividir se llaman <b>velocidades de desaparición</b> (reactivos) o <b>de formación</b> (productos) de cada especie: dependen de la especie que elijas. La <b>velocidad de reacción</b> v es la que ya está dividida entre el coeficiente: es única.</p>" +
    ejemplo("Ejemplo resuelto: de una especie a las demás", "En la síntesis N₂(g) + 3 H₂(g) → 2 NH₃(g), la concentración de NH₃ pasa de 0,40 a 0,64 mol/L en 20 s. Calcula la velocidad de formación del NH₃, la velocidad de reacción y las velocidades de desaparición de N₂ y de H₂.", [
      "Formación de NH₃: Δ[NH₃]/Δt = (0,64 − 0,40)/20 = 0,24/20 = <b>0,012 mol·L⁻¹·s⁻¹</b>.",
      "Velocidad de reacción: se divide entre el coeficiente 2: v = 0,012/2 = <b>0,0060 mol·L⁻¹·s⁻¹</b>.",
      "Desaparición de N₂ (coeficiente 1): igual que v → <b>0,0060 mol·L⁻¹·s⁻¹</b>.",
      "Desaparición de H₂ (coeficiente 3): 3 · 0,0060 = <b>0,018 mol·L⁻¹·s⁻¹</b>.",
      "Comprobación: los ritmos están en proporción 1 : 3 : 2 (N₂ : H₂ : NH₃), igual que los coeficientes: 0,0060 : 0,018 : 0,012."
    ]) +
    ejemplo("Ejemplo resuelto: velocidad media en dos intervalos", "En la descomposición 2 N₂O₅ → 4 NO₂ + O₂ se mide [N₂O₅] = 0,800 mol/L en t = 0, 0,560 mol/L en t = 50 s y 0,392 mol/L en t = 100 s. Calcula la velocidad media de reacción en cada intervalo y la velocidad media de formación del NO₂ en el primero.", [
      "Intervalo 0–50 s: Δ[N₂O₅]/Δt = (0,560 − 0,800)/50 = −0,0048 mol·L⁻¹·s⁻¹. Se divide entre el coeficiente 2 (y se quita el signo): v = <b>0,0024 mol·L⁻¹·s⁻¹</b>.",
      "Intervalo 50–100 s: Δ[N₂O₅]/Δt = (0,392 − 0,560)/50 = −0,00336; v = 0,00336/2 = <b>0,00168 mol·L⁻¹·s⁻¹</b>.",
      "La velocidad ha bajado (0,0024 → 0,00168) porque queda menos reactivo: así se ve que la velocidad depende de la concentración.",
      "Formación de NO₂ (coeficiente 4) en el primer intervalo: 4 · 0,0024 = <b>0,0096 mol·L⁻¹·s⁻¹</b>."
    ]) +
    ojo("Si el enunciado da la velocidad «de desaparición del reactivo» y pide «la velocidad de la reacción», hay que dividir entre el coeficiente. Y si pide la de otra especie, se multiplica por su coeficiente. Olvidarse de esto es el error más repetido en esta parte.")
  );

  // ---------------------------------------------------------------- 2. Ecuación de velocidad y orden
  secciones[1] = env(
    "<h5>Cómo se lee una ecuación de velocidad</h5>" +
    "<p>En v = k·[A]<sup>n</sup>·[B]<sup>m</sup>, <b>n</b> y <b>m</b> son los <b>órdenes parciales</b> (respecto a A y a B) y <b>n + m</b> el <b>orden total</b>. Dicen <i>cuánto</i> depende la velocidad de cada concentración:</p>" +
    tabla(["Orden respecto a A", "Si [A] se duplica…", "Si [A] se triplica…", "Si [A] se reduce a la mitad…"], [
      ["0", "v no cambia (×1)", "×1", "×1"],
      ["1", "v ×2", "×3", "×1/2"],
      ["2", "v ×4", "×9", "×1/4"],
      ["3", "v ×8", "×27", "×1/8"]
    ], "q3t") +
    "<p>El cambio de velocidad es el cambio de concentración <b>elevado al orden</b>: (factor)<sup>orden</sup>. Si cambian varias concentraciones a la vez, se multiplican los factores de cada una.</p>" +
    ejemplo("Ejemplo resuelto: ¿en qué factor cambia v?", "La velocidad de una reacción es v = k·[A]·[B]². Calcula el factor por el que cambia v si (a) se triplica [A] y se mantiene [B]; (b) se duplica [B] y se triplica [A]; (c) se reduce a la mitad el volumen del recipiente (reacción en fase gaseosa a T constante).", [
      "(a) El orden de A es 1: factor 3¹ = <b>×3</b>.",
      "(b) Factor de A: 3¹ = 3. Factor de B: 2² = 4. Total: 3 · 4 = <b>×12</b>.",
      "(c) Al reducir el volumen a la mitad, <b>todas</b> las concentraciones se duplican (n/V). Orden total 1 + 2 = 3, así que el factor es 2³ = <b>×8</b>."
    ]) +
    "<h5>Unidades de la constante de velocidad k</h5>" +
    "<p>Como v tiene unidades de mol·L⁻¹·s⁻¹ y [A]<sup>n</sup>[B]<sup>m</sup> de (mol/L)<sup>orden total</sup>, la constante k tiene unidades que <b>dependen del orden total</b>: k = v/[ ]<sup>orden</sup>, es decir (mol·L⁻¹)<sup>1−orden</sup>·s⁻¹.</p>" +
    tabla(["Orden total", "Unidades de k", "Ejemplo de ley"], [
      ["0", "mol·L⁻¹·s⁻¹", "v = k"],
      ["1", "s⁻¹", "v = k[A]"],
      ["2", "L·mol⁻¹·s⁻¹", "v = k[A]² o v = k[A][B]"],
      ["3", "L²·mol⁻²·s⁻¹", "v = k[A]²[B]"]
    ], "q3t") +
    "<p>Una consecuencia práctica: <b>las unidades de k delatan el orden total</b>. Si te dan k = 3,0·10⁻² L·mol⁻¹·s⁻¹, la reacción es de segundo orden en total sin mirar nada más.</p>" +
    ejemplo("Ejemplo resuelto: calcular v y las unidades de k", "Para A + B → C se sabe que v = k·[A]²·[B] con k = 0,50 L²·mol⁻²·s⁻¹. Calcula v cuando [A] = 0,20 mol/L y [B] = 0,10 mol/L, y el orden total.", [
      "Orden total: 2 + 1 = <b>3</b> (coherente con las unidades de k, L²·mol⁻²·s⁻¹).",
      "v = 0,50 · (0,20)² · 0,10 = 0,50 · 0,040 · 0,10 = <b>2,0·10⁻³ mol·L⁻¹·s⁻¹</b>.",
      "Comprobación de unidades: L²·mol⁻²·s⁻¹ · mol²·L⁻² · mol·L⁻¹ = mol·L⁻¹·s⁻¹ ✓."
    ]) +
    "<h5>Qué es y qué no es la constante k</h5>" +
    "<ul>" +
    "<li><b>k no depende de las concentraciones</b>: es la velocidad cuando todas valen 1 mol/L. Cambia con la <b>temperatura</b> (Arrhenius) y con un <b>catalizador</b>, y con nada más.</li>" +
    "<li>Una reacción con k grande es rápida; con k pequeña, lenta (a la misma T y concentraciones comparables).</li>" +
    "<li>Los <b>órdenes no salen de los coeficientes</b>: 2 NO + O₂ → 2 NO₂ podría ser de orden 3 o no. Se miden en el laboratorio (sección 6) o se deducen del mecanismo (sección 7).</li>" +
    "<li>Los órdenes pueden ser 0, 1, 2… e incluso fraccionarios; un reactivo de orden 0 puede estar presente en la reacción y no influir en la velocidad (su concentración «no aparece» en la ley).</li>" +
    "</ul>" +
    "<h5>Ampliación: cómo evoluciona la concentración con el tiempo</h5>" +
    "<p>Para las leyes más sencillas, con una sola especie A que determina la velocidad (v = k[A]<sup>n</sup>), la concentración en función del tiempo tiene forma conocida. En el simulador de la sección 1 puedes cambiar el orden y ver cómo cambia la curva:</p>" +
    tabla(["Orden", "Cómo baja [A]", "Recta que sale al representar", "Vida media"], [
      ["0", "linealmente hasta agotarse", "[A] frente a t (pendiente −k)", "depende de [A]₀ (t½ = [A]₀/2k)"],
      ["1", "exponencialmente: [A] = [A]₀·e<sup>−kt</sup>", "ln[A] frente a t (pendiente −k)", "t½ = ln 2 / k, <b>no depende</b> de [A]₀"],
      ["2", "más despacio: 1/[A] = 1/[A]₀ + kt", "1/[A] frente a t (pendiente +k)", "t½ = 1/(k[A]₀)"]
    ], "q3t") +
    "<p>Estas ecuaciones integradas no suelen pedirse en la EvAU de Madrid; lo habitual es trabajar con velocidades y con v = k[A]<sup>n</sup>[B]<sup>m</sup>. Pero conocer la idea ayuda: <i>la vida media constante</i> es la huella de una reacción de primer orden (por ejemplo, los isótopos radiactivos y la descomposición del N₂O₅).</p>" +
    ojo("«La reacción A + 2B → C es de orden 3 porque 1 + 2 = 3.» No: solo es cierto si la reacción ocurre en una única etapa (reacción elemental, sección 7). El orden se mide, no se lee de la ecuación ajustada.")
  );

  // ---------------------------------------------------------------- 3. Factores que afectan
  secciones[2] = env(
    "<h5>Cada factor, con su porqué</h5>" +
    tabla(["Factor", "Efecto sobre la velocidad", "¿Por qué?", "¿Cambia k?"], [
      ["Concentración (o presión, si son gases)", "Mayor concentración, mayor v", "Más partículas por volumen: más choques por segundo", "No"],
      ["Temperatura", "Mayor T, mayor v (de forma muy marcada)", "Choques más frecuentes y, sobre todo, <b>más partículas con E ≥ Eₐ</b> (Maxwell–Boltzmann)", "Sí (Arrhenius)"],
      ["Superficie de contacto (sólidos)", "Más superficie, mayor v", "Más partículas del sólido accesibles a los choques", "No"],
      ["Catalizador", "Aumenta v (inhibidor: la disminuye)", "Camino alternativo con menor Eₐ", "Sí"],
      ["Naturaleza de los reactivos", "Cambia mucho entre reacciones", "Reacciones entre iones en disolución suelen ser rápidas; si hay que romper muchos enlaces covalentes, lentas", "Sí (cada reacción tiene su k)"],
      ["Agitación, estado físico", "Mezcla homogénea, mayor v", "Los reactivos se encuentran más a menudo", "No"]
    ], "q3t") +
    "<p>La <b>concentración</b> y la <b>superficie</b> modifican cuántos choques hay; la <b>temperatura</b> y el <b>catalizador</b> modifican cuántos choques <i>son eficaces</i> (con energía suficiente) y por eso son los únicos que cambian k.</p>" +
    "<h5>La temperatura: un efecto pequeño sobre el movimiento, enorme sobre la reacción</h5>" +
    "<p>Subir la temperatura de 300 K a 310 K aumenta la energía cinética media solo un 3 %, y sin embargo la velocidad suele duplicarse o triplicarse. La causa no es que las partículas choquen más a menudo (eso crece solo un 2 %), sino que la <b>fracción de partículas con energía por encima de Eₐ</b> crece mucho: lo verás con la distribución de Maxwell–Boltzmann (sección 4).</p>" +
    ojo("«Al aumentar la concentración aumenta k.» Falso: aumenta v, pero k solo depende de T y del catalizador. Del mismo modo, «un sólido pulverizado tiene mayor k» es falso: tiene mayor <i>velocidad</i> porque hay más superficie, no una constante distinta.")
  );

  // ---------------------------------------------------------------- 4. Teoría de colisiones y Ea
  secciones[3] = env(
    "<h5>Choques eficaces: energía y orientación</h5>" +
    "<p>La <b>teoría de colisiones</b> explica la velocidad con tres condiciones para que un choque produzca reacción:</p>" +
    "<ol>" +
    "<li><b>Choque</b>: las partículas tienen que encontrarse (la frecuencia de choques crece con la concentración y con T).</li>" +
    "<li><b>Energía suficiente</b>: la energía de la colisión debe ser al menos la <b>energía de activación Eₐ</b>, necesaria para empezar a romper enlaces.</li>" +
    "<li><b>Orientación adecuada</b>: los átomos que deben unirse tienen que quedar cerca. Un choque de energía sobrada pero mal orientado rebota sin más.</li>" +
    "</ol>" +
    "<p>Solo una pequeña parte de los choques cumple las dos últimas condiciones: son los <b>choques eficaces</b>. La velocidad es proporcional al número de choques eficaces por segundo.</p>" +
    "<h5>Teoría del estado de transición</h5>" +
    "<p>La teoría del <b>estado de transición</b> (o del complejo activado) añade qué ocurre durante un choque eficaz: los reactivos se aproximan, algunos enlaces se debilitan y otros empiezan a formarse, y el sistema pasa por una situación de <b>máxima energía y muy inestable</b>, el <b>complejo activado</b> o estado de transición (se escribe con ‡). Es el punto más alto del perfil de energía; no se puede aislar ni almacenar, solo «atravesar». A partir de él el sistema cae hacia los productos (o vuelve a los reactivos).</p>" +
    "<p>Por definición, <b>Eₐ = E(complejo activado) − E(reactivos)</b>. Se mide en kJ/mol.</p>" +
    "<h5>El perfil de energía: Eₐ directa, Eₐ inversa y ΔH</h5>" +
    "<p>En el perfil de reacción (energía frente a coordenada de reacción) aparecen tres alturas relacionadas:</p>" +
    "<div class='formula-wrap'><div class='formula'>ΔH = Eₐ(directa) − Eₐ(inversa)  ⟹  Eₐ(inversa) = Eₐ(directa) − ΔH</div></div>" +
    "<ul>" +
    "<li><b>Exotérmica</b> (ΔH &lt; 0): los productos están por debajo de los reactivos; la reacción inversa tiene Eₐ <b>mayor</b> que la directa.</li>" +
    "<li><b>Endotérmica</b> (ΔH &gt; 0): los productos están por encima; la inversa tiene Eₐ <b>menor</b> que la directa.</li>" +
    "<li>Una reacción puede ser muy exotérmica y lenta (Eₐ grande), o poco exotérmica y rápida: <b>ΔH y Eₐ son independientes</b>. ΔH dice lo que se libera; Eₐ lo que cuesta empezar.</li>" +
    "</ul>" +
    w("q6_diagrama") +
    ejemplo("Ejemplo resuelto: Eₐ de la reacción inversa", "Una reacción tiene ΔH = −90 kJ/mol y Eₐ(directa) = 40 kJ/mol. Calcula Eₐ(inversa). Repite el cálculo para otra reacción con ΔH = +60 kJ/mol y Eₐ(directa) = 100 kJ/mol. Di cuál es más fácil de revertir.", [
      "Primera: Eₐ(inv) = Eₐ(dir) − ΔH = 40 − (−90) = <b>130 kJ/mol</b>. Está muy por encima: bajar de los productos al estado de transición cuesta 130 kJ, así que la reacción inversa es mucho más lenta que la directa.",
      "Segunda: Eₐ(inv) = 100 − 60 = <b>40 kJ/mol</b>. La inversa es más fácil que la directa (es una reacción endotérmica).",
      "Comprobación de coherencia: en ambos casos Eₐ(inv) &gt; 0, como debe ser; y en la exotérmica Eₐ(inv) &gt; Eₐ(dir), en la endotérmica Eₐ(inv) &lt; Eₐ(dir)."
    ]) +
    "<h5>Por qué la temperatura acelera tanto: Maxwell–Boltzmann</h5>" +
    "<p>Las partículas de una sustancia no tienen todas la misma energía: se reparten según la <b>distribución de Maxwell–Boltzmann</b>, con muchas partículas de energía moderada y una «cola» de partículas muy energéticas. Solo las de la cola (E ≥ Eₐ) pueden reaccionar al chocar. Al subir T, la curva se desplaza, se aplana y se ensancha: el área a la derecha de Eₐ <b>crece de forma desproporcionada</b>, aunque la energía media apenas cambie. Con un catalizador sucede lo contrario: no se mueve la curva, sino que baja Eₐ y el área útil aumenta.</p>" +
    w("q5_maxwell") +
    "<h5>Qué hace el catalizador (y qué no)</h5>" +
    "<p>El catalizador ofrece un <b>mecanismo alternativo</b> con una Eₐ menor y se <b>regenera</b> al final. Cambia la velocidad, pero no los reactivos, los productos ni el balance energético:</p>" +
    tabla(["El catalizador SÍ cambia", "El catalizador NO cambia"], [
      ["El camino de la reacción (mecanismo)", "ΔH, ΔG, ΔS de la reacción"],
      ["Eₐ (la baja, en <b>los dos sentidos</b>)", "Las energías de reactivos y productos"],
      ["La constante k y la velocidad v", "La constante de equilibrio K y el rendimiento en el equilibrio"],
      ["El tiempo en alcanzar el equilibrio (menor)", "La estequiometría ni la cantidad de producto que se obtiene"]
    ], "q3t") +
    ojo("Un catalizador no hace posible una reacción termodinámicamente imposible (ΔG &gt; 0): solo acelera las que ya son espontáneas. Y como baja Eₐ directa e inversa por igual, no desplaza el equilibrio: lo alcanza antes.")
  );

  // ---------------------------------------------------------------- 5. Arrhenius
  secciones[4] = env(
    "<h5>Cómo leer la ecuación</h5>" +
    "<p>En k = A·e<sup>−Eₐ/RT</sup>: <b>A</b> es el factor de frecuencia (tiene las mismas unidades que k), <b>R</b> = 8,314 J·mol⁻¹·K⁻¹, <b>T</b> la temperatura en <b>kelvin</b> y Eₐ en <b>J/mol</b> (¡pasar los kJ a J!). El factor e<sup>−Eₐ/RT</sup> es justo la fracción de choques con energía suficiente (la cola de Maxwell–Boltzmann): Eₐ grande hace que sea diminuto, T grande que se acerque a 1.</p>" +
    "<p>Tomando logaritmos neperianos se obtiene la forma lineal:</p>" +
    "<div class='formula-wrap'><div class='formula'>ln k = ln A − (Eₐ/R)·(1/T)</div></div>" +
    "<p>Si se representa <b>ln k frente a 1/T</b> salen puntos alineados: una recta de <b>pendiente −Eₐ/R</b> y ordenada en el origen ln A. Así se determina Eₐ en el laboratorio.</p>" +
    "<h5>Con dos temperaturas</h5>" +
    "<p>Restando la ecuación a T₂ y a T₁, A desaparece:</p>" +
    "<div class='formula-wrap'><div class='formula'>ln(k₂/k₁) = (Eₐ/R)·(1/T₁ − 1/T₂)</div></div>" +
    "<p>Con ella se calcula k₂ si se conocen k₁ y Eₐ, o se calcula Eₐ a partir de dos valores de k. Si T₂ &gt; T₁ el paréntesis es positivo, así que k₂ &gt; k₁.</p>" +
    w("q5_arrhenius") +
    ejemplo("Ejemplo resuelto: k a otra temperatura", "Una reacción tiene k = 1,2·10⁻³ s⁻¹ a 300 K y Eₐ = 60 kJ/mol. Calcula k a 320 K.", [
      "Datos en unidades SI: Eₐ = 60 000 J/mol; R = 8,314 J·mol⁻¹·K⁻¹.",
      "ln(k₂/k₁) = (60 000/8,314)·(1/300 − 1/320) = 7 217 · 2,0833·10⁻⁴ = <b>1,503</b>.",
      "k₂/k₁ = e<sup>1,503</sup> = <b>4,50</b>.",
      "k₂ = 4,50 · 1,2·10⁻³ = <b>5,4·10⁻³ s⁻¹</b>. Con solo 20 K de aumento, la reacción es 4,5 veces más rápida."
    ]) +
    ejemplo("Ejemplo resuelto: calcular la energía de activación", "La constante de velocidad de una reacción es 3,0·10⁻⁴ s⁻¹ a 300 K y 3,0·10⁻³ s⁻¹ a 330 K. Calcula Eₐ.", [
      "k₂/k₁ = 3,0·10⁻³/3,0·10⁻⁴ = 10, luego ln(k₂/k₁) = ln 10 = 2,303.",
      "(1/T₁ − 1/T₂) = 1/300 − 1/330 = 3,030·10⁻⁴ K⁻¹.",
      "Eₐ = R·ln(k₂/k₁)/(1/T₁ − 1/T₂) = 8,314 · 2,303 / 3,030·10⁻⁴ = 6,32·10⁴ J/mol = <b>63,2 kJ/mol</b>."
    ]) +
    ejemplo("Ejemplo resuelto: ¿«se duplica cada 10 grados»?", "Calcula cuánto aumenta k al subir de 298 K a 308 K si Eₐ vale (a) 50 kJ/mol, (b) 60 kJ/mol y (c) 100 kJ/mol.", [
      "Se usa ln(k₂/k₁) = (Eₐ/R)(1/298 − 1/308) con (1/298 − 1/308) = 1,0896·10⁻⁴ K⁻¹.",
      "(a) 50 000/8,314 · 1,0896·10⁻⁴ = 0,655 → k₂/k₁ = <b>1,93</b> (casi el doble).",
      "(b) 60 000/8,314 · 1,0896·10⁻⁴ = 0,786 → <b>2,20</b>.",
      "(c) 100 000/8,314 · 1,0896·10⁻⁴ = 1,311 → <b>3,71</b>.",
      "Conclusión: la «regla» de que se duplica es una aproximación que vale para Eₐ ≈ 50–60 kJ/mol; cuanto mayor es Eₐ, más sensible es la reacción a la temperatura."
    ]) +
    ojo("Tres errores de cálculo muy repetidos con Arrhenius: (1) usar °C en lugar de K; (2) dejar Eₐ en kJ/mol con R en J/(mol·K); (3) invertir el orden (1/T₂ − 1/T₁) y obtener una Eₐ negativa. Si Eₐ te sale negativa o k₂ &lt; k₁ con T₂ &gt; T₁, revisa el signo.")
  );

  B.parte.q2t5a = { secciones: secciones };
})(window);
