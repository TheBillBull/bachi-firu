# Plan de trabajo (léelo antes de empezar cualquier sesión)

## Estado a fecha de cierre de la versión 1
| Asignatura | Estado | Qué tiene |
|---|---|---|
| Matemáticas I | **Cerrada** (13 temas) | ≈100.000 palabras añadidas, 663 ejercicios (611 nuevos), 20 simulacros (13 nuevos), ≈220 actividades |
| Física y Química I | **Cerrada** (13 temas) | ≈117.000 palabras añadidas, 674 ejercicios (622 nuevos), 11 simulacros (4 nuevos), ≈240 actividades |
| Química II | **A medias**: solo el tema 6 (Equilibrio) con el estándar antiguo (10 ejercicios, simulador de Le Chatelier, tabla ICE) | 11 temas; **siguiente a ampliar** |
| Historia de España | A medias: solo el tema 7 (Restauración) con el estándar antiguo | 15 temas |
| Matemáticas II (14), Física II (12), Biología II (16), Lengua (22), Historia de la Filosofía (16) | Sin empezar | — |

Publicación: **una sola dirección de uso**, https://claude.ai/artifact/4rJafyZA7j7pVvMX8QJaTC (guarda las capacidades `sample` y `db` para las correcciones de Claude; al republicar **no pases `capabilities`**). Se genera con `sh build.sh` y `sed 's#<title>Bachi para Firu</title>#<title>Bachi para Firu · ampliado</title>#' pagina-autonoma.html > <scratchpad>/preview/bachi-piloto.html`. La dirección antigua (`…XQLuNYX6Bk5A2LSEtHkdxZ`) conserva la página original sin ampliar; actualizarla en el sitio exige leer sus 17.000 líneas (≈450.000 tokens): solo si el usuario lo pide.

## Siguiente: Química II (3 tandas; una tanda por ventana de uso)
Originales: unas 500–760 palabras y 4 ejercicios por tema. Hay que **reutilizar los motores de FyQ I** (átomo, enlace, estequiometría, termoquímica, química orgánica), que ya existen en `ampliaciones/lab_*.js`: eso abarata mucho los temas 1–4 y 9–11.
1. **Tanda 1 (t1–t4)**: La química y sus cálculos · Estructura de la materia · Sistema periódico · Enlace químico. 
2. **Tanda 2 (t5–t8)**: Cinética · Equilibrio (**reforzar** el t6 existente) · Ácidos y bases · Oxidación-reducción.
3. **Tanda 3 (t9–t11 + simulacros)**: Compuestos del carbono · Reactividad · Polímeros; y 3 simulacros nuevos tipo EvAU de Madrid con solución desarrollada.
Enfoque de contenido: nivel y problemas **EvAU/Selectividad de Madrid** (cálculo de pH, Kc/Kp, pilas y electrólisis, formulación orgánica, etc.).

## Estándar «ligero» por tema (suficiente; no pulir sin fin)
≈5.000–7.000 palabras añadidas con ejemplos resueltos · ≥40 ejercicios (★/★★/★★★ con pasos, varios tipo EvAU) · 6–8 simuladores o actividades nuevos (reutilizando motores) · 2–3 láminas · test, tarjetas y «encuentra el error» · verificación independiente (sympy) **solo de las cifras nuevas** · pruebas: `e2e_ejercicios`, `e2e_tema` (escritorio y móvil), `e2e_ruta`, `e2e_regresion`. Guía de convenciones y API: `herramientas/GUIA_TEMA.md`.

## Reglas de coste (para no gastar de más)
1. **Máximo 2 agentes a la vez**, siempre **nuevos y con encargo corto** (no `fork`, no reanudar con contexto largo salvo que sea para terminar algo casi hecho).
2. **Una tanda por ventana de uso.** Si llega un error 429/«session limit», **parar y esperar** a la hora de reinicio que indica; no reanudar en bucle.
3. Capturas de pantalla **solo de tipos de widget nuevos** y una pasada. Leer archivos con `grep`/`sed -n`, nunca enteros.
4. **No republicar el artefacto** hasta cerrar la tanda (una publicación por tanda).
5. Sin motores ni catálogos gigantes: si un tema pide algo grande, preguntar antes.
6. Al cerrar cada tanda: **anotar el coste medido** (los tokens que informa cada agente) en la tabla de abajo y decir al usuario cifras reales, no promesas.

## Coste medido hasta ahora (tokens de agentes; referencia para estimar)
| Trabajo | Tokens | Duración |
|---|---|---|
| Refuerzo Mates I t4+t5 (2 temas) | ≈360.000 | 14 min |
| Refuerzo Mates I t6+t7+t8 (3 temas) | ≈425.000 | 19 min |
| FyQ I t3 completo, con motor de 2.342 compuestos (tema pesado) | ≈610.000 | 63 min |
Estimación (mía, no medida) para Química II con el estándar ligero: ≈150.000–350.000 tokens por tema, es decir ≈2–3,5 millones en total repartidos en 3 tandas.

## Plantilla de encargo para un agente (copiar y rellenar los corchetes)
«Trabajas en el repo bachi-firu. Si tu worktree no contiene `herramientas/GUIA_TEMA.md`, haz `git merge --ff-only claude/admiring-keller-1be6ou`. LEE `herramientas/GUIA_TEMA.md` y `PLAN.md` (estándar ligero y reglas de coste). Encargo: ampliar [asignatura] [temas]; originales con `node herramientas/pruebas/leer.js [asig] tN`. Solo AÑADIR; la teoría nunca se recorta. Reutiliza motores existentes de `ampliaciones/lab_*.js` [lista]. Verificación en `herramientas/verificar_[…].py` (archivo nuevo, no tocar los de otros agentes). Pruebas: e2e_ejercicios, e2e_tema (escritorio y móvil), e2e_ruta, e2e_regresion. Commits frecuentes con los trailers `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` y `Claude-Session: …`; NO push ni PR; no commitees bachi.js/index.html/pagina-autonoma.html. Si chocas con un límite de uso, para y deja todo commiteado. Informe final en ≤10 líneas con cifras.»

## Decisiones pendientes del usuario
- ¿Actualizar la dirección antigua (≈450.000 tokens de lectura) o dejarla como copia?
- ¿Abrir una PR hacia `main` para publicar en GitHub Pages (https://thebillbull.github.io/bachi-firu/)?
