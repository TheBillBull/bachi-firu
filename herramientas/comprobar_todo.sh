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

echo "3/5 Preparando listas de temas ampliados (se detectan solas)…"
node herramientas/volcar_ampliaciones.js >"$TMP/ampl.json" 2>/dev/null
node herramientas/volcar_fyq1.js >"$TMP/fyq1_motores.json" 2>/dev/null
node -e "const d=require(process.argv[1]).ampl;for(const a of Object.keys(d)){const t=Object.keys(d[a]).filter(k=>/^t\\d+\$/.test(k)).sort((x,y)=>x.slice(1)-y.slice(1));if(t.length)console.log(a+' '+t.join(' '))}" "$TMP/ampl.json" >"$TMP/lista.txt"
NTEMAS=$(awk '{n+=NF-1} END {print n+0}' "$TMP/lista.txt")
ARGS=$(awk '{s=$1":"$2; for(i=3;i<=NF;i++) s=s","$i; printf "%s ", s}' "$TMP/lista.txt")
ok "temas ampliados detectados: $NTEMAS ($(awk '{printf "%s %d · ", $1, NF-1}' "$TMP/lista.txt"))"

echo "   Botones de la ruta de estudio…"
# shellcheck disable=SC2086
node herramientas/pruebas/e2e_ruta.js $ARGS >"$TMP/ruta.txt" 2>&1
ESP=$((NTEMAS*4))
if tail -1 "$TMP/ruta.txt" | grep -q "$ESP/$ESP"; then ok "ruta de estudio: $ESP/$ESP botones"; else mal "ruta de estudio ($(tail -1 "$TMP/ruta.txt"))"; fi

echo "4/5 Ejercicios: cada uno acepta su respuesta correcta…"
while read -r asig temas; do
  node herramientas/pruebas/e2e_ejercicios.js "$asig" $temas >"$TMP/ej_$asig.txt" 2>&1
  malas=$(grep -c "NO ACEPTA\|INCOHERENCIAS\|SIN AMPLIACIÓN" "$TMP/ej_$asig.txt")
  tot=$(grep -o "[0-9]*/[0-9]* ejercicios" "$TMP/ej_$asig.txt" | awk -F'[/ ]' '{a+=$1; b+=$2} END {print a"/"b}')
  if [ "$malas" = 0 ] && grep -q "todo coherente" "$TMP/ej_$asig.txt"; then ok "$asig: $tot ejercicios aceptan su respuesta"; else mal "$asig ejercicios (ver $TMP/ej_$asig.txt)"; fi
done <"$TMP/lista.txt"

echo "5/5 Verificación independiente de las cifras (sympy/python)…"
SUMA=0
for f in herramientas/verificar_*.py; do
  r=$(timeout 3000 python3 "$f" "$TMP/ampl.json" "$TMP/fyq1_motores.json" 2>&1 | tail -3)
  n=$(echo "$r" | grep -o "[0-9]* comprobaciones correctas\|comprobaciones correctas: [0-9]*" | grep -o "[0-9]*" | head -1)
  if echo "$r" | grep -q "[^0-9]0 fallos\|fallos: 0"; then ok "$(basename "$f"): $n comprobaciones, 0 fallos"; SUMA=$((SUMA+${n:-0})); else mal "$(basename "$f"): $(echo "$r" | tail -1)"; fi
done

if [ "$1" = "completo" ]; then
  echo "Extra: móvil (sin desborde ni errores JS) en todos los temas ampliados…"
  while read -r asig temas; do
    for t in $temas; do
      r=$(node herramientas/pruebas/e2e_tema.js "$asig" "$t" "$t" movil 2>&1 | tail -1)
      case "$r" in *"desborde horizontal: ninguno · errores JS: ninguno"*) ;; *) mal "móvil $asig $t: $r";; esac
    done
  done <"$TMP/lista.txt"
  [ "$MALOS" = 0 ] && ok "móvil: sin desborde ni errores en los $NTEMAS temas"
fi

echo
if [ "$MALOS" = 0 ]; then echo "TODO CUADRA ($TOTAL comprobaciones de grupo; $SUMA comprobaciones de cifras sin fallos)"; exit 0
else echo "HAY $MALOS FALLO(S) de $TOTAL. Detalles en $TMP"; exit 1; fi
