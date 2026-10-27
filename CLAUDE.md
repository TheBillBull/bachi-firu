# Bachi para Firu — instrucciones del proyecto

Web de estudio de Bachillerato (Ciencias, Selectividad Madrid). `pagina.html` es el contenido original; la capa `ampliaciones/` añade teoría, simuladores, ejercicios, láminas y simulacros. Se genera con `sh build.sh`. Rama de trabajo: `claude/admiring-keller-1be6ou` (sin PR salvo que el usuario lo pida). Convenciones y API: `herramientas/GUIA_TEMA.md`. Estado y plan: `PLAN.md`.

## Reglas permanentes
- **Ampliar, no recortar**: la teoría original se desarrolla más; no se quita nada salvo errores conceptuales reales. Se puede tocar `pagina.html` si es lo más simple, con tal de no perder contenido; `herramientas/pruebas/e2e_regresion.js` debe seguir dando «todo coincide».
- **Rigor**: toda cifra de ejemplos, ejercicios y simulacros se verifica con un script independiente (sympy/python). Toda función nueva de la interfaz se prueba pulsándola en el navegador (no solo montar el widget).
- **Coste**: el usuario paga por uso. Sigue las «Reglas de coste» de `PLAN.md` (máx. 2 agentes, encargos cortos, una tanda por ventana de uso, sin gigantismos).
- **Química II es la asignatura prioritaria** (decisión del usuario): se amplía con más cuidado que el resto; ver «4b» de `PLAN.md`. Calidad y claridad por encima de cantidad; gráficos e interactivos solo si aportan.
- **Obsidian / iPad está descartado**: no trabajar en `obsidian/` ni proponerlo.
- Comunica claro y breve, con cifras reales; nada de jerga interna (no «piloto»).

## Si hay un piloto automático en marcha
Sigue el protocolo de `PLAN.md` sección 11 (puertas de coste incluidas) sin esperar al usuario; al llegar a su punto de parada, para y resume con cifras.

## Cuando el usuario diga «continuamos»
1. Lee `PLAN.md` y `git status`/`git log -5` (¿hay trabajo sin fusionar en `.claude/worktrees/`?).
2. Dile en 3–4 líneas qué tanda toca, cuántos agentes usarás y el coste estimado según la tabla de `PLAN.md`; **empieza sin más preguntas** salvo que haya una decisión real pendiente.
3. Lanza como máximo 2 agentes nuevos con la plantilla de `PLAN.md`; fusiona sus ramas, regenera con `sh build.sh`, pasa regresión y verificaciones, haz commit y push.
4. Publica **una vez** al cerrar la tanda (misma dirección, sin pasar `capabilities`), actualiza `PLAN.md` (estado y coste medido) y resume con cifras.
