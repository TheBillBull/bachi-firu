#!/bin/sh
# Fusiona el trabajo de un agente y pasa las pruebas de su tema en una sola orden.
#   sh herramientas/validar_tema.sh <id-del-agente> <asig> <N>     (p. ej. a8c4… mates2 2)
cd "$(dirname "$0")/.." || exit 1
sh herramientas/fusionar_agente.sh "$1" 2>&1 | grep -v hint | tail -2
node herramientas/pruebas/e2e_ejercicios.js "$2" "t$3" 2>&1 | tail -1
node herramientas/pruebas/e2e_ruta.js "$2:t$3" 2>&1 | tail -1
node herramientas/volcar_ampliaciones.js > /tmp/ampl.json 2>/dev/null
python3 "herramientas/verificar_$2_t$3.py" /tmp/ampl.json 2>&1 | tail -1
git status --short | head -3; git log --oneline -1
