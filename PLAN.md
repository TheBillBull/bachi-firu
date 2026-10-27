# PLAN.md — cómo retomar el proyecto (léelo entero antes de tocar nada)

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
| Química II (11 temas) | **EN CURSO (prioridad)** desde el 27-oct-2026: tanda 1 en marcha. Antes de ella, solo el tema 6 (Equilibrio) está ampliado, con el estándar antiguo (10 ejercicios, simulador de Le Chatelier, tabla ICE, 1 lámina) | **Es lo siguiente** (sección 4) |
| Historia de España (15 temas) | **A medias a propósito**: solo el tema 7 (Restauración) con el estándar antiguo (7 ejercicios, línea del tiempo, diagramas, comentario guiado) | Después de Química II, si el usuario lo decide |
| Matemáticas II (14), Física II (12), Biología II (16), Lengua (22), Historia de la Filosofía (16) | Sin empezar (solo el contenido original) | — |

«A medias a propósito» = no hay nada roto ni sin terminar en el código: esos dos temas funcionan y están verificados; simplemente se ampliarán más cuando toque su asignatura.

## 3. Pendientes y notas conocidas (nada de esto bloquea el uso)
- **Publicación**: la dirección de uso es https://claude.ai/artifact/4rJafyZA7j7pVvMX8QJaTC (versión 9 = commit `3efb0c7`). Tiene las capacidades `sample` y `db` (correcciones de Claude en Comentario de texto e Inglés); al republicar **no se pasa `capabilities`**. Para generar el archivo: `sh herramientas/preparar_publicacion.sh <ruta.html>` y publicar con la herramienta Artifact (`url` = esa dirección). **Si `git log` muestra commits posteriores a `3efb0c7` que cambien `ampliaciones/` o `pagina.html`, hay que republicar.**
- **Dos direcciones**: la antigua (`https://claude.ai/artifact/XQLuNYX6Bk5A2LSEtHkdxZ`) conserva la página original sin ampliar (comprobado: es idéntica al `pagina.html` del primer commit). Sobrescribirla exige leer sus 17.018 líneas (≈450.000 tokens) por una regla de la herramienta: solo si el usuario lo pide. El progreso (temas marcados, borradores) se guarda en el navegador **por dirección**, así que no se traslada de una a otra.
- **GitHub Pages / `main`**: todo el trabajo está en la rama `claude/admiring-keller-1be6ou`; `main` no se ha tocado y **no hay PR** (el usuario no la ha pedido). Si quiere publicar en https://thebillbull.github.io/bachi-firu/ hay que abrir una PR hacia `main`.
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
6. Al cerrar cada tanda: **anotar el coste medido** (tokens que informa cada agente) en la tabla de abajo y decir al usuario cifras reales, no promesas.

## 7. Coste medido hasta ahora (tokens de agentes; referencia para estimar)
| Trabajo | Tokens | Duración |
|---|---|---|
| Refuerzo Mates I t4+t5 (2 temas) | ≈360.000 | 14 min |
| Refuerzo Mates I t6+t7+t8 (3 temas) | ≈425.000 | 19 min |
| FyQ I t3 completo, con motor de 2.342 compuestos (tema pesado) | ≈610.000 | 63 min |
| *(añadir aquí cada tanda nueva)* | | |

Estimación (mía, **no medida**) para Química II con el estándar ligero: ≈150.000–350.000 tokens por tema, es decir ≈2–3,5 millones en total repartidos en 3 tandas.

## 8. Plantilla de encargo para un agente (copiar y rellenar los corchetes)
«Trabajas en el repo bachi-firu. Si tu worktree no contiene `herramientas/GUIA_TEMA.md`, haz `git merge --ff-only claude/admiring-keller-1be6ou`. LEE `herramientas/GUIA_TEMA.md` y `PLAN.md` (secciones 5 y 6). Encargo: ampliar [asignatura] [temas]; originales con `node herramientas/pruebas/leer.js [asig] tN`. Solo AÑADIR; la teoría nunca se recorta. Reutiliza motores existentes de `ampliaciones/lab_*.js` [lista]. Verificación en `herramientas/verificar_[…].py` (archivo nuevo; no toques los de otros agentes). Pruebas: e2e_ejercicios, e2e_tema (escritorio y móvil), e2e_ruta, e2e_regresion. Commits frecuentes con los trailers `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` y `Claude-Session: …`; NO push ni PR; no commitees bachi.js/index.html/pagina-autonoma.html. Si chocas con un límite de uso, para y deja todo commiteado. Informe final en ≤10 líneas con cifras.»

## 9. Decisiones pendientes del usuario
- ¿Actualizar la dirección antigua (≈450.000 tokens de lectura) o dejarla como copia?
- ¿Abrir una PR hacia `main` para publicar en GitHub Pages?
- ~~¿Química II es la siguiente asignatura?~~ **Decidido (27-oct-2026): sí, y es la prioritaria** (ver 4b).

- **Obsidian / iPad: DESCARTADO** (decisión del usuario, 27-oct-2026: a su hija no le gusta Obsidian). No se mantiene ni se adapta; la carpeta `obsidian/` (generador que escribió el usuario, lee `pagina.html` sin la capa de ampliaciones) queda solo como histórico y puede borrarse cuando el usuario quiera. La web de uso es únicamente la página de claude.ai (sección 3).

## 10. Mapa rápido del repositorio y comandos
- `pagina.html` original (con 16 líneas tocadas para cargar la capa) · `ampliaciones/` (núcleo, `lab_*.js` simuladores, `contenido/` por tema, `estilos.css`) · `herramientas/` (`GUIA_TEMA.md`, `comprobar_todo.sh`, `preparar_publicacion.sh`, `verificar_*.py`, `volcar_*.js`, `pruebas/e2e_*.js`).
- `sh build.sh` regenera la web · `sh herramientas/comprobar_todo.sh` comprueba todo (`completo` añade móvil) · `sh herramientas/preparar_publicacion.sh <ruta>` prepara el archivo a publicar.
- En otro equipo: `git clone`, `git checkout claude/admiring-keller-1be6ou`, tener `node`, `python3` con `sympy` y Playwright con Chromium (`PLAYWRIGHT_MODULE` y `CHROMIUM_PATH` si hace falta; ver `herramientas/pruebas/e2e_common.js`).
