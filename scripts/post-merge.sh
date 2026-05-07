#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
bash scripts/install-hooks.sh
nohup bash scripts/sync-daemon.sh >> .git/sync-github.log 2>&1 &
echo "[post-merge] GitHub sync daemon started in background"
