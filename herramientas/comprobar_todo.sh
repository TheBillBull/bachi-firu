#!/bin/sh
# Comprueba TODO el proyecto de una vez y dice si «todo cuadra».
#   sh herramientas/comprobar_todo.sh            (≈10–15 min: build, regresión, botones, ejercicios y todas las verificaciones)
#   sh herramientas/comprobar_todo.sh completo   (añade la prueba de móvil de los 26 temas; ≈ +10 min)
# Requisitos: node + Playwright/Chromium (ver herramientas/pruebas/e2e_common.js) y python3 con sympy.
cd "$(dirname "$0")/.." || exit 1
TMP="${TMPDIR:-/tmp}/bachi_comprobar"; mkdir -p "$TMP"
MALOS=0; TOTAL=0
ok()   { TOTAL=$((TOTAL+1)); printf '  OK     %s\n' "$1"; }
mal()  { TOTAL=$((TOTAL+1)); MALOS=$((MALOS+1)); printf '  FALLO  %s\n' "$1"; }

echo "1/5 Generando la web (build.sh)…"
if sh build.sh >"$TMP/build.txt" 2>&1; then ok "build.sh"; else mal "build.sh (ver $TMP/build.txt)"; fi

echo "2/5 Regresión: lo original no ha cambiado…"
node herramientas/pruebas/e2e_regresion.js >"$TMP/regresion.txt" 2>&1
if grep -q "todo coincide" "$TMP/regresion.txt" && ! grep -q "^FALLO\|^DIFER" "$TMP/regresion.txt"; then ok "regresión: todo coincide"; else mal "regresión (ver $TMP/regresion.txt)"; fi

echo "3/5 Botones de la ruta de estudio en los 26 temas…"
node herramientas/pruebas/e2e_ruta.js >"$TMP/ruta.txt" 2>&1
if tail -1 "$TMP/ruta.txt" | grep -q "104/104"; then ok "ruta de estudio: 104/104 botones"; else mal "ruta de estudio ($(tail -1 "$TMP/ruta.txt"))"; fi

echo "4/5 Ejercicios: cada uno acepta su respuesta correcta…"
for par in mates1:1,2,3,4,5,6,7,8,9,10,11,12,13 fyq1:1,2,3,4,5,6,7,8,9,10,11,12,13 quimica2:6 historia_esp:7; do
  asig=${par%%:*}; lista=$(echo "${par#*:}" | tr ',' ' '); temas=""
  for n in $lista; do temas="$temas t$n"; done
  # shellcheck disable=SC2086
  node herramientas/pruebas/e2e_ejercicios.js "$asig" $temas >"$TMP/ej_$asig.txt" 2>&1
  malas=$(grep -c "NO ACEPTA\|INCOHERENCIAS\|SIN AMPLIACIÓN" "$TMP/ej_$asig.txt")
  tot=$(grep -o "[0-9]*/[0-9]* ejercicios" "$TMP/ej_$asig.txt" | awk -F'[/ ]' '{a+=$1; b+=$2} END {print a"/"b}')
  if [ "$malas" = 0 ] && grep -q "todo coherente" "$TMP/ej_$asig.txt"; then ok "$asig: $tot ejercicios aceptan su respuesta"; else mal "$asig ejercicios (ver $TMP/ej_$asig.txt)"; fi
done

echo "5/5 Verificación independiente de las cifras (sympy/python)…"
node herramientas/volcar_ampliaciones.js >"$TMP/ampl.json" 2>/dev/null
node herramientas/volcar_fyq1.js >"$TMP/fyq1_motores.json" 2>/dev/null
SUMA=0
for f in herramientas/verificar_*.py; do
  r=$(timeout 3000 python3 "$f" "$TMP/ampl.json" "$TMP/fyq1_motores.json" 2>&1 | tail -3)
  n=$(echo "$r" | grep -o "[0-9]* comprobaciones correctas\|comprobaciones correctas: [0-9]*" | grep -o "[0-9]*" | head -1)
  if echo "$r" | grep -q "[^0-9]0 fallos\|fallos: 0"; then ok "$(basename "$f"): $n comprobaciones, 0 fallos"; SUMA=$((SUMA+${n:-0})); else mal "$(basename "$f"): $(echo "$r" | tail -1)"; fi
done

if [ "$1" = "completo" ]; then
  echo "Extra: móvil (sin desborde ni errores JS) en los 26 temas…"
  for par in mates1 fyq1; do
    for n in 1 2 3 4 5 6 7 8 9 10 11 12 13; do
      r=$(node herramientas/pruebas/e2e_tema.js $par t$n t$n movil 2>&1 | tail -1)
      case "$r" in *"desborde horizontal: ninguno · errores JS: ninguno"*) ;; *) mal "móvil $par t$n: $r";; esac
    done
  done
  [ "$MALOS" = 0 ] && ok "móvil: sin desborde ni errores en los 26 temas"
fi

echo
if [ "$MALOS" = 0 ]; then echo "TODO CUADRA ($TOTAL comprobaciones de grupo; $SUMA comprobaciones de cifras sin fallos)"; exit 0
else echo "HAY $MALOS FALLO(S) de $TOTAL. Detalles en $TMP"; exit 1; fi
