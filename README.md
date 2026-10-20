# Bachi para Firu

**Web: https://thebillbull.github.io/bachi-firu/**

Cuaderno de estudio de Bachillerato de Ciencias (Selectividad Madrid): temario, láminas resumen, ejercicios resueltos, vídeos, simulacros, comentario de texto e inglés.

Los temas vistos y los borradores de los ejercicios se guardan en el navegador de cada dispositivo.

## Archivos

- `pagina.html` — el contenido original de la página (sin `<!doctype>` ni `<head>`). Es el archivo que se edita.
- `ampliaciones/` — **capa de ampliaciones** (ver más abajo). No modifica `pagina.html`: se fusiona con él al cargar.
- `build.sh` — genera `index.html` a partir de `pagina.html`.
- `index.html` — la web publicada (generada; no se edita a mano).
- `herramientas/` — scripts para verificar el contenido nuevo (sympy).

## Actualizar

1. Editar `pagina.html` o los archivos de `ampliaciones/`.
2. `sh build.sh`
3. `git add -A && git commit && git push` — GitHub Pages se actualiza solo en un par de minutos.

> Si la página se publica en claude.ai, hay que publicar **también la carpeta `ampliaciones/`** junto a `pagina.html` (como archivos del artefacto), porque la página los carga con rutas relativas.

## Ampliaciones (contenido nuevo sin tocar lo que ya hay)

Cada asignatura puede tener un archivo `ampliaciones/<asignatura>.js` que **añade** contenido a un tema, sin quitar ni cambiar nada del original. Al arrancar, `BACHI.fusionar()` lo une a los datos de `pagina.html`:

| Qué se añade | Campo | Dónde aparece |
|---|---|---|
| Texto, ejemplos resueltos, diagramas y actividades al final de una sección existente | `secciones: { 0: "<html>" }` (índice de la sección) | Temario |
| Secciones nuevas al final del tema | `nuevas: [{ h, html }]` | Temario |
| Ejercicios por niveles (★ ★★ ★★★) con comprobación automática | `ejercicios: [...]` | Ejercicios resueltos |
| Bloques nuevos de la chuleta (tablas, pasos, errores típicos; imprimible) | `lamina: [...]` | Láminas resumen |
| Exámenes nuevos | `BACHI.registrarSimulacros(asig, [...])` | Simulacros |

Las actividades se insertan en el HTML de una sección con `<div data-w="nombre" data-ref="asig/tema/clave"></div>` y sus datos viven en `datos: { clave: {...} }`.

**Actividades disponibles** (`ampliaciones/actividades.js`, genéricas): `quiz` (test con explicación), `orden`, `emparejar`, `clasificar`, `tarjetas`, `linea` (línea del tiempo) y `clase` (clase interactiva con escenario fijo y pasos).
**Gráficas y expresiones** (`ampliaciones/grafica.js`): `BACHI.Plot` (gráficas SVG con puntos arrastrables) y `BACHI.Mate` (lee respuestas escritas por el alumno, como `2x e^(x^2)`, y las compara por equivalencia).
**Laboratorios** por materia: `lab_analisis.js` (derivadas), `lab_equilibrio.js` (equilibrio químico).
**Comprobación de ejercicios**: campos `num`, `expr`, `lista`, `opcion` y `rubrica` (respuesta larga con autoevaluación). Ver `ampliaciones/nucleo.js`.

El progreso de las actividades se guarda en `localStorage` (por dispositivo).

### Temas ya ampliados (piloto)

- **Matemáticas I · Tema 11** Derivadas: teoría con ejemplos resueltos, clase interactiva, 5 laboratorios, 16 ejercicios por niveles, chuleta ampliada, simulacro nuevo.
- **Química II · Tema 6** Equilibrio: simulador de perturbaciones (Le Chatelier con Q y Kc), tabla ICE, 10 ejercicios, chuleta ampliada.
- **Historia de España · Tema 7** Restauración: línea del tiempo, diagramas del turno y del caciquismo, juegos, comentario de fuente guiado, 7 ejercicios, chuleta ampliada.

## Verificación del contenido

Todo lo calculable en las ampliaciones se comprueba con un script independiente de la web:

```sh
node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
python3 herramientas/verificar_mates1.py   /tmp/ampl.json
python3 herramientas/verificar_quimica2.py /tmp/ampl.json
```

(Requiere `sympy`: `pip install sympy`.) Cada ejercicio nuevo con cifras debería llevar su comprobación ahí.
