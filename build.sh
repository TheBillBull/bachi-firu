#!/bin/sh
# Genera index.html (versión independiente para GitHub Pages u otro hosting)
# a partir de pagina.html, que es el mismo contenido que se publica en claude.ai.
cd "$(dirname "$0")"
{
  printf '%s\n' '<!doctype html>' '<html lang="es">' '<head>' \
    '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1">' \
    '<meta name="robots" content="noindex, nofollow">' \
    "<link rel=\"icon\" href=\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📐</text></svg>\">" \
    '</head>' '<body>'
  cat pagina.html
  printf '%s\n' '</body>' '</html>'
} > index.html
echo "index.html generado"
