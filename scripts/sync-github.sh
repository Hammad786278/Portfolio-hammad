#!/usr/bin/env bash
set -euo pipefail

REPO="${GITHUB_REPO:-Hammad786278/Portfolio-hammad}"
PAT="${GITHUB_PAT:-}"
BRANCH="${GITHUB_BRANCH:-main}"
REMOTE_NAME="github-sync"
GITHUB_USER="${REPO%%/*}"

if [ -z "$PAT" ]; then
  echo "[sync-github] ERROR: GITHUB_PAT is not set. Skipping sync."
  exit 1
fi

echo "[sync-github] $(date -u '+%Y-%m-%dT%H:%M:%SZ') — checking ${REPO} (branch: ${BRANCH})"

ASKPASS_SCRIPT=$(mktemp)
cat > "$ASKPASS_SCRIPT" << 'ASKPASS'
#!/bin/sh
case "$1" in
  Username*) echo "$GITHUB_USER" ;;
  Password*) echo "$GITHUB_PAT"  ;;
esac
ASKPASS
chmod +x "$ASKPASS_SCRIPT"
trap "rm -f '$ASKPASS_SCRIPT'" EXIT

export GIT_ASKPASS="$ASKPASS_SCRIPT"
export GITHUB_USER
export GITHUB_PAT

REMOTE_URL="https://github.com/${REPO}.git"

if git remote get-url "$REMOTE_NAME" &>/dev/null; then
  git remote set-url "$REMOTE_NAME" "$REMOTE_URL"
else
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

GIT_NAME=$(git config user.name 2>/dev/null || echo "Replit Sync")
GIT_EMAIL=$(git config user.email 2>/dev/null || echo "sync@replit.local")

DIRTY=$(git status --porcelain 2>/dev/null)
if [ -n "$DIRTY" ]; then
  echo "[sync-github] Uncommitted changes detected — creating commit..."
  git -c user.name="$GIT_NAME" \
      -c user.email="$GIT_EMAIL" \
      add -A
  git -c user.name="$GIT_NAME" \
      -c user.email="$GIT_EMAIL" \
      commit -m "chore: auto-sync from Replit [$(date -u '+%Y-%m-%dT%H:%M:%SZ')]"
fi

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(GIT_ASKPASS="$ASKPASS_SCRIPT" git ls-remote "$REMOTE_NAME" "refs/heads/${BRANCH}" 2>/dev/null | awk '{print $1}')

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  echo "[sync-github] Already up-to-date (${LOCAL_SHA:0:7}). Nothing to push."
  exit 0
fi

git push "$REMOTE_NAME" "HEAD:refs/heads/${BRANCH}"
echo "[sync-github] Pushed ${LOCAL_SHA:0:7} → github.com/${REPO}#${BRANCH}"
