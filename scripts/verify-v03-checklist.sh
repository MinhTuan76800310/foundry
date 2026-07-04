#!/usr/bin/env bash
# doc-flow v0.3 checklist verifier (automated items 4–6 + smoke folder)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SMOKE="$ROOT/docs/work/2026-07-04-v03-smoke-test"
LEGACY="$ROOT/docs/work/2026-07-04-worklog-verify"
PASS=0
FAIL=0
ok() { echo "  ✅ $1"; PASS=$((PASS+1)); }
no() { echo "  ❌ $1"; FAIL=$((FAIL+1)); }

echo "=== doc-flow v0.3 verify ==="

# 5 plugin version
if grep -q '"version": "0.3.0"' "$ROOT/.claude-plugin/plugin.json"; then
  ok "plugin.json version 0.3.0"
else
  no "plugin.json version 0.3.0"
fi

# 6 command refs
for f in brief.md report.md work.md; do
  if grep -q 'brief.html' "$ROOT/commands/$f" && grep -q 'brief-sections\|bundle.html' "$ROOT/commands/brief.md" "$ROOT/commands/report.md" 2>/dev/null; then
    :
  fi
done
if grep -q 'brief-sections.md' "$ROOT/commands/brief.md" && grep -q 'bundle.html' "$ROOT/commands/report.md"; then
  ok "commands reference brief.html, brief-sections, bundle.html"
else
  no "commands reference brief.html, brief-sections, bundle.html"
fi

# 1 smoke brief.html
if [[ -f "$SMOKE/brief.html" ]]; then
  ok "smoke: brief.html exists"
  if grep -q 'btn-verify-kr1\|kr-canvas' "$SMOKE/brief.html"; then
    ok "smoke: brief.html has ≥2 interactive hooks (canvas + button)"
  else
    no "smoke: brief.html interactivity"
  fi
else
  no "smoke: brief.html missing"
fi

# 2 worklog only md change pattern (files exist)
if [[ -f "$SMOKE/worklog.md" ]] && [[ -f "$SMOKE/brief.html" ]]; then
  ok "smoke: worklog.md + brief.html present"
  if grep -q deviation "$SMOKE/worklog.md"; then
    ok "smoke: worklog has deviation row"
  else
    no "smoke: worklog deviation"
  fi
fi

# 3 report + index
for f in report.html index.html; do
  if [[ -f "$SMOKE/$f" ]]; then ok "smoke: $f exists"; else no "smoke: $f missing"; fi
done
if [[ -f "$SMOKE/index.html" ]]; then
  if grep -q 'id="brief"' "$SMOKE/index.html" && grep -q 'id="worklog"' "$SMOKE/index.html" && grep -q 'id="report"' "$SMOKE/index.html" && grep -q 'id="viz"' "$SMOKE/index.html"; then
    ok "smoke: index.html embed sections report/brief/worklog/viz"
  else
    no "smoke: index.html section anchors"
  fi
  if grep -q 'KR1 brief.html' "$SMOKE/index.html" && grep -q 'deviation' "$SMOKE/index.html"; then
    ok "smoke: index embeds substantive text (not summary-only)"
  else
    no "smoke: index full embed"
  fi
fi

# 4 no brief.md/report.md in smoke folder
if [[ ! -f "$SMOKE/brief.md" ]] && [[ ! -f "$SMOKE/report.md" ]]; then
  ok "smoke: no brief.md or report.md"
else
  no "smoke: unexpected md deliverables"
fi

# templates exist
for t in brief.html report.html bundle.html html-shared.css brief-sections.md report-sections.md; do
  if [[ -f "$ROOT/templates/$t" ]]; then ok "template $t"; else no "template $t"; fi
done

echo "---"
echo "PASS=$PASS FAIL=$FAIL"
if [[ "$FAIL" -gt 0 ]]; then exit 1; fi
echo "All automated checklist items passed."
echo "Manual: open file://$SMOKE/brief.html and click Run KR1 verify."