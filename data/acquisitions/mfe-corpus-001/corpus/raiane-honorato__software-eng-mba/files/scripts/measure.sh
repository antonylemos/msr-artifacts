#!/usr/bin/env bash
# measure.sh — Roda os 5 cenários de medição 10x e grava CSVs em scripts/results/
# Uso: bash scripts/measure.sh [all|monolith_baseline|turbo_cold|turbo_warm|turbo_post_change|monolith_post_change]
# Deve ser executado a partir da raiz do repo TCC.

set -euo pipefail
TIMEFORMAT='%R'

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MONOLITH="$ROOT/apps/monolith"
TURBO_ROOT="$ROOT/apps/turborepo"
MYGYM="$TURBO_ROOT/apps/mygym"
TURBO_CHECK_IN="$TURBO_ROOT/packages/feature-check-in/src/screens/GymListScreen.tsx"
MONO_CHECK_IN="$MONOLITH/src/modules/check-in/screens/GymListScreen.tsx"
RESULTS_DIR="$ROOT/scripts/results"

N=10

mkdir -p "$RESULTS_DIR"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

log() { echo "[measure] $*"; }

# Aplica a mudança simulada em um arquivo.
# $1 = arquivo; $2 = índice da run (para garantir hash único por ciclo — evita
# que Turbo sirva do cache a partir da segunda iteração pós-alteração).
apply_change() {
  local file="$1"
  local run_idx="${2:-0}"
  python3 - "$file" "$run_idx" <<'PYEOF'
import sys, re
path = sys.argv[1]
n    = int(sys.argv[2])
with open(path) as f:
    content = f.read()
# Remove qualquer injeção anterior (idempotência entre ciclos)
content = re.sub(
    r'  const MAX_VISIBLE_GYMS = \d+;\n  const visibleGyms = gyms\.slice\(0, MAX_VISIBLE_GYMS\);\n',
    '', content
)
marker = "export function GymListScreen() {"
idx = content.index(marker) + len(marker)
eol = content.index("\n", idx) + 1
# Cada ciclo usa um valor diferente (10, 11, 12…) → hash único → cache miss garantido
insertion = f"  const MAX_VISIBLE_GYMS = {10 + n};\n  const visibleGyms = gyms.slice(0, MAX_VISIBLE_GYMS);\n"
content = content[:eol] + insertion + content[eol:]
with open(path, "w") as f:
    f.write(content)
PYEOF
}

# Reverte o arquivo modificado via git.
revert_file() {
  local rel="$1"
  git -C "$ROOT" checkout -- "$rel" 2>/dev/null || true
}

# ---------------------------------------------------------------------------
# Cenário 1: Monolito — baseline
# ---------------------------------------------------------------------------

run_monolith_baseline() {
  local out="$RESULTS_DIR/monolith_baseline.csv"
  log "=== Monolito — baseline (N=$N) ==="
  echo "run,build,typecheck,lint,test" > "$out"

  for i in $(seq 1 $N); do
    log "  run $i/$N..."
    rm -rf "$MONOLITH/dist"

    # --clear garante Metro frio, simétrico ao turbo_cold
    t_build=$( { time (cd "$MONOLITH" && npx expo export --platform android --clear > /dev/null 2>&1); } 2>&1 )
    t_typecheck=$( { time yarn --cwd "$MONOLITH" typecheck    > /dev/null 2>&1; } 2>&1 )
    t_lint=$(      { time yarn --cwd "$MONOLITH" lint         > /dev/null 2>&1; } 2>&1 )
    t_test=$(      { time yarn --cwd "$MONOLITH" test         > /dev/null 2>&1; } 2>&1 )

    echo "$i,$t_build,$t_typecheck,$t_lint,$t_test" >> "$out"
    log "  build=${t_build}s typecheck=${t_typecheck}s lint=${t_lint}s test=${t_test}s"
  done
  log "Gravado: $out"
}

# ---------------------------------------------------------------------------
# Cenário 2: Turborepo — cache frio
# ---------------------------------------------------------------------------

run_turbo_cold() {
  local out="$RESULTS_DIR/turbo_cold.csv"
  log "=== Turborepo — cache frio (N=$N) ==="
  echo "run,build,typecheck,lint,test" > "$out"

  for i in $(seq 1 $N); do
    log "  run $i/$N..."
    rm -rf "$MYGYM/dist"

    # Build: expo export com --clear para forçar Metro a re-bundlar do zero
    t_build=$( { time (cd "$MYGYM" && npx expo export --platform android --clear > /dev/null 2>&1); } 2>&1 )

    t_typecheck=$( { time (cd "$TURBO_ROOT" && pnpm turbo run typecheck --force > /dev/null 2>&1); } 2>&1 )
    t_lint=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run lint      --force > /dev/null 2>&1); } 2>&1 )
    t_test=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run test      --force > /dev/null 2>&1); } 2>&1 )

    echo "$i,$t_build,$t_typecheck,$t_lint,$t_test" >> "$out"
    log "  build=${t_build}s typecheck=${t_typecheck}s lint=${t_lint}s test=${t_test}s"
  done
  log "Gravado: $out"
}

# ---------------------------------------------------------------------------
# Cenário 3: Turborepo — cache quente
# ---------------------------------------------------------------------------

run_turbo_warm() {
  local out="$RESULTS_DIR/turbo_warm.csv"
  log "=== Turborepo — cache quente (N=$N) ==="

  log "  Aquecendo cache..."
  (cd "$TURBO_ROOT" && pnpm turbo run typecheck lint test > /dev/null 2>&1)
  (cd "$TURBO_ROOT" && pnpm turbo run build > /dev/null 2>&1)
  log "  Cache aquecido."

  echo "run,build,typecheck,lint,test" > "$out"

  for i in $(seq 1 $N); do
    log "  run $i/$N..."
    # Deleta dist para Turbo restaurar do artifact (simula agente de CI)
    rm -rf "$MYGYM/dist"

    t_build=$(     { time (cd "$TURBO_ROOT" && pnpm turbo run build     > /dev/null 2>&1); } 2>&1 )
    t_typecheck=$( { time (cd "$TURBO_ROOT" && pnpm turbo run typecheck > /dev/null 2>&1); } 2>&1 )
    t_lint=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run lint      > /dev/null 2>&1); } 2>&1 )
    t_test=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run test      > /dev/null 2>&1); } 2>&1 )

    echo "$i,$t_build,$t_typecheck,$t_lint,$t_test" >> "$out"
    log "  build=${t_build}s typecheck=${t_typecheck}s lint=${t_lint}s test=${t_test}s"
  done
  log "Gravado: $out"
}

# ---------------------------------------------------------------------------
# Cenário 4: Turborepo — pós-alteração
# ---------------------------------------------------------------------------

run_turbo_post_change() {
  local out="$RESULTS_DIR/turbo_post_change.csv"
  log "=== Turborepo — pós-alteração (N=$N) ==="
  echo "run,typecheck,lint,test" > "$out"

  for i in $(seq 1 $N); do
    log "  ciclo $i/$N..."

    # 1. Garantir estado limpo e aquecer cache
    revert_file "apps/turborepo/packages/feature-check-in/src/screens/GymListScreen.tsx"
    (cd "$TURBO_ROOT" && pnpm turbo run typecheck lint test > /dev/null 2>&1)

    # 2. Aplicar a mudança com valor único por ciclo (garante cache miss no Turbo)
    apply_change "$TURBO_CHECK_IN" "$i"

    # 3. Medir o primeiro run após a mudança (cache de feature-check-in invalidado)
    t_typecheck=$( { time (cd "$TURBO_ROOT" && pnpm turbo run typecheck > /dev/null 2>&1); } 2>&1 )
    t_lint=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run lint      > /dev/null 2>&1); } 2>&1 )
    t_test=$(      { time (cd "$TURBO_ROOT" && pnpm turbo run test      > /dev/null 2>&1); } 2>&1 )

    echo "$i,$t_typecheck,$t_lint,$t_test" >> "$out"
    log "  typecheck=${t_typecheck}s lint=${t_lint}s test=${t_test}s"
  done

  # Cleanup final
  revert_file "apps/turborepo/packages/feature-check-in/src/screens/GymListScreen.tsx"
  log "Gravado: $out"
}

# ---------------------------------------------------------------------------
# Cenário 5: Monolito — mesma alteração
# ---------------------------------------------------------------------------

run_monolith_post_change() {
  local out="$RESULTS_DIR/monolith_post_change.csv"
  log "=== Monolito — mesma alteração (N=$N) ==="

  apply_change "$MONO_CHECK_IN"
  log "  Mudança aplicada em $MONO_CHECK_IN"

  echo "run,typecheck,lint,test" > "$out"

  for i in $(seq 1 $N); do
    log "  run $i/$N..."
    t_typecheck=$( { time yarn --cwd "$MONOLITH" typecheck > /dev/null 2>&1; } 2>&1 )
    t_lint=$(      { time yarn --cwd "$MONOLITH" lint      > /dev/null 2>&1; } 2>&1 )
    t_test=$(      { time yarn --cwd "$MONOLITH" test      > /dev/null 2>&1; } 2>&1 )

    echo "$i,$t_typecheck,$t_lint,$t_test" >> "$out"
    log "  typecheck=${t_typecheck}s lint=${t_lint}s test=${t_test}s"
  done

  revert_file "apps/monolith/src/modules/check-in/screens/GymListScreen.tsx"
  log "Gravado: $out"
}

# ---------------------------------------------------------------------------
# Dispatch
# ---------------------------------------------------------------------------

SCENARIO="${1:-all}"

case "$SCENARIO" in
  all)
    run_monolith_baseline
    run_turbo_cold
    run_turbo_warm
    run_turbo_post_change
    run_monolith_post_change
    ;;
  monolith_baseline)    run_monolith_baseline ;;
  turbo_cold)           run_turbo_cold ;;
  turbo_warm)           run_turbo_warm ;;
  turbo_post_change)    run_turbo_post_change ;;
  monolith_post_change) run_monolith_post_change ;;
  *)
    echo "Uso: $0 [all|monolith_baseline|turbo_cold|turbo_warm|turbo_post_change|monolith_post_change]"
    exit 1
    ;;
esac

log "Concluído. CSVs em $RESULTS_DIR/"
