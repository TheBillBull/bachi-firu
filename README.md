# Bachi para Firu

**Web: https://thebillbull.github.io/bachi-firu/**

Cuaderno de estudio de Bachillerato de Ciencias (Selectividad Madrid): temario, láminas resumen, ejercicios resueltos, vídeos, simulacros, comentario de texto e inglés.

Los temas vistos y los borradores de los ejercicios se guardan en el navegador de cada dispositivo.

## Archivos

- `pagina.html` — el contenido de la página (sin `<!doctype>` ni `<head>`). Es el archivo que se edita.
- `build.sh` — genera `index.html` a partir de `pagina.html`.
- `index.html` — la web publicada (generada; no se edita a mano).

## Actualizar

1. Editar `pagina.html`.
2. `sh build.sh`
3. `git add -A && git commit && git push` — GitHub Pages se actualiza solo en un par de minutos.
