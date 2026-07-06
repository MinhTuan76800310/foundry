---
description: Create post-work report.html + index.html + viz-spec.json; evidence-first (brief + worklog + git)
argument-hint: "**Required:** path or slug to docs/work/<date>-<slug> (do not rely on silent 'latest' if multiple tasks)"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

**Canonical partner file:** `index.html` (dogfood layout). Factual accuracy comes from
**brief.html + worklog.md + git evidence** — not from old repo docs or guessing.
Read `${CLAUDE_PLUGIN_ROOT}/docs/DATA-CONTRACT.md` when the project already had docs
before doc-flow.

## Evidence gate (do this BEFORE writing HTML)

1. **Resolve task folder explicitly** — user MUST provide slug/path, or you ask:
   `Which docs/work folder?` If multiple `docs/work/*` exist, **never** pick latest silently.
2. **Read in folder:** `brief.html`, `worklog.md` (if missing, state in report §4 source).
3. **Run and capture** (paste summaries into chat, use in Evidence column):
   - `git log --oneline --since="<brief date YYYY-MM-DD>" -- .`
   - `git diff --stat` (and scoped diff for files in brief scope)
   - **Each** KR verification command from brief §2 (exact command from brief table)
4. **Score KRs** only from captured output. No ✅ without command/file evidence.
   Unverifiable → `unverified` or ❌. Executive §1 must match §3 only.

If brief is missing or not Approved: stop or flag **retroactive** and label all KRs
reconstructed.

## Write deliverables

5. **Viz plan:** dynamic `#viz` required; `ai-image` only when story needs it.
6. **`viz-spec.json`** — charts/story from **scored KRs + worklog events** (not invented).
7. **`index.html`** — embed **full text** read from this folder's brief/worklog/report
   content you just wrote; same facts in tables and #viz data arrays.
8. **`report.html`** — pyramid; link to index.
9. **AI images:** if `.env` + `imageRequests`, run plugin script (user approves Bash).

10. **Finish:** list evidence gaps (e.g. "no worklog", "KR1 verify not run"), KR table, exec summary.

**Do not** fill sections from README/legacy docs unless user explicitly points them as
inputs for this slug. Layout without evidence is a failure mode — say so in chat.