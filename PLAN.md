# PLAN.md — cómo retomar el proyecto (léelo entero antes de tocar nada)

## 0. ESTADO AL PARAR (29-oct-2026: Historia de la Filosofía cerrada; antes 28-oct Mates II) — LEER PRIMERO

- 29-oct: Historia de la Filosofía terminada (16 temas con ficha de vista rápida). comprobar_todo: TODO CUADRA (64 grupos, 27.847 cifras). Publicado en artefacto (v12) y en `main`. Bill pidió PARAR tras Filosofía. Pendiente menor: cotejar con edición algunas citas marcadas como «traducción habitual».

- **Parado por el usuario** («por ahora paramos»). No empezar nada nuevo hasta que diga «continuamos» y qué asignatura.
- **Hecho y verificado**: Mates I, FyQ I, **Química II (11 temas + 8 simulacros, 3 nuevos en formato oficial PAU Madrid 2025-26)** y **Matemáticas II (14 temas)**. `comprobar_todo.sh` → «TODO CUADRA» (47 grupos, 24.100 comprobaciones de cifras, 0 fallos). Todo commiteado y subido a `claude/admiring-keller-1be6ou`.
- **DOS publicaciones (no confundir)**:
  1. **Web PÚBLICA = GitHub Pages**: https://thebillbull.github.io/bachi-firu/ — se sirve desde la rama `main` (raíz, `index.html`). Para actualizarla: abrir una PR de `claude/admiring-keller-1be6ou` hacia `main` (la sesión de Claude NO tiene permiso para empujar a `main`) y que el usuario la fusione; Pages se actualiza en 1–2 min. El 28-oct-2026 (20:06 UTC) `main` se actualizó con Química II y Mates II (avance rápido, commit 1abb82f; PR #1). Con permiso del usuario, la sesión puede empujar la rama de trabajo a `main` en avance rápido (`git push origin claude/admiring-keller-1be6ou:main`); si el permiso se deniega, PR y que fusione el usuario. **No lleva corrección con Claude** (es normal: fuera de claude.ai no existe `window.claude`); la página lo detecta sola (`EN_CLAUDE` en `pagina.html`): guarda el progreso en el navegador y, si se pulsa «corregir con Claude», muestra un aviso (`SIN_IA`). No hay que quitar nada a mano para la versión pública.
  2. **Artefacto privado de claude.ai** (con corrección de Claude en Comentario de texto e Inglés): https://claude.ai/artifact/PBj2wEg4PKUru2SyFq2T2c (versión 11 = Mates II completa), capacidades `sample` y `db`.
- **Republicar desde una conversación NUEVA** exige que esa conversación lea la página entera (≈6 MB): inviable. Opciones: publicar en una dirección nueva (pasando `capabilities: {sample:{}, db:{}}`) y anotarla aquí, avisando de que el progreso guardado en el navegador no se traslada; o seguir siempre desde la misma conversación.
- **Pendiente sin empezar**: Física II (12), Biología II (16), Lengua (22), Historia de España (14 de 15); simulacros nuevos de Mates II. Pegas menores: 1 px de desborde en móvil en Química II t10–t11; `q7_reacciones` abre siempre en «Adición»; en Mates «2e-1» se lee como 0,2 (escribir «2*e-1»).
- **Cómo se trabajó (funciona bien)**: sesión principal solo orquesta; 2 agentes nuevos a la vez (modelo Sonnet, `isolation: worktree`), un tema cada uno, con el encargo común `herramientas/ENCARGO_COMUN_MATES2.txt` adaptado a la asignatura + 5–8 ideas EvAU del tema; al acabar cada uno: `sh herramientas/validar_tema.sh <id> <asig> <N>` (fusiona, prueba y verifica; el índice debe estar limpio antes), apuntar coste en §7, lanzar el siguiente, publicar cada 2–3 temas. Coste medido: ≈200.000–300.000 tokens por tema. Ajuste previo necesario en un contenedor nuevo: `~/.claude/settings.json` con `{"worktree":{"baseRef":"head"}}` (si no, los worktrees fallan) y `pip install sympy scipy rdkit py2opsin mendeleev`.
- **Prompt para retomar**: `herramientas/PROMPT_RETOMAR.md`.

Última actualización: cierre de la versión 1 (fin de octubre de 2026). Si algo de aquí no coincide con el repositorio, **manda el repositorio**: dilo y corrige este archivo.

## 1. Cómo retomar (3 pasos)
1. El usuario dice **«continuamos»** (el protocolo está en `CLAUDE.md`).
2. Comprobar que el punto de partida está sano: `git checkout claude/admiring-keller-1be6ou && git pull`, y luego `sh herramientas/comprobar_todo.sh` → debe terminar en **«TODO CUADRA»**. Si no, arreglar eso antes de ampliar nada.
3. Lanzar la tanda que toca (sección 4) siguiendo las reglas de coste (sección 6).

**Línea base al cerrar la versión 1** (27-oct-2026, `sh herramientas/comprobar_todo.sh`, 11 min 30 s): **TODO CUADRA** — build OK · regresión «todo coincide» · 104/104 botones de la ruta de estudio · ejercicios nuevos que aceptan su respuesta: Mates I 611/611, FyQ I 622/622, Química II 10/10, Historia de España 7/7 · 12 scripts de verificación con **16.706 comprobaciones de cifras y 0 fallos**. Tras ampliar, esos números solo deben subir.

## 2. Estado por asignatura
| Asignatura | Estado | Qué tiene |
|---|---|---|
| Matemáticas I (13 temas) | **Cerrada** | ≈100.000 palabras añadidas · 663 ejercicios (611 nuevos) · 20 simulacros (13 nuevos) · ≈220 actividades · 129 láminas nuevas |
| Física y Química I (13 temas) | **Cerrada** | ≈117.000 palabras añadidas · 674 ejercicios (622 nuevos) · 11 simulacros (4 nuevos) · ≈240 actividades · 115 láminas nuevas |
| Química II (11 temas) | **Cerrada (28-oct-2026)**, estándar «con cariño» | 11 temas ampliados · 525 ejercicios en temas (t6 incluye 10 antiguos) · 8 simulacros (3 nuevos) · ≈45 interactivos nuevos, todos probados pulsándolos · ≈4.500 comprobaciones de cifras nuevas sin fallos |
| Historia de España (15 temas) | **A medias a propósito**: solo el tema 7 (Restauración) con el estándar antiguo (7 ejercicios, línea del tiempo, diagramas, comentario guiado) | Después de Química II, si el usuario lo decide |
| Matemáticas II (14 temas) | **Cerrada (28-oct-2026)**, estándar «con cariño» | 14 temas ampliados (≈98.000 palabras) · 660 ejercicios · 53 interactivos nuevos, todos probados pulsándolos · 2.896 comprobaciones de cifras sin fallos · sin simulacros nuevos |
| Historia de la Filosofía (16) | **Cerrada 29-oct**: 16 temas ampliados, cada uno con ficha «de un vistazo» (componente `vistazo`, lab_0vistazo.js); 707 ejercicios, 3.747 comprobaciones sin fallos | ≈2,5 M tokens (≈157k/tema) |
| Física II (12), Biología II (16), Lengua (22) | Sin empezar (solo el contenido original) | — |

«A medias a propósito» = no hay nada roto ni sin terminar en el código: esos dos temas funcionan y están verificados; simplemente se ampliarán más cuando toque su asignatura.

## 3. Pendientes y notas conocidas (nada de esto bloquea el uso)
- **Publicación**: la dirección de uso es https://claude.ai/artifact/PBj2wEg4PKUru2SyFq2T2c (**nueva desde el 28-oct-2026**, versión 1 = commit `6805024`; la anterior, 4rJafyZA7j7pVvMX8QJaTC, queda como copia con lo publicado hasta `3efb0c7`: republicarla desde otra conversación exigía leer sus 5,7 MB enteros). Tiene las capacidades `sample` y `db` (correcciones de Claude en Comentario de texto e Inglés); al republicar **no se pasa `capabilities`**. Para generar el archivo: `sh herramientas/preparar_publicacion.sh <ruta.html>` y publicar con la herramienta Artifact (`url` = esa dirección). **Si `git log` muestra commits posteriores a `3efb0c7` que cambien `ampliaciones/` o `pagina.html`, hay que republicar.**
- **Dos direcciones**: la antigua (`https://claude.ai/artifact/XQLuNYX6Bk5A2LSEtHkdxZ`) conserva la página original sin ampliar (comprobado: es idéntica al `pagina.html` del primer commit). Sobrescribirla exige leer sus 17.018 líneas (≈450.000 tokens) por una regla de la herramienta: solo si el usuario lo pide. El progreso (temas marcados, borradores) se guarda en el navegador **por dirección**, así que no se traslada de una a otra.
- **GitHub Pages / `main`**: ver §0 (web pública = Pages desde `main`, se actualiza con una PR que fusiona el usuario).
- **Formulación (FyQ I tema 3)**: los libros no coinciden en algunas variantes de nomenclatura (p. ej. «tetraoxidosulfato(VI) de hidrógeno» frente a «ácido tetraoxosulfúrico(VI)»). La corrección solo acepta las variantes del catálogo (`ampliaciones/lab_formulacion_0motor.js`). Pendiente de que alguien con el libro del curso lo revise; si el entrenador rechaza una variante válida, se añade ahí.
- **Pruebas en móvil**: se hacen con Chromium emulado a 390 px, no en un teléfono real.
- **Lo que las comprobaciones no cubren**: las cifras y fórmulas sí se recalculan de forma independiente; que una explicación sea clara o pedagógica no se puede verificar a máquina.
- **Archivos generados** (no editar a mano, no commitear en ramas de trabajo de agentes): `ampliaciones/bachi.js`, `index.html`, `pagina-autonoma.html` (se regeneran con `sh build.sh`).
- `herramientas/pruebas/e2e_montaje_fyq.js` es una variante de `e2e_montaje.js` que escribió un agente (otros argumentos); se conserva por si algún script antiguo la usa.

## 4. Siguiente: Química II (3 tandas; una tanda por ventana de uso)
Los originales tienen 500–760 palabras y 4 ejercicios por tema. Hay que **reutilizar los motores de FyQ I** (átomo `lab_atomo.js`, enlace `lab_enlace*.js`, estequiometría `lab_qmol_*.js`, termoquímica `lab_termo*.js`, orgánica `lab_organica.js`/`lab_orgreacciones.js`, equilibrio `lab_equilibrio.js`): abarata mucho los temas 1–4 y 9–11.
1. **Tanda 1 (t1–t4)**: La química y sus cálculos · Estructura de la materia · Sistema periódico · Enlace químico.
2. **Tanda 2 (t5–t8)**: Cinética química · Equilibrio químico (**reforzar el t6 existente**, sin duplicar lo que ya hay) · Ácidos y bases · Oxidación-reducción.
3. **Tanda 3 (t9–t11 + simulacros)**: Compuestos del carbono · Reactividad · Polímeros; y 3 simulacros nuevos tipo EvAU de Madrid con solución desarrollada (`ampliaciones/contenido/quimica2_t99_simulacros.js`, ids `sim6`, `sim7`, `sim8`; hoy hay 5).
Enfoque: nivel y problemas **EvAU/Selectividad de Madrid** (pH, Kc/Kp, pilas y electrólisis, formulación orgánica…). Ficheros: `ampliaciones/contenido/quimica2_tNN*.js`, verificación en `herramientas/verificar_quimica2.py` (ampliar) o archivos nuevos por tanda.

## 4b. Química II — estándar «con cariño» (decisión del usuario, 27-oct-2026)
Química II es la **asignatura prioritaria**: la hija del usuario es quien más la usará y le encantaron los gráficos de Mates I. Para Química II **no se aplica el estándar ligero** de la sección 5:
- **Calidad y claridad por encima de cantidad.** No se mete nada «por meter»: cada gráfico o parte interactiva debe ayudar a entender o a aprender con fluidez; si no aporta, no se hace.
- **Antes de programar, por tema**: listar 6–10 ideas que cuestan en la EvAU de Madrid y decidir para cada una si un gráfico o simulador ayuda; construir solo esos.
- **Gráficos primero**: curvas (velocidad, valoración, Maxwell–Boltzmann, perfiles de energía, distribución de especies vs pH), diagramas (orbitales, pilas, moléculas), tablas coloreadas; siempre legibles en modo claro, oscuro y móvil.
- **Teoría más desarrollada**, con ejemplos resueltos paso a paso al estilo EvAU Madrid.
- **Ejercicios por niveles** con problemas tipo EvAU; los mínimos de la sección 5 son un suelo, no un techo (pero tampoco se rellena).
- **Cada agente explica en su informe, en una línea, qué aporta cada interactivo** (para poder descartar los que no).
- Coste mayor: estimación (mía, no medida) de **250.000–500.000 tokens por tema**.

## 5. Estándar «ligero» por tema (suficiente; no pulir sin fin)
≈5.000–7.000 palabras añadidas con ejemplos resueltos · ≥40 ejercicios (★/★★/★★★ con pasos, varios tipo EvAU) · 6–8 simuladores o actividades nuevos (reutilizando motores) · 2–3 láminas · test, tarjetas y «encuentra el error» · verificación independiente (sympy) **solo de las cifras nuevas** · pruebas: `e2e_ejercicios`, `e2e_tema` (escritorio y móvil), `e2e_ruta`, `e2e_regresion`, y al final `sh herramientas/comprobar_todo.sh`. Convenciones y API: `herramientas/GUIA_TEMA.md`.

## 6. Reglas de coste (el usuario paga por uso)
1. **Máximo 2 agentes a la vez**, siempre **nuevos y con encargo corto** (no `fork`; no reanudar agentes con contexto largo salvo para terminar algo casi hecho).
2. **Una tanda por ventana de uso.** Si llega un error 429 / «session limit», **parar y esperar** a la hora de reinicio que indique; no reanudar en bucle ni lanzar más agentes mientras tanto.
3. Capturas de pantalla **solo de tipos de widget nuevos** y una pasada. Leer archivos con `grep`/`sed -n`, nunca enteros.
4. **No republicar el artefacto** hasta cerrar la tanda (una publicación por tanda).
5. Sin motores ni catálogos gigantes: si un tema pide algo grande, preguntar antes.
6. **Sesión principal ligera** (ver `CLAUDE.md`): fusionar con `sh herramientas/fusionar_agente.sh <id>`; conversación nueva tras cada tanda. Medición del 27-oct: la sesión principal fue el 39 % del coste (639 acciones con ≈407.000 tokens de contexto medio) y los 13 agentes el 61 %; los 6 `fork` costaron ≈39 M «unidades» (≈ lo mismo que toda la principal, 45 M) por heredar el contexto.
7. Al cerrar cada tanda: **anotar el coste medido** (tokens que informa cada agente) en la tabla de abajo y decir al usuario cifras reales, no promesas.

## 7. Coste medido hasta ahora (tokens de agentes; referencia para estimar)
| Trabajo | Tokens | Duración |
|---|---|---|
| Refuerzo Mates I t4+t5 (2 temas) | ≈360.000 | 14 min |
| Refuerzo Mates I t6+t7+t8 (3 temas) | ≈425.000 | 19 min |
| FyQ I t3 completo, con motor de 2.342 compuestos (tema pesado) | ≈610.000 | 63 min |
| Química II t1: terminar (verificador 136 cifras, 2 ejemplos, e2e de 12 interactivos; partía de lo fusionado) | 138.199 (43 herramientas) | 9 min |
| Química II t3 completo (≈7.300 palabras, 46 ejercicios, 3 interactivos nuevos, 313 comprobaciones) | 194.946 (55 herramientas) | 18 min |
| Química II t2 completo (≈7.500 palabras, 46 ejercicios, 3 interactivos nuevos, 117 cifras) | 198.899 (56 herramientas) | 14 min |
| Química II t4 completo (≈6.300 palabras, 46 ejercicios, 3 interactivos nuevos + 10 reutilizados, 259 comprobaciones) | 252.224 (67 herramientas) | 30 min |
| **Tanda 1 de Química II (t1–t4), total agentes** | **784.268** | ≈71 min |
| Química II t5 completo (≈7.800 palabras, 47 ejercicios, 5 interactivos nuevos, 660 comprobaciones) | 239.862 (75 herramientas) | 23 min |
| Química II t7 completo (≈8.100 palabras, 48 ejercicios, 6 simuladores nuevos, 972 comprobaciones) | 296.666 (87 herramientas) | 29 min |
| Química II t6 refuerzo (≈3.800 palabras, 34 ejercicios nuevos → 44, 5 interactivos nuevos, 363 comprobaciones) | 249.717 (87 herramientas) | 26 min |
| Química II t8 completo (≈8.160 palabras, 52 ejercicios, 5 interactivos nuevos, 543 comprobaciones) | 276.356 (54 herramientas) | 23 min |
| **Tanda 2 de Química II (t5–t8), total agentes** | **1.062.601** | ≈101 min |
| Química II t9 completo (≈7.200 palabras, 52 ejercicios, 6 simuladores nuevos, 459 comprobaciones con RDKit/OPSIN) | 284.949 (71 herramientas) | 31 min |
| Química II t10 completo (≈7.000 palabras, 51 ejercicios, 3 simuladores nuevos, 198 comprobaciones) | 210.410 (47 herramientas) | 19 min |
| Química II simulacros sim6–sim8 (21 cuestiones, ≈60 apartados, 187 comprobaciones) | 133.671 (23 herramientas) | 8 min |
| Química II t11 completo (≈5.400 palabras, 45 ejercicios, 2 interactivos nuevos, 236 comprobaciones) | 178.917 (54 herramientas) | 18 min |
| **Tanda 3 de Química II (t9–t11 + simulacros), total agentes** | **807.947** | ≈76 min |
| **Química II completa (3 tandas), total agentes** | **2.654.816** | ≈4 h |
| Química II: contrastar formato PAU y rehacer sim6–sim8 (242 comprobaciones) | 129.722 (32 herramientas) | 10 min |
| Mates II t1 (≈6.800 palabras, 47 ejercicios, 5 interactivos con motor de matrices propio, 292 comprobaciones) | 255.692 (80 herramientas) | 27 min |
| Mates II t2 (≈6.600 palabras, 45 ejercicios, 5 interactivos, 152 comprobaciones) | 218.948 (54 herramientas) | 20 min |
| Mates II t4 (≈6.300 palabras, 45 ejercicios, 3 interactivos con vista 3D girable, 94 comprobaciones) | 230.786 (53 herramientas) | 17 min |
| Mates II t3 (≈7.900 palabras con ejercicios, 44 ejercicios, 5 interactivos, 369 comprobaciones) | 273.227 (75 herramientas) | 25 min |
| Mates II t5 (≈7.200 palabras, 46 ejercicios, 3 interactivos 3D, 112 comprobaciones) | 204.051 (36 herramientas) | 15 min |
| Mates II t6 (≈6.700 palabras, 45 ejercicios, 2 interactivos, 126 comprobaciones) | 209.493 (47 herramientas) | 16 min |
| Mates II t7 (≈8.400 palabras, 44 ejercicios, 2 interactivos nuevos + 7 de Mates I, 119 comprobaciones) | 197.513 (41 herramientas) | 16 min |
| Mates II t8 (≈7.900 palabras, 47 ejercicios, 3 interactivos nuevos + 6 de Mates I, 191 comprobaciones; cortado por el límite y reanudado) | ≈198.922 (contexto final; 83 herramientas) | ≈30 min |
| Mates II t9 (≈7.300 palabras, 44 ejercicios, 5 interactivos nuevos, 109 comprobaciones) | 230.555 (49 herramientas) | 18 min |
| Mates II t10 (≈8.800 palabras con actividades, 61 ejercicios, 5 interactivos nuevos, 244 comprobaciones) | 254.751 (51 herramientas) | 22 min |
| Mates II t11 (≈5.250 palabras, 48 ejercicios, 3 interactivos nuevos, 287 comprobaciones) | 206.330 (49 herramientas) | 18 min |
| Mates II t12 (≈6.260 palabras, 49 ejercicios, 5 interactivos nuevos, 353 comprobaciones) | 208.405 (48 herramientas) | 18 min |
| Mates II t13 (≈6.500 palabras, 49 ejercicios, 2 interactivos nuevos + 5 de Mates I, 122 comprobaciones) | 202.772 (44 herramientas) | 16 min |
| Mates II t14 (≈6.200 palabras, 46 ejercicios, 5 interactivos nuevos, 326 comprobaciones) | 213.121 (45 herramientas) | 16 min |
| **Matemáticas II completa (14 temas), total agentes** | **3.104.566** | ≈4,5 h |
| Filosofía t1 presocráticos + componente vista rápida (44 ej., 188 comprob.) | ≈170k tras el corte + parte previa (cortada por límite de uso) | |
| Filosofía t2 sofistas y Sócrates (45 ej., 196 comprob.) | ≈159k | |
| Filosofía t3 Platón (44 ej., 184 comprob.) | ≈139k | |
| Filosofía t4 Aristóteles (44 ej., 231 comprob.) | ≈161k | |
| Filosofía t5 helenismo (42 ej., 193 comprob.) | ≈149k | |
| Filosofía t6 San Agustín (45 ej., 230 comprob.) | ≈143k | |
| Filosofía t7 Santo Tomás (44 ej., 243 comprob.) | ≈155k | |
| Filosofía t8 Renacimiento y ciencia (46 ej., 258 comprob.) | ≈151k | |
| Filosofía t9 Descartes (44 ej., 241 comprob.) | ≈150k | |
| Filosofía t10 Locke y Hume (44 ej., 252 comprob.) | ≈150k | |
| Filosofía t11 Rousseau e Ilustración (44 ej., 240 comprob.) | ≈162k | |
| Filosofía t12 Kant (45 ej., 260 comprob.) | ≈160k | |
| Filosofía t13 Marx (46 ej., 260 comprob.) | ≈155k | |
| Filosofía t14 Nietzsche (45 ej., 266 comprob.) | ≈178k | |
| Filosofía t15 fenomenología y existencialismo (41 ej., 279 comprob.) | ≈157k | |
| Filosofía t16 Ortega (44 ej., 226 comprob.) | ≈156k | |
| *(añadir aquí cada tanda nueva)* | | |

Estimación (mía, **no medida**) para Química II con el estándar ligero: ≈150.000–350.000 tokens por tema, es decir ≈2–3,5 millones en total repartidos en 3 tandas.

## 8. Plantilla de encargo para un agente (copiar y rellenar los corchetes)
«Trabajas en el repo bachi-firu. Si tu worktree no contiene `herramientas/GUIA_TEMA.md`, haz `git merge --ff-only claude/admiring-keller-1be6ou`. LEE `herramientas/GUIA_TEMA.md` y `PLAN.md` (secciones 5 y 6). Encargo: ampliar [asignatura] [temas]; originales con `node herramientas/pruebas/leer.js [asig] tN`. Solo AÑADIR; la teoría nunca se recorta. Reutiliza motores existentes de `ampliaciones/lab_*.js` [lista]. Verificación en `herramientas/verificar_[…].py` (archivo nuevo; no toques los de otros agentes). Pruebas: e2e_ejercicios, e2e_tema (escritorio y móvil), e2e_ruta, e2e_regresion. Commits frecuentes con los trailers `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` y `Claude-Session: …`; NO push ni PR; no commitees bachi.js/index.html/pagina-autonoma.html. Si chocas con un límite de uso, para y deja todo commiteado. Informe final en ≤10 líneas con cifras.»

## 9. Decisiones pendientes del usuario
- ¿Actualizar la dirección antigua (≈450.000 tokens de lectura) o dejarla como copia?
- ~~¿Abrir una PR hacia `main` para publicar en GitHub Pages?~~ **Decidido (28-oct-2026): sí; la web pública es Pages** (§0).
- ~~¿Química II es la siguiente asignatura?~~ **Decidido (27-oct-2026): sí, y es la prioritaria** (ver 4b).

- **Obsidian / iPad: DESCARTADO** (decisión del usuario, 27-oct-2026: a su hija no le gusta Obsidian). No se mantiene ni se adapta; la carpeta `obsidian/` (generador que escribió el usuario, lee `pagina.html` sin la capa de ampliaciones) queda solo como histórico y puede borrarse cuando el usuario quiera. La web de uso es únicamente la página de claude.ai (sección 3).

## 10. Mapa rápido del repositorio y comandos
- `pagina.html` original (con 16 líneas tocadas para cargar la capa) · `ampliaciones/` (núcleo, `lab_*.js` simuladores, `contenido/` por tema, `estilos.css`) · `herramientas/` (`GUIA_TEMA.md`, `comprobar_todo.sh`, `preparar_publicacion.sh`, `verificar_*.py`, `volcar_*.js`, `pruebas/e2e_*.js`).
- `sh build.sh` regenera la web · `sh herramientas/comprobar_todo.sh` comprueba todo (`completo` añade móvil) · `sh herramientas/preparar_publicacion.sh <ruta>` prepara el archivo a publicar.
- En otro equipo: `git clone`, `git checkout claude/admiring-keller-1be6ou`, tener `node`, `python3` con `sympy` y Playwright con Chromium (`PLAYWRIGHT_MODULE` y `CHROMIUM_PATH` si hace falta; ver `herramientas/pruebas/e2e_common.js`).

## 11. Piloto automático de Química II, tanda 1 (noche del 27 al 28-oct-2026)
Lo pidió el usuario para ver avances por la mañana. **Quien lea esto tras un reinicio sigue este protocolo sin preguntar** (salvo que lo diga una puerta de parada).
**Punto de partida:** 2 agentes en marcha, cada uno con alcance recortado a UN tema (checkpoint de coste): `adaa9ded…` → tema 1; `adb822b2…` → tema 3. Sus ramas son `worktree-agent-<id>` (ver `git worktree list`).
**Cuando un agente termine su tema** (notificación de finalización):
1. Anotar en la tabla de coste (sección 7) los tokens, las llamadas a herramientas y la duración que informa la notificación.
2. Fusionar su rama (`git merge --no-edit worktree-agent-<id>`; conflictos esperables: `estilos.css` → conservar ambos lados; `e2e_montaje.js` → conservar el nuestro), `sh build.sh`, pasar `e2e_ejercicios.js quimica2 tN`, `e2e_ruta.js quimica2:tN`, `e2e_regresion.js` y el verificador del tema (`herramientas/verificar_quimica2_t*.py`), commit y push. Si algo falla, arreglarlo o devolverlo al agente; no seguir con un tema roto.
3. **Puerta de coste: si el agente gastó más de 700.000 tokens en un tema, NO lanzar el siguiente.** Anotar el motivo aquí y parar: decide el usuario.
4. Si pasa la puerta: lanzar **un agente nuevo** (plantilla de la sección 8 + estándar 4b) para el tema siguiente (t2 tras t1; t4 tras t3), diciéndole que use los archivos del tema ya hecho como modelo de estilo (`grep`/`sed -n`, sin leerlos enteros) y que también se limite a ese tema.
5. Tras cada fusión validada, **publicar el artefacto** (`sh herramientas/preparar_publicacion.sh <ruta>` + herramienta Artifact con `url` de la sección 3, sin `capabilities`) para que el usuario vea el avance.
**Cuando estén los temas 1–4:** `sh herramientas/comprobar_todo.sh` (detecta solo los temas nuevos) → debe dar «TODO CUADRA»; actualizar las secciones 2 y 7, commit, push, publicar y **PARAR**. No empezar la tanda 2 (t5–t8) sin que el usuario lo diga.
**Si llega un límite de uso (429 / «session limit»):** no reintentar en bucle; programar un aviso (`send_later`) a la hora de reinicio que indique el error y retomar entonces desde el paso que toque.
**Red de seguridad:** un aviso programado cada ~2 h mientras haya agentes en marcha; si siguen trabajando, no hacer nada, no avisar al usuario y re-armar (máx. 6 avisos seguidos sin novedades).
**Exposición máxima esta noche:** 4 temas × 700.000 = 2,8 M tokens como tope duro (esperado: 1–2 M).

## 12. Si esta conversación se corta o se retoma en otra (LÉELO PRIMERO en una conversación nueva)
**Estado exacto al cortar (27-oct-2026, ~23:45 UTC): los dos agentes fueron DETENIDOS por el usuario** (para frenar el gasto; ya no hay nada en ejecución ni avisos programados) y **todo lo que habían escrito está fusionado y subido a la rama de trabajo**. Tanda 1 de Química II (temas 1–4): **ningún tema terminado**; hay trabajo parcial (ver `git log --stat -5` y `ls ampliaciones/lab_quim2_*.js ampliaciones/contenido | grep quimica2`: simuladores del tema 1 y lo que haya hecho el agente del tema 3). No se midió el coste de esos agentes (se detuvieron antes de informar): a la hora de parar llevaban ≈2 M «unidades» cada uno.
- **Todo está en GitHub**: ya no depende de ninguna carpeta `.claude/worktrees/` del contenedor original.
- El agente del tema 1 (`adaa9ded…`) y el del tema 3 (`adb822b2…`) **no se reanudan**: en la conversación nueva se lanzan agentes nuevos que parten de lo ya fusionado.

**Pasos en la conversación nueva (el usuario solo dice «continuamos»):**
1. `git fetch && git checkout claude/admiring-keller-1be6ou && git pull`. Leer `CLAUDE.md` y este `PLAN.md`.
2. **¿Sigue activa la conversación anterior?** Si el último commit del remoto es de hace menos de ~30 min, otra sesión está trabajando: no lances agentes; avisa al usuario. Si no, sigue.
3. `git worktree list`: si existen `.claude/worktrees/agent-adaa…` o `…adb8…`, haz en cada una `git add -A` (sin bachi.js/index.html/pagina-autonoma.html), commit WIP y fusiona su rama en la de trabajo (`git merge --no-edit worktree-agent-<id>`; conflictos: `estilos.css` conservar ambos, `e2e_montaje.js` conservar el nuestro); `sh build.sh`; `e2e_regresion.js`; push. Si no existen (contenedor nuevo), parte de lo que haya en la rama.
4. Ver qué temas de Química II tienen contenido: `node herramientas/pruebas/leer.js quimica2 tN` y `ls ampliaciones/contenido | grep quimica2`. Los que no estén completos se rehacen.
5. Lanzar **máximo 2 agentes nuevos** (plantilla de la sección 8 + estándar 4b), cada uno **un tema** (t1 y t3 primero; si ya hay lo del t1 en la rama, que lo use y lo complete), con las reglas de la sección 6 y la **puerta de coste de 700.000 tokens por tema** (sección 11). Tras cada tema: fusionar, verificar (`e2e_ejercicios`, `e2e_ruta quimica2:tN`, `e2e_regresion`, verificador del tema), commit, push y **publicar** (sección 3).
6. Al tener los temas 1–4: `sh herramientas/comprobar_todo.sh` → «TODO CUADRA»; anotar costes (sección 7) y estado (sección 2); publicar y parar. La tanda 2 (t5–t8) solo si el usuario lo dice.

**Avisos programados:** los `send_later` y las notificaciones de agentes pertenecen a la conversación que los creó; **no actúan en una conversación nueva**. No esperes ninguno.
**Si el límite de uso (429) corta algo:** parar, anotar la hora de reinicio que indique el error y esperar; no reintentar en bucle.

**Reanudado el 27-oct-2026 23:50 UTC (sesión `session_01N58emLFiFmstrFRv9SzEpD`):** el tema 3 no tenía nada fusionado (se rehace). Agentes nuevos en marcha: `a77c66b0d845a7604` → terminar tema 1 (verificador `verificar_quimica2_t1.py`, revisión §4b, pruebas); `a9d6434391062fc80` → tema 3. Ramas `worktree-agent-<id>`; fusionar y probar con `sh herramientas/validar_tema.sh <id> <asig> <N>` (o `fusionar_agente.sh <id>`; ¡sin cambios en el índice antes de fusionar!). Después: t2 tras t1 y t4 tras t3.

**28-oct 00:00 UTC:** tema 1 fusionado y validado; lanzado `a7d2c2ba5db2196ad` → tema 2. **Publicar bloqueado**: la herramienta exige que una conversación nueva lea entera la página publicada (63.313 líneas, 5,7 MB) antes de republicar en la misma dirección; se ha preguntado al usuario (dirección nueva / esperar / releer).
**28-oct ~00:15 UTC:** tema 3 fusionado y validado; lanzado `agente tema 4` (ver `git worktree list`). Pega menor conocida: en móvil los símbolos del eje de `q3_anomalias` quedan algo apretados.
**28-oct:** tema 2 fusionado y validado. Solo queda el tema 4 en marcha.
**28-oct ~01:15 UTC: TANDA 1 CERRADA.** Temas 1–4 fusionados y verificados; `comprobar_todo.sh` → «TODO CUADRA» (24 grupos; 17.531 comprobaciones de cifras). Arreglos en `comprobar_todo.sh`: la ruta de estudio solo se cuenta en temas con `resumen` (quimica2 t6 e historia_esp t7, del estándar antiguo, no la tienen a propósito) y se leen los recuentos de los verificadores de Química II. **Pendiente: publicar** (ver la nota de las 00:00 sobre la dirección). La tanda 2 (t5–t8) solo si el usuario lo pide; abrir conversación nueva para ella.
**28-oct 08:10 UTC:** publicado en la dirección NUEVA https://claude.ai/artifact/PBj2wEg4PKUru2SyFq2T2c (el usuario pidió seguir solo; capacidades `sample` y `db` declaradas). Ojo: desde una conversación nueva, republicar en ella también exige leerla entera; si pasa, publicar en otra dirección nueva y anotarla aquí. Siguiente: tanda 2 (t5–t8) en una conversación nueva, el usuario ya la aprobó («continúa por tu cuenta»).
**28-oct:** tanda 2 en marcha en la misma conversación (así se puede republicar en la dirección nueva sin releerla). t5 fusionado y validado; en marcha t7 y el refuerzo de t6; después t8.
**28-oct:** t7 fusionado y validado; en marcha t6 (refuerzo) y t8. Nota: el corrector lee `1e-5` como e^−5; en Química II las potencias se escriben `1,03*10^-4`.
**28-oct:** t6 reforzado, fusionado y validado (`quimica2_t06.js` pasó a `quimica2_t06a.js`, mismo contenido). `Mate.numero` (grafica.js) acepta ahora notación científica (`7,07e-7`, `7,07·10⁻⁷`); efecto lateral conocido: en Mates, «2e-1» se lee como 0,2 y no como 2·e−1 (escribir «2*e-1»). Mates I y FyQ I siguen aceptando todas sus respuestas. Solo queda t8 en marcha.
**28-oct:** t8 fusionado y validado: tanda 2 terminada. Tanda 3 en marcha en la misma conversación: t9 y t10; después t11 y los 3 simulacros (no existe aún `quimica2_t99_simulacros.js`; tomar de modelo `fyq1_t99_simulacros.js`).
**28-oct:** tanda 2 publicada (versión 4 de la dirección nueva, `comprobar_todo` «TODO CUADRA»). t9 y t10 fusionados y validados; en marcha t11 y los simulacros. `verificar_quimica2_t9.py` necesita `pip install rdkit py2opsin` y Java.
**28-oct:** simulacros sim6–sim8 fusionados (rehechos al formato oficial PAU Madrid 2025-26: 1 obligatoria + pares 2A/2B, 3A/3B, 4A/4B, 2,5 puntos por pregunta (reparto deducido, los documentos solo dan el total), 90 min). Solo queda t11.
**28-oct ~13:20 UTC: QUÍMICA II CERRADA.** t11 fusionado; `comprobar_todo.sh` → «TODO CUADRA» (32 grupos; 21.149 comprobaciones de cifras). Publicado en la dirección nueva. Pendientes menores: 1 px de desborde en móvil en t10 y t11 (solo lo ve `comprobar_todo.sh completo`), `q7_reacciones` abre siempre en «Adición», t11 quedó en ≈5.400 palabras. Siguiente asignatura: la decide el usuario (§2).
**28-oct 13:20 UTC: Matemáticas II EMPIEZA** (el usuario pidió seguir solo; misma conversación para poder republicar sin coste). Estándar 4b también para Mates II. Instrucciones comunes del encargo en el scratchpad (copia en `herramientas/ENCARGO_COMUN_MATES2.txt`: plantilla §8 + 4b, motores de Mates I, verificador `verificar_mates2_tN.py`, e2e `e2e_mates2_tN.js`). En marcha: t1 y un agente corto que contrasta el formato oficial de la PAU de Química de Madrid para los simulacros sim6–sim8. Orden: t1→t14, de 2 en 2, puerta de 700.000 tokens por tema.
**28-oct 18:15 UTC — PUNTO DE PARADA DEL USUARIO:** terminar Matemáticas II (t1–t14) y PARAR; no empezar otra asignatura sin que lo diga («tengo que comprobar cositas»). Límite de 5 h alcanzado a las ~16:00; reanudado 18:13 (t8 retomado desde WIP, t9 relanzado).
**28-oct ~21:30 UTC: MATEMÁTICAS II CERRADA.** `comprobar_todo.sh` → «TODO CUADRA» (47 grupos; 24.100 comprobaciones de cifras). Publicado (dirección nueva). **PARADO por decisión del usuario**: no empezar otra asignatura hasta que lo diga. Posibles siguientes: simulacros de Mates II; Física II.

- 28-oct 23:20 UTC: Filosofía t1 fusionado (componente `vistazo` en lab_0vistazo.js, API en GUIA_TEMA «Vista rápida»). Lanzados t2 y t3.
- 28-oct: Filosofía t2 y t3 fusionados. Lanzados t4 y t5.
- 28/29-oct: Filosofía t4 y t5 fusionados. Lanzados t6 y t7. Pendiente cotejar con edición los fragmentos citados de memoria (Epicuro, Epicteto).
- 29-oct: Filosofía t6 fusionado. Lanzado t8.
- 29-oct: Filosofía t7 fusionado. Lanzado t9.
- 29-oct: Filosofía t8 fusionado. Lanzado t10.
- 29-oct: Filosofía t9 fusionado. Lanzado t11.
- 29-oct: Filosofía t10 fusionado. Lanzado t12.
- 29-oct: Filosofía t11 fusionado. Lanzado t13.
- 29-oct: Filosofía t12 fusionado. Lanzado t14.
- 29-oct: Filosofía t13 fusionado. Lanzado t15.
- 29-oct: Filosofía t14 fusionado. Lanzado t16.
- 29-oct: Filosofía t15 fusionado. Lanzado t16 (último).
- 29-oct: Filosofía t16 fusionado. TODO CUADRA. Artefacto v12 y `main` actualizados. PARADA.
