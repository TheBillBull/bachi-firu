#!/bin/sh
# Fusiona en UNA sola orden el trabajo de un agente: guarda su WIP, fusiona su rama, regenera, comprueba la regresión,
# hace commit de lo generado y sube. Pensado para que la sesión principal gaste lo mínimo (una llamada, no diez).
#   sh herramientas/fusionar_agente.sh <id-del-agente>      (p. ej. adaa9ded3f7e4480b)
cd "$(dirname "$0")/.." || exit 1
ID="${1:?indica el id del agente}"; RAMA="worktree-agent-$ID"; WT=".claude/worktrees/agent-$ID"
if [ -d "$WT" ]; then
  ( cd "$WT" && git add -A -- . ':!ampliaciones/bachi.js' ':!index.html' ':!pagina-autonoma.html' ':!shots' \
    && for f in $(git diff --cached --name-only | grep '\.js$'); do node --check "$f" 2>&1 | head -1 | sed "s#^#SINTAXIS $f: #"; done \
    && { git diff --cached --quiet || git commit -q -m "WIP: trabajo del agente guardado antes de fusionar

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Uyy8GPC76vz2R79scnLQDj"; } )
fi
git merge --no-edit "$RAMA" >/dev/null 2>&1
for f in $(git diff --name-only --diff-filter=U); do
  case "$f" in herramientas/pruebas/e2e_montaje.js) git checkout --ours -- "$f"; git add "$f";; *) echo "CONFLICTO SIN RESOLVER: $f"; exit 2;; esac
done
git diff --cached --quiet || git commit -q --no-edit
sh build.sh | tail -1
node herramientas/pruebas/e2e_regresion.js 2>&1 | tail -1
git add -A ampliaciones/bachi.js index.html pagina-autonoma.html
git commit -q -m "Regenera la web tras fusionar el trabajo del agente $ID

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Uyy8GPC76vz2R79scnLQDj" 2>/dev/null
git push -q -u origin "$(git branch --show-current)" 2>&1 | tail -1
git status -sb | head -1
