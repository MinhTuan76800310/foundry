---
description: Create post-work report.html + index.html bundle against brief.html (layered views, KR scoreboard, plan-vs-actual, viz)
argument-hint: "[path to brief.html or task slug — omit to use the most recent brief]"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

The report is ONE layered document, conclusion first (pyramid principle):
executive summary for CTO, business impact in domain language, then full
engineering depth. Each section must be liftable into slides unchanged.

**v0.3 outputs:** `report.html` and `index.html` (partner bundle). No `report.md`.

## Steps

1. **Locate the brief**:
   - If the argument is a path, use it (prefer `brief.html`).
   - If it is a slug or keyword, match against `docs/work/*/brief.html`.
   - If empty, use the most recently modified `docs/work/*/brief.html`.
   - **Legacy:** if only `brief.md` exists, use it but suggest regenerating
     `brief.html` via `/doc-flow:brief`.
   - If no brief exists, say so and offer standalone `report.html` + `index.html`
     (same section checklist; flag retroactive Key Results).
2. **Load skeletons**: read `${CLAUDE_PLUGIN_ROOT}/templates/report.html`,
   `templates/bundle.html`, and `templates/report-sections.md`. Follow
   `doc-visuals` HTML deliverables.
3. **Read the worklog** (`worklog.md` next to the brief) if it exists — its
   deviation register is the primary source for Plan vs. Actual. If there is
   no worklog, reconstruct from git history and conversation, and say so.
4. **Gather evidence** of what actually happened: `git log` / `git diff` since
   the brief date, changed files, test output, conversation context. Never
   invent results — if you cannot verify a claim, mark it `unverified`.
5. **Score every Key Result** from the brief: ✅ met / ⚠️ partial / ❌ missed,
   each with concrete evidence (command output, file reference, number).
6. **Write layered, conclusion first** (in HTML sections):
   - Executive Summary — one paragraph + max 3 done / 3 next bullets +
     decision needed; only facts the scoreboard backs up.
   - Business Impact — domain language, no component names.
   - Then engineering depth (scoreboard, plan-vs-actual, changes, diagrams).
7. **Plan vs. Actual**: for each Approach step from the brief, state what
   actually happened and why it deviated. Deviations are information, not
   failures — report them honestly.
8. **Update diagrams**: start from the brief's diagrams, modify to the real
   final state (SVG in HTML preferred when interaction helps).
9. **Close the doc-maintenance loop**: check the brief's Doc Maintenance
   list — tick off each long-lived doc as updated (with ref) or justify why
   no update was needed.
10. **Viz plan** for `report.html` and `index.html`: KR viz + plan-vs-actual
    viz required; `#viz` in bundle must share data arrays with embedded tables.
11. **Write files** next to the brief (same folder):
    - `report.html` — pyramid report (min interactivity: KR + plan-vs-actual).
    - `index.html` — **full embed** of brief + worklog + report text + `#viz`
      section (use `templates/bundle.html` structure).
    English unless the user asks otherwise.
12. **Finish**: show paths to both files, KR scoreboard table in chat, and the
    executive summary paragraph verbatim.