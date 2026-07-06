---
description: Create post-work report.html + index.html + viz-spec.json; investigate scope + evidence-first
argument-hint: "**Required:** path or slug to docs/work/<date>-<slug> (do not rely on silent 'latest' if multiple tasks)"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

You are not a layout generator. **Investigate** what the project and git say, then write HTML.
Read `${CLAUDE_PLUGIN_ROOT}/docs/DATA-CONTRACT.md` (flow: what you need, where, how — including one-shot `/report`).

**Canonical partner file:** `index.html`. Facts = **brief.html + worklog.md + git/tests** after investigation — not guessing.

## Investigation gate (BEFORE evidence block and BEFORE HTML)

1. **Resolve task folder** — user MUST provide slug/path, or ask: `Which docs/work folder?`
   Never pick `latest` silently if multiple `docs/work/*` exist.

2. **Anchor time on recent work** — docs usually describe work just finished:
   - `git log --oneline -30 -- .`
   - `git log -1 --format='%H %ci %s'`
   Use brief date for `--since` when brief exists; if no brief, use commits/messages in scope or ask user for base ref.

3. **Project root context** (targeted, not whole-repo grep-for-fun):
   - Read `README.md` (or root README) for what the project is about.
   - Skim `docs/` entries **referenced by brief scope, commits, or $ARGUMENTS**.
   - Do **not** paste README into KR scores; context informs §5/§6 only.

4. **Scope-first search, expand when referenced**:
   - From `brief.html` § Scope (and path in $ARGUMENTS): list scope paths/modules.
   - `git log --oneline --since="<since>" -- <scope-paths>`
   - `git diff --stat` and scoped `git diff` for those paths.
   - If scope **mentions paths outside** (other package, service, `../foo`): read and log those too.
   - If **git log/diff touches files outside scope**: read/investigate those files/commits before writing What changed.

5. **Task folder files**: read `brief.html`, `worklog.md`, optional `brainstorm.md`.

6. **Post Investigation block in chat** (bullets): slug, scope paths, relevant commits, files read outside scope (why), gaps (no brief / no worklog).

## Evidence gate (after investigation, still BEFORE HTML)

7. **Capture evidence** (summaries in chat + Evidence column in report):
   - `git log --oneline --since="<since>" -- <scope-or-.>`
   - `git diff --stat` (scoped + whole-tree if commits span outside scope)
   - **Each** KR verification command from brief §2 (exact command from brief table)

8. **Score KRs** only from captured output. No ✅ without command/file evidence.
   Unverifiable → `unverified` or ❌. Executive §1 must match §3 only.

If brief missing or not Approved: flag **retroactive**; label reconstructed KRs. Missing worklog → §4 states git-only source.

## Write deliverables

9. **Viz plan:** dynamic `#viz` required; `ai-image` only when story needs it.
10. **`viz-spec.json`** — from **scored KRs + worklog events + investigation facts** (not invented).
11. **`index.html`** — full embed from this folder's brief/worklog/report; tables and `#viz` arrays match same facts.
12. **`report.html`** — pyramid; link to index.
13. **AI images:** if `.env` + `imageRequests`, run:
    `node "${CLAUDE_PLUGIN_ROOT}/scripts/generate-viz-images.mjs" --cwd "$(pwd)" "<task-folder>"`

14. **Finish:** evidence gaps, KR table, exec summary. If investigation was thin, say so — pretty HTML without evidence is a **failure**.

**Do not** fill KR / plan-vs-actual from legacy docs unless user explicitly names them as inputs for this slug.