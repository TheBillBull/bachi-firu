# Prompt para abrir una conversación nueva y retomar el trabajo

Al crear la conversación, elige el repositorio **thebillbull/bachi-firu** (rama `claude/admiring-keller-1be6ou`) y pega esto, cambiando la asignatura:

~~~
Continuamos el proyecto «Bachi para Firu» (web de estudio de Bachillerato, Selectividad Madrid). Trabaja de forma autónoma, sin esperarme, hasta el punto de parada.

DÓNDE ESTÁ TODO
- Repositorio GitHub `thebillbull/bachi-firu`, rama `claude/admiring-keller-1be6ou` (NO `main`; no abras PR).
- Lee `CLAUDE.md`, luego `PLAN.md` §0 (estado y método de trabajo), §4b (estándar «con cariño»), §6 (coste) y `herramientas/GUIA_TEMA.md`. Si algo no coincide, manda el repositorio.
- Antes de lanzar agentes: `~/.claude/settings.json` con `{"worktree":{"baseRef":"head"}}` y `pip install sympy scipy`.
- Comprobar todo: `sh herramientas/comprobar_todo.sh` («TODO CUADRA»). Fusionar y probar cada tema: `sh herramientas/validar_tema.sh <id> <asig> <N>`.
- Publicar: `sh herramientas/preparar_publicacion.sh <ruta.html>` y la herramienta Artifact. Desde una conversación nueva no se puede republicar barato en la dirección existente (PLAN.md §0): publica en una dirección nueva con `capabilities: {sample:{}, db:{}}`, anótala en PLAN.md y dímelo.

QUÉ HACER
Ampliar [ASIGNATURA] tema a tema con el estándar de §4b: 2 agentes nuevos a la vez (Sonnet, worktree), un tema cada uno, con un encargo común como `herramientas/ENCARGO_COMUN_MATES2.txt` adaptado a la asignatura. Puerta de coste: si un agente pasa de 700.000 tokens en un tema, para y avísame.

LÍMITE DE USO (5 H)
Si ves «You've hit your 5-hour limit · resets HH:MM»: deja todo commiteado y subido, no reintentes en bucle, programa con `send_later` (hora de reinicio + 2 min) «Reanuda según PLAN.md §0 desde el último commit» y termina el turno. Al empezar, programa también un aviso cada 2 h de red de seguridad. Al despertar, reanuda a los agentes con SendMessage (guardando antes su trabajo como commit WIP en su worktree).

REGLAS
Solo AÑADIR. Toda cifra nueva verificada con sympy; todo control nuevo probado pulsándolo. Coste contenido: sin leer archivos enteros, capturas solo de widgets nuevos. Commit y push tras cada paso. Obsidian descartado. Comunica breve, con cifras reales.

PUNTO DE PARADA
[ASIGNATURA] completa → `comprobar_todo.sh` en «TODO CUADRA» → PLAN.md (§0, §2 y §7) → publicar → resumen con cifras → PARA.
~~~
