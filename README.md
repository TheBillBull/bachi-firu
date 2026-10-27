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

## Versión Obsidian (iPad)

El mismo contenido como vault de Obsidian: una carpeta por asignatura, una nota por tema (apuntes, lámina, ejercicios con la solución plegada y vídeos), simulacros con sitio para responder, comentario de texto, inglés y una tabla de progreso (`Progreso.base`). El snippet `bachi-firu.css` pone el subrayador del color de cada asignatura.

1. `node obsidian/generar.js` — crea `obsidian/Bachi Firu/` a partir de `pagina.html`.
2. `python obsidian/zip.py` — lo empaqueta en `obsidian/Bachi Firu.zip` para pasarlo al iPad.

Al regenerar se pisan todas las notas: en el iPad, sustituir el vault por uno nuevo borraría lo que Firu haya escrito o subrayado.
