#!/bin/sh
# Genera, a partir de pagina.html (el archivo que se edita):
#   ampliaciones/bachi.js   núcleo + laboratorios + contenido de cada tema, en un solo archivo
#   index.html              web completa y autocontenida (CSS y JS dentro): GitHub Pages u otro hosting
#   pagina-autonoma.html    lo mismo sin <!doctype>/<head>: para publicar en claude.ai como un único archivo
cd "$(dirname "$0")"
{
  for f in grafica nucleo ui actividades; do cat "ampliaciones/$f.js"; printf '\n'; done
  for f in ampliaciones/lab_*.js; do cat "$f"; printf '\n'; done
  for f in ampliaciones/contenido/*.js; do cat "$f"; printf '\n'; done
} > ampliaciones/bachi.js

# sustituye las dos referencias externas por su contenido
inline() {
  awk -v css="ampliaciones/estilos.css" -v js="ampliaciones/bachi.js" '
    $0 == "<link rel=\"stylesheet\" href=\"ampliaciones/estilos.css\">" { print "<style>"; while ((getline l < css) > 0) print l; print "</style>"; next }
    $0 == "<script src=\"ampliaciones/bachi.js\"></script>" { print "<script>"; while ((getline l < js) > 0) print l; print "</script>"; next }
    { print }' "$1"
}

inline pagina.html > pagina-autonoma.html
{
  printf '%s\n' '<!doctype html>' '<html lang="es">' '<head>' \
    '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1">' \
    '<meta name="robots" content="noindex, nofollow">' \
    "<link rel=\"icon\" href=\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📐</text></svg>\">" \
    '</head>' '<body>'
  cat pagina-autonoma.html
  printf '%s\n' '</body>' '</html>'
} > index.html
echo "generados: ampliaciones/bachi.js, index.html y pagina-autonoma.html"
