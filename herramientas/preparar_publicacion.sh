#!/bin/sh
# Genera el archivo que se publica como artefacto de claude.ai (la página con todo incrustado).
#   sh herramientas/preparar_publicacion.sh <ruta_de_salida.html>
# Después se publica con la herramienta Artifact: file_path = esa ruta, url = la dirección de uso (ver PLAN.md),
# SIN pasar `capabilities` (así conserva `sample` y `db`, necesarias para las correcciones de Claude).
cd "$(dirname "$0")/.." || exit 1
sh build.sh >/dev/null || exit 1
sed 's#<title>Bachi para Firu</title>#<title>Bachi para Firu · ampliado</title>#' pagina-autonoma.html > "${1:?indica la ruta de salida}" && echo "listo: $1"
