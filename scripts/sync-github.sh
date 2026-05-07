#!/usr/bin/env bash
set -euo pipefail

REPO="${GITHUB_REPO:-Hammad786278/Portfolio-hammad}"
PAT="${GITHUB_PAT:-}"
BRANCH="${GITHUB_BRANCH:-main}"
REMOTE_NAME="github-sync"
REMOTE_URL="https://${REPO%%/*}:${PAT}@github.com/${REPO}.git"

if [ -z "$PAT" ]; then
  echo "[sync-github] ERROR: GITHUB_PAT is not set. Skipping push."
  exit 1
fi

echo "[sync-github] $(date -u '+%Y-%m-%dT%H:%M:%SZ') — syncing ${REPO} (branch: ${BRANCH})"

if git remote get-url "$REMOTE_NAME" &>/dev/null; then
  git remote set-url "$REMOTE_NAME" "$REMOTE_URL"
else
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git ls-remote "$REMOTE_NAME" "refs/heads/${BRANCH}" 2>/dev/null | awk '{print $1}')

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  echo "[sync-github] Already up-to-date. Nothing to push."
  exit 0
fi

git push "$REMOTE_NAME" "HEAD:refs/heads/${BRANCH}"
echo "[sync-github] Pushed ${LOCAL_SHA:0:7} → github.com/${REPO}#${BRANCH}"
