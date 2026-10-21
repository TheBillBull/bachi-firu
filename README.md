# Bachi para Firu

**Web: https://thebillbull.github.io/bachi-firu/**

Cuaderno de estudio de Bachillerato de Ciencias (Selectividad Madrid): temario, láminas resumen, ejercicios resueltos, vídeos, simulacros, comentario de texto e inglés.

Los temas vistos y los borradores de los ejercicios se guardan en el navegador de cada dispositivo.

## Archivos

- `pagina.html` — el contenido original de la página (sin `<!doctype>` ni `<head>`). **No se modifica**: todo lo nuevo es aditivo.
- `ampliaciones/` — **capa de ampliaciones** (ver más abajo), que se fusiona con el original al cargar.
- `build.sh` — concatena la capa de ampliaciones y genera `index.html` y `pagina-autonoma.html` (con todo incrustado).
- `index.html` y `pagina-autonoma.html` — la web (generadas; no se editan a mano). `ampliaciones/bachi.js` también es generado.
- `herramientas/` — verificaciones independientes (sympy/python) y pruebas automáticas en navegador (`herramientas/pruebas/`). La guía para ampliar un tema está en `herramientas/GUIA_TEMA.md`.

## Actualizar

1. Editar `pagina.html` o los archivos de `ampliaciones/`.
2. `sh build.sh`
3. `git add -A && git commit && git push` — GitHub Pages se actualiza solo en un par de minutos.

> Si la página se publica en claude.ai, usa `pagina-autonoma.html` (lleva todo incrustado en un solo archivo).

## Ampliaciones (contenido nuevo sin tocar lo que ya hay)

Regla del proyecto: **solo se añade** (no se quita ni se cambia lo original, salvo errores conceptuales reales). La teoría se desarrolla más, nunca se recorta.

Estructura de `ampliaciones/`:

- `nucleo.js`, `ui.js`, `grafica.js`, `actividades.js` — núcleo: fusión con el original, comprobación de ejercicios, controles, gráficas SVG (`BACHI.Plot`), lector de expresiones (`BACHI.Mate`) y actividades genéricas.
- `lab_*.js` — **laboratorios**: motores propios y simuladores interactivos por materia (álgebra, trigonometría, complejos, vectores, rectas, funciones, límites, derivadas, sucesiones, estadística, probabilidad; átomo, enlace, formulación, estequiometría, termoquímica, química orgánica, cinemática, movimiento circular, dinámica, gravitación, energía, MAS…).
- `contenido/<asignatura>_tNN*.js` — el contenido de cada tema (teoría, ejercicios, láminas, actividades) y `*_t99_simulacros.js` (exámenes nuevos).
- `estilos.css` — estilos (modo claro/oscuro y móvil).

| Qué se añade | Campo | Dónde aparece |
|---|---|---|
| Texto, ejemplos resueltos, simuladores y actividades al final de una sección existente | `secciones: { 0: "<html>" }` | Temario |
| Secciones nuevas al final del tema | `nuevas: [{ h, html }]` | Temario |
| Ejercicios por niveles (★ ★★ ★★★) con comprobación automática | `ejercicios: [...]` | Ejercicios resueltos |
| Bloques nuevos de la chuleta (tablas, pasos, errores típicos; imprimible) | `lamina: [...]` | Láminas resumen |
| Exámenes nuevos con solución desarrollada | `BACHI.registrarSimulacros(asig, [...])` | Simulacros |

**Comprobación de ejercicios**: `num`, `expr` (equivalencia algebraica), `lista`, `opcion` (se baraja), `texto` (fórmulas y nombres), `rubrica` (demostraciones con autoevaluación). **Actividades genéricas**: `quiz`, `orden`, `emparejar`, `clasificar`, `tarjetas`, `linea`, `clase`.
El progreso de las actividades se guarda en `localStorage` (por dispositivo).

### Temas ya ampliados

| Asignatura | Temas | Palabras añadidas* | Ejercicios nuevos (total) | Actividades y simuladores* | Láminas nuevas | Simulacros nuevos (total) |
|---|---|---|---|---|---|---|
| **Matemáticas I** | 1–13 (todos) | ≈ 81.000 | 548 (600) | ≈ 200 | 119 | 13 (20) |
| **Física y Química I** | 1–13 (todos) | ≈ 117.000 | 622 (674) | ≈ 240 | 115 | 4 (11) |
| Química II (piloto) | 6 | — | 10 | simulador de Le Chatelier, tabla ICE | 1 | — |
| Historia de España (piloto) | 7 | — | 7 | línea del tiempo, diagramas, comentario guiado | 1 | — |

\* Estimación a partir del texto de las secciones nuevas y de las actividades incrustadas en la teoría (sin contar enunciados de ejercicios ni simulacros).

Cada tema de Mates I y FyQ I incluye: teoría desarrollada con ejemplos resueltos, simuladores propios, 36–62 ejercicios por niveles con pistas y pasos, láminas nuevas, test, tarjetas, juegos y «encuentra el error».

## Verificación del contenido

Todo lo calculable se recalcula con scripts **independientes** de la web (no comparten código con ella). Hay más de 15.000 comprobaciones:

```sh
node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
node herramientas/volcar_fyq1.js         > /tmp/fyq1_motores.json
python3 herramientas/verificar_mates1.py            /tmp/ampl.json   # temas 1–11 y simulacros 9–20
python3 herramientas/verificar_mates1_t12-13.py     /tmp/ampl.json
python3 herramientas/verificar_fyq1_t1-3.py         /tmp/ampl.json /tmp/fyq1_motores.json
python3 herramientas/verificar_fyq1_t3.py           /tmp/ampl.json /tmp/fyq1_motores.json
python3 herramientas/verificar_fyq1_t4-5.py         /tmp/ampl.json /tmp/fyq1_motores.json
python3 herramientas/verificar_fyq1_t6-7.py         /tmp/ampl.json /tmp/fyq1_motores.json
python3 herramientas/verificar_fyq1_t8-10.py        /tmp/ampl.json
python3 herramientas/verificar_fyq1_t11-13.py       /tmp/ampl.json
python3 herramientas/verificar_fyq1_simulacros.py   /tmp/ampl.json
python3 herramientas/verificar_quimica2.py          /tmp/ampl.json
```

(Requiere `sympy`: `pip install sympy`.)

## Pruebas automáticas en navegador

Con Playwright y Chromium (`herramientas/pruebas/`; ver `GUIA_TEMA.md`):

- `e2e_regresion.js` — comprueba que **lo original no ha cambiado** (ejercicios, simulacros y temas).
- `e2e_ejercicios.js <asig> tN…` — cada ejercicio nuevo acepta su respuesta correcta; coherencia de las actividades.
- `e2e_tema.js <asig> tN <prefijo> [movil]` — monta todos los simuladores del tema, sin errores JS ni desborde horizontal.
- `e2e_montaje.js claro|oscuro escritorio|movil w1,w2 …` — capturas de widgets sueltos.
- `e2e_desborde.js`, y pruebas de comportamiento por tema (`e2e_fyq1_t*.js`, `e2e_estadistica.js`, `e2e_probabilidad.js`…).

## Continuar el trabajo

Quedan por ampliar con este mismo método: Matemáticas II, Física II, Química II (completar), Biología II, Lengua, Historia de España (completar) e Historia de la Filosofía; y, si se quiere más profundidad, los temas 4–8 de Matemáticas I (hoy con menos recursos que el resto). `herramientas/GUIA_TEMA.md` explica el flujo paso a paso.
