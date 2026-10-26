#!/usr/bin/env bash
# start-local.sh — starts all apps in parallel and tails logs
set -e

mkdir -p logs

echo "Starting MFE Platform..."
echo ""
echo "  Shell         → http://localhost:3000"
echo "  Checkout MFE  → http://localhost:3001  (Vue 2 + Vuetify 2)"
echo "  Admin MFE     → http://localhost:3002  (Vue 2 + Vuetify 2)"
echo "  Profile MFE   → http://localhost:3003  (Vue 3 + Vuetify 3)"
echo "  Dashboard MFE → http://localhost:3004  (Vue 3 + Vuetify 3)"
echo ""

trap 'kill $(jobs -p) 2>/dev/null; echo "Stopped."' EXIT

pnpm --filter mfe-vue2-checkout dev > logs/checkout.log 2>&1 &
pnpm --filter mfe-vue2-admin    dev > logs/admin.log    2>&1 &
pnpm --filter mfe-vue3-profile  dev > logs/profile.log  2>&1 &
pnpm --filter mfe-vue3-dashboard dev > logs/dashboard.log 2>&1 &
pnpm --filter shell             dev > logs/shell.log    2>&1 &

echo "All processes started. Tailing logs (Ctrl+C to stop)..."
echo ""
tail -f logs/*.log
