#!/usr/bin/env bash
# measure-repack.sh — Mede o BUILD ISOLADO por mini-app do Re.Pack, N=10.
# Cada mini-app é bundlado independentemente (produção, Android) — o análogo
# runtime da granularidade que o Turborepo dava no dev pipeline: aqui a
# granularidade está no próprio build (rebuildar check-in não toca host/dashboard).
#
# Uso: bash scripts/measure-repack.sh
# Grava scripts/results/repack_build_isolated.csv (analisado por analyze.py).

set -euo pipefail
TIMEFORMAT='%R'

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPACK="$ROOT/apps/repack/packages"
RESULTS_DIR="$ROOT/scripts/results"
N=10

mkdir -p "$RESULTS_DIR"
OUT="$RESULTS_DIR/repack_build_isolated.csv"

log() { echo "[measure-repack] $*"; }

# Bundla um app em produção (Android) e devolve o tempo wall clock em segundos.
# Diretório de saída limpo a cada chamada (build do zero, sem reaproveitar output).
bundle_time() {
  local app="$1"
  local tmp="/tmp/repack-measure-$app"
  rm -rf "$tmp"; mkdir -p "$tmp"
  { time ( cd "$REPACK/$app" && pnpm exec react-native bundle \
      --platform android --dev false --entry-file index.js \
      --bundle-output "$tmp/index.android.bundle" --assets-dest "$tmp" \
      > /dev/null 2>&1 ); } 2>&1
}

log "=== Re.Pack — build isolado por mini-app (N=$N) ==="
echo "run,host,check-in,dashboard" > "$OUT"

for i in $(seq 1 $N); do
  log "run $i/$N..."
  t_host=$(bundle_time host)
  t_checkin=$(bundle_time check-in)
  t_dashboard=$(bundle_time dashboard)
  echo "$i,$t_host,$t_checkin,$t_dashboard" >> "$OUT"
done

log "concluído -> $OUT"
