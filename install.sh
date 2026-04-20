#!/usr/bin/env bash
# getbased agent stack installer
#
# One-line install:
#   curl -sSL https://getbased.health/install.sh | bash
#
# Source: https://github.com/elkimek/get-based-site/blob/main/install.sh
# What it does: installs getbased-agent-stack via pipx, scaffolds systemd
# user units for rag (:8322) and dashboard (:8323), and starts them.

set -euo pipefail

bold=$'\033[1m'
dim=$'\033[2m'
green=$'\033[32m'
yellow=$'\033[33m'
red=$'\033[31m'
reset=$'\033[0m'

echo "${bold}Installing the getbased agent stack…${reset}"
echo ""

# Ensure ~/.local/bin is on PATH — pipx's default install dir. SSH
# non-interactive shells and post-`pipx ensurepath` shells before restart
# don't have it yet; without this, pipx (and the console scripts it
# installs) appear "not found" even when they're present.
export PATH="$HOME/.local/bin:$PATH"

# ── pick an installer (uv preferred, pipx fallback) ──────────────────
# Both isolate the install in a venv and expose console scripts. uv is
# faster and increasingly the default; pipx has the broader install
# base. We accept either.
if command -v uv >/dev/null 2>&1; then
  installer="uv"
elif command -v pipx >/dev/null 2>&1; then
  installer="pipx"
else
  echo "${red}Neither uv nor pipx is installed.${reset}"
  echo ""
  echo "Install one of them first, then re-run this installer:"
  echo "  uv (recommended, fast):  curl -LsSf https://astral.sh/uv/install.sh | sh"
  echo "  pipx:                    sudo apt install pipx && pipx ensurepath"
  echo "                           (or brew install pipx, dnf install pipx, etc.)"
  echo ""
  exit 1
fi

# ── clean up legacy standalone installs ──────────────────────────────
# Pre-0.5.0 docs (and users following the per-package install examples)
# commonly have getbased-mcp / getbased-rag / getbased-dashboard
# installed as their OWN isolated tools — not consolidated under
# getbased-agent-stack. Those standalone venvs become orphaned disk
# waste (~100–600 MB each) after we install the unified stack, and
# their tool-registry entries leave the install in a confusing
# half-migrated state in `uv tool list` / `pipx list`. No-op on
# clean systems.
legacy_pkgs="getbased-dashboard getbased-mcp getbased-rag"
if [ "$installer" = "uv" ]; then
  for pkg in $legacy_pkgs; do
    if uv tool list 2>/dev/null | grep -q "^$pkg "; then
      echo "${dim}▶ removing legacy standalone tool: $pkg${reset}"
      uv tool uninstall "$pkg" >/dev/null 2>&1 || true
    fi
  done
else
  for pkg in $legacy_pkgs; do
    if pipx list --short 2>/dev/null | awk '{print $1}' | grep -qx "$pkg"; then
      echo "${dim}▶ removing legacy standalone tool: $pkg${reset}"
      pipx uninstall "$pkg" >/dev/null 2>&1 || true
    fi
  done
fi

# ── install (or upgrade if already present) ──────────────────────────
# For uv:   --with-executables-from exposes sibling binaries (lens,
#           getbased-dashboard, getbased-mcp) from the workspace deps
#           into the same tool venv.
# For pipx: --include-deps is the equivalent flag.
if [ "$installer" = "uv" ]; then
  # Always reinstall. --force overwrites any pre-existing sibling tools
  # (getbased-rag, -dashboard, -mcp as standalone tools from manual
  # setups) whose executables would otherwise conflict. --refresh
  # side-steps uv's cached PyPI metadata so a same-day release is
  # picked up immediately. Net cost: ~1-2 s when already latest; the
  # alternative (detect-and-branch) hits the cache-eats-new-version
  # failure mode we just debugged.
  echo "${dim}▶ uv tool install \"getbased-agent-stack[full]\"${reset}"
  uv tool install --force --refresh \
    --with-executables-from getbased-rag \
    --with-executables-from getbased-dashboard \
    --with-executables-from getbased-mcp \
    "getbased-agent-stack[full]"
else
  if pipx list --short 2>/dev/null | awk '{print $1}' | grep -qx 'getbased-agent-stack'; then
    echo "${dim}▶ getbased-agent-stack already installed — upgrading (pipx)${reset}"
    pipx upgrade getbased-agent-stack
  else
    echo "${dim}▶ pipx install --include-deps \"getbased-agent-stack[full]\"${reset}"
    pipx install --include-deps "getbased-agent-stack[full]"
  fi
fi
echo ""

# Make sure pipx's default install dir is on PATH for this shell
export PATH="$HOME/.local/bin:$PATH"

if ! command -v getbased-stack >/dev/null 2>&1; then
  echo "${yellow}getbased-stack not on PATH.${reset}"
  echo "Run: pipx ensurepath && exec \$SHELL"
  echo "Then re-run this installer."
  exit 1
fi

# ── init (non-interactive) ────────────────────────────────────────────
# --yes skips every prompt and takes defaults: empty token (user sets
# later with `getbased-stack set GETBASED_TOKEN=…`), auto-generated
# API key, install+start systemd user units. Needs getbased-agent-stack
# >= 0.5.0.
echo "${dim}▶ getbased-stack init --yes${reset}"
getbased-stack init --yes
echo ""

# ── verify services ───────────────────────────────────────────────────
rag_ok="no"; dash_ok="no"
if command -v systemctl >/dev/null 2>&1; then
  systemctl --user is-active --quiet getbased-rag.service && rag_ok="yes" || true
  systemctl --user is-active --quiet getbased-dashboard.service && dash_ok="yes" || true
fi

if [ "$rag_ok" = "yes" ] && [ "$dash_ok" = "yes" ]; then
  echo "${green}✓ Services running${reset}"
  echo "    rag        → http://127.0.0.1:8322"
  echo "    dashboard  → http://127.0.0.1:8323"
else
  echo "${yellow}Services did not come up cleanly.${reset} Check:"
  echo "    systemctl --user status getbased-rag getbased-dashboard"
  echo "    journalctl --user -u getbased-rag -n 50"
fi
echo ""

# ── linger hint for headless boxes ────────────────────────────────────
if command -v loginctl >/dev/null 2>&1 \
   && [ -z "${DISPLAY:-}" ] && [ -z "${WAYLAND_DISPLAY:-}" ]; then
  if ! loginctl show-user "$USER" 2>/dev/null | grep -q "^Linger=yes"; then
    echo "${yellow}Headless system detected.${reset} Without linger, the services stop when you log out:"
    echo "    sudo loginctl enable-linger $USER"
    echo ""
  fi
fi

# ── next steps ────────────────────────────────────────────────────────
echo "${bold}Next steps:${reset}"
echo "  1. Get the one-click login URL:"
echo "       getbased-dashboard login-url"
echo "  2. Open it in a browser, create a library, drop in some files."
echo "  3. Dashboard → MCP → Environment → copy the LENS_API_KEY."
echo "  4. Paste into getbased.health/app → Settings →"
echo "     Knowledge Base → External server → API key."
echo ""
echo "${dim}Done.${reset}"
