#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT=$(git rev-parse --show-toplevel)
HOOKS_DIR="${REPO_ROOT}/.git/hooks"
HOOK_FILE="${HOOKS_DIR}/post-commit"

mkdir -p "$HOOKS_DIR"

cat > "$HOOK_FILE" << 'HOOK'
#!/usr/bin/env bash
# Automatically push commits to GitHub after every local commit.
# Runs in the background so it does not block git operations.
REPO_ROOT=$(git rev-parse --show-toplevel)
nohup bash "${REPO_ROOT}/scripts/sync-github.sh" \
  >> "${REPO_ROOT}/.git/sync-github.log" 2>&1 &
HOOK

chmod +x "$HOOK_FILE"
echo "[install-hooks] post-commit hook installed at ${HOOK_FILE}"
