# Prompt para abrir una conversación nueva y retomar el trabajo

Al crear la conversación, elige el repositorio **thebillbull/bachi-firu** (rama `claude/admiring-keller-1be6ou`) y pega esto:

~~~
Continuamos el proyecto «Bachi para Firu» (web de estudio de Bachillerato, Selectividad Madrid). Trabaja de forma autónoma, sin esperarme, hasta el punto de parada que marca el plan.

DÓNDE ESTÁ TODO
- Repositorio: GitHub `thebillbull/bachi-firu`, rama de trabajo `claude/admiring-keller-1be6ou` (NO `main`; no abras PR). Si no está clonado: `git clone https://github.com/thebillbull/bachi-firu && cd bachi-firu && git checkout claude/admiring-keller-1be6ou`.
- Lee, por este orden: `CLAUDE.md`, `PLAN.md` (§2 estado, §4b estándar de Química II, §6 reglas de coste, §8 plantilla de encargo, §11 piloto automático, §12 cómo retomar) y `herramientas/GUIA_TEMA.md`. Si algo del plan no coincide con el repositorio, manda el repositorio.
- Comprobar todo el proyecto: `sh herramientas/comprobar_todo.sh` (debe acabar en «TODO CUADRA»). Generar la web: `sh build.sh`. Originales de un tema: `node herramientas/pruebas/leer.js quimica2 tN`.
- Publicar: `sh herramientas/preparar_publicacion.sh <ruta.html>` y la herramienta Artifact sobre https://claude.ai/artifact/PBj2wEg4PKUru2SyFq2T2c (sin pasar `capabilities`; conserva `sample` y `db`). No toques la dirección antigua XQLuNYX6Bk5A2LSEtHkdxZ.

QUÉ HACER
Sigue `PLAN.md` §12 (pasos 1–6): tanda 1 de Química II (temas 1–4), la asignatura prioritaria, con el estándar «con cariño» de §4b (calidad y claridad por encima de cantidad; gráficos e interactivos solo si ayudan a entender). Hay trabajo parcial ya en la rama (simulador de mol del tema 1) y posiblemente más en carpetas `.claude/worktrees/` si este entorno es el de la conversación anterior. Máximo 2 agentes a la vez, nuevos y con encargo corto (plantilla de §8), un tema por agente, y la puerta de coste de §11: si un agente gasta más de 700.000 tokens en un tema, no lances el siguiente y avisa. Tras cada tema: fusionar su rama, `sh build.sh`, `e2e_ejercicios.js quimica2 tN`, `e2e_ruta.js quimica2:tN`, `e2e_regresion.js`, su verificador, commit, push y publicar.

LÍMITE DE USO (VENTANA DE 5 HORAS) — REANUDA SOLA
- Tú y los agentes compartís la ventana. Si ves «You've hit your 5-hour limit · resets HH:MM (UTC)»: (1) deja todo commiteado y empujado a la rama de trabajo; (2) no reintentes en bucle ni lances más agentes; (3) programa con `mcp__claude-code-remote__send_later` (`at` en RFC3339 UTC = hora de reinicio + 2 minutos) el mensaje «Reanuda según PLAN.md §11/§12 desde el último commit»; (4) termina el turno.
- Red de seguridad: nada más empezar, programa con `send_later` un aviso a las 2 h («Revisa el estado según PLAN.md §11; si todo marcha, no hagas nada y re-arma otro a las 2 h; máximo 6 seguidos sin novedades»). Re-arma siempre al despertar. Así, aunque tu propia petición falle por el límite, vuelves a despertar tras el reinicio.
- Al despertar: `git fetch`, `git log -5`, `git worktree list`; recoge lo commiteado, reanuda a los agentes con SendMessage si aún existen o lanza otros nuevos desde lo ya commiteado, y sigue donde toque, sin preguntarme.
- Cada vez que termines un paso, deja un commit y un push: lo que solo esté en el contenedor puede perderse.

REGLAS
- Solo AÑADIR: no se quita nada del contenido original. Toda cifra nueva se verifica con un script independiente (sympy/python). Todo control nuevo se prueba pulsándolo en el navegador.
- Coste: el usuario paga por uso y no quiere excesos. No leas archivos enteros (usa `grep` y `sed -n`), capturas solo de tipos de widget nuevos, sin catálogos gigantes, una publicación por tema validado.
- Obsidian/iPad está descartado. No abras PR. Comunica breve y con cifras reales; nada de jerga interna.

PUNTO DE PARADA
Temas 1–4 de Química II hechos y verificados → `sh herramientas/comprobar_todo.sh` en «TODO CUADRA» → actualiza `PLAN.md` (§2 estado y §7 coste real medido de cada agente) → publica → resumen con cifras → PARA. La tanda 2 (temas 5–8) solo si yo lo pido.
~~~
