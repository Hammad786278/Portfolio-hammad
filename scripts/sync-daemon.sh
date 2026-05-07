#!/usr/bin/env bash
# Background polling daemon — runs continuously, syncing to GitHub every 60 s.
# Started by post-merge.sh so it restarts after every task merge.
# Also triggered by the git post-commit hook for immediate sync on commits.
set -uo pipefail

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "/home/runner/workspace")
LOG_FILE="${REPO_ROOT}/.git/sync-github.log"
LOCK_FILE="${REPO_ROOT}/.git/sync-github.lock"

if [ -f "$LOCK_FILE" ] && kill -0 "$(cat "$LOCK_FILE")" 2>/dev/null; then
  echo "[sync-daemon] Already running (PID $(cat "$LOCK_FILE")). Exiting."
  exit 0
fi

echo $$ > "$LOCK_FILE"
trap "rm -f '$LOCK_FILE'" EXIT

echo "[sync-daemon] $(date -u '+%Y-%m-%dT%H:%M:%SZ') — started (PID $$, polling every 60 s)"

while true; do
  bash "${REPO_ROOT}/scripts/sync-github.sh" >> "$LOG_FILE" 2>&1 || true
  sleep 60
done
